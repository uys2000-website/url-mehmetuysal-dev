<template>
  <div class="w-full max-w-md md:px-8 py-10 sm:px-0 bg-primary">
    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab @click="tabChange">
          Basic URL Update
        </Tab>
        <Tab @click="tabChange">
          Advanced
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel>
          <GeneratorBasic ref="basic" :update-mode="updateMode" :cancel="cancel" />
        </TabPanel>
        <TabPanel>
          <template v-if="getUserId()">
            <GeneratorAdvanced ref="basic" :update-mode="updateMode" :cancel="cancel" />
          </template>
          <template v-else>
            You should Login to see
          </template>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import Basic from './basic.vue';

export default {
  components: { TabGroup, TabList, Tab, TabPanels, TabPanel },
  props: {
    updateMode: {
      type: Boolean,
    },
    cancel: {
      type: Function
    }
  },
  data() {
    return {
      url: {} as UrlData
    }
  },
  methods: {
    tabChange() {
      if (this.url.urlOrginal) this.setUrl(this.url)
    },
    setUrl(url: UrlData) {
      setTimeout(() => {
        this.url = url;
        const basic = (this.$refs.basic as typeof Basic)
        if (basic) basic.setUrl(url)
      })
    }
  }
}
</script>