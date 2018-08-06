<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  position: relative;
}
html, body {
  height: 100%;
  font-size: 14px;/* no */
}
a {
  text-decoration: none;
  color: #2c3e50;
}
ul {
  list-style: none;
}
::-webkit-scrollbar {
  display: none;
}
#app {
  height: 100%;
  min-width: 320px;/* no */
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
