<template>
  <template v-if="mainStore.isLogged">
    <RouterLink class="fixed left-5 top-5" to="links" v-if="$route.path != '/links'">
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