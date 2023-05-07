import {createApp} from 'vue'
import App from './App.vue'

import "./App.css"
import MasonryWall from "@yeger/vue-masonry-wall";

const app = createApp(App);

app.use(MasonryWall);
app.mount('#app');
