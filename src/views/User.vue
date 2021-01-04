<template>
  <div id="app">
    <h1>User page</h1>
    <p>This is the User page content</p>
    <p>id is {{ id }}</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      id: ''
    };
  },
  watch: {
    '$route'(to, from) {
      console.log('参数的变化可以被监听到');
      console.log('watch $route', to, from);
      this.id = this.$route.params.id;
    }
  }
};
</script>
