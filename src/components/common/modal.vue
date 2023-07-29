<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="isPersistent ? () => '' : _closeModal" @click="isPersistent ? () => '' : _closeModal"
      class="relative z-10">
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-w-full min-h-full items-center justify-center p-4 text-center h-1/2 w-1/2 bg-primary">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel>
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
export default {
  components: { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    isPersistent: {
      type: Boolean,
      required: false
    },
    closeModal: {
      type: Function,
      required: false
    }
  },
  methods: {
    _closeModal() {
      console.log("---")
      if (this.closeModal) this.closeModal()
    }
  },
}
</script>