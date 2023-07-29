<template>
  <NuxtLayout :name="mainStore.getLayout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      mainStore: useMainStore()
    }
  }
})
</script>