<template>
  <div class="w-full max-w-md px-2 py-16 sm:px-0">
    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab>
          Basic
        </Tab>
        <Tab>
          Advanced
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel>
          <GeneratorBasic />
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
export default {
  components: { TabGroup, TabList, Tab, TabPanels, TabPanel },
  data() {
    return {}
  },
}
</script>
