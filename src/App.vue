<template>
  <div>
    <h2>as2d1a</h2>
    Hello world {{txt}}
    <div>
      <input type="text" v-model="txt" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      txt: 'ok'
    }
  }
}
</script>
<style>

</style>
