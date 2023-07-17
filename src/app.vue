<template>
  <NuxtLayout :name="mainStore.getLayout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script>

export default defineComponent({
  data() {
    return {
      mainStore: useMainStore()
    }
  }
})
</script>