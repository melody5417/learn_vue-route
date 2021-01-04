<template>
  <div class="blog">
    <h1>Blog</h1>
    <p>Blog page content</p>
    <p>name: {{ name }}</p>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  components: {
  },
  data() {
    return {
      name: ''
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log('组件内守卫 beforeRouteEnter', to, from, next);
    next((vm) => {
      console.log('组件内守卫 beforeRouteEnter next 回调');
      vm.name = to.query.name;
    });
  }
};
</script>
