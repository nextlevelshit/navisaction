<template>
  <div class="py-10 bg-gray-100 flex flex-col items-center justify-center">
    <div
        class="text-7xl cursor-pointer active:scale-105 hover:scale-110 transition-transform"
        :class="{ 'scale-110': isDragging }"
        @click="openFileBrowser"
    >
      <span v-if="isDragging">😮</span>
      <span v-else>😗</span>
    </div>
    <div v-if="progress > 0 && progress < 100" class="font-bold">{{ progress }}%</div>
    <input
        type="file"
        ref="fileInput"
        class="hidden"
        @change="handleFileChange"
        multiple
    />
    <div class="relative w-full flex min-h-screen flex-col justify-center px-2 sm:px-6 py-2 sm:py-6">
      <div
          class="columns-2 2xl:columns-4 xl:columns-3 gap-1 [column-fill:_balance] box-border before:box-inherit after:box-inherit">
        <div v-for="(image, index) in images" :key="index" class="break-inside-avoid overflow-hidden mb-1 bg-gray-100 rounded-lg shadow-lg">
          <img :src="image.url" :alt="image.name"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/services/Api";

export default {
  data() {
    return {
      progress: 0,
      isDragging: false,
      uploadedFiles: [],
      images: []
    };
  },
  methods: {
    openFileBrowser() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      this.uploadFiles(Array.from(event.target.files));
    },
    async fetchImages() {
      try {
        const data = await api.allImages();
        this.images = data.images;
      } catch (error) {
        console.error(error);
      }
    },
    async uploadFiles(files) {
      try {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });
        const response = await axios.post("http://localhost:3000/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
            );
            this.progress = progress;
            console.log(`Upload progress: ${progress}%`);
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.images.unshift(...response.data.files.reverse());
        this.$refs.fileInput.value = null;
      } catch (error) {
        console.error(error);
      }
    },
    handleDragEnter(event) {
      event.preventDefault();
      event.stopPropagation();
      this.isDragging = true;
    },
    handleDragOver(event) {
      event.preventDefault();
      event.stopPropagation();
      this.isDragging = true;
    },
    handleDragLeave(event) {
      event.preventDefault();
      event.stopPropagation();
      this.isDragging = false;
    },
    handleDrop(event) {
      event.preventDefault();
      event.stopPropagation();
      this.isDragging = false;
      this.uploadFiles(Array.from(event.dataTransfer.files));
      this.$refs.fileInput.value = null;
    },
  },
  mounted() {
    document.addEventListener("dragenter", this.handleDragEnter);
    document.addEventListener("dragover", this.handleDragOver);
    document.addEventListener("dragleave", this.handleDragLeave);
    document.addEventListener("drop", this.handleDrop);
    this.fetchImages();
  },
  beforeUnmount() {
    document.removeEventListener("dragenter", this.handleDragEnter);
    document.removeEventListener("dragover", this.handleDragOver);
    document.removeEventListener("dragleave", this.handleDragLeave);
    document.removeEventListener("drop", this.handleDrop);
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: -1;
}

li {
  margin-bottom: 0.5rem;
}

button[disabled] {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

img {
  min-width: 100%;
  height: auto;
}
</style>
