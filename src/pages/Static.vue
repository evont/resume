<template>
  <div class="resume">
    <div class="resume-head"></div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

import resume from '../assets/resume.json';

export default {
  name: 'Static',
  data() {
    return {
      resume,
    };
  },
  created() {
    // this.render();
  },
  methods: {
    render() {
      html2canvas(document.body).then((canvas) => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;
        // 一页pdf显示html页面生成的canvas高度;
        const pageHeight = (contentWidth / 592.28) * 841.89;
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight;
        // 页面偏移
        let position = 0;
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        const imgWidth = 595.28;
        const imgHeight = (592.28 / contentWidth) * contentHeight;
        const pageData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new JsPDF('', 'pt', 'a4');
        // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          // pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            // 避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage();
            }
          }
        }
        pdf.save('content.pdf');
      });
    },
  },
};
</script>

<style scoped>
.resume {
  position: relative;
  &::before {
    content: '';
    display: block;
    width: 80%;
    height: 20px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    background: #333;
  }
}
</style>
