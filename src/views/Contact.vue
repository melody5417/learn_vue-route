<template>
  <div class="contact">
    <h1>Contact</h1>
    <p>This is the contact page content</p>
    <p>name: {{ name }}</p>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  components: {
  },
  data() {
    return {
      name: 'default',
      msg: 'beforeRouteEnter不能访问this，可以通过next回调访问实例组件'
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log('组件内守卫 beforeRouteEnter', to, from, next);
    next((vm) => {
      console.log('组件内守卫 beforeRouteEnter next 回调', vm, vm.msg);
    });
  },
  beforeRouteUpdate(to, from, next) {
    // 参数或查询的改变不会触发进入/离开的导航守卫。
    // 可以通过观察 $route 对象或使用 beforeRouteUpdate 的组件内守卫。
    console.log('组件内守卫 beforeRouteUpdate', to, from, next, this);
    this.name = to.params.name;
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('组件内守卫 beforeRouteLeave', to, from, next, this);
    next();
  }
};
</script>
