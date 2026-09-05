// 课程结构数据
const Courses = {
  phases: [
    {
      id: 'phase-1',
      name: '阶段一：塔罗基础',
      description: '了解塔罗是什么、78张牌的结构、四大元素、正逆位等基础知识',
      progress: 0,
      chapters: [
        {
          id: 'ch-1-1',
          name: '塔罗是什么',
          description: '了解塔罗的起源、结构和用途',
          type: 'article',
          content: `<h3>塔罗不是占卜，而是一面镜子</h3>
          <p>很多人认为塔罗是"算命"的工具——抽一张牌，看看未来会发生什么。但塔罗真正的价值不在于"预测"，而在于"反映"。</p>
          <p>塔罗牌就像一面镜子，它不告诉你"会发生什么"，而是帮助你看到：<br>
          - 你目前处于什么状态<br>
          - 你有哪些资源可以利用<br>
          - 你可能忽略了什么<br>
          - 不同的选择会带来什么不同的可能性</p>
          <p>简单来说，塔罗是一个"思考框架"——它用图像和象征帮助你看清楚自己的处境。</p>
          <h4>百年韦特塔罗</h4>
          <p>你使用的牌组是"百年韦特塔罗"（Rider-Waite-Smith），由亚瑟·韦特设计、潘蜜拉·史密斯绘制，1910年首次出版。它的特点是：</p>
          <ul>
            <li><strong>所有牌都有画面</strong>——之前的塔罗牌小阿卡那只有数字符号，韦特塔罗给每张牌都画了场景</li>
            <li><strong>图像富含象征</strong>——每张牌的颜色、人物、物体、背景都有特定含义</li>
            <li><strong>适合学习</strong>——因为画面本身就在讲故事，不需要死记硬背</li>
          </ul>
          <h4>塔罗能做什么？</h4>
          <ul>
            <li>帮助你从不同角度看待问题</li>
            <li>激发你的直觉和创造力</li>
            <li>训练你的观察力和联想能力</li>
            <li>提供一个结构化的思考框架</li>
          </ul>
          <h4>塔罗不能做什么？</h4>
          <ul>
            <li>不能替代专业医疗、法律、财务建议</li>
            <li>不能"决定"你的重大人生选择</li>
            <li>不能100%"预测"未来</li>
          </ul>
          <blockquote>塔罗不是告诉你答案，而是帮助你找到自己的答案。</blockquote>`,
          completed: false
        },
        {
          id: 'ch-1-2',
          name: '78张牌的结构',
          description: '了解大阿卡那和小阿卡那的区别',
          type: 'article',
          content: `<h3>78张牌的整体结构</h3>
          <p>一副完整的塔罗牌共78张，分为两大部分：</p>
          <h4>大阿卡那（Major Arcana）——22张</h4>
          <p>编号0~21，每张牌都有独特的名字和主题。大阿卡那代表人生中的"重大事件"或"灵魂旅程"。</p>
          <p>例如：愚人（0）代表新的开始，死神（13）代表结束和转变，世界（21）代表完成和圆满。</p>
          <p>大阿卡那的旅程就像一部"英雄之旅"——从愚人的出发，到世界的完成。</p>
          <h4>小阿卡那（Minor Arcana）——56张</h4>
          <p>分为四组（权杖、圣杯、宝剑、星币），每组14张：</p>
          <ul>
            <li>数字牌（Ace~10）：10张，代表日常生活中的具体事件</li>
            <li>宫廷牌（Page、Knight、Queen、King）：4张，代表人物或人格特质</li>
          </ul>
          <p>简单理解：<br>
          - 大阿卡那 = 人生的"重要章节"<br>
          - 小阿卡那 = 日常生活中的"具体场景"</p>`,
          completed: false
        },
        {
          id: 'ch-1-3',
          name: '四大元素',
          description: '了解权杖、圣杯、宝剑、星币的象征意义',
          type: 'article',
          content: `<h3>四大元素</h3>
          <p>四组小阿卡那分别对应四大元素：</p>
          <div class="element-grid">
            <div class="element-card fire">
              <h4>🔥 权杖</h4>
              <p><strong>元素：火</strong></p>
              <p><strong>代表：</strong>行动、热情、创造力、冒险</p>
              <p><strong>生活场景：</strong>开始一个新项目、追求梦想、充满干劲</p>
              <p><strong>过度时：</strong>冲动、急躁、三分钟热度</p>
            </div>
            <div class="element-card water">
              <h4>💧 圣杯</h4>
              <p><strong>元素：水</strong></p>
              <p><strong>代表：</strong>情感、直觉、关系、感受</p>
              <p><strong>生活场景：</strong>恋爱、友谊、情绪波动、创造力</p>
              <p><strong>过度时：</strong>情绪化、依赖、逃避现实</p>
            </div>
            <div class="element-card air">
              <h4>🌬️ 宝剑</h4>
              <p><strong>元素：风</strong></p>
              <p><strong>代表：</strong>思想、理性、沟通、挑战</p>
              <p><strong>生活场景：</strong>做决定、分析问题、面对困难</p>
              <p><strong>过度时：</strong>过度分析、焦虑、言语伤人</p>
            </div>
            <div class="element-card earth">
              <h4>🌍 星币</h4>
              <p><strong>元素：土</strong></p>
              <p><strong>代表：</strong>物质、工作、金钱、健康</p>
              <p><strong>生活场景：</strong>工作、理财、身体保养、日常生活</p>
              <p><strong>过度时：</strong>物质主义、固执、缺乏想象力</p>
            </div>
          </div>
          <p><strong>如何记忆：</strong></p>
          <ul>
            <li>权杖（火）= 做什么（行动）</li>
            <li>圣杯（水）= 感觉什么（情感）</li>
            <li>宝剑（风）= 想什么（思想）</li>
            <li>星币（土）= 拥有什么（物质）</li>
          </ul>`,
          completed: false
        },
        {
          id: 'ch-1-4',
          name: '数字牌与宫廷牌',
          description: '了解小阿卡那的结构规律',
          type: 'article',
          content: `<h3>数字牌的规律</h3>
          <p>小阿卡那的Ace~10有内在的"数字逻辑"：</p>
          <ul>
            <li><strong>Ace（1）</strong>：新的开始、种子</li>
            <li><strong>2</strong>：平衡、选择、关系</li>
            <li><strong>3</strong>：成长、扩张、合作</li>
            <li><strong>4</strong>：稳定、停滞、休息</li>
            <li><strong>5</strong>：冲突、挑战、失去</li>
            <li><strong>6</strong>：恢复、和谐、分享</li>
            <li><strong>7</strong>：评估、坚持、策略</li>
            <li><strong>8</strong>：行动、速度、掌握</li>
            <li><strong>9</strong>：完成、满足、孤独</li>
            <li><strong>10</strong>：结束、圆满、过度</li>
          </ul>
          <p>这个规律可以帮助你理解"权杖2"和"宝剑2"虽然画面不同，但都涉及"选择"的主题。</p>
          <h4>宫廷牌</h4>
          <p>宫廷牌代表"人物"或"人格特质"：</p>
          <ul>
            <li><strong>Page（侍从）</strong>：学生、新手、探索者</li>
            <li><strong>Knight（骑士）</strong>：行动者、追求者、冒险者</li>
            <li><strong>Queen（王后）</strong>：成熟的、内在的、滋养的</li>
            <li><strong>King（国王）</strong>：权威的、外在的、掌控的</li>
          </ul>
          <p>例如，"权杖骑士"代表充满热情地追求目标，"圣杯王后"代表情感成熟和直觉敏锐。</p>`,
          completed: false
        },
        {
          id: 'ch-1-5',
          name: '正位与逆位',
          description: '理解正位和逆位的区别',
          type: 'article',
          content: `<h3>正位与逆位</h3>
          <p>当牌抽出来是正立的（正位）和倒立的（逆位），含义会有所不同。</p>
          <p><strong>⚠️ 重要提醒：</strong>正位≠好，逆位≠坏。</p>
          <p>正位和逆位的关系更像是：</p>
          <ul>
            <li><strong>正位</strong>：牌的能量以"正常"的方式表达</li>
            <li><strong>逆位</strong>：牌的能量被"扭曲"、"过度"或"不足"</li>
          </ul>
          <p><strong>例子：</strong></p>
          <p>皇帝牌正位：建立秩序、承担责任</p>
          <p>皇帝牌逆位：可能是专制（过度），也可能是该承担责任时退缩了（不足）</p>
          <p>所以逆位表达的往往是"同一个能量的不同面向"。</p>
          <h4>如何理解逆位？</h4>
          <ul>
            <li>能量被阻塞：牌的能量无法正常表达</li>
            <li>过度：牌的能量太强，超出了适度范围</li>
            <li>不足：牌的能量太弱，未能发挥作用</li>
            <li>内在化：牌的能量正在内在层面运作</li>
            <li>需要重新审视：这个领域需要重新调整</li>
          </ul>`,
          completed: false
        },
        {
          id: 'ch-1-6',
          name: '牌阵',
          description: '了解常见的牌阵及其用途',
          type: 'article',
          content: `<h3>牌阵</h3>
          <p>牌阵是塔罗解读中"牌的位置安排"。每张牌的位置决定了它回答什么问题。</p>
          <h4>常见牌阵：</h4>
          <div class="spread-card">
            <h5>单张牌</h5>
            <p>最简单的牌阵。适合问"今天的状态"或"一个问题的核心"。一张牌，一个答案。</p>
          </div>
          <div class="spread-card">
            <h5>三张牌（过去-现在-未来）</h5>
            <p>最常用的牌阵之一。第一张代表过去的影响，第二张代表现在的状态，第三张代表未来的发展。</p>
          </div>
          <div class="spread-card">
            <h5>凯尔特十字</h5>
            <p>经典的多牌牌阵（10张），深入分析复杂问题。涵盖：现状、挑战、过去、未来、上/下（意识/潜意识）、建议、环境影响、希望与恐惧、最终结果。</p>
          </div>
          <p>牌阵的本质是"提问的结构"——不同的牌阵就是不同的提问方式。</p>`,
          completed: false
        },
        {
          id: 'ch-1-7',
          name: '如何提出问题',
          description: '学习如何提出好的塔罗问题',
          type: 'article',
          content: `<h3>如何提出好的问题</h3>
          <p>塔罗解读的质量，很大程度上取决于你提问的质量。</p>
          <h4>好的问题 vs 不好的问题</h4>
          <div class="question-example bad">
            <p><strong>❌ 不好的问题：</strong>"我会发财吗？"</p>
            <p>为什么：这是一个"是/否"问题，塔罗不适合回答"是/否"。而且"发财"太模糊。</p>
          </div>
          <div class="question-example good">
            <p><strong>✅ 好的问题：</strong>"我目前的工作状态中，什么因素最影响我的收入增长？"</p>
            <p>为什么：这是一个开放性问题，关注的是"因素"和"状态"，有助于找到行动方向。</p>
          </div>
          <h4>提问原则：</h4>
          <ul>
            <li><strong>开放而非封闭</strong>：避免"是/否"问题，用"什么"、"如何"、"为什么"</li>
            <li><strong>关注自己而非他人</strong>：问"我需要知道什么"，而不是"他在想什么"</li>
            <li><strong>具体而非模糊</strong>：问"这个项目需要注意什么"，而不是"我的未来如何"</li>
            <li><strong>可行动而非被动</strong>：问"我可以做什么"，而不是"会发生什么"</li>
          </ul>`,
          completed: false
        }
      ]
    },
    {
      id: 'phase-2',
      name: '阶段二：78张牌',
      description: '系统学习每一张牌的含义，从大阿卡那开始',
      progress: 0,
      chapters: [
        {
          id: 'ch-2-1',
          name: '大阿卡那：愚人（0）',
          description: '学习第一张大阿卡那——愚人',
          type: 'card',
          cardId: 'fool',
          completed: false
        },
        {
          id: 'ch-2-2',
          name: '大阿卡那：魔术师（1）',
          description: '学习魔术师',
          type: 'card',
          cardId: 'magician',
          completed: false
        },
        {
          id: 'ch-2-3',
          name: '大阿卡那：女祭司（2）',
          description: '学习女祭司',
          type: 'card',
          cardId: 'high-priestess',
          completed: false
        },
        {
          id: 'ch-2-4',
          name: '大阿卡那：皇后（3）',
          description: '学习皇后',
          type: 'card',
          cardId: 'empress',
          completed: false
        },
        {
          id: 'ch-2-5',
          name: '大阿卡那：皇帝（4）',
          description: '学习皇帝',
          type: 'card',
          cardId: 'emperor',
          completed: false
        },
        {
          id: 'ch-2-6',
          name: '大阿卡那：恋人（6）',
          description: '学习恋人',
          type: 'card',
          cardId: 'lovers',
          completed: false
        },
        {
          id: 'ch-2-7',
          name: '大阿卡那：战车（7）',
          description: '学习战车',
          type: 'card',
          cardId: 'chariot',
          completed: false
        },
        {
          id: 'ch-2-8',
          name: '大阿卡那：力量（8）',
          description: '学习力量',
          type: 'card',
          cardId: 'strength',
          completed: false
        },
        {
          id: 'ch-2-9',
          name: '大阿卡那：隐士（9）',
          description: '学习隐士',
          type: 'card',
          cardId: 'hermit',
          completed: false
        },
        {
          id: 'ch-2-10',
          name: '大阿卡那：命运之轮（10）',
          description: '学习命运之轮',
          type: 'card',
          cardId: 'wheel-of-fortune',
          completed: false
        }
      ]
    },
    {
      id: 'phase-3',
      name: '阶段三：牌与牌之间',
      description: '学习如何理解牌与牌之间的关系',
      progress: 0,
      chapters: [
        {
          id: 'ch-3-1',
          name: '单牌分析',
          description: '学习如何深度分析一张牌',
          type: 'article',
          content: `<h3>单牌分析</h3>
          <p>在掌握多张牌组合之前，先学会深入分析一张牌。</p>
          <h4>单牌分析方法：</h4>
          <ol>
            <li><strong>观察画面</strong>：先看画面，不要看书。你看到了什么？</li>
            <li><strong>感受能量</strong>：这张牌给你什么感觉？温暖、冷峻、平静、紧张？</li>
            <li><strong>识别象征</strong>：识别画面中的象征元素及其含义</li>
            <li><strong>联系问题</strong>：这张牌如何回答你的问题？</li>
            <li><strong>展开联想</strong>：这张牌让你联想到生活中的什么？</li>
          </ol>
          <p>重要原则：先观察，再查书。先有自己的理解，再参考标准牌义。</p>`,
          completed: false
        },
        {
          id: 'ch-3-2',
          name: '牌的组合',
          description: '学习如何理解多张牌之间的互动',
          type: 'article',
          content: `<h3>牌的组合</h3>
          <p>当多张牌一起出现时，它们不是孤立的，而是相互影响的。</p>
          <h4>常见的牌间关系：</h4>
          <ul>
            <li><strong>元素关系</strong>：火+水=冲突？火+土=创造？</li>
            <li><strong>数字关系</strong>：愚人（0）+死神（13）=某种结束后的全新开始？</li>
            <li><strong>画面关系</strong>：一张牌的人物看向另一张牌的方向？</li>
            <li><strong>主题关系</strong>：多张牌是否指向同一个主题？</li>
          </ul>
          <p>组合解读的关键是"讲故事"——把多张牌串成一个连贯的故事。</p>`,
          completed: false
        }
      ]
    },
    {
      id: 'phase-4',
      name: '阶段四：实战解读',
      description: '将所学知识应用到实际解读中',
      progress: 0,
      chapters: [
        {
          id: 'ch-4-1',
          name: '解读流程',
          description: '系统化的解读步骤',
          type: 'article',
          content: `<h3>解读流程</h3>
          <ol>
            <li><strong>理解问题</strong>：明确问题是什么，拆解问题</li>
            <li><strong>选择牌阵</strong>：根据问题选择合适的牌阵</li>
            <li><strong>抽牌</strong>：集中注意力，抽取牌</li>
            <li><strong>单牌分析</strong>：依次分析每张牌</li>
            <li><strong>牌间关系</strong>：分析牌与牌之间的联系</li>
            <li><strong>整体叙事</strong>：把所有牌串成一个故事</li>
            <li><strong>回答原问题</strong>：回到最初的问题，给出回答</li>
            <li><strong>复盘</strong>：记录和分析自己的解读</li>
          </ol>
          <p>这个流程不是固定不变的，但初学者可以按照这个流程建立自己的解读习惯。</p>`,
          completed: false
        }
      ]
    },
    // ====== 阶段五：牌阵学习 ======
    {
      id: 'phase-spread',
      name: '牌阵学习',
      description: '经典牌阵详解，含位置图示、含义说明和完整案例',
      progress: 0,
      chapters: [
        {
          id: 'ch-spread-1',
          name: '单张牌阵',
          description: '最简单也最聚焦的牌阵',
          type: 'spread',
          content: `<h3>单张牌阵</h3>
          <p>单张牌阵是最基础的牌阵，适合回答聚焦、具体的问题。</p>

          <h4>牌阵布局</h4>
          <div style="text-align:center;margin:16px 0;">
            <svg viewBox="0 0 200 280" style="max-width:200px;width:100%;">
              <rect x="25" y="20" width="150" height="240" rx="8" fill="#faf8f4" stroke="#b8976a" stroke-width="2"/>
              <text x="100" y="100" text-anchor="middle" font-size="14" fill="#2c2c2c">🃏</text>
              <text x="100" y="130" text-anchor="middle" font-size="13" font-weight="bold" fill="#2d4a3e">第1张牌</text>
              <text x="100" y="150" text-anchor="middle" font-size="11" fill="#6b6b6b">回答你的问题</text>
              <line x1="50" y1="180" x2="150" y2="180" stroke="#ddd6cb" stroke-width="1"/>
              <text x="100" y="200" text-anchor="middle" font-size="11" fill="#6b6b6b">位置：核心答案</text>
            </svg>
          </div>

          <h4>适合的问题</h4>
          <ul>
            <li>"我今天最需要注意什么？"</li>
            <li>"这个决定的核心是什么？"</li>
            <li>"我现在最需要什么？"</li>
            <li>"这件事的整体能量是什么？"</li>
          </ul>

          <h4>解读方法</h4>
          <ol>
            <li>明确问题，问题越具体，答案越清晰</li>
            <li>抽一张牌，先看画面给你的第一印象</li>
            <li>问自己：这张牌如何回答我的问题？</li>
            <li>不要照搬牌义，要结合问题语境</li>
          </ol>

          <div class="case-study">
            <h5>案例</h5>
            <p><strong>问题：</strong>"我今天最需要注意什么？"</p>
            <p><strong>抽出牌：</strong>星币ACE</p>
            <p><strong>解读：</strong>星币代表物质、现实、工作，ACE代表新开始。放在"今天最需要关注"的问题下，提示：今天需要关注实际的工作计划，如果有拖延的任务，今天就是开始的好时机。</p>
          </div>

          <div class="practice-box">
            <h5>练习</h5>
            <p>抽一张牌，回答"我现在最需要关注什么？"</p>
            <p>写下你的解读，注意：不要复制标准牌义，它必须回答你的问题。</p>
          </div>`,
          completed: false
        },
        {
          id: 'ch-spread-2',
          name: '二张牌阵',
          description: '对比、因果、选择',
          type: 'spread',
          content: `<h3>二张牌阵</h3>
          <p>两张牌之间的关系比它们各自的意义更重要。常见的有对比、因果、选择三种类型。</p>

          <h4>牌阵布局</h4>
          <div style="text-align:center;margin:16px 0;">
            <svg viewBox="0 0 400 200" style="max-width:400px;width:100%;">
              <rect x="10" y="10" width="160" height="180" rx="8" fill="#faf8f4" stroke="#b8976a" stroke-width="2"/>
              <text x="90" y="70" text-anchor="middle" font-size="14" fill="#2c2c2c">🃏</text>
              <text x="90" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#2d4a3e">牌A</text>
              <text x="90" y="120" text-anchor="middle" font-size="11" fill="#6b6b6b">原因/优势/选择A</text>
              <text x="90" y="165" text-anchor="middle" font-size="10" fill="#999">位置1</text>
              <line x1="180" y1="50" x2="210" y2="100" stroke="#b8976a" stroke-width="1.5" stroke-dasharray="4,3"/>
              <line x1="180" y1="150" x2="210" y2="100" stroke="#b8976a" stroke-width="1.5" stroke-dasharray="4,3"/>
              <text x="195" y="95" text-anchor="middle" font-size="10" fill="#b8976a">关系</text>
              <rect x="220" y="10" width="160" height="180" rx="8" fill="#faf8f4" stroke="#b8976a" stroke-width="2"/>
              <text x="300" y="70" text-anchor="middle" font-size="14" fill="#2c2c2c">🃏</text>
              <text x="300" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#2d4a3e">牌B</text>
              <text x="300" y="120" text-anchor="middle" font-size="11" fill="#6b6b6b">结果/挑战/选择B</text>
              <text x="300" y="165" text-anchor="middle" font-size="10" fill="#999">位置2</text>
            </svg>
          </div>

          <div class="comparison-table">
            <div class="comparison-col">
              <h5>对比型</h5>
              <p>A vs B，两个选择、两个方向。适合"该选哪个"类问题。</p>
            </div>
            <div class="comparison-col">
              <h5>因果型</h5>
              <p>A是原因，B是结果。适合"为什么会这样"类问题。</p>
            </div>
            <div class="comparison-col">
              <h5>发展型</h5>
              <p>A到B的变化过程。适合"发展如何"类问题。</p>
            </div>
          </div>

          <h4>核心问题</h4>
          <p><strong>"这两张牌放在一起说明了什么？"</strong> 不要分别解释两张牌就结束。</p>

          <div class="bad-example">
            <p><strong>❌ 错误：</strong>"权杖ACE代表新开始，圣杯二代表合作。所以新开始和合作。"</p>
            <p>两张牌分别解释，没有关系。</p>
          </div>
          <div class="good-example">
            <p><strong>✅ 正确：</strong>"权杖ACE（新开始）+ 圣杯二（合作）→ 这个新开始需要以合作的方式推进。不是一个人埋头干，而是寻找伙伴、建立平等关系。"</p>
          </div>

          <div class="practice-box">
            <h5>练习</h5>
            <p>抽两张牌，放在"优势"和"挑战"位置。回答：这两张牌放在一起说明了什么？</p>
          </div>`,
          completed: false
        },
        {
          id: 'ch-spread-3',
          name: '三张牌阵',
          description: '最灵活、最常用的牌阵',
          type: 'spread',
          content: `<h3>三张牌阵</h3>
          <p>三张牌是最常用的牌阵，位置可以灵活设定，不限于"过去/现在/未来"。</p>

          <h4>常见布局方案</h4>
          <div style="text-align:center;margin:16px 0;">
            <svg viewBox="0 0 540 200" style="max-width:540px;width:100%;">
              <rect x="10" y="10" width="150" height="180" rx="8" fill="#faf8f4" stroke="#b8976a" stroke-width="2"/>
              <text x="85" y="70" text-anchor="middle" font-size="14" fill="#2c2c2c">🃏</text>
              <text x="85" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#2d4a3e">位置1</text>
              <text x="85" y="120" text-anchor="middle" font-size="10" fill="#6b6b6b">过去/原因/现状</text>
              <text x="85" y="175" text-anchor="middle" font-size="10" fill="#b8976a">━━━→</text>
              <rect x="195" y="10" width="150" height="180" rx="8" fill="#faf8f4" stroke="#b8976a" stroke-width="2"/>
              <text x="270" y="70" text-anchor="middle" font-size="14" fill="#2c2c2c">🃏</text>
              <text x="270" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#2d4a3e">位置2</text>
              <text x="270" y="120" text-anchor="middle" font-size="10" fill="#6b6b6b">现在/核心/现状</text>
              <text x="270" y="175" text-anchor="middle" font-size="10" fill="#b8976a">━━━→</text>
              <rect x="380" y="10" width="150" height="180" rx="8" fill="#faf8f4" stroke="#b8976a" stroke-width="2"/>
              <text x="455" y="70" text-anchor="middle" font-size="14" fill="#2c2c2c">🃏</text>
              <text x="455" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#2d4a3e">位置3</text>
              <text x="455" y="120" text-anchor="middle" font-size="10" fill="#6b6b6b">未来/建议/发展</text>
            </svg>
          </div>

          <h4>位置方案（可自定义）</h4>
          <div class="comparison-table">
            <div class="comparison-col">
              <h5>方案一</h5>
              <p><strong>原因 / 现状 / 建议</strong></p>
              <p>适合"我该怎么办"类问题</p>
            </div>
            <div class="comparison-col">
              <h5>方案二</h5>
              <p><strong>目标 / 阻碍 / 行动</strong></p>
              <p>适合目标导向的问题</p>
            </div>
            <div class="comparison-col">
              <h5>方案三</h5>
              <p><strong>我 / 对方 / 关系</strong></p>
              <p>适合人际关系问题</p>
            </div>
            <div class="comparison-col">
              <h5>方案四</h5>
              <p><strong>现状 / 核心问题 / 发展</strong></p>
              <p>适合深入分析的问题</p>
            </div>
          </div>

          <h4>三张牌的关键：形成完整叙事</h4>
          <div class="bad-example">
            <p><strong>❌ 错误：</strong>"星币五代表匮乏，权杖七代表竞争，星星代表希望。"</p>
            <p>三个独立的关键词，没有叙事。</p>
          </div>
          <div class="good-example">
            <p><strong>✅ 正确：</strong>"过去你感到资源不足（星币五），这导致你进入了需要维护自己位置的竞争状态（权杖七）。但建议牌是星星——不要只盯着眼前竞争，找到内心信念。三张牌形成了'困境→应对→出路'的完整叙事。"</p>
          </div>

          <div class="practice-box">
            <h5>练习</h5>
            <p>抽取三张牌，自行设定位置（不用固定过去/现在/未来）。回答：</p>
            <ol>
              <li>为什么这个问题需要这三个位置？</li>
              <li>每张牌在各自位置上的含义是什么？</li>
              <li>三张牌形成了一个什么故事？</li>
            </ol>
          </div>`,
          completed: false
        },
        {
          id: 'ch-spread-4',
          name: '凯尔特十字',
          description: '最经典的10张牌阵，全面分析复杂问题',
          type: 'spread',
          content: `<h3>凯尔特十字（Celtic Cross）</h3>
          <p>凯尔特十字是最经典的塔罗牌阵之一，10张牌覆盖了时间、空间、心理、环境等多个维度，适合深入分析复杂问题。</p>

          <h4>牌阵布局</h4>
          <div style="text-align:center;margin:16px 0;">
            <svg viewBox="0 0 500 520" style="max-width:500px;width:100%;">
              <!-- 十字部分 -->
              <rect x="185" y="10" width="70" height="90" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="220" y="45" text-anchor="middle" font-size="10" fill="#2c2c2c">1 现状</text>
              <text x="220" y="65" text-anchor="middle" font-size="10" fill="#6b6b6b">当前核心</text>
              <rect x="185" y="110" width="70" height="90" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5" stroke-dasharray="3,2"/>
              <text x="220" y="145" text-anchor="middle" font-size="10" fill="#2c2c2c">2 挑战</text>
              <text x="220" y="165" text-anchor="middle" font-size="10" fill="#6b6b6b">交叉/阻碍</text>
              <rect x="105" y="60" width="70" height="90" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="140" y="95" text-anchor="middle" font-size="10" fill="#2c2c2c">3 过去</text>
              <text x="140" y="115" text-anchor="middle" font-size="10" fill="#6b6b6b">近期影响</text>
              <rect x="265" y="60" width="70" height="90" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="300" y="95" text-anchor="middle" font-size="10" fill="#2c2c2c">4 未来</text>
              <text x="300" y="115" text-anchor="middle" font-size="10" fill="#6b6b6b">即将到来</text>
              <rect x="105" y="210" width="70" height="90" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="140" y="245" text-anchor="middle" font-size="10" fill="#2c2c2c">5 上方</text>
              <text x="140" y="265" text-anchor="middle" font-size="10" fill="#6b6b6b">意识/目标</text>
              <rect x="265" y="210" width="70" height="90" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="300" y="245" text-anchor="middle" font-size="10" fill="#2c2c2c">6 下方</text>
              <text x="300" y="265" text-anchor="middle" font-size="10" fill="#6b6b6b">潜意识</text>
              <!-- 右侧列 -->
              <rect x="10" y="330" width="70" height="90" rx="6" fill="#faf8f4" stroke="#d4b88c" stroke-width="1.5"/>
              <text x="45" y="365" text-anchor="middle" font-size="10" fill="#2c2c2c">7 建议</text>
              <text x="45" y="385" text-anchor="middle" font-size="10" fill="#6b6b6b">如何应对</text>
              <rect x="90" y="330" width="70" height="90" rx="6" fill="#faf8f4" stroke="#d4b88c" stroke-width="1.5"/>
              <text x="125" y="365" text-anchor="middle" font-size="10" fill="#2c2c2c">8 环境</text>
              <text x="125" y="385" text-anchor="middle" font-size="10" fill="#6b6b6b">外部影响</text>
              <rect x="170" y="330" width="70" height="90" rx="6" fill="#faf8f4" stroke="#d4b88c" stroke-width="1.5"/>
              <text x="205" y="365" text-anchor="middle" font-size="10" fill="#2c2c2c">9 希望/恐惧</text>
              <text x="205" y="385" text-anchor="middle" font-size="10" fill="#6b6b6b">内心</text>
              <rect x="250" y="330" width="70" height="90" rx="6" fill="#faf8f4" stroke="#d4b88c" stroke-width="1.5"/>
              <text x="285" y="365" text-anchor="middle" font-size="10" fill="#2c2c2c">10 结果</text>
              <text x="285" y="385" text-anchor="middle" font-size="10" fill="#6b6b6b">可能结果</text>
              <!-- 连接线 -->
              <line x1="175" y1="105" x2="105" y2="105" stroke="#ddd6cb" stroke-width="1"/>
              <line x1="255" y1="105" x2="265" y2="105" stroke="#ddd6cb" stroke-width="1"/>
              <line x1="175" y1="255" x2="105" y2="255" stroke="#ddd6cb" stroke-width="1"/>
              <line x1="255" y1="255" x2="265" y2="255" stroke="#ddd6cb" stroke-width="1"/>
              <line x1="140" y1="300" x2="45" y2="330" stroke="#ddd6cb" stroke-width="1" stroke-dasharray="3,2"/>
              <line x1="140" y1="300" x2="125" y2="330" stroke="#ddd6cb" stroke-width="1" stroke-dasharray="3,2"/>
              <line x1="300" y1="300" x2="205" y2="330" stroke="#ddd6cb" stroke-width="1" stroke-dasharray="3,2"/>
              <line x1="300" y1="300" x2="285" y2="330" stroke="#ddd6cb" stroke-width="1" stroke-dasharray="3,2"/>
            </svg>
          </div>

          <h4>每个位置的含义</h4>
          <table style="width:100%;border-collapse:collapse;font-size:13px;margin:12px 0;">
            <tr style="background:var(--bg-primary);"><th style="padding:6px 10px;text-align:left;border:1px solid var(--border);">位置</th><th style="padding:6px 10px;text-align:left;border:1px solid var(--border);">含义</th><th style="padding:6px 10px;text-align:left;border:1px solid var(--border);">问什么</th></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--border);">1 现状</td><td style="padding:6px 10px;border:1px solid var(--border);">当前核心状态</td><td style="padding:6px 10px;border:1px solid var(--border);">现在正在发生什么</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--border);">2 挑战</td><td style="padding:6px 10px;border:1px solid var(--border);">交叉/阻碍</td><td style="padding:6px 10px;border:1px solid var(--border);">什么在阻碍你</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--border);">3 过去</td><td style="padding:6px 10px;border:1px solid var(--border);">近期影响</td><td style="padding:6px 10px;border:1px solid var(--border);">什么导致了现在</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--border);">4 未来</td><td style="padding:6px 10px;border:1px solid var(--border);">即将到来</td><td style="padding:6px 10px;border:1px solid var(--border);">发展走向</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--border);">5 上方</td><td style="padding:6px 10px;border:1px solid var(--border);">意识/目标</td><td style="padding:6px 10px;border:1px solid var(--border);">你意识的追求</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--border);">6 下方</td><td style="padding:6px 10px;border:1px solid var(--border);">潜意识</td><td style="padding:6px 10px;border:1px solid var(--border);">你未意识到的因素</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--border);">7 建议</td><td style="padding:6px 10px;border:1px solid var(--border);">如何应对</td><td style="padding:6px 10px;border:1px solid var(--border);">建议怎么做</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--border);">8 环境</td><td style="padding:6px 10px;border:1px solid var(--border);">外部影响</td><td style="padding:6px 10px;border:1px solid var(--border);">周围的人在做什么</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--border);">9 希望/恐惧</td><td style="padding:6px 10px;border:1px solid var(--border);">内心</td><td style="padding:6px 10px;border:1px solid var(--border);">你期待和担心什么</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid var(--border);">10 结果</td><td style="padding:6px 10px;border:1px solid var(--border);">可能结果</td><td style="padding:6px 10px;border:1px solid var(--border);">按当前方向的结果</td></tr>
          </table>

          <h4>设计逻辑</h4>
          <p>凯尔特十字覆盖了四个维度：</p>
          <ul>
            <li><strong>时间</strong>：过去(3) → 现在(1) → 未来(4) → 结果(10)</li>
            <li><strong>空间</strong>：上方(5)意识 → 下方(6)潜意识</li>
            <li><strong>行动</strong>：建议(7) → 如何应对</li>
            <li><strong>心理</strong>：希望与恐惧(9) → 内心驱动力</li>
          </ul>

          <div class="practice-box">
            <h5>练习</h5>
            <p>选择一个你关心的复杂问题，使用凯尔特十字进行完整解读。</p>
            <p>注意：10张牌信息量大，先找核心牌（位置1），再看其他牌如何围绕它展开。</p>
          </div>`,
          completed: false
        },
        {
          id: 'ch-spread-5',
          name: '其他经典牌阵',
          description: '六芒星、马蹄铁、关系牌阵、选择牌阵',
          type: 'spread',
          content: `<h3>其他经典牌阵</h3>
          <p>除了凯尔特十字，还有多种经典牌阵适合不同场景。</p>

          <h4>1. 六芒星牌阵（6张）</h4>
          <div style="text-align:center;margin:16px 0;">
            <svg viewBox="0 0 340 320" style="max-width:340px;width:100%;">
              <!-- 六芒星形状 -->
              <polygon points="170,10 320,80 320,250 170,310 20,250 20,80" fill="none" stroke="#ddd6cb" stroke-width="1" stroke-dasharray="4,3"/>
              <rect x="110" y="20" width="120" height="55" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="170" y="42" text-anchor="middle" font-size="10" fill="#2c2c2c">1 现状</text>
              <text x="170" y="58" text-anchor="middle" font-size="9" fill="#6b6b6b">当前核心</text>
              <rect x="30" y="90" width="120" height="55" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="90" y="112" text-anchor="middle" font-size="10" fill="#2c2c2c">2 挑战</text>
              <text x="90" y="128" text-anchor="middle" font-size="9" fill="#6b6b6b">面临的阻碍</text>
              <rect x="210" y="90" width="120" height="55" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="270" y="112" text-anchor="middle" font-size="10" fill="#2c2c2c">3 内在</text>
              <text x="270" y="128" text-anchor="middle" font-size="9" fill="#6b6b6b">内在因素</text>
              <rect x="30" y="180" width="120" height="55" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="90" y="202" text-anchor="middle" font-size="10" fill="#2c2c2c">4 外在</text>
              <text x="90" y="218" text-anchor="middle" font-size="9" fill="#6b6b6b">外部因素</text>
              <rect x="210" y="180" width="120" height="55" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="270" y="202" text-anchor="middle" font-size="10" fill="#2c2c2c">5 建议</text>
              <text x="270" y="218" text-anchor="middle" font-size="9" fill="#6b6b6b">建议怎么做</text>
              <rect x="110" y="260" width="120" height="55" rx="6" fill="#faf8f4" stroke="#d4b88c" stroke-width="1.5"/>
              <text x="170" y="282" text-anchor="middle" font-size="10" fill="#2c2c2c">6 结果</text>
              <text x="170" y="298" text-anchor="middle" font-size="9" fill="#6b6b6b">可能结果</text>
            </svg>
          </div>
          <p><strong>适合：</strong>需要平衡内外部因素的问题，如"我该不该换工作"</p>
          <p><strong>解读逻辑：</strong>现状(1)→挑战(2)→内在(3)→外在(4)→建议(5)→结果(6)。重点关注内在和外在的对比。</p>

          <h4>2. 马蹄铁牌阵（7张）</h4>
          <div style="text-align:center;margin:16px 0;">
            <svg viewBox="0 0 500 280" style="max-width:500px;width:100%;">
              <rect x="10" y="10" width="60" height="80" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="40" y="38" text-anchor="middle" font-size="10" fill="#2c2c2c">1</text>
              <text x="40" y="55" text-anchor="middle" font-size="9" fill="#6b6b6b">过去</text>
              <rect x="85" y="10" width="60" height="80" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="115" y="38" text-anchor="middle" font-size="10" fill="#2c2c2c">2</text>
              <text x="115" y="55" text-anchor="middle" font-size="9" fill="#6b6b6b">现在</text>
              <rect x="160" y="10" width="60" height="80" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="190" y="38" text-anchor="middle" font-size="10" fill="#2c2c2c">3</text>
              <text x="190" y="55" text-anchor="middle" font-size="9" fill="#6b6b6b">隐藏</text>
              <rect x="235" y="10" width="60" height="80" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="265" y="38" text-anchor="middle" font-size="10" fill="#2c2c2c">4</text>
              <text x="265" y="55" text-anchor="middle" font-size="9" fill="#6b6b6b">阻碍</text>
              <rect x="310" y="10" width="60" height="80" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="340" y="38" text-anchor="middle" font-size="10" fill="#2c2c2c">5</text>
              <text x="340" y="55" text-anchor="middle" font-size="9" fill="#6b6b6b">态度</text>
              <rect x="385" y="10" width="60" height="80" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="415" y="38" text-anchor="middle" font-size="10" fill="#2c2c2c">6</text>
              <text x="415" y="55" text-anchor="middle" font-size="9" fill="#6b6b6b">建议</text>
              <rect x="220" y="120" width="60" height="80" rx="6" fill="#faf8f4" stroke="#d4b88c" stroke-width="1.5"/>
              <text x="250" y="148" text-anchor="middle" font-size="10" fill="#2c2c2c">7</text>
              <text x="250" y="165" text-anchor="middle" font-size="9" fill="#6b6b6b">结果</text>
              <!-- 马蹄铁弧线 -->
              <path d="M40,95 Q250,140 440,95" fill="none" stroke="#ddd6cb" stroke-width="1" stroke-dasharray="4,3"/>
            </svg>
          </div>
          <p><strong>适合：</strong>需要了解事件全貌的问题，从头到尾的完整分析</p>

          <h4>3. 关系牌阵（7张）</h4>
          <div style="text-align:center;margin:16px 0;">
            <svg viewBox="0 0 380 260" style="max-width:380px;width:100%;">
              <rect x="10" y="10" width="100" height="70" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="60" y="38" text-anchor="middle" font-size="10" fill="#2c2c2c">1 你</text>
              <text x="60" y="55" text-anchor="middle" font-size="9" fill="#6b6b6b">你的状态</text>
              <rect x="270" y="10" width="100" height="70" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="320" y="38" text-anchor="middle" font-size="10" fill="#2c2c2c">2 对方</text>
              <text x="320" y="55" text-anchor="middle" font-size="9" fill="#6b6b6b">对方的状态</text>
              <rect x="140" y="10" width="100" height="70" rx="6" fill="#faf8f4" stroke="#d4b88c" stroke-width="1.5"/>
              <text x="190" y="38" text-anchor="middle" font-size="10" fill="#2c2c2c">3 关系</text>
              <text x="190" y="55" text-anchor="middle" font-size="9" fill="#6b6b6b">你们之间的</text>
              <rect x="10" y="110" width="100" height="70" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="60" y="138" text-anchor="middle" font-size="10" fill="#2c2c2c">4 你想要的</text>
              <text x="60" y="155" text-anchor="middle" font-size="9" fill="#6b6b6b">你的期待</text>
              <rect x="270" y="110" width="100" height="70" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="320" y="138" text-anchor="middle" font-size="10" fill="#2c2c2c">5 对方想要的</text>
              <text x="320" y="155" text-anchor="middle" font-size="9" fill="#6b6b6b">对方的期待</text>
              <rect x="10" y="200" width="100" height="55" rx="6" fill="#faf8f4" stroke="#d4b88c" stroke-width="1.5"/>
              <text x="60" y="225" text-anchor="middle" font-size="10" fill="#2c2c2c">6 建议</text>
              <text x="60" y="240" text-anchor="middle" font-size="9" fill="#6b6b6b">给你的建议</text>
              <rect x="270" y="200" width="100" height="55" rx="6" fill="#faf8f4" stroke="#d4b88c" stroke-width="1.5"/>
              <text x="320" y="225" text-anchor="middle" font-size="10" fill="#2c2c2c">7 发展</text>
              <text x="320" y="240" text-anchor="middle" font-size="9" fill="#6b6b6b">关系走向</text>
            </svg>
          </div>
          <p><strong>适合：</strong>感情、友谊、家庭等关系类问题</p>

          <h4>4. 选择牌阵（5张）</h4>
          <div style="text-align:center;margin:16px 0;">
            <svg viewBox="0 0 500 200" style="max-width:500px;width:100%;">
              <rect x="10" y="10" width="100" height="70" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="60" y="38" text-anchor="middle" font-size="10" fill="#2c2c2c">1 核心</text>
              <text x="60" y="55" text-anchor="middle" font-size="9" fill="#6b6b6b">问题核心</text>
              <rect x="140" y="10" width="100" height="70" rx="6" fill="#faf8f4" stroke="#d4b88c" stroke-width="1.5"/>
              <text x="190" y="38" text-anchor="middle" font-size="10" fill="#2c2c2c">2 选择A</text>
              <text x="190" y="55" text-anchor="middle" font-size="9" fill="#6b6b6b">A的走向</text>
              <rect x="270" y="10" width="100" height="70" rx="6" fill="#faf8f4" stroke="#d4b88c" stroke-width="1.5"/>
              <text x="320" y="38" text-anchor="middle" font-size="10" fill="#2c2c2c">3 选择B</text>
              <text x="320" y="55" text-anchor="middle" font-size="9" fill="#6b6b6b">B的走向</text>
              <rect x="140" y="110" width="100" height="70" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="190" y="138" text-anchor="middle" font-size="10" fill="#2c2c2c">4 建议</text>
              <text x="190" y="155" text-anchor="middle" font-size="9" fill="#6b6b6b">建议怎么做</text>
              <rect x="270" y="110" width="100" height="70" rx="6" fill="#faf8f4" stroke="#b8976a" stroke-width="1.5"/>
              <text x="320" y="138" text-anchor="middle" font-size="10" fill="#2c2c2c">5 提醒</text>
              <text x="320" y="155" text-anchor="middle" font-size="9" fill="#6b6b6b">需要注意什么</text>
            </svg>
          </div>
          <p><strong>适合：</strong>在两个选项之间做选择的问题</p>

          <div class="practice-box">
            <h5>练习</h5>
            <p>选择一个你感兴趣的问题，从以上牌阵中选一个最合适的，进行完整解读。</p>
            <p>包括：问题、背景、为什么选择这个牌阵、每个位置和牌面、完整解读。</p>
          </div>`,
          completed: false
        },
        {
          id: 'ch-spread-6',
          name: '如何选择牌阵 & 综合练习',
          description: '根据问题类型选择最合适的牌阵',
          type: 'spread',
          content: `<h3>如何选择牌阵</h3>
          <p>不同的牌阵适合不同的问题。选择牌阵的关键是：<strong>你想知道什么？</strong></p>

          <h4>牌阵选择指南</h4>
          <table style="width:100%;border-collapse:collapse;font-size:13px;margin:12px 0;">
            <tr style="background:var(--bg-primary);"><th style="padding:8px 10px;text-align:left;border:1px solid var(--border);">你的问题</th><th style="padding:8px 10px;text-align:left;border:1px solid var(--border);">推荐牌阵</th><th style="padding:8px 10px;text-align:left;border:1px solid var(--border);">牌数</th></tr>
            <tr><td style="padding:8px 10px;border:1px solid var(--border);">简单聚焦的问题</td><td style="padding:8px 10px;border:1px solid var(--border);">单张牌阵</td><td style="padding:8px 10px;border:1px solid var(--border);">1</td></tr>
            <tr><td style="padding:8px 10px;border:1px solid var(--border);">两个选择之间犹豫</td><td style="padding:8px 10px;border:1px solid var(--border);">二张牌阵/选择牌阵</td><td style="padding:8px 10px;border:1px solid var(--border);">2-5</td></tr>
            <tr><td style="padding:8px 10px;border:1px solid var(--border);">"我该怎么办"</td><td style="padding:8px 10px;border:1px solid var(--border);">三张牌（原因/现状/建议）</td><td style="padding:8px 10px;border:1px solid var(--border);">3</td></tr>
            <tr><td style="padding:8px 10px;border:1px solid var(--border);">关系问题</td><td style="padding:8px 10px;border:1px solid var(--border);">三张牌（我/对方/关系）或关系牌阵</td><td style="padding:8px 10px;border:1px solid var(--border);">3-7</td></tr>
            <tr><td style="padding:8px 10px;border:1px solid var(--border);">复杂/重大问题</td><td style="padding:8px 10px;border:1px solid var(--border);">凯尔特十字</td><td style="padding:8px 10px;border:1px solid var(--border);">10</td></tr>
            <tr><td style="padding:8px 10px;border:1px solid var(--border);">需要平衡内外因素</td><td style="padding:8px 10px;border:1px solid var(--border);">六芒星牌阵</td><td style="padding:8px 10px;border:1px solid var(--border);">6</td></tr>
            <tr><td style="padding:8px 10px;border:1px solid var(--border);">了解事件全貌</td><td style="padding:8px 10px;border:1px solid var(--border);">马蹄铁牌阵</td><td style="padding:8px 10px;border:1px solid var(--border);">7</td></tr>
            <tr><td style="padding:8px 10px;border:1px solid var(--border);">目标导向</td><td style="padding:8px 10px;border:1px solid var(--border);">三张牌（目标/阻碍/行动）</td><td style="padding:8px 10px;border:1px solid var(--border);">3</td></tr>
          </table>

          <h4>牌阵选择原则</h4>
          <ol>
            <li><strong>牌越少，越聚焦</strong>——单张牌适合具体问题，10张牌适合复杂问题</li>
            <li><strong>位置决定问题</strong>——每个位置必须回答原始问题的一个方面</li>
            <li><strong>不固定</strong>——三张牌不一定是过去/现在/未来，根据问题自定义</li>
            <li><strong>先理解问题，再选牌阵</strong>——问题本身决定了需要什么牌阵</li>
          </ol>

          <div class="summary-box">
            <h5>综合练习：完整解读流程</h5>
            <ol>
              <li>写下你的问题（不要是"是/否"问题）</li>
              <li>写下背景（2-3句话）</li>
              <li>选择一个牌阵，并说明为什么选择它</li>
              <li>设定每个位置的含义</li>
              <li>抽取牌（或随机选一组牌模拟）</li>
              <li>单牌分析：每张牌在各自位置上的含义</li>
              <li>牌间关系：牌与牌之间是什么关系？</li>
              <li>整体叙事：这些牌共同讲述了什么故事？</li>
              <li>回到原问题，给出完整的自然语言解读</li>
            </ol>
          </div>`,
          completed: false
        }
      ]
    },
    // ====== 阶段六：学会解牌 ======
    {
      id: 'phase-interpret',
      name: '学会解牌',
      description: '从关键词到语境化解读，真正学会解释一组牌',
      progress: 0,
      chapters: [
        {
          id: 'ch-int-1',
          name: 'Level 1：牌义不是固定翻译',
          description: '理解牌义不是标准答案，而是思考的起点',
          type: 'interpret',
          content: `<h3>牌义不是固定翻译</h3>
          <p>很多人以为塔罗学习就是"记牌义"——记住每张牌代表什么，然后看到牌就"翻译"出来。</p>
          <p><strong>这是最大的误解。</strong></p>
          <p>牌义不是固定翻译，而是一个"意义范围"。</p>
          <h4>理解"意义范围"</h4>
          <p>每张牌有一个核心主题，但这个主题在不同语境下可以表现为不同形式。</p>
          <p>例如"权杖七"：</p>
          <ul>
            <li>核心主题：面对挑战，维护已有位置</li>
            <li>在工作语境中：可能表现为职场竞争、项目压力</li>
            <li>在感情语境中：可能表现为维护关系边界、面对感情中的困难</li>
            <li>在健康语境中：可能表现为坚持健康习惯、对抗疾病</li>
          </ul>
          <p>核心牌义是一样的，但现实表现取决于问题。</p>
          <h4>关键问题：</h4>
          <p>不要问"这张牌是什么意思？"<br>
          而应该问"<strong>这张牌在这个问题中意味着什么？</strong>"</p>
          <h4>练习：</h4>
          <div class="practice-box">
            <p>选择一张你熟悉的牌（比如"愚人"）。</p>
            <p>回答以下问题：</p>
            <ol>
              <li>这张牌的核心主题是什么？（一句话）</li>
              <li>如果它在"新工作"的问题中，可能意味着什么？</li>
              <li>如果它在"感情"的问题中，又可能意味着什么？</li>
              <li>核心主题变了没有？</li>
            </ol>
            <p><strong>参考答案：</strong>愚人的核心主题是"新的开始、信任未知、冒险"。在工作语境中可能是"新人入职、尝试新方向"；在感情语境中可能是"一段新的关系、放下过去"。核心主题不变，现实表现不同。</p>
          </div>`,
          completed: false
        },
        {
          id: 'ch-int-2',
          name: 'Level 2：从牌面提取核心牌义',
          description: '学会从画面中读出牌的核心含义',
          type: 'interpret',
          content: `<h3>从牌面提取核心牌义</h3>
          <p>不要死记硬背牌义——牌面本身就在告诉你它的含义。</p>
          <h4>如何"读"牌面：</h4>
          <ol>
            <li><strong>人物</strong>：谁在画面上？他/她/它在做什么？表情如何？</li>
            <li><strong>动作</strong>：人物在做什么动作？这个动作传递了什么信息？</li>
            <li><strong>道具</strong>：画面中有什么物品？它们有什么象征意义？</li>
            <li><strong>颜色</strong>：主要颜色是什么？颜色给你什么感觉？</li>
            <li><strong>环境</strong>：背景是什么？室内还是室外？白天还是晚上？</li>
            <li><strong>整体感觉</strong>：这张牌给你什么第一印象？</li>
          </ol>
          <h4>案例：星币侍从</h4>
          <div class="case-study">
            <p><strong>牌面信息：</strong></p>
            <ul>
              <li>人物：一位年轻人，站在草地上</li>
              <li>动作：双手捧着一枚星币，专注地看着它</li>
              <li>道具：星币（象征物质/现实）、手中的花</li>
              <li>环境：开阔的草地，远处有山</li>
              <li>整体感觉：专注、认真、充满希望</li>
            </ul>
            <p><strong>从牌面提取核心牌义：</strong></p>
            <p>年轻人 = 新手、学习阶段<br>
            捧着星币专注地看 = 正在学习、关注物质/技能层面<br>
            草地开阔 = 有发展空间<br>
            <strong>核心牌义：</strong>学习现实技能、认真对待工作、实际层面的起步</p>
          </div>
          <h4>练习：</h4>
          <div class="practice-box">
            <p>打开一张牌的画面（使用78张牌功能），不看书，只看画面。</p>
            <p>回答：</p>
            <ol>
              <li>你看到了什么？（描述画面，不是解读）</li>
              <li>这张牌给你什么感觉？</li>
              <li>如果这张牌是一个"建议"，它在建议什么？</li>
            </ol>
            <p>然后再和标准牌义对比。你很可能已经抓住了核心。</p>
          </div>`,
          completed: false
        },
        {
          id: 'ch-int-3',
          name: 'Level 3：牌义 × 问题',
          description: '学会把牌义和问题结合起来',
          type: 'interpret',
          content: `<h3>牌义 × 问题</h3>
          <p>这是最关键的一步：把牌义"放到"问题中。</p>
          <p>牌义不是自动翻译——它需要被问题"激活"。</p>
          <h4>核心公式：</h4>
          <p><strong>牌义 × 问题 = 当前语境下的牌义</strong></p>
          <p>同一张牌，面对不同问题，表现不同。</p>
          <h4>案例：权杖七</h4>
          <div class="case-study">
            <p><strong>问题A：</strong>"我的副业能不能持续稳定增收？"</p>
            <p><strong>权杖七在这个问题中：</strong>权杖七的核心是"面对外部挑战、维护已有位置"。在副业增收的问题中，它可能指向：你的副业已经有一定基础，但需要面对市场竞争、维护你的客户群。增收不是靠"爆发"，而是靠"守住和扩大现有阵地"。</p>
            <p><strong>问题B：</strong>"我和领导的关系最近很紧张，该怎么办？"</p>
            <p><strong>权杖七在这个问题中：</strong>同样是"面对外部挑战、维护已有位置"，但在人际关系问题中，它可能指向：你需要维护自己的立场和边界，但同时也要面对这个冲突。权杖七的"挑战感"在这里可能意味着你需要主动沟通，而不是回避。</p>
          </div>
          <p>看到区别了吗？核心牌义（面对挑战、维护位置）不变，但现实表现完全不同。</p>
          <h4>练习：</h4>
          <div class="practice-box">
            <p>选择一张牌（比如"隐士"）。</p>
            <p>分别回答以下两个问题：</p>
            <ol>
              <li>"我该不该换工作？" → 隐士怎么回答？</li>
              <li>"我和伴侣之间需要什么？" → 隐士又怎么回答？</li>
            </ol>
            <p><strong>关键：</strong>核心牌义不变，但现实的落脚点不同。</p>
          </div>`,
          completed: false
        },
        {
          id: 'ch-int-4',
          name: 'Level 4：牌义 × 问题 × 背景',
          description: '加入背景信息，让解读更精准',
          type: 'interpret',
          content: `<h3>牌义 × 问题 × 背景</h3>
          <p>问题决定了"方向"，背景决定了"精度"。</p>
          <p>同样的问题，不同的背景，同样的牌可能指向完全不同的现实情况。</p>
          <h4>案例：星币侍从 + 同一个问题 + 不同背景</h4>
          <div class="case-study">
            <p><strong>问题：</strong>"我的副业能不能持续稳定增收？"</p>
            <p><strong>背景A：</strong>客户已经学习技能、完成准备，副业已经启动，目前遇到增长瓶颈。</p>
            <p><strong>星币侍从在此背景中：</strong>星币侍从代表"学习、起步"。但客户已经完成了学习和启动阶段——所以这张牌不是"建议你开始学习"，而是"回顾过去，你已经完成了技能积累和启动阶段"。它肯定了过去的准备，提示这不是"从零开始"。</p>
            <p><strong>背景B：</strong>客户还没有开始副业，只是在考虑阶段，不知道从哪里入手。</p>
            <p><strong>星币侍从在此背景中：</strong>同样是星币侍从，但背景不同——它指向"需要先学习、先准备、先从基础做起"。它建议从学习技能和实际准备入手，而不是急于求成。</p>
          </div>
          <p>同一张牌，同一个问题，但背景不同，解读方向完全不同！</p>
          <h4>判断背景的关键信息：</h4>
          <ul>
            <li>时间线：这件事处于什么阶段？（开始前/进行中/遇到问题/尾声）</li>
            <li>状态：当事人的状态如何？（积极/疲惫/焦虑/自信）</li>
            <li>关键因素：已经做了什么？</li>
          </ul>
          <h4>练习：</h4>
          <div class="practice-box">
            <p>选择"宝剑ACE"。</p>
            <p>问题相同："我该如何处理这个决定？"</p>
            <p>背景A：你正在考虑是否要提出一个重要的想法</p>
            <p>背景B：你正在考虑是否要结束一段关系</p>
            <p>写出宝剑ACE在两种背景下的解读有何不同。</p>
          </div>`,
          completed: false
        },
        {
          id: 'ch-int-5',
          name: 'Level 5：牌义 × 问题 × 背景 × 位置',
          description: '加入位置维度，完整理解语境化',
          type: 'interpret',
          content: `<h3>牌义 × 问题 × 背景 × 位置</h3>
          <p>位置是决定的"角色"——同一张牌在不同位置，解释可以完全不同。</p>
          <h4>位置不是附加信息，而是决定牌义如何进入问题</h4>
          <p>例如"权杖七"：</p>
          <ul>
            <li><strong>如果在"过去"位置</strong>：过去经历了竞争和挑战，可能已经克服了某些困难</li>
            <li><strong>如果在"现在"位置</strong>：当前正在面对竞争，需要维护自己的位置</li>
            <li><strong>如果在"未来"位置</strong>：未来可能会遇到挑战，需要提前准备</li>
            <li><strong>如果在"压力来源"位置</strong>：压力来自外部竞争、环境阻力</li>
            <li><strong>如果在"建议"位置</strong>：建议你勇敢面对挑战，不要退缩</li>
          </ul>
          <p>核心牌义（面对挑战、维护位置）不变，但它在不同位置回答了不同的问题。</p>
          <h4>完整案例：副业问题</h4>
          <div class="case-study">
            <p><strong>问题：</strong>"副业能不能持续稳定增收？"</p>
            <p><strong>背景：</strong>客户已完成技能学习，副业已启动，目前遇到增长瓶颈</p>
            <p><strong>牌阵：</strong>过去 / 现在 / 未来</p>
            <p><strong>过去→星币侍从：</strong>星币（土/现实/技能）+ 侍从（学习/起步）。放在"过去"，结合客户已完成学习启动的背景 → 过去阶段已经完成了技能积累和现实准备。不是"需要学习"，而是"已经完成了学习阶段"。</p>
            <p><strong>现在→权杖七：</strong>权杖（火/行动/竞争）+ 七（评估/坚持）。放在"现在"，结合已进入运营阶段 → 当前正在面对外部竞争和挑战，需要维护已有成果。</p>
            <p><strong>未来→星币二：</strong>星币（现实/资源）+ 二（平衡/选择）。放在"未来" → 未来需要在工作、副业、时间、资源之间进行持续调整和平衡。</p>
            <p><strong>三张牌的关系：</strong>准备（星币侍从）→ 竞争（权杖七）→ 调整（星币二）。这是一个从"准备"到"面对挑战"再到"动态平衡"的发展过程。</p>
          </div>
          <h4>练习：</h4>
          <div class="practice-box">
            <p>选择"皇后"牌。</p>
            <p>同一个问题："我的创作项目进展如何？"</p>
            <p>写出皇后牌在以下不同位置的解读：</p>
            <ol>
              <li>在"现状"位置</li>
              <li>在"阻碍"位置</li>
              <li>在"建议"位置</li>
            </ol>
            <p>核心牌义不变（丰饶、滋养、创造力），但不同位置指向不同。</p>
          </div>`,
          completed: false
        },
        {
          id: 'ch-int-6',
          name: 'Level 6：同牌不同语境',
          description: '大量对比练习，训练语境化思维',
          type: 'interpret',
          content: `<h3>同牌不同语境</h3>
          <p>这是最重要的训练之一——同一张牌，在不同的语境中，如何变化？</p>
          <h4>对比练习1：权杖七在不同问题中</h4>
          <div class="comparison-table">
            <div class="comparison-col">
              <h5>感情问题：</h5>
              <p>"我和伴侣之间最近总吵架，该怎么办？"</p>
              <p><strong>权杖七的解读：</strong>感情中的竞争或防御心态。你可能在维护自己的立场，但需要区分"维护边界"和"把伴侣当敌人"。权杖七提示：是不是在感情中太"好斗"了？需要把能量从"对抗"转向"共同面对问题"。</p>
            </div>
            <div class="comparison-col">
              <h5>工作问题：</h5>
              <p>"我该不该争取这次晋升？"</p>
              <p><strong>权杖七的解读：</strong>晋升需要面对竞争。权杖七提示你：你有能力维护自己的位置，但需要做好准备面对挑战。这不是"有没有资格"的问题，而是"是否愿意争取"的问题。</p>
            </div>
          </div>
          <h4>对比练习2：同一张牌在不同位置</h4>
          <div class="case-study">
            <p><strong>问题：</strong>"我该不该换城市发展？"</p>
            <p><strong>牌：</strong>命运之轮</p>
            <p><strong>在"现状"位置：</strong>你正处于一个变化期，有些事情不是你完全能控制的。命运之轮在转动——你不需要"推动"它，而是需要判断什么时候"跳上去"。</p>
            <p><strong>在"建议"位置：</strong>建议你顺应变化，不要抗拒。命运之轮提示：换城市这件事本身就是一个"命运转折"，不要过度分析，而是要相信时机。</p>
            <p><strong>在"阻碍"位置：</strong>你可能过于依赖"命运"——把决定权交给运气。命运之轮在阻碍位置提示：不要被动等待，有时候轮子需要你自己去转动。</p>
          </div>
          <h4>练习：</h4>
          <div class="practice-box">
            <p><strong>练习1：</strong>选择"节制"牌。分别在工作、感情、学业三种问题中写出解读。</p>
            <p><strong>练习2：</strong>选择"高塔"牌。在"现状"、"建议"、"警示"三个位置分别写出解读。</p>
            <p>对比你的答案，核心牌义不变，但现实表现不同。</p>
          </div>`,
          completed: false
        },
        {
          id: 'ch-int-7',
          name: 'Level 7：两张牌的关系',
          description: '学会解读两张牌之间的互动',
          type: 'interpret',
          content: `<h3>两张牌的关系</h3>
          <p>两张牌放在一起，不是"1+1=2"，而是"1+1=一种新的关系"。</p>
          <h4>常见的关系类型：</h4>
          <ul>
            <li><strong>支持关系</strong>：两张牌指向同一个方向，互相加强</li>
            <li><strong>冲突关系</strong>：两张牌的能量相反，制造张力</li>
            <li><strong>因果关系</strong>：一张牌是原因，另一张是结果</li>
            <li><strong>补充关系</strong>：一张牌指出了另一张牌缺少的方面</li>
            <li><strong>发展关系</strong>：从第一张到第二张有一个变化过程</li>
          </ul>
          <h4>案例：分析两张牌的关系</h4>
          <div class="case-study">
            <p><strong>问题：</strong>"我最近的工作状态如何？"</p>
            <p><strong>牌：</strong>星币八 + 权杖骑士</p>
            <p><strong>单牌分析：</strong></p>
            <p>星币八：专注、技能、勤奋工作，但可能缺乏变化</p>
            <p>权杖骑士：热情、冒险、追求新目标，但可能缺乏耐心</p>
            <p><strong>两张牌的关系：</strong></p>
            <p>这两张牌是"互补"关系。星币八的"专注勤奋"和权杖骑士的"热情冒险"看起来矛盾，但实际上互补——你需要在工作中既有扎实的投入（星币八），又有热情和方向感（权杖骑士）。</p>
            <p>如果只有星币八，工作可能变得枯燥乏味；如果只有权杖骑士，可能三分钟热度。</p>
            <p><strong>结论：</strong>你目前的工作状态需要平衡"专注投入"和"保持热情"。两者缺一不可。</p>
          </div>
          <h4>练习：</h4>
          <div class="practice-box">
            <p>抽取两张牌。</p>
            <p>回答：</p>
            <ol>
              <li>每张牌单独的含义是什么？</li>
              <li>这两张牌放在一起是什么关系？（支持/冲突/因果/补充/发展？）</li>
              <li>"这两张牌放在一起说明了什么？"</li>
            </ol>
            <p>不要分别解释两张牌就结束——必须回答"它们的关系"。</p>
          </div>`,
          completed: false
        },
        {
          id: 'ch-int-8',
          name: 'Level 8：三张牌叙事',
          description: '学会把三张牌组织成一个完整故事',
          type: 'interpret',
          content: `<h3>三张牌叙事</h3>
          <p>三张牌是最小单位的"完整故事"——有开始、有发展、有方向。</p>
          <h4>三张牌叙事的关键：</h4>
          <ul>
            <li><strong>时间发展</strong>：牌与牌之间是否有时间上的递进？</li>
            <li><strong>状态变化</strong>：从第一张到第三张，状态发生了什么变化？</li>
            <li><strong>元素变化</strong>：火→水→风？土→火→水？元素变化讲述了什么故事？</li>
            <li><strong>视觉关系</strong>：牌面中的人物朝向、动作是否有连续感？</li>
          </ul>
          <h4>完整案例：三张牌叙事</h4>
          <div class="case-study">
            <p><strong>问题：</strong>"我的副业能不能持续稳定增收？"</p>
            <p><strong>背景：</strong>已完成学习准备，副业已启动，遇到增长瓶颈</p>
            <p><strong>牌阵：</strong>过去 / 现在 / 未来</p>
            <p><strong>牌：</strong>星币侍从 → 权杖七 → 星币二</p>
            <p><strong>时间发展：</strong>准备阶段（星币侍从：学习、积累）→ 竞争阶段（权杖七：面对挑战、维护位置）→ 调整阶段（星币二：动态平衡、持续管理）。这是一个从"准备"到"竞争"再到"持续管理"的完整发展过程。</p>
            <p><strong>状态变化：</strong>从被动学习（侍从）→ 主动应战（权杖七）→ 灵活管理（星币二）。状态在不断升级。</p>
            <p><strong>元素变化：</strong>土（星币）→ 火（权杖）→ 土（星币）。从土（学习积累）到火（行动竞争）再回到土（资源管理）。这是一个"积累→行动→再积累"的循环。</p>
            <p><strong>整体叙事：</strong>你的副业之路已经完成了从零到一的积累（星币侍从），现在进入了需要面对竞争、守住阵地的阶段（权杖七）。未来不会变得轻松，但也不是大起大落——而是需要持续调整和平衡（星币二）。这个副业不是"爆发型"的，而是"经营型"的——需要持续投入、持续调整、持续维护。</p>
          </div>
          <h4>练习：</h4>
          <div class="practice-box">
            <p>抽取三张牌，自行设定三个位置。</p>
            <p>回答：</p>
            <ol>
              <li>这三张牌构成了什么叙事？（一句话概括）</li>
              <li>时间发展是怎样的？</li>
              <li>状态变化是怎样的？</li>
              <li>元素变化说明了什么？</li>
              <li>最终回答了原问题什么？</li>
            </ol>
          </div>`,
          completed: false
        },
        {
          id: 'ch-int-9',
          name: 'Level 9：完整案例解构',
          description: '逐步拆解一个完整解读案例',
          type: 'interpret',
          content: `<h3>完整案例解构</h3>
          <p>现在，让我们一步步拆解一个完整解读。</p>
          <h4>案例：决定是否换工作</h4>
          <div class="case-study">
            <p><strong>第一步：理解问题</strong></p>
            <p>问题："我该不该换工作？"</p>
            <p>但这不是一个好问题——太笼统、太"是/否"。我们把它拆解为：</p>
            <ul>
              <li>"我目前的工作状态中，什么因素最需要关注？"</li>
              <li>"换工作这件事，我需要注意什么？"</li>
              <li>"如果换，什么方向更适合我？"</li>
            </ul>
            <p><strong>第二步：了解背景</strong></p>
            <p>客户：30岁，在一家互联网公司做产品经理3年，工作稳定但缺乏成长空间。最近收到一个创业公司的offer，但不确定是否该去。</p>
            <p><strong>第三步：选择牌阵</strong></p>
            <p>选择"现状 / 核心问题 / 建议"三张牌阵——因为客户需要分析当前状态、找到核心问题、获得行动建议。</p>
            <p><strong>第四步：抽牌</strong></p>
            <p>现状→星币四<br>核心问题→死神<br>建议→星星</p>
            <p><strong>第五步：单牌分析</strong></p>
            <p>现状→星币四：星币四代表"守住资源、不愿放手"。放在"现状"位置，说明客户目前处于"安全但停滞"的状态——工作稳定，但过于保守，缺乏成长。星币四的"紧握"姿态暗示了内心的不安全感。</p>
            <p>核心问题→死神：死神代表"结束、转变、放下"。放在"核心问题"位置，说明客户的核心问题不是"选择哪个工作"，而是"是否愿意放下现有的安全感"。死神牌提示：真正的阻碍不是外部选择，而是内心对"结束"的恐惧。</p>
            <p>建议→星星：星星代表"希望、信念、平静"。放在"建议"位置，建议客户倾听内心的信念，而不是被恐惧驱动。星星的平静和死神的"转变"形成了呼应——结束是痛苦的，但之后会有新的平静。</p>
            <p><strong>第六步：牌间关系</strong></p>
            <p>星币四（守）→ 死神（变）→ 星星（平静）。这三张牌形成了一个"停滞→转变→希望"的叙事。星币四和死神是冲突关系——一个想守住，一个要求放下。星星是解决方案——找到内心的信念，才能做出决定。</p>
            <p><strong>第七步：整体解读</strong></p>
            <p>"从这组牌来看，你目前最大的问题不是'选A还是选B'，而是你是否愿意放下现有的安全感。星币四告诉你，你目前的状态是安全的，但也是停滞的。死神直接指向了核心——你需要经历某种'结束'才能进入下一阶段。但星星是一张充满希望的牌——它告诉你，当你做出决定后，会有平静和新的方向。关键不是'哪个工作更好'，而是'你是否准备好结束一个阶段，开始新的阶段'。"</p>
          </div>
          <h4>练习：</h4>
          <div class="practice-box">
            <p>抽取三张牌，按照以下步骤进行完整解读：</p>
            <ol>
              <li>写下一个问题（不要是"是/否"问题）</li>
              <li>写下背景（2-3句话）</li>
              <li>选择一个牌阵并说明为什么</li>
              <li>分析每张牌在各自位置的含义</li>
              <li>分析牌与牌之间的关系</li>
              <li>写出完整的自然语言解读</li>
              <li>回到原问题，给出回答</li>
            </ol>
          </div>`,
          completed: false
        },
        {
          id: 'ch-int-10',
          name: 'Level 10：匿名人物实战',
          description: '综合运用所有技能，解读匿名人物案例',
          type: 'interpret',
          content: `<h3>匿名人物实战</h3>
          <p>这是最高级别的练习——面对一个真实（但匿名）的人物案例，进行完整的解读。</p>
          <p>你可以直接使用"实战演练"模块中的50个匿名人物案例。</p>
          <h4>实战流程：</h4>
          <ol>
            <li><strong>阅读人物背景和问题</strong>（不要急于看牌，先理解问题）</li>
            <li><strong>拆解问题</strong>：这个人在问什么？问题的核心是什么？</li>
            <li><strong>理解背景</strong>：背景信息对解读有什么影响？</li>
            <li><strong>查看牌阵</strong>：为什么选择这个牌阵？每个位置在问什么？</li>
            <li><strong>查看抽出的牌</strong>：不要直接查关键词，先看牌面</li>
            <li><strong>单牌分析</strong>：每张牌在各自位置上的含义</li>
            <li><strong>位置分析</strong>：牌义 × 位置 × 问题 × 背景</li>
            <li><strong>牌间关系</strong>：牌与牌之间是什么关系？</li>
            <li><strong>整体叙事</strong>：这些牌共同讲述了一个什么故事？</li>
            <li><strong>回答原问题</strong>：回到人物最初的问题，给出完整的自然语言解读</li>
          </ol>
          <h4>练习：</h4>
          <div class="practice-box">
            <p>打开"实战演练"模块，选择一个匿名人物案例。</p>
            <p>按照以下步骤：</p>
            <ol>
              <li>写下你的解读</li>
              <li>提交后查看参考分析</li>
              <li>对比你的解读和参考分析：</li>
              <ul>
                <li>你抓住了哪些核心？</li>
                <li>你忽略了什么？</li>
                <li>你的分析中哪些是"关键词堆砌"，哪些是"语境化解读"？</li>
              </ul>
              <li>复盘修改</li>
            </ol>
          </div>
          <h4>总结：解牌的完整框架</h4>
          <div class="summary-box">
            <p><strong>每次解牌问自己：</strong></p>
            <ol>
              <li>我在回答什么问题？</li>
              <li>这个人的背景是什么？</li>
              <li>这个牌阵为什么适合？</li>
              <li>这个位置到底在问什么？</li>
              <li>这张牌的核心是什么？</li>
              <li>这个核心为什么适用于当前位置？</li>
              <li>结合背景，它可能对应什么现实情况？</li>
              <li>它和其他牌是什么关系？</li>
              <li>这些牌共同形成了什么变化？</li>
              <li>最后到底回答了客户什么？</li>
            </ol>
          </div>`,
          completed: false
        }
      ]
    }
  ]
};