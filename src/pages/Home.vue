<template>
  <div class="home">
    <div class="home-logo" :data-status="isMounted ? 1 : 0"></div>
    <div class="home-option" :data-status="isMounted ? 1 : 0">
      <router-link class="home-option-link" to="/Animate">查看动态简历</router-link>
      <router-link class="home-option-link" to="/Static">查看静态简历</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isMounted: false,
    };
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
  .home {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 200px;
    max-width: 480px;/* no */
    text-align: center;
    &-logo {
      height: 100px;
      width: 100px;
      margin: 20px auto;
      background: url('/static/img/logo.png') no-repeat center;
      background-size: contain;
      opacity: 0;
      transform: translate(0, 20px);
      transition: all .6s;
      &[data-status='1'] {
        opacity: 1;
        transform: translate(0, 0);
      }
    }
    &-option {
      padding: 20px 0;
      opacity: 0;
      transform: translate(0, -20px);
      transition: all .6s .6s;
      &[data-status='1'] {
        opacity: 1;
        transform: translate(0, 0);
      }

      &-link {
        padding: 0 10px;
        color: #369;
      }
    }
  }
</style>
