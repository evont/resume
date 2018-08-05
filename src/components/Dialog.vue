<template>
  <div class="m-dialog">
    <dialog-item v-for="item in dialogs" :key="item.id" :dialog="item"></dialog-item>
  </div>
</template>

<script>
import DialogItem from './DialogItem';

export default {
  name: 'Dialog',
  props: ['dialogs'],
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  components: {
    DialogItem
  },
};
</script>
