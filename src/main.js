import { createApp } from 'vue'
import { createHead } from '@vueuse/head';
import './style.css';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';

const app = createApp(App);
const head = createHead();


// Add icons with fontAwesome
library.add([faTrash, faFilePen]);

//Define App
app.use(head);
app.component('font-awesome-icon',FontAwesomeIcon)
app.mount('#app')