<template>
  <form @submit.prevent="runForm" class="h-[1/2]">

    <div :class="{ flex: updateMode }">
      <label for="reset">
        <button name="reset" type="submit" v-if="updateMode">Cancel</button>
      </label>
      <label for="submit">
        <button class="!w-full" name="submit" type="submit">{{ updateMode ? "Update" : "Generate" }}</button>
      </label>
    </div>
    <div>
      <h3>Url Settings</h3>
      <div>
        <label for="url">
          <input name="url" type="text" v-model="url.urlOrginal">
        </label>
        <label for="url-usage-limit">
          Url Usage Limit
          <input class="w-1/2" name="url-usage-limit" type="number" v-model.number="url.urlUsageLimit">
        </label>
      </div>
    </div>
    <div>
      <h3>Page Settings</h3>
      <div>
        <label for="url-backgorund-url">
          Url Background Url
          <input class="w-1/2" name="url-backgorund-url" type="text" v-model.number="url.urlBackground">
        </label>
        <label for="url-redirection-timer">
          Url Redirection Timer
          <input class="w-1/2" name="url-redirection-timer" type="number" v-model.number="url.urlRedirectionTimer">
        </label>
      </div>
    </div>
    <div>
      <h3>Privacy Settings</h3>
      <div>
        <label for="url-has-password">
          Url Has Password
          <input name="url-has-password" type="checkbox" v-model="hasPassword">
        </label>
        <CommonTransition>
          <template v-if="hasPassword">
            <label for="url-password">
              Url Password
              <input class="w-1/2" name="url-password" type="password" v-model.number="password">
            </label>
          </template>
        </CommonTransition>
      </div>
    </div>
    <div>
      <h3>Content Settings</h3>
      <div>
        <label for="url-has-content">
          Url Has Custom Content
          <input name="url-has-content" type="checkbox" v-model="hasContent">
        </label>
        <template v-if="hasContent">
          <CommonQuill ref="quill" />
        </template>
      </div>
    </div>

  </form>
  <div id="show-room" class="h-5" v-if="!updateMode">
    <div v-if="generatedUrl">
      Generated Url: <a :href="`https://${generatedUrl}${debugParamater}`">{{ generatedUrl }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import QuillClient from 'components/common/quill.client.vue';
import { UrlData } from "~/types/url";

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
      url: {} as UrlData,
      hasContent: false,
      hasPassword: false,
      password: "",
      generatedUrl: "",

    }
  },
  computed: {
    debugParamater() {
      return onLocal() ? "debug" : "";
    }
  },
  methods: {
    setUrl(url: UrlData) {
      this.url = url
    },
    async createUser(index: string) {
      if (this.hasPassword)
        return createAuth.pLogger(index, this.password).catch(() => false)
      else return new Promise((r) => r(false))
    },
    async updateUser(index: string) {
      try {
        if (this.hasPassword)
          await updateAuth.pLogger(index, this.password)
        return true
      } catch { return false }
    },
    async createNewUrl(index: number) {
      const _index = index + 0x1;
      const _indexString = getStringFromHex(_index)
      const isUserCreated = await this.createUser(_indexString)
      const user = getUserId()
      const url = new UrlData(
        this.url.urlOrginal,
        _index,
        this.url.urlUsageLimit,
        this.hasContent ? (this.$refs.quill as typeof QuillClient).getContent() : undefined,
        this.url.urlBackground as string,
        this.url.urlRedirectionTimer,
        this.hasPassword && isUserCreated ? _indexString : undefined,
        user ? user : undefined);
      await createUrl.pLogger(_indexString, url);
      return url
    },
    async updateCurrentUrl() {
      const index = getStringFromHex(this.url.urlIndex)
      const user = await this.updateUser(index)
      this.url.urlContent = this.hasContent ? (this.$refs.quill as typeof QuillClient).getContent() : ""
      return await updateUrl.pLogger(index, this.url).then(() => {
        if (this.cancel) this.cancel()
      })
    },
    async runForm() {
      if (this.updateMode) return this.updateCurrentUrl()
      const { index } = await getLastUrl.logger();
      const currentUrl = await this.createNewUrl(index);
      this.generatedUrl = "suys.jw.lt/" + getStringFromHex(currentUrl.urlIndex);

    }
  },
  mounted() {
    this.url.urlOrginal = "mehmetuysal.dev"
    this.url.urlUsageLimit = 1
    this.url.urlRedirectionTimer = 10
  }
}
</script>