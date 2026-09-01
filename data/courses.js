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
    }
  ]
};