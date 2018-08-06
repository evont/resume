<template>
  <div class="m-content">
    <div class="m-dialog">
      <transition-group
        name="tst-dialog" mode="out-in" tag="div"
        v-on:after-enter="onMsgEnter"
      >
        <dialog-item
          v-for="(item, index) in dialogs"
          v-if="item"
          :key="index"
          :content="item"
          :type="item.type || 'normal'">
        </dialog-item>
      </transition-group>
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
      content: [],
      info: {},
      i: 0,
    };
  },
  created() {
    this.loadDialog(1);
  },
  components: {
    DialogItem, Reply,
  },
  methods: {
    onReply(item) {
      const nextId = item.next;
      this.addMsg(item, true);
      this.replies = [];
      this.loadDialog(nextId, 800);
    },
    loadDialog(id, timeout = 0) {
      const info = dialog.dialogs.find(item => item.id === id);
      const content = info ? info.content : [];
      this.info = info;
      this.i = 0;
      setTimeout(() => {
        this.addMsg(content[this.i]);
      }, timeout);
    },
    onMsgEnter() {
      this.i += 1;
      setTimeout(() => {
        this.addMsg(this.info.content[this.i]);
        if (this.i === this.info.content.length) {
          if (this.info.response) {
            this.replies = this.info.response;
          }
        }
      }, 1400);
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
