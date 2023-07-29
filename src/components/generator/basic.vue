<template>
  <form @submit.prevent="runForm">
    <label for="url">
      <input name="url" type="text" v-model="url.urlOrginal">
    </label>
    <label for="url-usage-limit">
      Url Usage Limit
      <input class="w-1/2" name="url-usage-limit" type="number" v-model.number="url.urlUsageLimit">
    </label>
    <div :class="{ flex: updateMode }">
      <label for="reset">
        <button name="reset" type="submit" v-if="updateMode">Cancel</button>
      </label>
      <label for="submit">
        <button name="submit" type="submit">{{ updateMode ? "Update" : "Generate" }}</button>
      </label>
    </div>
  </form>
  <div id="show-room" class="h-5" v-if="!updateMode">
    <div v-if="generatedUrl">
      Generated Url: <a :href="`https://${generatedUrl}${debugParamater}`">{{ generatedUrl }}</a>
    </div>
  </div>
</template>


<script lang="ts">
import { Url } from '~/types/url'

export default {
  props: {
    updateMode: {
      type: Boolean
    },
    cancel: {
      type: Function
    }
  },
  data() {
    return {
      url: {} as Url,
      generatedUrl: "",
    }
  },
  computed: {
    debugParamater() {
      return onLocal() ? "debug" : "";
    }
  },
  methods: {
    setUrl(url: Url) {
      this.url = url
    },
    async getLastUrl() {
      const { data } = await useFetch("/api/url");
      if (data && data.value && data.value.index) return data.value.index;
      else return 0;
    },
    async createNewUrl(index: number) {
      const _index = index + 0x1;
      const user = useMainAuth().currentUser?.uid
      const url = new Url(this.url.urlOrginal, _index, this.url.urlUsageLimit, ...[...Array(4).fill(undefined).values()], user ? user : undefined);
      await createUrl.pLogger(getStringFromHex(_index), url);
      return url
    },
    async updateCurrentUrl() {
      return await updateUrl.pLogger(getStringFromHex(this.url.urlIndex), this.url).then(() => {
        if (this.cancel) this.cancel()
      })
    },
    async runForm() {
      if (this.updateMode) return this.updateCurrentUrl()
      const lastUrlIndex = await this.getLastUrl.logger();
      const currentUrl = await this.createNewUrl(lastUrlIndex);
      this.generatedUrl = "suys.jw.lt/" + getStringFromHex(currentUrl.urlIndex);
    },
  },
  mounted() {
    this.url.urlOrginal = "mehmetuysal.dev"
    this.url.urlUsageLimit = 1
  }
}
</script>