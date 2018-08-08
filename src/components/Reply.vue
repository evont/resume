<template>
  <div class="m-reply">
    <div class="u-dialog" data-isquestion="1" is="transition-group" name="reply-dialog">
      <div class="detail"
        v-for="(item, index) in replies"
        :key="index"
        @click="$emit('reply', item);"
        v-html="htmlContent(item)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reply',
  props: ['replies'],
  methods: {
    htmlContent(content) {
      return `<${content.tag}>${content.detail}</${content.tag}>`;
    },
  },
};
</script>
