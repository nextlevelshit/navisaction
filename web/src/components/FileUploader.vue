<template>
  <div class="py-10 bg-black text-white overflow-y-auto fixed top-0 left-0 w-full h-full z-10" @scroll="onScroll" ref="wrapper">
    <div class="md:grid md:grid-cols-2 gap-4">
      <div class="text-xl p-10">
        <h1 class="mb-3"><strong class="text-2xl">PEERHOF Fotoalbum ⛰️</strong></h1>
        <p>
          Meine Liebsten, zwischen dem 6. - 10. April 2023 durften wir alle gemeinsam den Peerhof im wunderschönen Navis bewohnen.
          Wir all teilen eine Menge Erinnerungen und möchten diese auch teilen.
        </p>
        <p>
          Bitte füttert das Emoji um die Bilder und Videos hochzuladen.
          Gängige Formate wie PNG, JP(E)G, MP4 und GIF werden unterstützt.
          Alles darüber hinaus kann mit mir besprochen werden: <a class="underline underline-offset-1 font-bold" href="mailto:mail@dailysh.it?subject=Let's talk about Navis&body=Hi Micha, geile Seite übrigens ...">mail@dailysh.it</a>
        </p>
        <p>
          <h2 class="mt-3 mb-1 font-bold">Aktuelle Features:</h2>
          <ul class="list-disc ml-5 mt-2 mb-4">
            <li>Masonry Fotowand Effekt für Desktop und Mobile</li>
            <li>Vollbildansicht beim Anklicken der Bilder</li>
            <li>Schließen des Vollbildes durch erneutes Antippen des Bildes oder des Kreuzes</li>
          </ul>
        </p>
        <p>
          <h2 class="mt-3 mb-1 font-bold">Geplante Features:</h2>
          <ul class="list-disc ml-5 mt-2 mb-4">
            <li>Bildergalerie zum Durchwischen</li>
            <li>Dia Show</li>
            <li>Duplikate entfernen</li>
            <li>Meta-Daten auslesen für bessere Sortierung</li>
            <li>Non-JS Version / SSR</li>
          </ul>
        </p>
      </div>
      <div
          class="text-7xl md:text-8xl cursor-pointer active:scale-95 transition-transform flex flex-col items-center justify-center"
          :class="{ 'scale-110': isDragging }"
          @click="openFileBrowser"
          @mouseenter="isHovering = true"
          @mouseleave="isHovering = false"
      >
        <span v-if="isDragging || isHovering">😮</span>
        <span v-else>😗</span>
      </div>
    </div>
    <div v-if="progress > 0 && progress < 100" class="font-bold">{{ progress }}%</div>
    <input
        type="file"
        ref="fileInput"
        class="hidden"
        @change="handleFileChange"
        multiple
    />
    <div class="block relative w-full" >

      <div class="p-6 md:w-1/3" v-if="false">
        <label for="column-range" class="block mb-2 text-md font-medium">Bildergröße</label>
        <input id="column-range" type="range" min="180" max="420" v-model="columnWidth" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
      </div>

      <MasonryWall :items="images" :column-width="columnWidth" :gap="8" :scroll-container="$refs.wrapper">
        <template #default="{ item, index }">
          <div :class="['fade-in break-inside-avoid overflow-hidden cursor-zoom-in rounded-sm hover:scale-95 transition-transform', {'loaded': item.loaded}]">
            <img :src="item.thumbnail ?? item.url" :alt="item.name" :data-meta="JSON.stringify(item)" @load="item.loaded = true" @click="handleImageClick(index)" class="min-w-full h-auto"/>
          </div>
        </template>
      </MasonryWall>
    </div>
  </div>
  <div class="fixed p-12 top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center overflow-y-auto z-50" v-if="selectedImage" @keyup.esc="handleClose()" tabindex="0">
    <div class="absolute top-4 right-4 text-white text-3xl text-shadow cursor-zoom-out" @click="handleClose()">×</div>
    <div class="absolute w-full h-full z-40" @click="handleClose()"></div>
    <img :src="selectedImage.original" :alt="selectedImage.name" class="min-h-full w-auto z-50" @click="handleImageClick(selectedIndex + 1)"/>
  </div>
</template>

<script>
import api from "@/services/Api";
import MasonryWall from "@yeger/vue-masonry-wall";
import debug from "debug";

const logger = debug("app:i:file-uploader");

export default {
  data() {
    return {
      progress: 0,
      isDragging: false,
      isHovering: false,
      uploadedFiles: [],
      images: [],
      selectedImage: null,
      selectedIndex: null,
      columnWidth: 180,
      viewportWidth: 960
    };
  },
  components: { MasonryWall },
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
        this.images = [
            ...this.images,
            ...data.images
        ];
      } catch (error) {
        console.error(error);
      }
    },
    async uploadFiles(uploadedFiles) {
      try {
        const formData = new FormData();
        uploadedFiles.forEach((file) => {
          formData.append("files", file);
        });
        const { files } = await api.upload(formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
            );
            this.progress = progress;
            console.log(`Upload progress: ${progress}%`);
          },
        });
        this.images.unshift(...files.reverse());
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
    handleClose() {
      logger("Closing fullscreen");
      this.selectedImage = null;
    },
    handleImageClick(index) {
      this.selectedIndex = index;
      this.selectedImage = this.images[index];
      logger("Clicked at image", index, this.selectedImage);
      // history.replaceState({}, item.name, item.original);
    },
    handleEsc({key}) {
      if(!this.selectedImage) return;

      switch (key) {
        case "Escape":
          this.handleClose();
          break;
        case "ArrowLeft":
          this.handleImageClick(this.selectedIndex - 1);
          break;
        case "ArrowRight":
          this.handleImageClick(this.selectedIndex + 1);
          break;
        default:
          logger("Pressed", key);
      }
    },
    onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
      if (scrollTop + clientHeight >= scrollHeight) {
        logger("Reached bottom");
      }
    }
  },
  mounted() {
    document.addEventListener("dragenter", this.handleDragEnter);
    document.addEventListener("dragover", this.handleDragOver);
    document.addEventListener("dragleave", this.handleDragLeave);
    document.addEventListener("drop", this.handleDrop);
    document.addEventListener("keyup", this.handleEsc);
    // document.body.style.overflowY = "auto";
    this.viewportWidth = window.innerWidth;
    this.fetchImages();
  },
  beforeUnmount() {
    document.removeEventListener("dragenter", this.handleDragEnter);
    document.removeEventListener("dragover", this.handleDragOver);
    document.removeEventListener("dragleave", this.handleDragLeave);
    document.removeEventListener("drop", this.handleDrop);
    document.addEventListener("keyup", this.handleEsc);
  },
  watch: {
    selectedImage(next, current) {
      if (next) {
        this.$refs.wrapper.style.overflowY = "hidden";
        // document.body.style.overflowY = "hidden";
        next.original = `${next.path}?size=${this.viewportWidth}`;
      } else {
        // document.body.style.overflowY = "auto";
        this.$refs.wrapper.style.overflowY = "auto";
      }
    },
    columnWidth(next, current) {
      logger(next, current);
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
  text-align: justify;
  hyphens: auto;
  orphans: 2;
  widows: 2;

  @supports (text-wrap: balance) {
    text-wrap: balance;
  }
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

.fade-in {
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}

.fade-in.loaded {
  opacity: 1;
}

</style>
