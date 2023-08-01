<template>
  <div class="fixed right-5 top-5">
    <button v-if="!mainStore.isLogged" @click="login">
      Login
    </button>
    <button v-else @click="logout">
      Logout
    </button>
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
    listenUrlAuth((user) => {
      this.mainStore.isLoggedToUrl = user ? true : false
    })
  }
}
</script>