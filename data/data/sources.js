// 知识来源数据
const Sources = {
  books: [
    {
      id: 'book-001',
      type: 'book',
      author: '瑞秋·波拉克',
      title: '78度的智慧',
      publisher: '商周出版',
      year: '2010',
      description: '塔罗经典著作，深度解析每一张牌的象征意义和心理学内涵'
    },
    {
      id: 'book-002',
      author: '乔安娜·沃莉·鲍克',
      title: '其实你已经很塔罗了',
      publisher: '尖端',
      year: '2005',
      description: '入门经典，以生活化的方式解释牌义'
    },
    {
      id: 'book-003',
      author: '萨珊诺',
      title: '塔罗葵花宝典',
      publisher: '尖端',
      year: '2004',
      description: '华人塔罗入门经典，系统清晰'
    },
    {
      id: 'book-004',
      author: '劳伦，阿莲娜',
      title: '百年韦特塔罗全书',
      publisher: '陕西旅游出版社',
      year: '2012',
      description: '百年韦特官方解析'
    }
  ],
  online: [
    {
      id: 'online-001',
      author: '宝琳娜',
      title: '塔罗觉醒',
      platform: 'B站',
      url: 'https://www.bilibili.com/',
      description: '系统化塔罗教学，注重象征思维训练'
    },
    {
      id: 'online-002',
      author: '金星',
      title: '塔罗入门教程',
      platform: '知乎',
      url: 'https://www.zhihu.com/',
      description: '清晰的结构化讲解'
    }
  ]
};

// 获取来源信息
function getSource(sourceId) {
  for (const book of Sources.books) {
    if (book.id === sourceId) return book;
  }
  for (const online of Sources.online) {
    if (online.id === sourceId) return online;
  }
  return null;
}

// 格式化来源显示
function formatSource(sourceId) {
  const source = getSource(sourceId);
  if (!source) return sourceId;
  if (source.type === 'book') {
    return `${source.author}《${source.title}》`;
  } else {
    return `${source.author}《${source.title}》(${source.platform})`;
  }
}
