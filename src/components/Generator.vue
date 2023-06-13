<template>
    <div class="max-w-md flex flex-col gap-1">
        <div>
            <label class="block" for="url">URL</label>
            <input class="h-8 rounded-sm" type="text" name="url" v-model="url.targetUrl">
        </div>
        <div>
            <button @click="generate">
                Generate
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Url } from '~/types/firestore';
export default {
    name: "Generator",
    data() {
        return {
            url: {
                targetUrl: "",
                numberUrl: 0,
                currentUrl: "",
                isAnonimously: false,
                uID: "",
                count: 0,
                hasCount: false,
                maxCount: 0,
                useMailer: false,
                mail: "",
                showModal: false,
                modalID: "",
                hasBgUrl: false,
                bgUrl: "",
                hasPassword: false,
                isPublic: false,
                wait: 0,
            } as Url
        }
    },
    methods: {
        pushUrl() {

        },
        generateUrl(url: number) {
            const newUrl = url + 1
            this.url.numberUrl = newUrl
            this.url.currentUrl = hexAsString(newUrl)
            console.log("url :", this.url)
        },
        generate() {
            getLastUrl().then((result) => {
                console.log(result)
                if (!result) this.generateUrl(0)
                else this.generateUrl(result.numberUrl)
            })
        }
    },
}
</script>

<style>
input {
    color: black;
}
</style>