<template>
<!--    <nav class="container mx-auto my-5 sticky top-0">-->
<!--        <div class="flex flex-col md:flex-row p-4 gap-4">-->
<!--            <strong class="text-2xl">⛰️ PEERHOF 2023</strong>-->
<!--        </div>-->
<!--    </nav>-->
    <FileUploader/>
</template>

<script>
import FileUploader from "@/components/FileUploader.vue";

export default {
    name: "Navisaction",
    metaInfo: {
        title: "Navis PEERHOF 2023 ⛰️",
        meta: [
            {
                property: "og:title",
                content: "Navis PEERHOF 2023 ⛰️",
                vmid: "og:title"
            }
        ]
    },
    components: {
        FileUploader
    }
}
</script>

<style>
</style>
