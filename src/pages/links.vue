<template>
  <table>
    <thead>
      <tr>
        <th>
          Orginal Url
        </th>
        <th>
          Short Url
        </th>
        <th>
          Usage Left
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="links.length == 0">
        <tr>
          <td>
            No links
          </td>
        </tr>
      </template>
      <tr v-for="link in links" :key="link.urlIndex">
        <td>
          {{ link.urlOrginal }}
        </td>
        <td>
          {{ link.urlIndex }}
        </td>
        <td>
          {{ link.urlUsageLimit - link.urlUsage }}
        </td>
        <td>
          <button class="text-2xl">
            ✎
          </button>
        </td>
        <td>
          <button class="text-lime-400">
            X
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Url } from '~/types/url';


export default {
  data() {
    return {
      mainStore: useMainStore(),
      links: [] as Url[]
    }
  },
  computed: {
    isLogged() {
      return this.mainStore.isLogged
    }
  },
  methods: {
    redirectToGenerator() {
      this.links = []
      this.$router.push("/")
    },
    checkIsLogged() {
      setTimeout(() => {
        if (!getUser()) {
          alert("Opss you are not logged")
          this.redirectToGenerator()
        }
      }, 1000);
    },
    getUrls() {
      getUrls(getUser()?.uid as string).then(result => {
        this.links = result.docs.map(rawDoc => rawDoc.data() as Url)
      })
    }
  },
  watch: {
    async isLogged() {
      if (this.isLogged == false) this.redirectToGenerator()
      else this.getUrls()
    }
  },
  mounted() {
    if (this.isLogged) this.getUrls()
  },
}
</script>

<style>
th,
td {
  @apply px-2 py-1;
}
</style>