<template>
  <div class="static">
    <div class="static-option">
      <router-link class="static-option-item" to="/Animate">查看动态简历</router-link>
      <a class="static-option-item" @click.prevent="render2Pic">导出为图片</a>
      <a class="static-option-item" @click.prevent="render2Pdf">导出为PDF</a>
    </div>
    <div class="static-main">
      <div class="static-resume" id="resume">
        <div class="static-head">
          <div class="static-head-left">
            <img class="avatar" :src="resume.avatar" :alt="`${resume.enName}'s avatar'`">
          </div>
          <div class="static-head-right">
            <h1 class="nickname">
              {{ resume.cnName }}
              <span class="nickname-en">{{ resume.enName }}</span>
            </h1>
            <h3 class="job">{{ resume.job }}</h3>
          </div>
        </div>
        <div class="static-column static-block">
          <div class="static-column-left">
            <h3 class="static-block-head">工作经历</h3>
          </div>
          <div class="static-column-right" data-pc>
            <div class="static-block-lead"></div>
          </div>
        </div>
        <ul>
          <li class="static-column static-block-content"
            v-for="(item, index) in resume.experience" :key="index">
            <div class="static-column-left static-block-left static-block-left_lead">
              <h4 class="lead">
                <p class="title">
                  {{ item.company }} /
                  <span class="title-addition">{{ item.period }}</span>
                </p>
                <b class="addition">{{ item.post }}</b>
              </h4>
            </div>
            <div class="static-column-right static-block-right static-block-right_lead">
              <ul>
                <li class="desc" v-for="(exp, eInd) in item.project" :key="eInd">
                  <h3 class="title">{{ exp.name }}</h3>
                  <ol class="content">
                    <li v-for="(desc, dInd) in exp.desc" :key="dInd">
                      {{ desc }}
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="static-column block">
          <div class="static-column-left">
            <h3 class="static-block-head">联系方式</h3>
            <ul class="static-contact">
              <li class="static-contact-item" v-for="(item, index) in resume.contact"
                  :key="index" :data-type="index">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="static-column-right">
            <h3 class="static-block-head">教育背景</h3>
            <div class="static-block-content">
               <h4 class="lead">
                <p class="title">
                  {{ resume.education.school }} /
                  <span class="title-addition">{{ resume.education.period }}</span>
                  - {{ resume.education.subject }}
                </p>
                <b class="addition">{{ resume.education.comment }}</b>
                <p></p>
              </h4>
            </div>
            <h3 class="static-block-head">专业技能</h3>
            <ul class="static-skill">
              <li class="static-skill-item" v-for="(item, index) in resume.skill"
                  :key="index" :data-type="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

import resume from '../assets/resume.json';

const a4Width = 595.28;
const a4Height = 841.89;

export default {
  name: 'Static',
  data() {
    return {
      resume,
      canvas: null,
      scaleRatio: 1,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.render();
    });
  },
  methods: {
    render() {
      const cntElem = document.querySelector('#resume');
      const shareContent = cntElem;// 需要截图的包裹的（原生的）DOM 对象
      const width = shareContent.offsetWidth; // 获取dom 宽度
      const height = shareContent.offsetHeight; // 获取dom 高度
      const canvas = document.createElement('canvas'); // 创建一个canvas节点
      const scale = 4; // 定义任意放大倍数 支持小数
      canvas.width = a4Width; // 定义canvas 宽度 * 缩放
      canvas.height = a4Height; // 定义canvas高度 *缩放
      canvas.getContext('2d').scale(scale, scale); // 获取context,设置scale
      const opts = {
        scale, // 添加的scale 参数
        canvas, // 自定义 canvas
        width, // dom 原始宽度
        height,
        useCORS: true, // 【重要】开启跨域配置
      };
      html2canvas(shareContent, opts).then((cvs) => {
        this.canvas = cvs;
      });
    },
    render2Pic() {
      function download(url, name) {
        const aLink = document.createElement('a');
        aLink.download = name;
        aLink.href = url;
        aLink.target = '_blank';
        aLink.dispatchEvent(new MouseEvent('click', {}));
      }
      const { canvas } = this;
      const imgURL = canvas.toDataURL('image/png');
      download(imgURL, 'a.png');
    },
    render2Pdf() {
      const { canvas } = this;
      const contentWidth = canvas.width;
      const contentHeight = canvas.height;
      // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      const imgWidth = a4Width;
      // 一页pdf显示html页面生成的canvas高度;
      const pageHeight = (contentWidth / imgWidth) * 841.89;
      // 未生成pdf的html页面高度
      let leftHeight = contentHeight;
      // 页面偏移
      let position = 0;
      const imgHeight = (imgWidth / contentWidth) * contentHeight;
      const pageData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new JsPDF('', 'pt', 'a4');
      // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      // 当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', (a4Width - imgWidth) / 2, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', (a4Width - imgWidth) / 2, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          // 避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
      pdf.save(`${this.resume.cnName}-${this.resume.job}-简历.pdf`);
    },
  },
};
</script>

<style>
  @import '../assets/css/resume-static.css';
</style>
