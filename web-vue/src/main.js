import { createApp } from "vue";
import MasonryWall from "@yeger/vue-masonry-wall";

import App from "./App.vue";
import "./App.css";

const app = createApp(App);

app.use(MasonryWall);
app.mount("#app");
