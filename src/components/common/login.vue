<template>
  <div class="fixed right-5 top-5">
    <ClientOnly>
      <button v-if="!mainStore.isLogged" @click="login">
        Login
      </button>
      <button v-else @click="logout">
        Logout
      </button>
    </ClientOnly>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      mainStore: useMainStore()
    }
  },
  methods: {
    login() {
      this.$device.isDesktop ? loginWithPopup() : loginWithRedirection()
    },
    logout: logout
  },
  mounted() {
    listenAuth((user) => {
      this.mainStore.isLogged = user ? true : false
    })
  }
}
</script>