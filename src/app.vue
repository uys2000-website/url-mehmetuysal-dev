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
  },
  computed: {
    isLogged() {
      return this.mainStore.isLogged
    }
  },
  methods: {
    redirectToGenerator() {
      this.$router.push("/")
    },
    checkIsLogged() {
      if (this.$route.path != "/")
        setTimeout(() => {
          if (!getUserId.logger()) {
            alert("Opss you are not logged")
            this.redirectToGenerator()
          }
        }, 1000);
    },
  },
  watch: {
    async isLogged() {
      if (this.isLogged == false) this.redirectToGenerator()
    }
  },
  mounted() {
    this.checkIsLogged()
  }
})
</script>