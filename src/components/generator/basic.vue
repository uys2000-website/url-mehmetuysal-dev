<template>
  <form @submit.prevent="generate">
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
export default {
  data() {
    return {
      url: "mehmetuysal.dev",
      limit: 2,
      generatedUrl: ""
    }
  },
  methods: {
    generate() {
      this.generatedUrl = "suys.jw.lt/" + getNextUrl()
    }
  }
}
</script>