import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

// 重写push，解决push相同path报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  // 可以在router中访问跟实例，进而访问vuex
  // if (this.app && this.app.$store) {
  //   this.app.$store.dispatch('XX', { isNEDrawerShow: false });
  // }
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      beforeEnter: (to, from, next) => {
        console.log('路由独享的守卫 beforeEnter', to, from, next);
        next();
      }
    },
    {
      // 配置可选的路由参数
      path: '/contact/:name?',
      name: 'contact',
      component: () => import('./views/Contact.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('./views/Blog.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log('全局前置守卫 beforeEach', to, from, next);

  // 一定要调用next来resolve这个钩子
  next(); // 进行管道中下一个钩子，如果钩子全部执行完，则导航的状态就改为confirmed。
  // next(false); // 中断当前导航
  // next('/');  // 或者 next({path: '/'}); 当前的导航被打断，跳转到新的导航。
  // next(new Error('error message')); // 导航终止，且该错误被传递给 router.onError() 注册的回调
});

router.afterEach((to, from) => {
  console.log('全局后置守卫 afterEach', to, from);
});

export default router
;
