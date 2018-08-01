<template>
  <div class="resume">
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
      <li class="m-column block-content" v-for="(item, index) in resume.experience" :key="index">
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
      </div>
    </div>
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
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
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

<style>
#app {
  max-width: 595.28px;
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
  }
  &.block {
    margin-top: 10px;
  }
}
.resume {
  position: relative;
  padding: 20px 0 0 0;
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
      background-image: url('../assets/img/icon-mail.png');
    }
    &[data-type='phone']::after {
      background-image: url('../assets/img/icon-phone.png');
    }
    &[data-type='blog']::after {
      background-image: url('../assets/img/icon-link.png');
    }
    &[data-type='github']::after {
      background-image: url('../assets/img/icon-github.png');
    }
  }
}
</style>
