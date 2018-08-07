const hour = new Date().getHours();
let greet = '早上';
if (hour > 18) {
  greet = '晚上';
} else if (hour > 12) {
  greet = '下午';
}
export default {
  dialogs: [
    {
      id: 1,
      content: [
        {
          tag: 'p',
          detail: `${greet}好`,
        },
        {
          tag: 'p',
          detail: '我是吴怡锋，是一名前端开发工程师，目前在广州工作',
        },
      ],
      response: [
        {
          tag: 'p',
          detail: '聊下你的工作吧',
          next: 2,
        },
        {
          tag: 'p',
          detail: '聊下你自己吧',
          next: 3,
        },
      ],
    },
    {
      id: 2,
      content: [
        {
          tag: 'p',
          detail: '从17年5月至今，在广州唯彩会网络科技有限公司担任前端开发工程师，负责项目的前端维护及功能开发，微信公众号开发及微信小游戏开发',
        },
        {
          tag: 'p',
          detail: '期间优化了Koa 端的架构，封装了微信、接口转发请求等工具类，并设计了错误监控及报警系统，使得代码架构更加高效及安全；',
        },
        {
          tag: 'p',
          detail: '16年3月至17年5月，在广州智壹网络科技有限公司担任前端开发工程师及UI 设计师',
        },
        {
          tag: 'p',
          detail: '负责网站移动端UI设计及前端开发、浏览器插件开发及RN开发，主导完成了旧有代码的工程化及重构，将网站加载速度提升了3倍，优化了界面设计，提升了用户体验',
        },
      ],
      response: [
        {
          tag: 'p',
          detail: '有什么项目经验吗',
          next: 5,
        },
        {
          tag: 'p',
          detail: '有个人项目吗',
          next: 4,
        },
      ],
    },
    {
      id: 3,
      content: [
        {
          tag: 'p',
          detail: '我于2013年至2016年就读于广东科学技术职业学院，网络编程专业(Java 开发)，在校期间获得CET6证书',
        },
        {
          tag: 'p',
          detail: '熟悉JavaScript编程，熟练使用Vue、React、Zepto等前端框架及PostCss、Sass等预处理器',
        },
        {
          tag: 'p',
          detail: '熟悉基于Koa.js的Node开发，了解PouchDB的使用，熟练使用Typescript 基于Egret 引擎进行游戏开发',
        },
        {
          tag: 'p',
          detail: '懂产品，会设计，喜欢研究用户体验；对代码有洁癖，对新技术不折腾不快',
        },
      ],
      response: [
        {
          tag: 'p',
          detail: '有什么项目经验吗',
          next: 5,
        },
        {
          tag: 'p',
          detail: '有个人项目吗',
          next: 4,
        },
      ],
    },
    {
      id: 4,
      content: [
        {
          tag: 'a',
          link: 'https://github.com/evont/totheend-server',
          detail: '接触快应用时，使用cheerio 和superagent 抓取分析了每日一文网站数据，设计并开发了名为观止的快应用',
        },
        {
          tag: 'img',
          detail: '/static/img/chat-file/280874B869326FE4DDA722B0A2E8ABD6.jpg',
        },
        {
          tag: 'a',
          link: 'https://github.com/evont/koa-wechat',
          detail: '由于工作中负责公众号和小游戏开发，所以封装了一个基于Koa.js 的微信工具类',
        },
        {
          tag: 'a',
          link: 'https://evont.github.io/p2.js/docs',
          detail: '使用Egret 引擎开发游戏的时候，p2 物理引擎经常需要用到，但是其没有中文文档，开源精神让我进行了文档翻译工作',
        },
        {
          tag: 'a',
          link: 'https://github.com/evont',
          detail: '更多的项目可以在我的Github上面看到',
        },
      ],
      response: [
        {
          tag: 'p',
          detail: '有什么工作经历',
          next: 2,
        },
        {
          tag: 'p',
          detail: '有负责过什么项目吗',
          next: 5,
        },
      ],
    },
    {
      id: 5,
      content: [
        {
          tag: 'a',
          link: 'https://daren.vipc.cn/',
          detail: '在唯彩会时，我独立负责了红单达人项目前端开发，实现前后端分离，完成SEO优化及整站需求开发，技术栈为Koa + Vue + Zepto',
        },
        {
          tag: 'p',
          detail: '此外，还负责了微信小游戏及H5 游戏开发，上线产品包括“投篮达人”，“篮球神射手”等，技术栈为Egret + TypeScript',
        },
        {
          tag: 'p',
          detail: '在智壹网络期间，独立负责Uneedbid 及代购湾两个项目的移动版web 前端开发及UI 设计，使用React Native进行客户端开发，使用Phantom.js 开发项目部分爬虫功能',
        },
        {
          tag: 'p',
          detail: '同时，我也负责EasyBuy 购物助手浏览器插件，主要功能为自动在当前购物网站自动抓取商品图片及价格并提供用户直达本站进行代购',
        },
        {
          tag: 'img',
          detail: '/static/img/chat-file/6D6EFC58BA71A9C4A9FAE26368AB91C8.jpg',
        },
      ],
      response: [
        {
          tag: 'p',
          detail: '还有什么要补充的吗',
          next: 6,
        },
      ],
    },
    {
      id: 6,
      content: [
        {
          tag: 'p',
          detail: '没有了，很高兴与你聊天，如果需要联系我，我的联系方式如下',
        },
        {
          tag: 'p',
          detail: '手机号码：+86 13169620297<br>邮箱地址：evontgoh@foxmail.com',
        },
        {
          tag: 'a',
          link: 'https://evont.github.io/',
          detail: '感兴趣的话，也可以访问我的Github Page: https://evont.github.io/',
        },
        {
          tag: 'img',
          detail: '/static/img/chat-file/giphy.webp',
        },
      ],
    },
  ],
};
