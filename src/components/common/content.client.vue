<template>
  <div class="ql-snow">
    <div class="ql-editor" v-html="html">
    </div>
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
  props: {
    html: {
      type: String,
      required: true,
    }
  }
}
</script>