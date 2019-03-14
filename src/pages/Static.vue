<template>
  <div class="static">
    <div class="static-option">
      <router-link class="static-option-item" to="/Animate">查看动态简历</router-link>
      <a class="static-option-item" data-type="pic" ref="render2Pic">导出为图片</a>
      <a class="static-option-item" data-type="pdf" @click.prevent="render2Pdf">导出为PDF</a>
    </div>
    <div class="static-main">
      <div class="static-resume" id="resume" ref="resume">
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
                  <ul class="content">
                    <li v-for="(desc, dInd) in exp.desc" :key="dInd">
                      {{ desc }}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="static-column static-block">
          <div class="static-column-left">
            <h3 class="static-block-head">开源项目</h3>
          </div>
          <div class="static-column-right" data-pc>
            <div class="static-block-lead"></div>
          </div>
        </div>
        <ul>
          <li class="static-column static-block-content"
            v-for="(item, index) in resume.opensource" :key="index">
            <div class="static-column-left static-block-left static-block-left_lead">
              <h4 class="lead">
                <p class="title">
                  {{ item.name }}
                </p>
              </h4>
            </div>
            <div class="static-column-right static-block-right static-block-right_lead">
              <p v-html="item.desc" class="desc"></p>
            </div>
          </li>
        </ul>
        <div class="static-column block">
          <div class="static-column-left">
            <h3 class="static-block-head">联系方式</h3>
            <ul class="static-contact">
              <li class="static-contact-item" v-for="(item, index) in resume.contact"
                  :key="index">
                {{ item }}
                <img :src="`/resume/2018/static/img/icon-${index}.svg`">
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
    <canvas ref="cav" class="hide"></canvas>
  </div>
</template>

<style>
  @import '../assets/css/resume-static.css';
</style>

<script>
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

import resume from '../data/resume.json';

const a4Width = 595.28;
const a4Height = 841.89;
const pdf = new JsPDF('', 'pt', 'a4');

export default {
  name: 'Static',
  data() {
    return {
      resume,
      canvas: null,
      pdfName: '',
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.render();
    });
  },
  methods: {
    render() {
      const shareContent = this.$refs.resume;
      const width = shareContent.offsetWidth; // 获取dom 宽度
      const height = shareContent.offsetHeight; // 获取dom 高度
      const canvas = this.$refs.cav; // 创建一个canvas节点
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
        const imgURL = cvs.toDataURL('image/png');
        this.$refs.render2Pic.download = `${resume.cnName}-${resume.job}.png`;
        this.$refs.render2Pic.href = imgURL;
        this.$refs.render2Pic.target = '_blank';
      });
    },
    render2Pdf() {
      const { canvas } = this;
      const { width, height } = canvas;
      // 一页pdf显示html页面生成的canvas高度;
      const pageHeight = (width / a4Width) * a4Height;
      // 未生成pdf的html页面高度
      let leftHeight = height;
      // 页面偏移
      let position = 0;
      const imgHeight = (a4Width / width) * height;
      const pageData = canvas.toDataURL('image/jpeg', 1.0);
      // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      // 当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, a4Width, imgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, a4Width, imgHeight);
          leftHeight -= pageHeight;
          position -= a4Height;
          // 避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
      pdf.save(`${this.resume.cnName}-${this.resume.job}-简历.pdf`);
      this.pdfName = `${this.resume.cnName}-${this.resume.job}-简历.pdf`;
    },
  },
};
</script>
