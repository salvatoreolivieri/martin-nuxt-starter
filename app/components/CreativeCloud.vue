<script setup lang="ts">
type Props = {
  statusCode?: number
}

defineProps<Props>()

const handleError = () => clearError({ redirect: "/" })
</script>

<template>
  <div class="relative w-full z-0 border-x py-16">
    <div class="w-full">
      <div class="relative pt-48">
        <div
          class="pointer-events-none absolute left-1/2 top-0 size-full max-w-xl -translate-x-1/2 overflow-hidden opacity-50 saturate-[1.25] [mask-image:radial-gradient(closest-side,black_0%,transparent)]"
        >
          <div class="absolute inset-0 flex w-[200vw]">
            <img
              alt=""
              loading="lazy"
              width="887"
              height="267"
              decoding="async"
              data-nimg="1"
              class="relative block h-full w-auto animate-infinite-scroll [--scroll:-100%] [animation-duration:60s] -ml-px"
              src="/assets/img/clouds.png"
              style="color: transparent"
            >
            <img
              alt=""
              loading="lazy"
              width="887"
              height="267"
              decoding="async"
              data-nimg="1"
              class="relative block h-full w-auto animate-infinite-scroll [--scroll:-100%] [animation-duration:60s] -ml-px"
              src="/assets/img/clouds.png"
              style="color: transparent"
            >
          </div>
        </div>
        <div
          class="relative flex flex-col items-center text-center px-6"
        >
          <h2
            class="mt-3 text-balance font-display text-3xl text-neutral-600 sm:text-4xl"
          >
            {{ statusCode === 404 ? 'Not Found' : 'Error Page' }}
          </h2>

          <p class="my-3 text-neutral-500 text-sm">
            {{
              statusCode === 404
                ? 'You reached a page that does not exist.'
                : 'Contact us if you think this is a mistake.'
            }}
          </p>

          <button
            variant="outline"
            @click="handleError"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes infinite-scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-76.8305%);
  }
}

.animate-infinite-scroll {
  animation: infinite-scroll 20s linear infinite;
}
</style>
