import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Animate from '@/pages/Animate';
import Static from '@/pages/Static';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/animate',
      name: 'Animate',
      component: Animate,
    },
    {
      path: '/static',
      name: 'Static',
      component: Static,
    },
  ],
});
