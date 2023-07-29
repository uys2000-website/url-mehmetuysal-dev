<template>
    <template v-if="isContent()">
        <CommonSite />
    </template>
    <template v-else>
        <CommonUser :path="$route.path.replace(/\//g, '')" />
    </template>
</template>

<script lang="ts">
export default {
    methods: {
        isContent() {
            const params = this.$route.params.page
            if (params.length != 1) return true
            if (isHex(params[0])) return false
            return true
        }
    }
}
</script>