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
          detail: '有过什么项目经验呢',
          next: 3,
        },
      ],
    },
    {
      id: 2,
      content: [
        {
          tag: 'p',
          detail: '从17年5月至今，在广州唯彩会网络科技有限公司担任前端开发工程师，负责红单达人项目的维护，微信公众号开发及微信小游戏开发',
        },
        {
          tag: 'p',
          detail: '期间优化了Koa 端的架构，封装了微信、接口转发请求等工具类，并设计了错误监控及报警系统，使得代码架构更加高效及安全；完成了项目的前后端同构，并使用Vue.js 重构了部分页面；使用webpack 及gulp 实现了项目的前端工程化',
        },
        {
          tag: 'a',
          link: 'https://evont.github.io/p2.js/docs',
          detail: '另外，在使用Egret 引擎开发微信小游戏及H5游戏的时候，完成了P2.js 物理引擎的文档翻译',
        },
        {
          tag: 'p',
          detail: '16年3月至17年5月，在广州智壹网络科技有限公司担任前端开发工程师及UI 设计师',
        },
      ],
      response: [
        {
          tag: 'p',
          detail: '有什么项目经验',
          next: 4,
        },
      ],
    },
    {
      id: 3,
      content: [
        {
          tag: 'a',
          link: 'https://daren.vipc.cn/',
          detail: '在唯彩会负责红单达人项目前端开发，期间对项目架构进行优化，',
        },
        {
          tag: 'p',
          detail: "and let's cut the chat",
        },
      ],
    },
    {
      id: 4,
      content: [
        {
          tag: 'p',
          detail: "time's up",
        },
        {
          tag: 'p',
          detail: 'maybe u can call me for a long talk',
        },
      ],
    },
  ],
};
