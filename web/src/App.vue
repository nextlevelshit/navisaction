<template>
  <FileUploader/>
<!--  <PhotoWall/>-->
  <nav class="container mx-auto my-5">
    <div class="flex flex-col md:flex-row p-6 gap-4">
      <strong>NAVIS Peerhof 2023</strong>
    </div>
  </nav>
</template>

<script>
import debug from "debug";
import FileUploader from "@/components/FileUploader.vue";
// import PhotoWall from "@/components/PhotoWall.vue";


const logger = debug("web:i:app");
export default {
	data() {
	},
	computed: {
	},
	watch: {
	},
	methods: {},
  components: {
    FileUploader,
    // PhotoWall
  }
}
</script>

<style>
</style>
