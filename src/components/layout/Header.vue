<template>
  <header class="header">
    <h1 class="title">Vue js - Route demo</h1>
    <div id="nav">
      <router-link to="/" class="active">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contact">Contact</router-link> |
      <!-- path注意事项 -->
      <!-- No slash in the biggining or ./ means a relative url to the current one. -->
      <!-- A starting slash means an absolute url. -->
      <router-link :to="{ path: '/blog', query: { name: 'query' }}">Blog</router-link> |
      <!-- params vs query -->
      <!-- 1. url地址显示 -->
      <!-- 2. 刷新: query不会丢失; params会丢失 -->
      <!-- 3. router配置，params需要显示配置 -->
      <router-link :to="{name: 'contact', params: { name: 'params' }}">Params</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  watch: {
    '$route'(to, from) {
      console.log('参数的变化可以被监听到');
      console.log('watch $route', to, from);
    }
  }
};
</script>

<style scoped>
  .title{
    margin-bottom: 20px;
  }
  .header {
    background: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
  }

  .header a {
    color: #d4d4d4;
    padding-right: 5px;
    text-decoration: none;
    transition: all .3s;
  }

  .header a.active,
  .header a:hover,
  .header a:focus {
    color: #fff;
  }
</style>

