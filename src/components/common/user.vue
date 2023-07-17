<template>
  <div v-if="url">
    {{ url }}
  </div>
</template>

<script lang="ts">
import { Url } from "@/types/url";
import { Timer } from "~/types/timer";
export default {
  props: {
    path: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      timer: new Timer(),
      url: undefined as Url | undefined,
    }
  },
  methods: {
    async isUrlExists() {
      const request = await useLazyFetch(`/api/url/${this.path}`)
      await request.execute()
      const data = request.data.value as any
      if (!data || data.hasError) return false;
      this.url = data as Url
    }
  },
  watch: {
    url() {
      this.timer.end(true)
      setTimeout(() => {
        if (this.url) {
          const url = this.url.urlOrginal.includes("http") ? this.url.urlOrginal : "http://" + this.url.urlOrginal;
          window.location.href = url;
        }
      }, this.url?.urlRedirectionTimer);
    }
  },
  mounted() {
    this.timer.start()
    this.isUrlExists()
  }
}
</script>