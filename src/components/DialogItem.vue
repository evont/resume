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
      <div
        v-else-if="content.tag === 'img' && !isLoading"
        class="detail detail_img"
        key="detail"
        :style="`background-image: url(${content.detail})`">
      </div>
      <div v-else
        class="detail"
        key="detail"
        v-html="htmlContent"></div>
    </transition>
  </div>
</template>

<script>
import Loading from './Loading';

export default {
  name: 'DialogItem',
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
      return `<${content.tag}>${content.detail}</${content.tag}>`;
    },
  },
};
</script>
