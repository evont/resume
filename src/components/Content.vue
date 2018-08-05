<template>
  <div class="m-content">
    <div class="m-dialog">
        <dialog-item
          v-for="item in dialogs"
          :key="item.id"
          :content="item"
          :type="item.type || 'normal'">
        </dialog-item>
    </div>
    <reply :replies="replies" v-on:reply="onReply"></reply>
  </div>
</template>

<script>
import DialogItem from './DialogItem';
import Reply from './Reply';
import dialog from '../assets/dialog.json';

export default {
  name: 'Content',
  data() {
    return {
      replies: [],
      dialogs: [],
    };
  },
  created() {
    this.loadDialog(1);
  },
  components: {
    DialogItem, Reply,
  },
  methods: {
    onReply(msg) {
      this.addMsg(msg);
    },
    loadDialog(id) {
      const info = dialog.dialogs.find(item => item.id === id);
      const content = info ? info.content : [];
      for (let i = 0, len = content.length; i < len; i += 1) {
        setTimeout(() => {
          this.addMsg(content[i]);
        }, i * 2500);
      }
    },
    addMsg(msg, isReply = false) {
      const message = msg;
      if (isReply) {
        message.type = 'reply';
      }
      this.dialogs.push(message);
    },
  },
};
</script>
