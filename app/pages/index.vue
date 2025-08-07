<script lang="ts" setup>
import { useCounterStore } from "~/stores/counter"

const {
  x,
  y,
} = useMouse()

useHead({
  title: "Starter template",
})
const {
  setLocale,
  locale,
  t,
} = useI18n()

const store = useCounterStore()
const {
  count,
  doubleCount,
} = storeToRefs(store)

const { addNotificationError } = useNotifications()
</script>

<template>
  <UContainer class="flex items-center gap-4">
    <h1>Hello world</h1>
    <button @click="locale === 'it' ? setLocale('en') : setLocale('it')">
      change locale
    </button>
    <p>
      current locale: {{ locale }}
      {{ t('success') }}
    </p>
    <br>

    <button @click="store.increment">
      increment
    </button>

    count: {{ count }}
    doubleCount: {{ doubleCount }}

    <button
      @click="addNotificationError({
        key: 'signUp',
      })"
    >
      add notifiction
    </button>

    <ExamplesModal />

    <ExamplesProgramaticalModalButton />

    <ExamplesSlideover />

    <div>VueUse mouse pos: {{ x }}, {{ y }}</div>
  </UContainer>
</template>
