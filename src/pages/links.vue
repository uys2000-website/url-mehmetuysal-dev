<template>
  <table class="max-h-40 overflow-auto">
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
          {{ getStringFromHex(link.urlIndex) }}
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
          <button class="text-lime-400" @click="deleteUrl(link.urlIndex)">
            X
          </button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">
          <button @click="lastPage">
            Last Page
          </button>
        </td>
        <td></td>
        <td colspan="2">
          <button @click="nextPage">
            Next Page
          </button>
        </td>
      </tr>
    </tfoot>
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
        if (!getUserId.logger()) {
          alert("Opss you are not logged")
          this.redirectToGenerator()
        }
      }, 1000);
    },
    getUrls(startWith?: number, toForward: boolean = true) {
      getUrls.pLogger(getUserId.logger() as string, startWith, toForward).then(result => {
        this.links = toForward ? result as Url[] : result.reverse() as Url[]
      })
    },
    deleteUrl(index: number) {
      deleteUrl.pLogger(getStringFromHex(index)).then(() => {
        this.links = this.links.filter(link => link.urlIndex != index)
      })
    },
    lastPage() {
      const docTimestamp = this.links[0]?.timestamp;
      this.getUrls(docTimestamp, false)
    },
    nextPage() {
      const docTimestamp = this.links[this.links.length - 1]?.timestamp;
      this.getUrls(docTimestamp, true)
    }
  },
  watch: {
    async isLogged() {
      if (this.isLogged == false) this.redirectToGenerator()
      else this.getUrls(undefined, true)
    }
  },
  mounted() {
    if (this.isLogged) this.getUrls(undefined, true)
  },
}
</script>

<style>
th,
td {
  @apply px-2 py-1;
}
</style>