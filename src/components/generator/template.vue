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
          Will Be Added
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { Url } from 'types/url';
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
      url: {} as Url
    }
  },
  methods: {
    tabChange() {
      if (this.url.urlOrginal) this.setUrl(this.url)
    },
    setUrl(url: Url) {
      setTimeout(() => {
        this.url = url;
        const basic = (this.$refs.basic as typeof Basic)
        if (basic) basic.setUrl(url)
      })
    }
  }
}
</script>