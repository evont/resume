<template>
  <div class="animate">
    <div class="animate-main">
      <div class="animate-phone">
        <div class="shell" data-pc></div>
        <div class="j-screen screen">
          <Content></Content>
        </div>
        <div class="header" data-pc>
          <b class="time">{{ time }}</b>
          <div class="bar"></div>
          <span class="status"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Content from '../components/Content';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  components: {
    Content,
  },
  computed: {
    time() {
      const date = new Date();
      const hour = date.getHours();
      let minute = date.getMinutes();
      minute = minute < 10 ? `0${minute}` : minute;
      return `${hour}:${minute}`;
    },
  },
};
</script>

<style>
  @import '../assets/css/resume-animate.css';
</style>
