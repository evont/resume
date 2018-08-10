<template>
  <div class="u-dialog" :data-isreply="type === 'reply' ? 1 : 0">
    <transition
      name="tst-dialog" mode="out-in" tag="div"
      v-on:before-enter="scrollView"
      v-on:enter="scrollView"
      v-on:before-leave="scrollView"
    >
      <div v-if="isLoading"
        class="detail"
        key="loading"
        >
        <loading></loading>
      </div>
      <div v-else
        class="detail"
        :data-tag="content.tag"
        key="detail"
        v-html="htmlContent"></div>
    </transition>
  </div>
</template>

<script>
import Loading from './Loading';

export default {
  name: 'Dialog',
  props: ['content', 'type'],
  components: { Loading },
  data() {
    return {
      isLoading: true,
    };
  },
  created() {
    this.isLoading = this.type !== 'reply';
  },
  mounted() {
    const delay = parseInt(Math.random() * 200, 10);
    setTimeout(() => {
      this.isLoading = false;
    }, delay);
  },
  methods: {
    scrollView() {
      this.$emit('loadend');
    },
  },
  computed: {
    htmlContent() {
      const { content } = this;
      let contentWidth = '100%';
      const $screen = document.querySelector('.j-screen');
      if ($screen) {
        const maxWidth = document.querySelector('.j-screen').offsetWidth;
        if (content.detail.length > 20 && content.detail.length < 55) {
          contentWidth = `${(content.detail.length / 55) * maxWidth * 0.9}px`;
        }
      }
      let result = `<${content.tag} style="width: ${contentWidth}">${content.detail}</${content.tag}>`;
      if (/img/i.test(content.tag)) {
        result = `<img src=${content.detail} >`;
      }
      if (/a/i.test(content.tag)) {
        result = `<${content.tag} href="${content.link}" target="_black" style="width: ${contentWidth}">${content.detail}</${content.tag}>`;
      }
      return result;
    },
  },
};
</script>
