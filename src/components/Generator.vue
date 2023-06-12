<template>
    <div class="max-w-md">
        <div>
            <label class="block" for="url">URL</label>
            <input type="text" name="url"  v-model="url">
        </div>
        <div class="flex justify-between">
            <label for="count">Acces Count</label>
            <input class="w-6 h-6" type="number" name="count"  v-model="count">
        </div>
        <div class="flex justify-between">
            <label for="isPublic">Show in public list</label>
            <input class="w-6 h-6" type="checkbox" name="isPublic" v-model="isPublic">
        </div>
        <div class="flex justify-between">
            <label for="isMailable">Send me notification mail</label>
            <input class="w-6 h-6" type="checkbox" name="isMailable" v-model="isMailable">
        </div>
        <div class="transition-all duration-200" :class="{'opacity-1':isMailable,'opacity-0':!isMailable,'h-[48px]':isMailable,'h-[0px]':!isMailable}">
            <label class="block" for="mail">Mail</label>
            <input type="text" name="mail" v-model="mail">
        </div>
        <div>
            <button>
                Generate
            </button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name:"Generator",
    data(){
        return{
            url:"",
            count:0,
            isPublic:false,
            isMailable:false,
            mail:"",
            showMail:false,
        }
    },
    methods:{

    },
    mounted(){
        console.log(getUrl("125fadcaaa"))
    }
}
</script>

<style>
input{
    color: black;
}
</style>