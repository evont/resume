<template>
  <div class="m-content">
    <div class="m-dialog">
      <transition-group
        name="tst-dialog" mode="out-in" tag="div"
        v-on:after-enter="onMsgEnter"
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
        }, 1600 * index);
      }
    },
    onMsgEnter() {
      // const index = this.i;
      // if (index === this.info.content.length && this.info.response){
      //   this.replies = this.info.response;
      // }
      // const item = this.info.content[index];
      // if (item) {
      //   this.addMsg(item);
      // }
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
