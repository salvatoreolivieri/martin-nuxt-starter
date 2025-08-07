<template>
  <div>
    <!-- Header -->
    <div class="w-full flex justify-between px-10 py-4">
      <UBreadcrumb
        :items="[{ label: 'Home', icon: 'i-lucide-house', class: 'text-default' }]"
      />

      <ColorModeButton />
    </div>

    <slot />
  </div>
</template>
