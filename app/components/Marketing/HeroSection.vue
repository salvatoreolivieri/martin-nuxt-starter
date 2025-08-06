<script setup lang="ts">
import type { HeroSectionProps } from "./HeroSection.props"

const props = withDefaults(defineProps<HeroSectionProps>(), {
  isLoading: true,
})
</script>

<template>
  <div>
    <p v-if="isLoading">
      IsLoading...
    </p>
    <div v-else class="relative isolate px-6 pt-14 lg:px-8">
      <pre>
        {{ props }}
      </pre>
    </div>
  </div>
</template>
