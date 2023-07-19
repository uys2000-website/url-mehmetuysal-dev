<template>
  <RouterLink class="fixed left-5 top-5" to="links" v-if="mainStore.isLogged && $route.path != '/links'">
    <button>
      Links
    </button>
  </RouterLink>
  <RouterLink class="fixed left-5 top-5" to="/" v-else>
    <button>
      Generator
    </button>
  </RouterLink>
</template>

<script lang="ts">
export default {
  data() {
    return {
      mainStore: useMainStore()
    }
  }
}
</script>