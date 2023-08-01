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
      <tr v-for="link, index in links" :key="index">
        <td>
          {{ link.urlOrginal }}
        </td>
        <td>
          <a :href="`http://suys.jw.lt/${getStringFromHex(link.urlIndex)}${debugParamater}`">
            http://suys.jw.lt/{{ getStringFromHex(link.urlIndex) }}
          </a>
        </td>
        <td>
          {{ link.urlUsageLimit - link.urlUsage }}
        </td>
        <td>
          <button class="text-2xl" @click="openUpdateModal(link)">
            ✎
          </button>
        </td>
        <td>
          <button class="text-lime-400" @click="deleteUrl(link.urlIndex, index)" :disabled="buttons[index]">
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

  <CommonModal :is-open="isEditing" :is-persistent="false" :close-modal="closeUpdateModal">
    <GeneratorTemplate ref="generator" update-mode :cancel="closeUpdateModal" />
  </CommonModal>
</template>

<script lang="ts">
import Generator from 'components/generator/template.vue';
import { Url } from '~/types/url';


export default {
  data() {
    return {
      mainStore: useMainStore(),
      links: [] as Url[],
      buttons: [] as boolean[],
      isEditing: false,
    }
  },
  computed: {
    isLogged() {
      return this.mainStore.isLogged;
    },
    debugParamater() {
      return onLocal() ? "debug" : "";
    }
  },
  methods: {
    getUrls(startWith?: number, toForward: boolean = true) {
      getUrls.pLogger(getUserId.logger() as string, startWith, toForward).then(result => {
        if (result.length > 0)
          this.buttons = Array(result.length - 1).fill(true)
        this.links = toForward ? result as Url[] : result.reverse() as Url[]
      })
    },
    deleteUrl(index: number, i: number) {
      this.buttons[i] = false
      deleteUrl.pLogger(getStringFromHex(index)).then(({ data: { value } }: any) => {
        if (!value.success) return;
        this.links.splice(i, 1)
        this.buttons.splice(i, 1)
      })
    },
    lastPage() {
      const docTimestamp = this.links[0]?.timestamp;
      this.getUrls(docTimestamp, false)
    },
    nextPage() {
      const docTimestamp = this.links[this.links.length - 1]?.timestamp;
      this.getUrls(docTimestamp, true)
    },
    openUpdateModal(link: Url) {
      this.isEditing = true;
      setTimeout(() => {
        (this.$refs.generator as typeof Generator).setUrl(link)
      })
    },
    closeUpdateModal() {
      this.isEditing = false
    }
  },
  watch: {
    async isLogged() {
      if (this.isLogged == true) this.getUrls(undefined, true)
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