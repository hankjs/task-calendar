<script setup lang="ts">
</script>

<template>
  <div class="pageBox">
    <Suspense>
      <router-view />
    </Suspense>
  </div>
</template>

<style scoped lang="scss">
.pageBox {
  width: 100vw;
  height: 100vh;
}
</style>
