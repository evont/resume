<template>
  <div class="content">
    <div class="option">
      <a class="option-item" @click.prevent="render2Pic">导出为图片</a>
      <a class="option-item" @click.prevent="render2Pdf">导出为PDF</a>
    </div>
    <div class="main">
      <div class="resume" id="resume" :style="{ zoom: scaleRatio }">
        <div class="m-column head">
          <div class="m-column-left head-left">
            <img class="avatar" :src="resume.avatar" :alt="`${resume.enName}'s avatar'`">
          </div>
          <div class="m-column-right head-right">
            <h1 class="nickname">
              {{ resume.cnName }}
              <span class="nickname-en">{{ resume.enName }}</span>
            </h1>
            <h3 class="job">{{ resume.job }}</h3>
          </div>
        </div>
        <div class="m-column block">
          <div class="m-column-left">
            <h3 class="block-head">工作经历</h3>
          </div>
          <div class="m-column-right">
            <div class="block-lead"></div>
          </div>
        </div>
        <ul>
          <li class="m-column block-content"
            v-for="(item, index) in resume.experience" :key="index">
            <div class="m-column-left block-left block-left_lead">
              <h4 class="block-content-lead">
                <p class="title">
                  {{ item.company }} /
                  <span class="title-addition">{{ item.period }}</span>
                </p>
                <b class="addition">{{ item.post }}</b>
              </h4>
            </div>
            <div class="m-column-right block-right block-right_lead">
              <ul>
                <li class="block-content-desc" v-for="(exp, eInd) in item.project" :key="eInd">
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
        <div class="m-column block">
          <div class="m-column-left">
            <h3 class="block-head">联系方式</h3>
            <ul class="contact">
              <li class="contact-item" v-for="(item, index) in resume.contact"
                  :key="index" :data-type="index">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="m-column-right">
            <h3 class="block-head">专业技能</h3>
            <ul class="skill">
              <li class="skill-item" v-for="(item, index) in resume.skill"
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
// const a4Height = 841.89;

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
    window.onresize = () => {
      this.scaleRatio = window.innerWidth / a4Width;
    };
  },
  methods: {
    render() {
      const cntElem = document.querySelector('#resume');
      const shareContent = cntElem;// 需要截图的包裹的（原生的）DOM 对象
      const width = shareContent.offsetWidth; // 获取dom 宽度
      const height = shareContent.offsetHeight; // 获取dom 高度
      const canvas = document.createElement('canvas'); // 创建一个canvas节点
      const scale = 4; // 定义任意放大倍数 支持小数
      canvas.width = width * scale; // 定义canvas 宽度 * 缩放
      canvas.height = height * scale; // 定义canvas高度 *缩放
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
      const { canvas } = this;
      const imgURL = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      window.open(imgURL);
    },
    render2Pdf() {
      const { canvas } = this;
      const contentWidth = canvas.width;
      const contentHeight = canvas.height;
      // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      const imgWidth = 555.28;
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

<style scoped>
#app {
  max-width: 100%;
  min-width: 595.28px;
}
.m-column {
  display: flex;
  &-left {
    flex: 1;
    padding-right: 25px;
    text-align: right;
  }
  &-right {
    width: 55%;
    text-align: right;
  }
  &.block {
    margin-top: 10px;
  }
}
.option {
  box-shadow: 0 0 2px rgba(0,0,0,0.25);
  &-item {
    display: inline-block;
    cursor: pointer;
    padding: 10px 20px;
    border-right: 1px solid #eee;/* no */
    font-size: 12px;
  }
}
.main {
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling:touch;
}
.resume {
  position: relative;
  padding: 20px 0 0 0;
  width: 595.28px;
  margin: auto;
  &::before {
    content: '';
    display: block;
    width: 90%;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: #333;
  }
}
.head {
  padding: 25px 0;
  align-items: center;
  text-align: left;
  .avatar {
    width: 100px;
    height: 100px;
  }
  .nickname {
    font-size: 24px;
    font-weight: 500;
    &-en {
      margin-left: 10px;
      font-size: 20px;
    }
  }
  .job {
    font-size: 16px;
    font-weight: 300;
  }
  &-left {
    text-align: right;
  }
  &-right {
    text-align: left;
  }
}
.block {
  &-head {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0 0 0 20px;
    border-bottom: 2px solid #333;/* no */
    text-align: right;
  }
  &-lead {
    height: 30px;
    border-bottom: 1px solid #ccc;/* no */
  }
  &-content {
    padding: 10px 0;
    font-size: 10px;
    &-lead {
      font-weight: 400;
      .title {
        font-weight: 500;
        &-addition {
          font-weight: 400;
        }
      }
    }
    &-desc {
      text-align: left;
      .title {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      }
      ol.content {
        padding-left: 10px;
        li + li {
          margin-top: 4px;
        }
      }
    }
  }
  &-left {

    &_lead {
      padding-top: 30px;
      &::before, &::after {
        content: '';
        position: absolute;
        right: 5%;
      }
      &::before {
        top: 14px;
        height: 1px;/* no */
        width: 95%;
        background: #ccc;
      }
      &::after {
        width: 6px;
        height: 6px;
        top: 12px;
        border-radius: 50%;
        background: #666;
      }
    }
  }
}
.contact {
  padding: 10px 0;
  &-item {
    height: 40px;
    line-height: 40px;
    padding-right: 36px;
    font-size: 12px;
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 24px;
      width: 24px;
      background-repeat: no-repeat;
      background-size: contain;
    }
    &[data-type='email']::after {
      background-image: url('../assets/img/icon-mail.svg');
    }
    &[data-type='phone']::after {
      background-image: url('../assets/img/icon-phone.svg');
    }
    &[data-type='blog']::after {
      background-image: url('../assets/img/icon-link.svg');
    }
    &[data-type='github']::after {
      background-image: url('../assets/img/icon-github.svg');
    }
  }
}
.skill {
  padding: 15px 0;
  text-align: left;
  font-size: 10px;
  &-item {
    margin-top: 4px;
  }
}
</style>
