<script setup lang="ts">
const error = useError();
</script>

<template>
  <div
    class="h-[calc(100vh-10rem)] flex items-center justify-center w-full"
  >
    <CreativeCloud :status-code="error?.statusCode" />
  </div>
</template>
