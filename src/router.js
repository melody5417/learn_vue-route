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

// 路由匹配的优先级：谁先定义，谁的优先级更高。
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
      // 规范的命名方式
      // /user/:username/post/:post_id
      // /user/evan/post/123
      path: '/contact/:name?', // 配置可选的路由参数
      name: 'contact', // 这种为命名路由 router-link to时可以通过name进行跳转
      component: () => import('./views/Contact.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('./views/Blog.vue')
    },
    { path: '/user/:id', component: () => import('./views/User.vue'),
      children: [
        {
          // 当 /user/:id/email 匹配成功，
          // Email 会被渲染在 User 的 <router-view> 中
          path: 'email',
          component: () => import('./views/Email.vue')
        }
      ]
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
