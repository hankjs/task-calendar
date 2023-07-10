<script setup lang="ts">
</script>

<template>
  <div class="page-box">
    <Suspense>
      <router-view />
    </Suspense>
  </div>
</template>

<style scoped lang="scss">
.page-box {
  width: 100vw;
  height: 100vh;
}
</style>
