<template>
  <div>
    <router-link to="/">index</router-link>
    <router-link to="/about">about</router-link>
    <router-link to="/me">me</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="less">

</style>
