import { createApp } from "vue";
import VueMeta from "vue-meta";
import MasonryWall from "@yeger/vue-masonry-wall";

import App from "./App.vue";
import "./App.css";

const app = createApp(App);

app.use(MasonryWall);

app.use(VueMeta);
app.mount("#app");
