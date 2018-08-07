<template>
  <div class="m-content">
    <div class="j-dialog m-dialog">
      <transition-group
        name="tst-dialog" mode="out-in" tag="div"
      >
        <Dialog
          v-for="(item, index) in dialogs"
          v-if="item"
          :key="index"
          :content="item"
          :type="item.type || 'normal'">
        </Dialog>
      </transition-group>
    </div>
    <reply :replies="replies" v-on:reply="onReply"></reply>
  </div>
</template>

<script>
import Dialog from './Dialog';
import Reply from './Reply';
import dialog from '../data/dialog';

export default {
  name: 'Content',
  data() {
    return {
      replies: [],
      dialogs: [],
      content: [],
      info: {},
      lastUpdated: false,
    };
  },
  created() {
    this.loadDialog(1);
  },
  components: {
    Dialog, Reply,
  },
  methods: {
    onReply(item) {
      const nextId = item.next;
      this.addMsg(item, true);
      this.replies = [];
      setTimeout(() => {
        this.loadDialog(nextId);
      }, 800);
    },
    loadDialog(id) {
      const info = dialog.dialogs.find(item => item.id === id);
      const content = info ? info.content : [];
      this.info = info;
      this.sequence(content);
    },
    sequence(tasks) {
      for (let index = 0, len = tasks.length + 1; index < len; index += 1) {
        setTimeout(() => {
          const item = this.info.content[index];
          if (item) {
            this.addMsg(item);
          }
          if (index === this.info.content.length && this.info.response) {
            this.replies = this.info.response;
          }
        }, 2000 * index);
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
