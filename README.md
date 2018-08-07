## Preview
[http://evont.github.io/resume/2018/](http://evont.github.io/resume/2018/)

## Intro

一直没有好好写一份在线简历，于是设计了一份静态简历和一份交互式简历，这份简历有以下功能点：
- 静态简历可以导出图片或pdf，并根据屏幕大小进行自适应调整
- 动态简历以对话形式，可以根据选择的问题回复相应的内容，类似于面试的对话

## Install 
clone 项目到本地
`` npm install``

运行修改
`` npm run dev``

发布修改
`` npm run build``

## Usage

1. 先Star/Fork本项目，然后Clone或者直接下载到本地
2. 静态简历修改resume.json 对应的字段，动态简历修改dialog.js 里面的内容
3. 根据自己的喜好调整样式
4. 部署发布或生成pdf

## Todo

1. 优化对话框自动调节宽度
2. 优化动态简历交互
3. 修复导出为pdf 或图片时，部分图片模糊问题
4. 对话新增emoji形式