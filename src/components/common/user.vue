<template>
  <div>
    <template v-if="shouldLogin">
      <form @submit.prevent="runForm">
        <label for="password" class="flex-col">
          Enter Url Password
          <input type="password" name="password" v-model="password">
        </label>
        <button type="submit">Get Link</button>
      </form>
    </template>
    <template v-else>
      <CommonContent v-if="url?.urlContent" :html="url?.urlContent" />
    </template>
  </div>
</template>

<script lang="ts">
import { UrlData } from "~/types/url";

export default {
  props: {
    path: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      mainStore: useMainStore(),
      url: undefined as UrlData | undefined,
      shouldLogin: false,
      password: "",
    }
  },
  methods: {
    startTimer() {
      setTimeout(() => {
        const url = this.url?.urlOrginal as string
        window.location.href = url.indexOf("http") != -1 ? url : "https://" + url
      }, this.url?.urlRedirectionTimer)
    },
    setBackgorund() {
      if (this.url?.urlBackground) {
        document.body.style.backgroundImage = `url("${this.url?.urlBackground}")`
        document.body.style.backgroundPosition = "center"
        document.body.style.backgroundRepeat = "no-repeat"
        document.body.style.backgroundSize = "cover"
      }
    },
    async runForm() {
      await loginToUrl.pLogger(this.path, this.password)
      const token = await getUrlUserToken.pLogger()
      if (!token) return alert("Wrong Password")
      const url = await getUrlLocked.pLogger(this.path, token as string)
      if ('success' in url) return alert("Something Wrong :) Can you send me Url")
      this.shouldLogin = false
      this.url = url
      this.setBackgorund()
      //this.startTimer()
    }
  },
  async mounted() {
    if (process.server) return
    const url = await getUrl.pLogger(this.$route.path)
    if ("success" in url) return this.shouldLogin = true
    this.shouldLogin = false
    this.url = url
    this.setBackgorund()
    this.startTimer()
  },
  watch: {
    shouldLogin() {
      if (this.mainStore.isLoggedToUrl) ""
    }
  }
}
</script>