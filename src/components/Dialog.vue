<template>
  <div class="u-dialog" :data-isreply="type === 'reply' ? 1 : 0">
    <transition
      name="tst-dialog" mode="out-in" tag="div"
      v-on:enter="onEnter"
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
  props: ['content', 'index', 'type'],
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
    onEnter(el) {
      el.scrollIntoView();
    },
  },
  computed: {
    htmlContent() {
      const { content } = this;
      let result = `<${content.tag}>${content.detail}</${content.tag}>`;
      if (/img/i.test(content.tag)) {
        result = `<img src=${content.detail} >`;
      }
      if (/a/i.test(content.tag)) {
        result = `<${content.tag} href="${content.link}">${content.detail}</${content.tag}>`;
      }
      return result;
    },
  },
};
</script>
