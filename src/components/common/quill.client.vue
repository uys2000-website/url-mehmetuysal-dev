<template>
  <QuillEditor ref="quill" theme="snow"></QuillEditor>
</template>

<script lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: { QuillEditor },

  methods: {
    getContent() {
      const quill = this.$refs.quill as typeof QuillEditor
      return quill.getHTML()
    },
    setContent(content: string) {
      const quill = this.$refs.quill as typeof QuillEditor
      return quill.setHTML(content)
    }
  }
}
</script>