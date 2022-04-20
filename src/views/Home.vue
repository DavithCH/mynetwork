<template>
  <div class="row home">
    <div class="col-3 my-3"></div>
    <div class="col-8 my-3 border post-wrapper"><Posts /></div>
  </div>
</template>

<script setup>
import Posts from '../components/Posts.vue';
</script>

<style scoped>
.post-wrapper {
  height: 90vh;
  overflow-y: scroll;
}
.home {
  overflow-y: hidden;
}

body {
  margin: 0;
}
</style>
