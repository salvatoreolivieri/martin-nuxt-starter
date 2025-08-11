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

const {
  addNotificationSuccess,
  addNotificationError,
} = useNotifications()
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-3xl">
      Hello world
    </h1>
    <UButton @click="locale === 'it' ? setLocale('en') : setLocale('it')">
      <Icon name="heroicons:language" /> Change locale
    </UButton>
    <p>
      current locale: {{ locale }} -
      {{ t('success') }}
    </p>
    <br>

    <UButton @click="store.increment">
      increment
    </UButton>

    count: {{ count }}
    doubleCount: {{ doubleCount }}

    <UButton
      @click="addNotificationSuccess({
        key: 'signUp',
      })"
    >
      add notifiction success
    </UButton>
    <UButton
      @click="addNotificationError({
        key: 'signUp',
      })"
    >
      add notifiction error
    </UButton>

    <ExamplesModal />

    <ExamplesProgramaticalModalButton />

    <ExamplesSlideover />

    <div>VueUse mouse pos: {{ x }}, {{ y }}</div>

    <div>
      <UFileUpload
        layout="list"
        multiple
        label="Drop your images here"
        description="SVG, PNG, JPG or GIF (max. 2MB)"
        class="w-96"
        :ui="{
          base: 'min-h-48',
        }"
      />
    </div>

    <CustomForm />
  </div>
</template>
