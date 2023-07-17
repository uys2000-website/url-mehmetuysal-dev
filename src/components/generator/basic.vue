<template>
  <form @submit.prevent="runForm">
    <label for="url">
      <input name="url" type="text" v-model="url">
    </label>
    <label for="url-usage-limit">
      Url Usage Limit
      <input class="w-1/2" name="url-usage-limit" type="number" v-model.number="limit">
    </label>
    <label for="submit">
      <button name="submit" type="submit">Generate</button>
    </label>
  </form>
  <div id="show-room" class="h-5">
    <div v-if="generatedUrl">
      Generated Url: <a :href="`https://${generatedUrl}`">{{ generatedUrl }}</a>
    </div>
  </div>
</template>


<script lang="ts">
import { Url } from '~/types/url'
import { Timer } from '~/types/timer'

export default {
  data() {
    return {
      mainStore: useMainStore(),
      url: "mehmetuysal.dev",
      limit: 1,
      generatedUrl: "",
      timer: new Timer()
    }
  },
  methods: {
    async getLastUrl() {
      const { data } = await useFetch("/api/url");
      if (data && data.value && data.value.index) return data.value.index;
      else return 0;
    },
    async createNewUrl(index: number) {
      const _index = index + 0x1;
      const user = useMainAuth().currentUser?.uid
      const url = new Url(this.url, _index, this.limit, ...[...Array(4).fill(undefined).values()], user ? user : undefined);
      await createUrl(getStringFromHex(_index), url);
      return url
    },
    async runForm() {
      this.timer.start()
      const lastUrlIndex = await this.getLastUrl();
      const currentUrl = await this.createNewUrl(lastUrlIndex);
      this.generatedUrl = "suys.jw.lt/" + getStringFromHex(currentUrl.urlIndex);
      this.timer.end(true)
    },

  }
}
</script>