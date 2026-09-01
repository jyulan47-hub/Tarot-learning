// ============================================================
// 百年韦特塔罗学习系统 - 主应用逻辑
// ============================================================

// ==================== 状态管理 ====================
const AppState = {
  // 学习进度: { 'ch-1-1': true, 'ch-2-1': true, ... }
  chapterProgress: {},
  // 牌学习状态: { 'fool': 'learning', 'magician': 'unlearned', ... }
  cardStatus: {},
  // 我的牌义: { 'fool': { myKeywords: '', myUnderstanding: '', ... }, ... }
  myMeanings: {},
  // 测试记录: { 'ch-1-1': { answers: [], score: 80, ... }, ... }
  quizRecords: {},
  // 错题: [ { question, userAnswer, correctAnswer, chapterId }, ... ]
  wrongQuestions: [],
  // 实战记录: { 'case-1': { analysis: '...', score: 75, ... }, ... }
  practiceRecords: {},
  // 学习记录列表
  studyLogs: [],
  // 实战完成情况
  practiceCompleted: {},
  // 首页每日提醒
  lastVisitDate: null,
  // 当前正在查看的牌
  currentCardId: null,
  // 当前打开的章节
  currentChapterId: null,
  // 当前文章内容
  currentArticleContent: null,
  currentArticleTitle: ''
};

// ==================== 数据持久化 ====================
const Storage = {
  save() {
    try {
      const data = {
        chapterProgress: AppState.chapterProgress,
        cardStatus: AppState.cardStatus,
        myMeanings: AppState.myMeanings,
        quizRecords: AppState.quizRecords,
        wrongQuestions: AppState.wrongQuestions,
        practiceRecords: AppState.practiceRecords,
        studyLogs: AppState.studyLogs,
        practiceCompleted: AppState.practiceCompleted,
        lastVisitDate: AppState.lastVisitDate
      };
      localStorage.setItem('tarot_learning_data', JSON.stringify(data));
    } catch (e) {
      console.warn('保存数据失败:', e);
    }
  },

  load() {
    try {
      const raw = localStorage.getItem('tarot_learning_data');
      if (!raw) return;
      const data = JSON.parse(raw);
      Object.assign(AppState, data);
    } catch (e) {
      console.warn('加载数据失败:', e);
    }
  },

  exportJSON() {
    const data = {
      version: '1.0',
      exportTime: new Date().toISOString(),
      state: {
        chapterProgress: AppState.chapterProgress,
        cardStatus: AppState.cardStatus,
        myMeanings: AppState.myMeanings,
        quizRecords: AppState.quizRecords,
        wrongQuestions: AppState.wrongQuestions,
        practiceRecords: AppState.practiceRecords,
        studyLogs: AppState.studyLogs,
        practiceCompleted: AppState.practiceCompleted
      }
    };
    return JSON.stringify(data, null, 2);
  },

  importJSON(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      if (!data.state) throw new Error('无效的数据格式');
      Object.assign(AppState, data.state);
      this.save();
      return true;
    } catch (e) {
      alert('导入失败: ' + e.message);
      return false;
    }
  }
};

// ==================== 工具函数 ====================
function getCardById(id) {
  return TarotCards.find(c => c.id === id);
}

function getCardName(id) {
  const c = getCardById(id);
  return c ? c.name : id;
}

function getCardStatus(id) {
  return AppState.cardStatus[id] || 'unlearned';
}

function getCardStatusLabel(status) {
  const map = {
    unlearned: '未学习',
    learning: '学习中',
    learned: '已学习',
    familiar: '熟悉',
    mastered: '掌握'
  };
  return map[status] || '未学习';
}

function getCardStatusClass(status) {
  return 'status-' + status;
}

function getPhaseProgress(phaseId) {
  const phase = Courses.phases.find(p => p.id === phaseId);
  if (!phase) return 0;
  const total = phase.chapters.length;
  if (total === 0) return 0;
  const done = phase.chapters.filter(ch => AppState.chapterProgress[ch.id]).length;
  return Math.round((done / total) * 100);
}

function getTotalProgress() {
  let total = 0;
  let done = 0;
  Courses.phases.forEach(phase => {
    phase.chapters.forEach(ch => {
      total++;
      if (AppState.chapterProgress[ch.id]) done++;
    });
  });
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

function addStudyLog(action, detail) {
  AppState.studyLogs.unshift({
    action,
    detail,
    time: new Date().toLocaleString('zh-CN')
  });
  if (AppState.studyLogs.length > 100) AppState.studyLogs.length = 100;
  Storage.save();
}

// 获取针对性复习建议
function getReviewSuggestions() {
  const suggestions = [];

  // 1. 从错题中找出相关牌
  const wrongCardIds = new Set();
  const wrongChapterIds = new Set();
  AppState.wrongQuestions.forEach(wq => {
    if (wq.cardId) wrongCardIds.add(wq.cardId);
    if (wq.chapterId) wrongChapterIds.add(wq.chapterId);
  });

  // 错题关联的牌优先
  wrongCardIds.forEach(id => {
    const card = getCardById(id);
    if (card) {
      suggestions.push({
        id,
        name: card.name,
        reason: '错题关联',
        priority: 'high'
      });
    }
  });

  // 2. 根据测试成绩分析薄弱点
  let poorPerformanceCards = [];
  Object.entries(AppState.quizRecords).forEach(([key, rec]) => {
    if (rec.score < 60 && !rec.isComprehensive) {
      // 这是章节测试，找出该章节对应的牌
      const chapter = Courses.phases.flatMap(p => p.chapters).find(ch => ch.id === key);
      if (chapter && chapter.cardId) {
        if (!wrongCardIds.has(chapter.cardId)) {
          poorPerformanceCards.push({
            id: chapter.cardId,
            reason: '测试薄弱'
          });
        }
      }
    }
  });

  poorPerformanceCards.forEach(item => {
    if (!suggestions.find(s => s.id === item.id)) {
      const card = getCardById(item.id);
      if (card) {
        suggestions.push({
          id: item.id,
          name: card.name,
          reason: item.reason,
          priority: 'medium'
        });
      }
    }
  });

  // 3. 找出已学习但掌握程度不高的牌
  const learnedCards = Object.entries(AppState.cardStatus)
    .filter(([_, s]) => s === 'learned')
    .map(([id]) => id);

  learnedCards.forEach(id => {
    if (!suggestions.find(s => s.id === id)) {
      const card = getCardById(id);
      if (card) {
        suggestions.push({
          id,
          name: card.name,
          reason: '需要巩固',
          priority: 'low'
        });
      }
    }
  });

  // 按优先级排序，最多返回 5 条
  return suggestions
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 5);
}

// 根据当前学习进度生成针对性复习建议
function getComprehensiveReviewSuggestions() {
  const suggestions = {
    hasWeakness: false,
    message: '',
    cardsToReview: []
  };

  // 计算总体情况
  let totalQuizzes = 0;
  let lowScoreQuizzes = 0;
  const weakCardIds = [];

  Object.entries(AppState.quizRecords).forEach(([key, rec]) => {
    if (!rec.isComprehensive && rec.score < 60) {
      totalQuizzes++;
      lowScoreQuizzes++;
      // 找对应的牌
      const chapter = Courses.phases.flatMap(p => p.chapters).find(ch => ch.id === key);
      if (chapter && chapter.cardId) {
        weakCardIds.push(chapter.cardId);
      }
    }
  });

  if (lowScoreQuizzes > 0 && weakCardIds.length > 0) {
    suggestions.hasWeakness = true;
    suggestions.cardsToReview = weakCardIds.slice(0, 3);
    if (lowScoreQuizzes === 1) {
      suggestions.message = '有1个章节测试得分较低，建议先复习对应牌的知识点。';
    } else {
      suggestions.message = `有${lowScoreQuizzes}个章节测试得分较低，建议重点复习这些牌。`;
    }
  } else if (AppState.wrongQuestions.length > 5) {
    suggestions.hasWeakness = true;
    suggestions.message = `积累了${AppState.wrongQuestions.length}道错题，建议定期回顾巩固。`;
  }

  return suggestions;
}

// ==================== 导航路由 ====================
const Router = {
  currentPage: 'home',
  pageStack: [],

  init() {
    // 侧边栏导航
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        this.navigate(item.dataset.page);
      });
    });

    // 底部导航栏 (手机端)
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        this.navigate(item.dataset.page);
      });
    });

    // 汉堡菜单
    const menuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (menuBtn) {
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('open');
        backdrop.classList.toggle('active');
      });
    }
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        sidebar.classList.remove('open');
        backdrop.classList.remove('active');
      });
    }

    // 默认加载首页
    this.navigate('home');
  },

  navigate(page, params) {
    // 关闭侧边栏（移动端）
    document.getElementById('sidebar').classList.remove('open');

    // 更新侧边栏高亮
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });
    // 更新底部导航高亮
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });

    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // 显示目标页面
    const target = document.getElementById('page-' + page);
    if (target) {
      target.classList.add('active');
    }

    this.currentPage = page;

    // 渲染页面内容
    switch (page) {
      case 'home': Renderer.home(); break;
      case 'map': Renderer.map(); break;
      case 'course': Renderer.course(params); break;
      case 'cards': Renderer.cards(); break;
      case 'mymeaning': Renderer.myMeaning(); break;
      case 'quiz': Renderer.quiz(params); break;
      case 'practice': Renderer.practice(params); break;
      case 'records': Renderer.records(); break;
      case 'progress': Renderer.progress(); break;
    }
  }
};

// ==================== 页面渲染器 ====================
const Renderer = {
  // ---------- 首页 ----------
  home() {
    AppState.lastVisitDate = new Date().toDateString();
    Storage.save();

    const container = document.getElementById('homeContent');
    const totalProgress = getTotalProgress();
    const currentPhase = getCurrentPhase();
    const todayDate = new Date().toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const recentLogs = AppState.studyLogs.slice(0, 5);
    const reviewSuggestions = getReviewSuggestions();

    container.innerHTML = `
      <p style="color:var(--text-muted);font-size:13px;margin-bottom:16px;">${todayDate}</p>

      <div class="dashboard-grid">
        <div class="dashboard-item" style="grid-column:1/-1;">
          <h3>学习阶段</h3>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
            <span class="phase-label">${currentPhase}</span>
            <span style="font-size:13px;color:var(--text-secondary);">总体进度 ${totalProgress}%</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width:${totalProgress}%"></div>
            </div>
          </div>
        </div>

        <div class="dashboard-item">
          <h3>今日学习</h3>
          <div id="todayTask">
            <p style="font-size:13px;color:var(--text-secondary);">加载中...</p>
          </div>
        </div>

        <div class="dashboard-item">
          <h3>推荐复习</h3>
          ${reviewSuggestions.length > 0 ? `
            <ul class="record-list">
              ${reviewSuggestions.map(s => `
                <li style="cursor:pointer;" onclick="Router.navigate('course',{cardId:'${s.id}'})">
                  ${s.name} <span style="font-size:11px;color:var(--text-muted);">${s.reason}</span>
                </li>
              `).join('')}
            </ul>
          ` : '<p style="font-size:13px;color:var(--text-muted);">暂无复习建议，继续学习新内容吧</p>'}
        </div>

        <div class="dashboard-item wide">
          <h3>最近学习记录</h3>
          ${recentLogs.length > 0 ? `
            <ul class="record-list">
              ${recentLogs.map(log => `
                <li>
                  <span>${log.action} ${log.detail}</span>
                  <span class="record-time">${log.time}</span>
                </li>
              `).join('')}
            </ul>
          ` : '<p style="font-size:13px;color:var(--text-muted);">还没有学习记录，开始你的第一个课程吧</p>'}
        </div>
      </div>

      <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="Router.navigate('map')">继续学习</button>
        <button class="btn btn-secondary" onclick="exportData()">导出数据</button>
        <button class="btn btn-secondary" onclick="document.getElementById('importInput').click()">导入数据</button>
        <input type="file" id="importInput" accept=".json" style="display:none" onchange="importData(event)">
      </div>
    `;

    // 计算今日任务
    this._renderTodayTask();
  },

  _renderTodayTask() {
    const container = document.getElementById('todayTask');
    // 找到第一个未完成的章节
    let nextChapter = null;
    for (const phase of Courses.phases) {
      for (const ch of phase.chapters) {
        if (!AppState.chapterProgress[ch.id]) {
          nextChapter = ch;
          break;
        }
      }
      if (nextChapter) break;
    }

    if (nextChapter) {
      container.innerHTML = `
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:8px;">
          下一步：<strong>${nextChapter.name}</strong>
        </p>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">${nextChapter.description}</p>
        <button class="btn btn-primary btn-sm" onclick="Router.navigate('course',{chapterId:'${nextChapter.id}'})">开始学习</button>
      `;
    } else {
      container.innerHTML = '<p style="font-size:13px;color:var(--accent);">🎉 所有课程已完成！</p>';
    }
  },

  // ---------- 学习地图 ----------
  map() {
    const container = document.getElementById('mapContent');
    let html = '<div class="map-container">';

    Courses.phases.forEach((phase, idx) => {
      const pProgress = getPhaseProgress(phase.id);
      html += `
        <div class="map-phase">
          <div class="map-phase-header">
            <div class="map-phase-number">${idx + 1}</div>
            <div>
              <h3>${phase.name}</h3>
              <p>${phase.description}</p>
              <div class="progress-bar-container" style="max-width:300px;">
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width:${pProgress}%"></div>
                </div>
                <div class="progress-text">${pProgress}%</div>
              </div>
            </div>
          </div>
          <div class="map-chapters">
      `;

      phase.chapters.forEach(ch => {
        const completed = AppState.chapterProgress[ch.id];
        html += `
          <div class="map-chapter ${completed ? 'completed' : ''}" onclick="Renderer.openChapter('${ch.id}')">
            <div class="chapter-check">${completed ? '✓' : ''}</div>
            <div class="chapter-info">
              <h4>${ch.name}</h4>
              <p>${ch.description}</p>
            </div>
            <span class="chapter-type">${ch.type === 'article' ? '文章' : ch.type === 'card' ? '牌学习' : '其他'}</span>
          </div>
        `;
      });

      // 在阶段末尾添加综合测试按钮
      const hasComprehensive = getPhaseComprehensiveTest(phase.id).length > 0;
      if (hasComprehensive) {
        const recordKey = 'comprehensive_' + phase.id;
        const done = AppState.quizRecords[recordKey];
        html += `
          <div class="map-chapter ${done ? 'completed' : ''}" onclick="Router.navigate('quiz',{phaseId:'${phase.id}'})" style="border-left:3px solid var(--accent);">
            <div class="chapter-check">${done ? '✓' : ''}</div>
            <div class="chapter-info">
              <h4>${phase.name} · 综合测试</h4>
              <p>检验该阶段所有知识点的掌握情况</p>
            </div>
            <span class="chapter-type" style="background:var(--accent);color:white;">测试</span>
          </div>
        `;
      }

      html += `</div></div>`;
    });

    html += '</div>';
    container.innerHTML = html;
  },

  openChapter(chapterId) {
    Router.navigate('course', { chapterId });
  },

  // ---------- 课程 ----------
  course(params) {
    const container = document.getElementById('courseContent');
    const titleEl = document.getElementById('courseTitle');

    // 如果指定了章节ID
    if (params && params.chapterId) {
      AppState.currentChapterId = params.chapterId;
      // 查找章节
      let found = null;
      let phaseId = null;
      for (const phase of Courses.phases) {
        for (const ch of phase.chapters) {
          if (ch.id === params.chapterId) {
            found = ch;
            phaseId = phase.id;
            break;
          }
        }
        if (found) break;
      }

      if (!found) {
        container.innerHTML = '<p>章节未找到</p>';
        return;
      }

      titleEl.textContent = found.name;

      if (found.type === 'article') {
        this._renderArticle(found, phaseId);
      } else if (found.type === 'card') {
        this._renderCardStudy(found.cardId, found, phaseId);
      }
      return;
    }

    // 如果指定了牌ID
    if (params && params.cardId) {
      const card = getCardById(params.cardId);
      if (card) {
        titleEl.textContent = card.name;
        this._renderCardStudy(params.cardId, { id: params.cardId, name: card.name }, null);
        return;
      }
    }

    // 默认：显示课程列表
    titleEl.textContent = '选择章节开始学习';
    let html = '';
    Courses.phases.forEach(phase => {
      const pProgress = getPhaseProgress(phase.id);
      html += `
        <div class="card" style="margin-bottom:16px;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <h3 class="card-title">${phase.name}</h3>
              <p class="card-text">${phase.description}</p>
            </div>
            <span style="font-size:13px;font-weight:600;color:var(--accent);">${pProgress}%</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width:${pProgress}%"></div>
            </div>
          </div>
          <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px;">
            ${phase.chapters.map(ch => `
              <button class="btn ${AppState.chapterProgress[ch.id] ? 'btn-secondary' : 'btn-primary'} btn-sm" 
                      onclick="Renderer.openChapter('${ch.id}')">
                ${ch.name} ${AppState.chapterProgress[ch.id] ? '✓' : ''}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  },

  _renderArticle(chapter, phaseId) {
    const container = document.getElementById('courseContent');
    container.innerHTML = `
      <div class="article-content">
        ${chapter.content}
      </div>
      <div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap;">
        <button id="btn-mark-complete" class="btn ${AppState.chapterProgress[chapter.id] ? 'btn-secondary' : 'btn-primary'}" 
          onclick="Renderer.markChapterComplete('${chapter.id}')"
          ${AppState.chapterProgress[chapter.id] ? 'disabled style="opacity:0.6;cursor:default;"' : ''}>
          ${AppState.chapterProgress[chapter.id] ? '已完成 ✓' : '标记完成 ✓'}
        </button>
        <button class="btn btn-secondary" onclick="Renderer.startQuiz('${chapter.id}')">
          章节测试
        </button>
        <button class="btn btn-secondary" onclick="Router.navigate('map')">返回学习地图</button>
      </div>
    `;
  },

  markChapterComplete(chapterId) {
    AppState.chapterProgress[chapterId] = true;
    addStudyLog('完成课程', '');
    Storage.save();

    // 按钮变灰，显示已完成
    const btn = document.getElementById('btn-mark-complete');
    if (btn) {
      btn.textContent = '已完成 ✓';
      btn.className = 'btn btn-secondary';
      btn.disabled = true;
      btn.style.opacity = '0.6';
      btn.style.cursor = 'default';
    }

    // 更新课程列表中的按钮状态
    const listBtn = document.getElementById('list-btn-' + chapterId);
    if (listBtn) {
      listBtn.className = 'btn btn-secondary btn-sm';
      listBtn.innerHTML = listBtn.textContent.replace('✓', '') + ' ✓';
    }

    // 更新地图
    Renderer._updateMapIfVisible();
  },

  _updateMapIfVisible() {
    if (Router.currentPage === 'map') Renderer.map();
  },

  startQuiz(chapterId) {
    Router.navigate('quiz', { chapterId });
  },

  // ---------- 牌学习页面 ----------
  _renderCardStudy(cardId, chapterInfo, phaseId) {
    const card = getCardById(cardId);
    if (!card) {
      document.getElementById('courseContent').innerHTML = '<p>牌未找到</p>';
      return;
    }

    // 如果牌没有完整的学习内容，显示占位页面
    if (!card.observationGuide || !card.story || !card.knowledge) {
      const my = AppState.myMeanings[cardId] || { myKeywords: '', myUnderstanding: '', myDisagreement: '', myRealLifeExamples: '' };
      AppState.currentCardId = cardId;
      const container = document.getElementById('courseContent');
      container.innerHTML = `
        <div class="card-study">
          <div class="card-study-header">
            <div class="card-study-number">${card.number}</div>
            <div class="card-study-title">
              <h2>${card.name}</h2>
              <p>${card.nameEn} · ${card.category}</p>
            </div>
          </div>
          <div class="card-visual" id="cardVisual">
            ${getCardSVG(card.id)}
          </div>
          <div class="study-section" style="text-align:center;padding:40px 20px;">
            <p style="font-size:16px;color:var(--text-muted);margin-bottom:12px;">该牌的学习内容正在建设中...</p>
            <p style="font-size:13px;color:var(--text-muted);">你可以先浏览牌面图片，或记录你的个人牌义。</p>
          </div>
          <div class="study-section">
            <h3>✏️ 我的牌义</h3>
            <div class="my-meaning-section">
              <div class="form-group">
                <label>我的关键词</label>
                <textarea id="myKeywords" placeholder="用你自己的话总结这张牌的关键词">${my.myKeywords}</textarea>
              </div>
              <div class="form-group">
                <label>我的理解</label>
                <textarea id="myUnderstanding" placeholder="你对这张牌的理解是什么？" rows="3">${my.myUnderstanding}</textarea>
              </div>
              <div class="form-group">
                <label>我不同意的地方</label>
                <textarea id="myDisagreement" placeholder="标准牌义中，你不同意或觉得不合适的地方？" rows="2">${my.myDisagreement}</textarea>
              </div>
              <div class="form-group">
                <label>我在现实中见过的类似状态</label>
                <textarea id="myRealLifeExamples" placeholder="你在生活中见过类似这张牌状态的人或事吗？" rows="3">${my.myRealLifeExamples}</textarea>
              </div>
              <button class="btn btn-gold" onclick="Renderer.saveMyMeaning('${cardId}')">保存我的牌义</button>
            </div>
          </div>
          <div style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap;padding:20px 0;border-top:1px solid var(--border-light);">
            <button class="btn btn-secondary" onclick="Router.navigate('cards')">返回牌库</button>
          </div>
        </div>
      `;
      return;
    }

    AppState.currentCardId = cardId;
    // 更新状态
    if (getCardStatus(cardId) === 'unlearned') {
      AppState.cardStatus[cardId] = 'learning';
      Storage.save();
    }

    const container = document.getElementById('courseContent');
    const my = AppState.myMeanings[cardId] || { myKeywords: '', myUnderstanding: '', myDisagreement: '', myRealLifeExamples: '' };

    container.innerHTML = `
      <div class="card-study">
        <!-- 头部 -->
        <div class="card-study-header">
          <div class="card-study-number">${card.number}</div>
          <div class="card-study-title">
            <h2>${card.name}</h2>
            <p>${card.nameEn} · ${card.category}</p>
          </div>
        </div>

        <!-- 牌面SVG -->
        <div class="card-visual" id="cardVisual">
          ${getCardSVG(card.id)}
        </div>

        <!-- A. 牌面观察 -->
        <div class="study-section">
          <h3>👁️ 牌面观察</h3>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:10px;">先不要看下方知识，先观察画面。回答以下问题：</p>
          <div class="observation-questions">
            <ol>
              ${card.observationGuide.questions.map(q => `<li>${q}</li>`).join('')}
            </ol>
          </div>
          <div class="user-answer-area">
            <textarea id="observationAnswer" placeholder="我第一眼看到了什么？这张牌给我的感觉是什么？如果这是现实中的一个人，他正在经历什么？" 
              rows="4">${AppState.myMeanings[cardId + '_observation'] || ''}</textarea>
          </div>
          <button class="btn btn-sm btn-secondary" onclick="Renderer.saveObservation('${cardId}')">保存观察</button>
        </div>

        <!-- B. 牌面故事 -->
        <div class="study-section">
          <h3>📖 牌面故事</h3>
          <div class="knowledge-box highlight">
            <p>${card.story}</p>
          </div>
        </div>

        <!-- C. 核心知识 -->
        <div class="study-section">
          <h3>📚 核心知识</h3>
          
          <h4>核心主题</h4>
          <p>${card.knowledge.theme}</p>

          <h4>关键词</h4>
          <div class="keyword-tags">
            ${card.knowledge.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('')}
          </div>

          <h4>象征元素</h4>
          <table class="symbol-table">
            <tr><th>元素</th><th>含义</th></tr>
            ${card.knowledge.symbols.map(s => `<tr><td>${s.element}</td><td>${s.meaning}</td></tr>`).join('')}
          </table>

          <h4>正位与逆位</h4>
          <div class="upright-reversed">
            <div class="upright-box">
              <div class="ur-label">正位</div>
              <div class="ur-text">${card.knowledge.upright}</div>
            </div>
            <div class="reversed-box">
              <div class="ur-label">逆位</div>
              <div class="ur-text">${card.knowledge.reversed}</div>
            </div>
          </div>

          <h4>牌面细节</h4>
          <p>${card.knowledge.details}</p>

          <h4>常见误解</h4>
          <div class="knowledge-box" style="border-left:3px solid #c0392b;background:#fdf0f0;">
            <p>${card.knowledge.misperceptions}</p>
          </div>
        </div>

        <!-- D. 现实生活解释 -->
        <div class="study-section">
          <h3>🌍 现实生活解释</h3>
          ${card.lifeScenarios.map(sc => `
            <div class="scenario-card">
              <div class="scenario-area">${sc.area}</div>
              <div class="scenario-desc">${sc.description}</div>
              <div class="scenario-meaning">${sc.cardMeaning}</div>
            </div>
          `).join('')}
        </div>

        <!-- E. 如果这张牌是一个人 -->
        <div class="study-section">
          <h3>👤 如果这张牌是一个人</h3>
          <div class="knowledge-box highlight">
            <p>${card.asPerson}</p>
          </div>
        </div>

        <!-- F. 这张牌不只是 -->
        <div class="study-section">
          <h3>💡 这张牌不只是...</h3>
          <div class="knowledge-box" style="border-left:3px solid var(--gold);">
            <p>${card.beyond}</p>
          </div>
        </div>

        <!-- 互动：你会怎么选？ -->
        <div class="study-section">
          <h3>🤔 互动：你会怎么选？</h3>
          <div class="user-answer-area" style="border:1px solid var(--border);background:var(--bg-primary);border-radius:var(--radius-sm);">
            <p style="font-size:13px;color:var(--text-muted);margin-bottom:10px;">
              以下哪个情境最符合这张牌的核心能量？选出你认为最贴切的选项：
            </p>
            <div class="quiz-options" id="whichChoice_${cardId}">
              ${getWhichChoiceOptions(card.id).map((opt, oi) => `
                <div class="quiz-option" data-opt-index="${oi}" onclick="Renderer.selectWhichChoice('${cardId}', ${oi})">
                  <span class="option-letter">${String.fromCharCode(65 + oi)}</span>
                  <span>${opt.text}</span>
                </div>
              `).join('')}
            </div>
            <div id="whichChoiceResult_${cardId}" class="quiz-result" style="display:none;margin-top:10px;"></div>
          </div>
        </div>

        <!-- 互动：同一张牌，不同问题 -->
        <div class="study-section">
          <h3>💭 互动：同一张牌，不同问题</h3>
          <div class="user-answer-area" style="border:1px dashed var(--gold);background:var(--bg-primary);border-radius:var(--radius-sm);">
            <p style="font-size:13px;color:var(--text-muted);margin-bottom:10px;">
              同一张牌出现在不同问题中，会有不同的解读。请试着回答：
            </p>
            ${getDifferentQuestions(card.id).map(q => `
              <div style="margin-bottom:10px;">
                <p style="font-size:13px;font-weight:600;color:var(--gold-dark);">${q}</p>
                <textarea id="dq_${cardId}_${encodeURIComponent(q).slice(0,30)}" rows="2" style="width:100%;border:none;background:transparent;resize:vertical;outline:none;" placeholder="写下你的理解..."></textarea>
              </div>
            `).join('')}
            <button class="btn btn-sm btn-secondary mt-8" onclick="Renderer.saveDifferentQuestions('${cardId}')">保存回答</button>
            <div id="dqSaved_${cardId}" style="display:none;font-size:12px;color:var(--accent);margin-top:8px;">✓ 已保存</div>
          </div>
        </div>

        <!-- G. 我的牌义 -->
        <div class="study-section">
          <h3>✏️ 我的牌义</h3>
          <div class="my-meaning-section">
            <div class="form-group">
              <label>我的关键词</label>
              <textarea id="myKeywords" placeholder="用你自己的话总结这张牌的关键词">${my.myKeywords}</textarea>
            </div>
            <div class="form-group">
              <label>我的理解</label>
              <textarea id="myUnderstanding" placeholder="你对这张牌的理解是什么？" rows="3">${my.myUnderstanding}</textarea>
            </div>
            <div class="form-group">
              <label>我不同意的地方</label>
              <textarea id="myDisagreement" placeholder="标准牌义中，你不同意或觉得不合适的地方？" rows="2">${my.myDisagreement}</textarea>
            </div>
            <div class="form-group">
              <label>我在现实中见过的类似状态</label>
              <textarea id="myRealLifeExamples" placeholder="你在生活中见过类似这张牌状态的人或事吗？" rows="3">${my.myRealLifeExamples}</textarea>
            </div>
            <button class="btn btn-gold" onclick="Renderer.saveMyMeaning('${cardId}')">保存我的牌义</button>
          </div>
        </div>

        <!-- 来源 -->
        <div class="study-section">
          <h3>📚 知识来源</h3>
          <p style="font-size:12px;color:var(--text-muted);">
            ${card.sources.map(s => formatSource(s)).join(' · ')}
          </p>
        </div>

        <!-- 底部操作 -->
        <div style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap;padding:20px 0;border-top:1px solid var(--border-light);">
          <button id="btn-mark-card-learned" class="btn ${AppState.cardStatus[cardId] === 'learned' ? 'btn-secondary' : 'btn-primary'}" 
            onclick="Renderer.markCardLearned('${cardId}')"
            ${AppState.cardStatus[cardId] === 'learned' ? 'disabled style="opacity:0.6;cursor:default;"' : ''}>
            ${AppState.cardStatus[cardId] === 'learned' ? '已学习 ✓' : '标记为已学习 ✓'}
          </button>
          <button class="btn btn-secondary" onclick="Renderer.startQuiz('${findChapterByCardId(cardId)}')">章节测试</button>
          <button class="btn btn-secondary" onclick="Router.navigate('map')">返回学习地图</button>
        </div>
      </div>
    `;
  },

  saveObservation(cardId) {
    const val = document.getElementById('observationAnswer').value;
    if (val.trim()) {
      AppState.myMeanings[cardId + '_observation'] = val;
      Storage.save();
      addStudyLog('保存观察', getCardName(cardId));
      alert('观察已保存！');
    } else {
      alert('请先填写你的观察。');
    }
  },

  saveMyMeaning(cardId) {
    const my = {
      myKeywords: document.getElementById('myKeywords').value,
      myUnderstanding: document.getElementById('myUnderstanding').value,
      myDisagreement: document.getElementById('myDisagreement').value,
      myRealLifeExamples: document.getElementById('myRealLifeExamples').value
    };
    AppState.myMeanings[cardId] = my;
    if (my.myKeywords.trim() || my.myUnderstanding.trim()) {
      if (AppState.cardStatus[cardId] === 'learning') {
        AppState.cardStatus[cardId] = 'learned';
      }
    }
    Storage.save();
    addStudyLog('保存牌义', getCardName(cardId));
    alert('我的牌义已保存！');
  },

  markCardLearned(cardId) {
    AppState.cardStatus[cardId] = 'learned';
    // 标记对应的章节完成
    const chapterId = findChapterByCardId(cardId);
    if (chapterId) {
      AppState.chapterProgress[chapterId] = true;
    }
    Storage.save();
    addStudyLog('完成学习', getCardName(cardId));

    // 按钮变灰，显示已完成
    const btn = document.getElementById('btn-mark-card-learned');
    if (btn) {
      btn.textContent = '已学习 ✓';
      btn.className = 'btn btn-secondary';
      btn.disabled = true;
      btn.style.opacity = '0.6';
      btn.style.cursor = 'default';
    }

    // 更新地图
    Renderer._updateMapIfVisible();
  },

  // ---------- 78张牌 ----------
  cards() {
    const container = document.getElementById('cardsContent');
    let html = `
      <div style="margin-bottom:16px;">
        <p style="font-size:13px;color:var(--text-secondary);">共 ${TarotCards.length} 张牌 · 点击进入学习</p>
      </div>
      <div class="card-grid">
    `;

    TarotCards.forEach(card => {
      const status = getCardStatus(card.id);
      const statusLabel = getCardStatusLabel(status);
      html += `
        <div class="card-grid-item" onclick="Router.navigate('course',{cardId:'${card.id}'})">
          <div class="card-number">${card.number} · ${card.category}</div>
          <div class="card-name">${card.name}</div>
          <div><span class="card-status-indicator" style="background:${getStatusColor(status)}"></span></div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${statusLabel}</div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;
  },

  // ---------- 我的牌义库 ----------
  myMeaning() {
    const container = document.getElementById('myMeaningContent');
    let html = '<div class="my-meaning-library">';

    TarotCards.forEach(card => {
      const my = AppState.myMeanings[card.id];
      const hasContent = my && (my.myKeywords || my.myUnderstanding);
      const status = getCardStatus(card.id);
      const statusLabel = getCardStatusLabel(status);

      html += `
        <div class="card-entry" onclick="Router.navigate('course',{cardId:'${card.id}'})">
          <div class="card-entry-header">
            <div>
              <h4>${card.number}. ${card.name} <span style="font-size:12px;color:var(--text-muted);font-weight:400;">${card.nameEn}</span></h4>
              ${hasContent ? `<p style="font-size:12px;color:var(--text-secondary);margin-top:4px;">关键词：${my.myKeywords || '（未填写）'}</p>` 
                : '<p style="font-size:12px;color:var(--text-muted);">尚未记录个人牌义</p>'}
            </div>
            <span class="status ${getCardStatusClass(status)}">${statusLabel}</span>
          </div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;
  },

  // ---------- 小测试 ----------
  quiz(params) {
    const container = document.getElementById('quizContent');
    const chapterId = params && params.chapterId ? params.chapterId : null;
    const phaseId = params && params.phaseId ? params.phaseId : null;

    if (phaseId) {
      // 阶段综合测试
      const questions = getPhaseComprehensiveTest(phaseId);
      if (questions.length === 0) {
        container.innerHTML = `
          <p style="color:var(--text-muted);">该阶段暂无综合测试题。</p>
          <button class="btn btn-secondary mt-16" onclick="Router.navigate('quiz')">返回测试列表</button>
        `;
        return;
      }
      this._renderQuiz(questions, phaseId, true);
    } else if (chapterId) {
      // 章节测试
      const questions = getChapterQuizzes(chapterId);
      if (questions.length === 0) {
        container.innerHTML = `
          <p style="color:var(--text-muted);">该章节暂无测试题。</p>
          <button class="btn btn-secondary mt-16" onclick="Router.navigate('map')">返回学习地图</button>
        `;
        return;
      }
      this._renderQuiz(questions, chapterId, false);
    } else {
      // 显示所有可用的测试
      let html = `
        <p style="font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:12px;">阶段综合测试</p>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:24px;">
      `;
      Courses.phases.forEach(phase => {
        const qs = getPhaseComprehensiveTest(phase.id);
        if (qs.length > 0) {
          const recordKey = 'comprehensive_' + phase.id;
          const done = AppState.quizRecords[recordKey];
          const phaseNames = { 'phase-1': '阶段一', 'phase-2': '阶段二', 'phase-3': '阶段三', 'phase-4': '阶段四' };
          html += `
            <div class="card" style="cursor:pointer;padding:14px 20px;border-left:3px solid var(--accent);" onclick="Router.navigate('quiz',{phaseId:'${phase.id}'})">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <div>
                  <strong>${phaseNames[phase.id] || phase.name} 综合测试</strong>
                  <p style="font-size:12px;color:var(--text-muted);">${qs.length} 题 · 覆盖该阶段所有知识点</p>
                </div>
                ${done ? `<span style="font-size:13px;color:var(--accent);font-weight:600;">${done.score}分</span>` 
                  : '<span style="font-size:12px;color:var(--gold);">未完成</span>'}
              </div>
            </div>
          `;
        }
      });
      html += '</div>';

      // 章节测试
      html += `
        <p style="font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:12px;">章节测试</p>
        <div style="display:flex;flex-direction:column;gap:8px;">
      `;
      Courses.phases.forEach(phase => {
        phase.chapters.forEach(ch => {
          const qs = getChapterQuizzes(ch.id);
          if (qs.length > 0) {
            const done = AppState.quizRecords[ch.id];
            html += `
              <div class="card" style="cursor:pointer;padding:14px 20px;" onclick="Router.navigate('quiz',{chapterId:'${ch.id}'})">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div>
                    <strong>${ch.name}</strong>
                    <p style="font-size:12px;color:var(--text-muted);">${qs.length} 题</p>
                  </div>
                  ${done ? `<span style="font-size:13px;color:var(--accent);font-weight:600;">${done.score}分</span>` 
                    : '<span style="font-size:12px;color:var(--gold);">未完成</span>'}
                </div>
              </div>
            `;
          }
        });
      });
      html += '</div>';
      container.innerHTML = html;
    }
  },

  _renderQuiz(questions, id, isComprehensive) {
    const container = document.getElementById('quizContent');
    const recordKey = isComprehensive ? 'comprehensive_' + id : id;
    container.innerHTML = `
      <div id="quizContainer">
        ${isComprehensive ? '<div style="margin-bottom:12px;"><span class="phase-label" style="background:var(--accent);color:white;">综合测试</span></div>' : ''}
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">共 ${questions.length} 题</p>
        <div id="quizQuestions"></div>
        <div style="margin-top:20px;text-align:center;">
          <button class="btn btn-primary" id="submitQuizBtn" onclick="Renderer.submitQuiz('${recordKey}', ${isComprehensive})">提交答案</button>
        </div>
      </div>
      <div id="quizResult" style="display:none;"></div>
    `;

    const qContainer = document.getElementById('quizQuestions');
    qContainer.innerHTML = questions.map((q, idx) => {
      if (q.type === 'open') {
        return `
          <div class="quiz-question" data-index="${idx}">
            <div class="q-number">第 ${idx + 1} 题</div>
            <div class="q-type">开放题</div>
            <div class="q-text">${q.question}</div>
            <textarea id="openAnswer_${idx}" rows="4" style="width:100%;border:1px solid var(--border);border-radius:var(--radius-sm);padding:10px;font-family:var(--font);font-size:13px;resize:vertical;outline:none;" placeholder="写下你的理解..."></textarea>
          </div>
        `;
      } else {
        const letters = ['A', 'B', 'C', 'D'];
        return `
          <div class="quiz-question" data-index="${idx}">
            <div class="q-number">第 ${idx + 1} 题</div>
            <div class="q-type">${q.type === 'scenario' ? '情境题' : '选择题'}</div>
            <div class="q-text">${q.question}</div>
            <div class="quiz-options" id="options_${idx}">
              ${q.options.map((opt, oi) => `
                <div class="quiz-option" data-opt-index="${oi}" onclick="Renderer.selectOption(${idx}, ${oi})">
                  <span class="option-letter">${letters[oi]}</span>
                  <span>${opt}</span>
                </div>
              `).join('')}
            </div>
            <div class="quiz-result" id="result_${idx}" style="display:none;"></div>
          </div>
        `;
      }
    }).join('');

    // 存储答案
    this._quizAnswers = {};
    this._currentQuizQuestions = questions;
  },

  selectOption(questionIdx, optionIdx) {
    this._quizAnswers = this._quizAnswers || {};
    this._quizAnswers[questionIdx] = optionIdx;

    // 更新UI
    const options = document.querySelectorAll(`#options_${questionIdx} .quiz-option`);
    options.forEach((opt, i) => {
      opt.classList.toggle('selected', i === optionIdx);
    });
  },

  submitQuiz(recordKey, isComprehensive) {
    const questions = this._currentQuizQuestions;
    if (!questions) return;

    let correctCount = 0;
    let totalChoice = 0;
    const results = { knowledge: 0, observation: 0, scenario: 0, logic: 0 };
    const dimCounts = { knowledge: 0, observation: 0, scenario: 0, logic: 0 };
    const wrong = [];

    questions.forEach((q, idx) => {
      if (q.type === 'open') {
        // 开放题不做自动判断，记录答案
        const answer = document.getElementById(`openAnswer_${idx}`)?.value || '';
        results.logic += 0.5;
        dimCounts.logic++;
        return;
      }

      const userAnswer = this._quizAnswers[idx];
      totalChoice++;
      const resultEl = document.getElementById(`result_${idx}`);
      const options = document.querySelectorAll(`#options_${idx} .quiz-option`);

      if (userAnswer === undefined) {
        resultEl.style.display = 'block';
        resultEl.className = 'quiz-result wrong';
        resultEl.textContent = '未作答';
        return;
      }

      const isCorrect = userAnswer === q.correct;
      if (isCorrect) {
        correctCount++;
        results.knowledge++;
        dimCounts.knowledge++;
      } else {
        dimCounts.knowledge++;
        wrong.push({
          question: q.question,
          userAnswer: q.options[userAnswer],
          correctAnswer: q.options[q.correct],
          chapterId: recordKey,
          cardId: null
        });
      }

      // 显示结果
      resultEl.style.display = 'block';
      resultEl.className = `quiz-result ${isCorrect ? 'correct' : 'wrong'}`;
      resultEl.textContent = isCorrect ? '✓ 正确！' : `✗ 正确答案：${q.options[q.correct]}`;
      resultEl.innerHTML += `<br><small>${q.explanation || ''}</small>`;

      // 高亮选项
      options.forEach((opt, i) => {
        if (i === q.correct) opt.classList.add('correct');
        else if (i === userAnswer && !isCorrect) opt.classList.add('wrong');
      });

      // 禁用点击
      options.forEach(opt => opt.style.pointerEvents = 'none');
    });

    // 计算得分
    const score = totalChoice > 0 ? Math.round((correctCount / totalChoice) * 100) : 0;

    // 保存记录
    AppState.quizRecords[recordKey] = {
      answers: this._quizAnswers,
      score,
      total: totalChoice,
      correct: correctCount,
      time: new Date().toLocaleString('zh-CN'),
      isComprehensive: !!isComprehensive
    };
    AppState.wrongQuestions.push(...wrong);
    Storage.save();
    const label = isComprehensive ? '综合测试' : '章节测试';
    addStudyLog('完成测试', `${recordKey} (${score}分)`);

    // 显示提交按钮已禁用
    document.getElementById('submitQuizBtn').disabled = true;
    document.getElementById('submitQuizBtn').textContent = '已提交';

    // 显示汇总
    setTimeout(() => this._showQuizSummary(score, totalChoice, correctCount, wrong.length, recordKey, isComprehensive), 500);
  },

  _showQuizSummary(score, total, correct, wrongCount, chapterId, isComprehensive) {
    const resultEl = document.getElementById('quizResult');
    const isLow = score < 60;
    const isMedium = score >= 60 && score < 80;
    const reviewTip = isLow
      ? '得分较低，建议先复习相关章节内容再重新测试。'
      : isMedium
        ? '基础不错，但一些知识点还不够牢固，看看错题回顾一下吧。'
        : '掌握得很好！可以继续学习下一个阶段的内容。';

    resultEl.style.display = 'block';
    resultEl.innerHTML = `
      <div class="quiz-summary">
        <div class="score">${score}</div>
        <div class="score-label">得分（${correct}/${total}）</div>
        <div class="quiz-dimensions">
          <div class="dimension-item">
            <div class="dim-name">知识掌握</div>
            <div class="dim-score" style="color:${score >= 80 ? 'var(--accent)' : score >= 60 ? '#8a6a00' : '#c0392b'}">${score >= 80 ? '优秀' : score >= 60 ? '良好' : '需加强'}</div>
          </div>
          <div class="dimension-item">
            <div class="dim-name">错题数</div>
            <div class="dim-score" style="color:${wrongCount > 0 ? '#c0392b' : 'var(--accent)'}">${wrongCount}</div>
          </div>
        </div>
        <div class="quiz-review-tip" style="margin-top:12px;padding:10px 14px;background:${isLow ? '#fef0f0' : isMedium ? '#fef9e7' : '#eafaf1'};border-radius:var(--radius-sm);font-size:13px;color:var(--text-secondary);">
          ${reviewTip}
        </div>
        ${wrongCount > 0 ? '<p style="font-size:13px;color:var(--text-secondary);margin-top:8px;">错题已自动加入错题库，可以在"我的记录"中查看。</p>' : ''}
        <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
          ${isComprehensive
            ? `<button class="btn btn-primary" onclick="Router.navigate('quiz')">返回测试列表</button>`
            : `<button class="btn btn-primary" onclick="Router.navigate('map')">返回学习地图</button>`
          }
          <button class="btn btn-secondary" onclick="Renderer.quiz({${isComprehensive ? "phaseId:'" + chapterId.replace('comprehensive_', '') + "'" : "chapterId:'" + chapterId + "'"}})">重新测试</button>
          ${wrongCount > 0 ? '<button class="btn btn-secondary" onclick="Router.navigate(\'records\')">查看错题</button>' : ''}
        </div>
      </div>
    `;
  },

  // ---------- 实战演练 ----------
  practice(params) {
    const container = document.getElementById('practiceContent');

    if (params && params.caseId) {
      this._renderPracticeCase(params.caseId);
      return;
    }

    // 随机案例按钮
    let html = `
      <div class="safety-tip">
        <span class="safety-icon">&#9888;</span>
        实战案例是虚构的练习场景，用于训练解读技巧。在现实生活中，切勿将塔罗解读作为重大决策的唯一依据。
      </div>
      <div style="margin-bottom:20px;text-align:center;">
        <button class="btn btn-primary" onclick="Renderer._startRandomPractice()" style="font-size:15px;padding:12px 28px;">
          🎲 随机抽取一个案例
        </button>
      </div>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">或选择一个案例进行解读训练：</p>
    `;

    Cases.forEach(c => {
      const completed = AppState.practiceCompleted[c.id];
      const clues = c.character.publicClues;
      html += `
        <div class="case-card" style="cursor:pointer;" onclick="Renderer._renderPracticeCase('${c.id}')">
          <div class="case-header">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <h3 class="case-title">${c.title}</h3>
              ${completed ? '<span style="font-size:12px;color:var(--accent);font-weight:600;">已完成</span>' 
                : '<span class="phase-label" style="background:var(--gold);">未完成</span>'}
            </div>
            <div class="case-meta">${c.source} · ${c.difficulty}</div>
          </div>
          <p style="font-size:13px;color:var(--text-secondary);">${clues.age} · ${clues.identity}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  _startRandomPractice() {
    const completedIds = Object.keys(AppState.practiceCompleted);
    const available = Cases.filter(c => !completedIds.includes(c.id));
    if (available.length === 0) {
      alert('所有案例已完成！你可以重新分析已完成的案例。');
    }
    const pool = available.length > 0 ? available : Cases;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    this._renderPracticeCase(pick.id);
  },

  _renderPracticeCase(caseId) {
    const c = Cases.find(c => c.id === caseId);
    if (!c) return;

    const container = document.getElementById('practiceContent');
    const userAnalysis = AppState.practiceRecords[caseId];
    const hasSubmitted = !!userAnalysis;
    const hasRevealed = hasSubmitted && userAnalysis.revealed;
    const clues = c.character.publicClues;

    // 引导提示
    const guidePrompt = `
      <div style="margin:16px 0;padding:12px 16px;background:var(--bg-primary);border-radius:var(--radius-sm);border-left:3px solid var(--accent);">
        <h4 style="font-size:14px;font-weight:600;margin-bottom:6px;">分析引导</h4>
        <p style="font-size:12px;color:var(--text-secondary);margin-bottom:8px;">
          试着从以下角度分析这组牌：
        </p>
        <ol style="font-size:12px;color:var(--text-secondary);padding-left:18px;margin:0;">
          <li style="margin-bottom:4px;"><strong>单牌理解</strong>：每张牌的核心含义是什么？结合位置解释</li>
          <li style="margin-bottom:4px;"><strong>情境对应</strong>：牌义如何对应人物的具体处境？</li>
          <li style="margin-bottom:4px;"><strong>问题意识</strong>：牌回答了人物的什么问题？</li>
          <li style="margin-bottom:4px;"><strong>牌间关系</strong>：牌与牌之间的逻辑关系是什么？</li>
          <li style="margin-bottom:4px;"><strong>整体叙事</strong>：把这些牌串成一个完整的故事</li>
        </ol>
      </div>
    `;

    // 详细反馈（仅在已提交且已揭晓时显示）
    const detailedFeedbackHtml = hasSubmitted && hasRevealed && c.referenceAnalysis.detailedFeedback ? `
      <div class="feedback-section">
        <h4 style="margin-bottom:12px;color:var(--accent-dark);">详细反馈</h4>

        ${c.referenceAnalysis.detailedFeedback.alignment ? `
        <div class="feedback-group">
          <h5 class="feedback-heading good">✅ 你判断正确的地方</h5>
          ${c.referenceAnalysis.detailedFeedback.alignment.map(item => `
            <div class="feedback-item">${item.text}</div>
          `).join('')}
        </div>
        ` : ''}

        ${c.referenceAnalysis.detailedFeedback.partial ? `
        <div class="feedback-group">
          <h5 class="feedback-heading partial">⚠️ 部分正确的地方</h5>
          ${c.referenceAnalysis.detailedFeedback.partial.map(item => `
            <div class="feedback-item">${item.text}</div>
          `).join('')}
        </div>
        ` : ''}

        ${c.referenceAnalysis.detailedFeedback.mismatch ? `
        <div class="feedback-group">
          <h5 class="feedback-heading mismatch">❌ 判断偏差</h5>
          ${c.referenceAnalysis.detailedFeedback.mismatch.map(item => `
            <div class="feedback-item">${item.text}</div>
          `).join('')}
        </div>
        ` : ''}

        ${c.referenceAnalysis.detailedFeedback.missed ? `
        <div class="feedback-group">
          <h5 class="feedback-heading missed">🕳️ 你遗漏的内容</h5>
          ${c.referenceAnalysis.detailedFeedback.missed.map(item => `
            <div class="feedback-item">${item.text}</div>
          `).join('')}
        </div>
        ` : ''}

        ${c.referenceAnalysis.detailedFeedback.connections ? `
        <div class="feedback-group">
          <h5 class="feedback-heading connection">🔗 你忽略的牌间关系</h5>
          ${c.referenceAnalysis.detailedFeedback.connections.map(item => `
            <div class="feedback-item">${item.text}</div>
          `).join('')}
        </div>
        ` : ''}

        ${c.referenceAnalysis.detailedFeedback.tips ? `
        <div class="feedback-group">
          <h5 class="feedback-heading tip">💡 下一次可以尝试的思路</h5>
          ${c.referenceAnalysis.detailedFeedback.tips.map(item => `
            <div class="feedback-item">${item.text}</div>
          `).join('')}
        </div>
        ` : ''}
      </div>
    ` : '';

    container.innerHTML = `
      <div class="case-card">
        <div class="case-header">
          <h3 class="case-title">${c.title}</h3>
          <div class="case-meta">${c.source} · ${c.difficulty}</div>
        </div>

        <div class="case-character">
          <h4>人物背景</h4>
          <p><strong>${clues.age}</strong>，${clues.identity}</p>
          <h4 style="margin-top:10px;">当前处境</h4>
          <p>${clues.situation}</p>
          <h4 style="margin-top:8px;">重要关系</h4>
          <p>${clues.keyRelations}</p>
          <h4 style="margin-top:8px;">已表现出的行为与情绪</h4>
          <p>${clues.manifested}</p>
          <h4 style="margin-top:10px;">人物问题</h4>
          <p><strong>"${clues.problem}"</strong></p>
        </div>

        <div style="margin:12px 0;">
          <h4 style="margin-bottom:8px;">牌阵：${c.spread.name}</h4>
          ${c.spread.positions.map((pos, i) => `
            <div class="case-spread-item">
              <span class="pos-name">${pos.name}</span>
              <span class="pos-desc">${pos.description}</span>
              <span style="margin-left:auto;font-size:12px;color:var(--accent);font-weight:600;">${getCardName(c.cards[i])}</span>
            </div>
          `).join('')}
        </div>

        ${!hasSubmitted ? `
          ${guidePrompt}
          <div style="margin:16px 0;">
            <h4 style="margin-bottom:8px;">你的分析</h4>
            <p style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">先自己分析，再提交查看参考答案：</p>
            <textarea id="userAnalysisInput" rows="8" style="width:100%;border:1px solid var(--border);border-radius:var(--radius-sm);padding:10px;font-family:var(--font);font-size:13px;resize:vertical;outline:none;" placeholder="写下你的解读..."></textarea>
            <div style="margin-top:10px;display:flex;gap:10px;">
              <button class="btn btn-primary" onclick="Renderer.submitPractice('${caseId}')">提交分析</button>
              <button class="btn btn-secondary" onclick="Renderer.showReference('${caseId}')">直接查看参考分析</button>
            </div>
          </div>
        ` : ''}

        <div id="referenceAnalysis" style="display:${hasSubmitted ? 'block' : 'none'};">
          <!-- 用户分析（已提交） -->
          ${hasSubmitted ? `
            <div style="margin:16px 0;padding:16px;background:var(--bg-primary);border-radius:var(--radius-sm);">
              <h4 style="margin-bottom:8px;">你的分析</h4>
              <p style="font-size:13px;color:var(--text-secondary);white-space:pre-wrap;">${userAnalysis.analysis}</p>
              <p style="font-size:11px;color:var(--text-muted);margin-top:8px;">提交时间：${userAnalysis.time}</p>
            </div>
          ` : ''}

          <!-- 揭晓人物按钮（已提交但未揭晓） -->
          ${hasSubmitted && !hasRevealed ? `
            <div style="margin:16px 0;text-align:center;">
              <button class="btn btn-primary" onclick="Renderer.revealIdentity('${caseId}')" style="font-size:15px;padding:12px 28px;">
                🔓 揭晓人物
              </button>
              <p style="font-size:12px;color:var(--text-muted);margin-top:6px;">提交分析后即可揭晓人物真实身份</p>
            </div>
          ` : ''}

          <!-- 揭晓区（已揭晓） -->
          ${hasRevealed ? `
            <div class="reveal-section">
              <h4 style="margin-bottom:12px;color:var(--accent-dark);">人物真实身份</h4>
              <div class="reveal-identity">
                <p><strong>人物真实身份：</strong>${c.character.realName}</p>
                <p><strong>作品：</strong>${c.character.work}</p>
                <p><strong>作者 / 导演：</strong>${c.character.author}</p>
              </div>
              <div style="margin-top:12px;padding:12px 16px;background:var(--bg-primary);border-radius:var(--radius-sm);">
                <h5 style="margin-bottom:6px;">原作背景</h5>
                <p style="font-size:13px;color:var(--text-secondary);">${c.character.background}</p>
                ${c.character.hiddenInfo && c.character.hiddenInfo.note ? `
                  <p style="font-size:13px;color:var(--text-secondary);margin-top:8px;">${c.character.hiddenInfo.note}</p>
                ` : ''}
              </div>
            </div>

            <!-- 参考分析 -->
            <h4 style="margin:16px 0 12px;color:var(--accent-dark);">参考分析</h4>
            <div class="reference-analysis">
              ${c.referenceAnalysis.singleCard.map(item => `
                <h5>${item.position}（${getCardName(item.cardId)}）</h5>
                <p>${item.analysis}</p>
              `).join('')}
              <h5 style="margin-top:16px;">牌间关系</h5>
              <p>${c.referenceAnalysis.combination}</p>
              <h5 style="margin-top:16px;">整体叙事</h5>
              <p>${c.referenceAnalysis.overallNarrative}</p>
            </div>

            <!-- 评分维度 -->
            <h4 style="margin:16px 0 8px;">评分维度</h4>
            <div class="reference-analysis">
              <p><strong>单牌理解：</strong>${c.referenceAnalysis.scoring.singleCard}</p>
              <p><strong>情境对应：</strong>${c.referenceAnalysis.scoring.scenario}</p>
              <p><strong>问题意识：</strong>${c.referenceAnalysis.scoring.question}</p>
              <p><strong>牌间关系：</strong>${c.referenceAnalysis.scoring.relationship}</p>
              <p><strong>整体叙事：</strong>${c.referenceAnalysis.scoring.narrative}</p>
            </div>

            <!-- 详细反馈 -->
            ${detailedFeedbackHtml}
          ` : ''}

          <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn btn-secondary" onclick="Router.navigate('practice')">返回案例列表</button>
            ${hasSubmitted ? '<button class="btn btn-secondary" onclick="Renderer.resetPractice(\'' + caseId + '\')">重新分析</button>' : ''}
          </div>
        </div>
      </div>
    `;
  },

  submitPractice(caseId) {
    const analysis = document.getElementById('userAnalysisInput').value;
    if (!analysis.trim()) {
      alert('请先写下你的分析。');
      return;
    }

    AppState.practiceRecords[caseId] = {
      analysis,
      time: new Date().toLocaleString('zh-CN'),
      revealed: false
    };
    AppState.practiceCompleted[caseId] = true;
    Storage.save();
    addStudyLog('完成实战', Cases.find(c => c.id === caseId)?.title || caseId);

    this._renderPracticeCase(caseId);
  },

  revealIdentity(caseId) {
    if (AppState.practiceRecords[caseId]) {
      AppState.practiceRecords[caseId].revealed = true;
      Storage.save();
      addStudyLog('揭晓人物', Cases.find(c => c.id === caseId)?.title || caseId);
    }
    this._renderPracticeCase(caseId);
  },

  showReference(caseId) {
    document.getElementById('referenceAnalysis').style.display = 'block';
  },

  // 实战自我评估：星星评分
  _pendingRatings: {},

  rateDimension(caseId, dim, value) {
    if (!this._pendingRatings[caseId]) this._pendingRatings[caseId] = {};
    this._pendingRatings[caseId][dim] = value;

    // 更新星星的UI
    const container = document.querySelector(`.star-rating[data-dim="${dim}"]`);
    if (container) {
      container.querySelectorAll('.star').forEach(star => {
        const sv = parseInt(star.dataset.value);
        star.style.color = sv <= value ? '#f1c40f' : '#ddd';
      });
    }
  },

  saveSelfAssessment(caseId) {
    const ratings = this._pendingRatings[caseId];
    if (!ratings || Object.keys(ratings).length < 5) {
      alert('请对全部5个维度进行评分。');
      return;
    }

    if (AppState.practiceRecords[caseId]) {
      AppState.practiceRecords[caseId].selfAssessment = ratings;
      Storage.save();
      addStudyLog('完成自我评估', Cases.find(c => c.id === caseId)?.title || caseId);
    }

    this._renderPracticeCase(caseId);
  },

  resetPractice(caseId) {
    delete AppState.practiceRecords[caseId];
    delete AppState.practiceCompleted[caseId];
    this._pendingRatings[caseId] = {};
    Storage.save();
    this._renderPracticeCase(caseId);
  },

  // ---------- 我的记录 ----------
  records() {
    const container = document.getElementById('recordsContent');
    const logs = AppState.studyLogs;
    const wrong = AppState.wrongQuestions;
    const quizRecords = AppState.quizRecords;
    const practiceRecords = AppState.practiceRecords;
    const reviewInfo = getComprehensiveReviewSuggestions();

    container.innerHTML = `
      ${reviewInfo.hasWeakness ? `
        <div class="card" style="margin-bottom:16px;padding:14px 18px;border-left:3px solid #e67e22;">
          <h3 style="font-size:14px;font-weight:600;margin-bottom:6px;color:#e67e22;">复习建议</h3>
          <p style="font-size:13px;color:var(--text-secondary);margin-bottom:8px;">${reviewInfo.message}</p>
          ${reviewInfo.cardsToReview.length > 0 ? `
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              ${reviewInfo.cardsToReview.map(cardId => {
                const card = getCardById(cardId);
                return card ? `<button class="btn btn-secondary btn-sm" onclick="Router.navigate('course',{cardId:'${card.id}'})">复习 ${card.name}</button>` : '';
              }).join('')}
            </div>
          ` : `
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('records')">查看错题</button>
          `}
        </div>
      ` : wrong.length > 0 ? `
        <div class="card" style="margin-bottom:16px;padding:14px 18px;border-left:3px solid var(--accent);">
          <h3 style="font-size:14px;font-weight:600;margin-bottom:6px;color:var(--accent);">学习状态</h3>
          <p style="font-size:13px;color:var(--text-secondary);">共 ${wrong.length} 道错题，建议定期回顾巩固。</p>
          <button class="btn btn-secondary btn-sm mt-8" onclick="document.getElementById('wrongSection').scrollIntoView({behavior:'smooth'})">查看错题</button>
        </div>
      ` : ''}

      <div style="margin-bottom:20px;">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:8px;">学习记录</h3>
        ${logs.length > 0 ? `
          <ul class="record-list">
            ${logs.slice(0, 20).map(log => `
              <li>
                <span>${log.action} ${log.detail}</span>
                <span class="record-time">${log.time}</span>
              </li>
            `).join('')}
          </ul>
        ` : '<p style="font-size:13px;color:var(--text-muted);">暂无学习记录</p>'}
      </div>

      <div style="margin-bottom:20px;">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:8px;">测试记录</h3>
        ${Object.keys(quizRecords).length > 0 ? `
          <ul class="record-list">
            ${Object.entries(quizRecords).map(([chId, rec]) => {
              const chName = findChapterName(chId);
              const scoreColor = rec.score >= 80 ? 'var(--accent)' : rec.score >= 60 ? '#8a6a00' : '#c0392b';
              return `<li><span>${chName}</span><span style="color:${scoreColor};font-weight:600;">${rec.score}分</span> <span class="record-time">${rec.time}</span></li>`;
            }).join('')}
          </ul>
        ` : '<p style="font-size:13px;color:var(--text-muted);">暂无测试记录</p>'}
      </div>

      <div id="wrongSection" style="margin-bottom:20px;">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:8px;">错题集 (${wrong.length})</h3>
        ${wrong.length > 0 ? `
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${wrong.slice(-10).reverse().map((w, i) => `
              <div class="card" style="padding:12px 16px;">
                <p style="font-size:13px;font-weight:600;margin-bottom:4px;">${w.question}</p>
                <p style="font-size:12px;color:#c0392b;">你的答案：${w.userAnswer}</p>
                <p style="font-size:12px;color:var(--accent);">正确答案：${w.correctAnswer}</p>
              </div>
            `).join('')}
          </div>
          ${wrong.length > 10 ? '<p style="font-size:12px;color:var(--text-muted);margin-top:8px;">仅显示最近10条，共' + wrong.length + '条</p>' : ''}
        ` : '<p style="font-size:13px;color:var(--text-muted);">暂无错题，继续保持！</p>'}
      </div>

      <div style="margin-bottom:20px;">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:8px;">实战记录</h3>
        ${Object.keys(practiceRecords).length > 0 ? `
          <ul class="record-list">
            ${Object.entries(practiceRecords).map(([caseId, rec]) => {
              const c = Cases.find(c => c.id === caseId);
              return `<li><span>${c ? c.title : caseId}</span><span class="record-time">${rec.time}</span></li>`;
            }).join('')}
          </ul>
        ` : '<p style="font-size:13px;color:var(--text-muted);">暂无实战记录</p>'}
      </div>
    `;
  },

  // ---------- 学习进度 ----------
  progress() {
    const container = document.getElementById('progressContent');
    const totalProgress = getTotalProgress();
    const totalCards = TarotCards.length;
    const learnedCards = Object.values(AppState.cardStatus).filter(s => s === 'learned' || s === 'familiar' || s === 'mastered').length;
    const quizCount = Object.keys(AppState.quizRecords).length;
    const practiceCount = Object.keys(AppState.practiceCompleted).length;
    const wrongCount = AppState.wrongQuestions.length;

    // 计算各阶段进度
    let phaseHtml = '';
    Courses.phases.forEach(phase => {
      const p = getPhaseProgress(phase.id);
      const total = phase.chapters.length;
      const done = phase.chapters.filter(ch => AppState.chapterProgress[ch.id]).length;
      phaseHtml += `
        <div class="dashboard-item" style="margin-bottom:8px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="font-size:13px;font-weight:500;">${phase.name}</span>
            <span style="font-size:12px;color:var(--text-muted);">${done}/${total}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width:${p}%"></div>
          </div>
        </div>
      `;
    });

    // 牌状态
    let cardStatusHtml = '';
    const statusCounts = { unlearned: 0, learning: 0, learned: 0, familiar: 0, mastered: 0 };
    TarotCards.forEach(c => {
      const s = getCardStatus(c.id);
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });

    container.innerHTML = `
      <div class="progress-grid">
        <div class="progress-stat">
          <div class="stat-number">${totalProgress}%</div>
          <div class="stat-label">总体完成度</div>
        </div>
        <div class="progress-stat">
          <div class="stat-number">${learnedCards}/${totalCards}</div>
          <div class="stat-label">已学牌数</div>
        </div>
        <div class="progress-stat">
          <div class="stat-number">${quizCount}</div>
          <div class="stat-label">测试次数</div>
        </div>
        <div class="progress-stat">
          <div class="stat-number">${practiceCount}</div>
          <div class="stat-label">实战次数</div>
        </div>
      </div>

      <div class="card" style="margin-top:20px;">
        <h3 class="card-title">阶段进度</h3>
        ${phaseHtml}
      </div>

      <div class="card" style="margin-top:16px;">
        <h3 class="card-title">牌学习状态</h3>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:8px;">
          <span style="font-size:12px;color:#999;">未学习: ${statusCounts.unlearned}</span>
          <span style="font-size:12px;color:#8a6a00;">学习中: ${statusCounts.learning}</span>
          <span style="font-size:12px;color:#2d6a2d;">已学习: ${statusCounts.learned}</span>
          <span style="font-size:12px;color:#2d6a8a;">熟悉: ${statusCounts.familiar}</span>
          <span style="font-size:12px;color:#6a2d8a;">掌握: ${statusCounts.mastered}</span>
        </div>
      </div>

      ${wrongCount > 0 ? `
        <div class="card" style="margin-top:16px;">
          <h3 class="card-title">薄弱环节</h3>
          <p class="card-text">错题总数：${wrongCount}。建议回到错题相关的章节进行复习。</p>
          <button class="btn btn-secondary btn-sm mt-8" onclick="Router.navigate('records')">查看错题</button>
        </div>
      ` : ''}

      ${totalProgress > 0 && totalProgress < 100 ? `
        <div class="card" style="margin-top:16px;padding:14px 18px;background:var(--bg-primary);">
          <h3 class="card-title">学习建议</h3>
          <p style="font-size:13px;color:var(--text-secondary);margin-bottom:8px;">
            ${totalProgress < 30
              ? '刚开始学习塔罗，建议先完成基础阶段（阶段一）的课程，建立塔罗的整体认知框架。'
              : totalProgress < 60
                ? '已经掌握了基础概念，现在可以开始系统学习大阿卡那牌。建议每学一张牌，就做一次小测试巩固。'
                : '进展不错！可以尝试做综合测试来检验学习成果，然后进入实战演练环节。'
            }
          </p>
          <button class="btn btn-primary btn-sm" onclick="Router.navigate('map')">继续学习</button>
        </div>
      ` : ''}
    `;
  }
};

// ==================== 辅助函数 ====================
function getCurrentPhase() {
  for (const phase of Courses.phases) {
    const allDone = phase.chapters.every(ch => AppState.chapterProgress[ch.id]);
    if (!allDone) return phase.name;
  }
  return '全部完成';
}

function findChapterByCardId(cardId) {
  for (const phase of Courses.phases) {
    for (const ch of phase.chapters) {
      if (ch.type === 'card' && ch.cardId === cardId) {
        return ch.id;
      }
    }
  }
  return null;
}

function findChapterName(chapterId) {
  // 处理综合测试
  if (chapterId.startsWith('comprehensive_')) {
    const phaseId = chapterId.replace('comprehensive_', '');
    const phaseNames = { 'phase-1': '阶段一综合测试', 'phase-2': '阶段二综合测试', 'phase-3': '阶段三综合测试', 'phase-4': '阶段四综合测试' };
    return phaseNames[phaseId] || chapterId;
  }
  for (const phase of Courses.phases) {
    for (const ch of phase.chapters) {
      if (ch.id === chapterId) return ch.name;
    }
  }
  return chapterId;
}

function getStatusColor(status) {
  const map = {
    unlearned: '#ddd',
    learning: '#f0ad4e',
    learned: '#5cb85c',
    familiar: '#5bc0de',
    mastered: '#8e44ad'
  };
  return map[status] || '#ddd';
}

// ==================== 牌面SVG生成 ====================
function getCardImageSrc(cardId) {
  // 优先使用 CARD_IMAGES (Base64 嵌入，自包含 HTML 模式)
  if (typeof CARD_IMAGES !== 'undefined' && CARD_IMAGES[cardId]) {
    return CARD_IMAGES[cardId];
  }
  // 回退到文件路径 (开发模式)
  const base = 'images/cards/';
  const majorMap = {
    fool:'00_Fool.jpg',magician:'01_Magician.jpg','high-priestess':'02_High_Priestess.jpg',
    empress:'03_Empress.jpg',emperor:'04_Emperor.jpg',hierophant:'05_Hierophant.jpg',
    lovers:'06_Lovers.jpg',chariot:'07_Chariot.jpg',strength:'08_Strength.jpg',
    hermit:'09_Hermit.jpg','wheel-of-fortune':'10_Wheel_of_Fortune.jpg',justice:'11_Justice.jpg',
    'hanged-man':'12_Hanged_Man.jpg',death:'13_Death.jpg',temperance:'14_Temperance.jpg',
    devil:'15_Devil.jpg',tower:'16_Tower.jpg',star:'17_Star.jpg',
    moon:'18_Moon.jpg',sun:'19_Sun.jpg',judgement:'20_Judgement.jpg',world:'21_World.jpg'
  };
  const suitMap = {wands:'Wands',cups:'Cups',swords:'Swords',pentacles:'Pents'};
  const rankMap = {ace:'01','2':'02','3':'03','4':'04','5':'05','6':'06','7':'07','8':'08','9':'09','10':'10',page:'11',knight:'12',queen:'13',king:'14'};
  if (majorMap[cardId]) return base + majorMap[cardId];
  const m = cardId.match(/^(wands|cups|swords|pentacles)-(.+)$/);
  if (m && suitMap[m[1]] && rankMap[m[2]]) return base + suitMap[m[1]] + rankMap[m[2]] + '.jpg';
  return null;
}

function getCardSVG(cardId) {
  const src = getCardImageSrc(cardId);
  if (src) {
    return `<img src="${src}" alt="" class="card-real-image" loading="lazy" onclick="openCardFullscreen('${cardId}')">`;
  }
  return '<div style="padding:100px 0;text-align:center;color:var(--text-muted);">牌面暂缺</div>';
}

// ==================== 全屏牌面查看 (手机端) ====================
function openCardFullscreen(cardId) {
  const src = getCardImageSrc(cardId);
  if (!src) return;
  const overlay = document.getElementById('cardFullscreen');
  const img = document.getElementById('cardFullscreenImage');
  const nameEl = document.getElementById('cardFullscreenName');
  img.src = src;
  const card = getCardById(cardId);
  nameEl.textContent = card ? card.name : '';
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCardFullscreen() {
  const overlay = document.getElementById('cardFullscreen');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// 全屏缩放手势支持
let fsScale = 1, fsStartDist = 0;
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('cardFullscreen');
  const img = document.getElementById('cardFullscreenImage');
  if (!overlay || !img) return;
  
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay || e.target.classList.contains('card-fullscreen-zoom-hint')) {
      closeCardFullscreen();
    }
  });
  
  // 双指缩放
  overlay.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) {
      fsStartDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }, {passive: true});
  
  overlay.addEventListener('touchmove', function(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      fsScale = Math.max(0.5, Math.min(3, fsScale * (dist / fsStartDist)));
      fsStartDist = dist;
      img.style.transform = 'scale(' + fsScale + ')';
    }
  }, {passive: false});
  
  overlay.addEventListener('touchend', function() {
    if (fsScale < 0.8) { fsScale = 1; img.style.transform = ''; }
  });
});

// ==================== 互动：你会怎么选？====================
function getWhichChoiceOptions(cardId) {
  const options = {
    fool: [
      { text: '你觉得这个机会风险很大，但你心里想去，所以你：', correct: true },
      { text: '因为风险太大，所以你选择不去，找一个更稳定的机会', correct: false },
      { text: '完全不考虑风险，直接冲上去再说', correct: false },
      { text: '先征求所有人的意见，他们同意你才去', correct: false }
    ],
    magician: [
      { text: '你拥有所有需要的工具，但是你：', correct: false },
      { text: '你没有工具，所以你无法开始', correct: false },
      { text: '你整理好工具，然后开始行动', correct: true },
      { text: '你等待工具自己创造奇迹', correct: false }
    ],
    'high-priestess': [
      { text: '当理性分析找不到答案时，你：', correct: false },
      { text: '直接放弃，不再思考', correct: false },
      { text: '相信自己的直觉，先按照感觉走', correct: true },
      { text: '继续找更多的数据，强迫自己理性分析', correct: false }
    ],
    empress: [
      { text: '当你感到疲惫时，你通常会：', correct: false },
      { text: '继续硬撑，因为工作不能停', correct: false },
      { text: '找朋友出去喝酒放松', correct: false },
      { text: '花时间照顾自己，让自己自然恢复', correct: true }
    ],
    emperor: [
      { text: '当你的生活越来越混乱时，你会：', correct: false },
      { text: '接受混乱，顺其自然', correct: false },
      { text: '开始建立规则和边界，整理生活秩序', correct: true },
      { text: '抱怨别人把生活弄乱了', correct: false }
    ],
    lovers: [
      { text: '当你面临人生重大选择时，你最看重：', correct: false },
      { text: '什么选择最安全', correct: false },
      { text: '什么选择最赚钱', correct: false },
      { text: '什么选择最符合我的内心价值观', correct: true }
    ],
    chariot: [
      { text: '当你内心充满矛盾，左右为难时，你会：', correct: false },
      { text: '干脆停下来，不做任何决定', correct: false },
      { text: '用意志力强迫自己选择一个方向前进', correct: true },
      { text: '任由矛盾把你拉扯住', correct: false }
    ],
    strength: [
      { text: '当你感到很愤怒，想发脾气时，你会：', correct: false },
      { text: '忍不住直接爆发出来', correct: false },
      { text: '压抑愤怒，不让别人看出来', correct: false },
      { text: '理解自己的愤怒，然后温柔而坚定地表达出来', correct: true }
    ],
    hermit: [
      { text: '当你感到迷茫时，你通常会：', correct: false },
      { text: '马上问朋友和家人', correct: false },
      { text: '花点时间独处，问问自己内心真正想要什么', correct: true },
      { text: '上网搜答案，看别人怎么说', correct: false }
    ],
    'wheel-of-fortune': [
      { text: '当你运气不好，事事不顺时，你会：', correct: false },
      { text: '相信这只是命运之轮的一个周期，耐心等待它转回来', correct: true },
      { text: '抱怨命运不公平', correct: false },
      { text: '觉得自己就是倒霉，放弃努力', correct: false }
    ]
  };
  return options[cardId] || [];
}

Renderer.selectWhichChoice = function(cardId, optionIdx) {
  const options = getWhichChoiceOptions(cardId);
  const container = document.getElementById(`whichChoice_${cardId}`);
  const result = document.getElementById(`whichChoiceResult_${cardId}`);
  
  container.querySelectorAll('.quiz-option').forEach((opt, i) => {
    opt.classList.toggle('selected', i === optionIdx);
    if (i === optionIdx) {
      if (options[i].correct) {
        opt.classList.add('correct');
        result.style.display = 'block';
        result.className = 'quiz-result correct';
        result.textContent = '✓ 这个选择最符合这张牌的核心能量！';
      } else {
        opt.classList.add('wrong');
        const correctIdx = options.findIndex(o => o.correct);
        container.children[correctIdx].classList.add('correct');
        result.style.display = 'block';
        result.className = 'quiz-result wrong';
        result.textContent = `✗ 正确答案是：${options[correctIdx].text}`;
      }
    }
  });
};

// ==================== 互动：同一张牌，不同问题 =====================
function getDifferentQuestions(cardId) {
  const questions = {
    fool: [
      '如果问题是："我该不该辞职去旅行？"，愚人会怎么说？',
      '如果问题是："我现在开始学习一个新领域，太晚了吗？"，愚人会怎么说？'
    ],
    magician: [
      '如果问题是："我现在能开始这个项目吗？"，魔术师会怎么说？',
      '如果问题是："我缺少资源能做成这件事吗？"，魔术师会怎么说？'
    ],
    'high-priestess': [
      '如果问题是："我该不该相信这个感觉？"，女祭司会怎么说？',
      '如果问题是："这件事有什么我没看到的？"，女祭司会怎么说？'
    ],
    empress: [
      '如果问题是："我现在需要休息还是继续努力？"，皇后会怎么说？',
      '如果问题是："我最近很焦虑，该怎么办？"，皇后会怎么说？'
    ],
    emperor: [
      '如果问题是："我需要设立边界吗？"，皇帝会怎么说？',
      '如果问题是："我的生活太混乱了，第一步该做什么？"，皇帝会怎么说？'
    ],
    lovers: [
      '如果问题是："我该选择A还是B？"，恋人会怎么说？',
      '如果问题是："这段关系对我来说是对的吗？"，恋人会怎么说？'
    ],
    chariot: [
      '如果问题是："我应该继续坚持吗？"，战车会怎么说？',
      '如果问题是："我感到内心矛盾，该怎么办？"，战车会怎么说？'
    ],
    strength: [
      '如果问题是："我能应对这个挑战吗？"，力量会怎么说？',
      '如果问题是："我对某人很生气，该怎么办？"，力量会怎么说？'
    ],
    hermit: [
      '如果问题是："这个答案是什么？"，隐士会怎么说？',
      '如果问题："我最近社交太多感到疲惫，该怎么办？"，隐士会怎么说？'
    ],
    'wheel-of-fortune': [
      '如果问题是："这件事会有好结果吗？"，命运之轮会怎么说？',
      '如果问题是："我最近一直倒霉，该怎么办？"，命运之轮会怎么说？'
    ]
  };
  return questions[cardId] || [];
}

Renderer.saveDifferentQuestions = function(cardId) {
  // 收集所有回答并保存
  const questions = getDifferentQuestions(cardId);
  const saved = {};
  questions.forEach(q => {
    const id = `dq_${cardId}_${encodeURIComponent(q).slice(0,30)}`;
    const el = document.getElementById(id);
    if (el && el.value.trim()) {
      saved[q] = el.value;
    }
  });
  if (Object.keys(saved).length > 0) {
    AppState.myMeanings[cardId + '_differentQuestions'] = saved;
    Storage.save();
    document.getElementById(`dqSaved_${cardId}`).style.display = 'block';
  }
};

// ==================== 数据导入导出 ====================
function exportData() {
  const json = Storage.exportJSON();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tarot_learning_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const success = Storage.importJSON(e.target.result);
    if (success) {
      alert('数据导入成功！页面将刷新。');
      location.reload();
    }
  }
reader.readAsText(file);
}

// ==================== 侧边栏切换 (手机端) ====================
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  sidebar.classList.toggle('open');
  backdrop.classList.toggle('active');
}

// ==================== 初始化 ====================
Storage.load();
Router.init();

// 确保数据定期保存
setInterval(() => Storage.save(), 30000);