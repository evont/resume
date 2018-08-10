<template>
  <div class="m-content">
    <div class="j-dialog m-dialog" ref="content">
      <transition-group
        name="tst-dialog" mode="out-in" tag="div"
      >
        <Dialog
          v-for="(item, index) in dialogs"
          v-if="item"
          :key="index"
          :content="item"
          :type="item.type || 'normal'"
          @loadend="scrollEnd"
        >
        </Dialog>
      </transition-group>
    </div>
    <reply :replies="replies" @reply="onReply"></reply>
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
    };
  },
  created() {
    this.loadDialog(1);
  },
  components: {
    Dialog, Reply,
  },
  methods: {
    scrollEnd() {
      const $content = this.$refs.content;
      $content.scrollTop = $content.scrollHeight;
    },
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
      const { info } = this;
      for (let index = 0, len = tasks.length + 1; index < len; index += 1) {
        setTimeout(() => {
          const item = info.content[index];
          if (item) {
            this.addMsg(item);
          }
          if (index === info.content.length && info.response) {
            this.replies = info.response;
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
