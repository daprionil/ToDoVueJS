import { createApp } from 'vue'
import './style.css';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';

// Add icons with fontAwesome
library.add([faTrash, faFilePen]);

createApp(App)
    .component('font-awesome-icon',FontAwesomeIcon)
    .mount('#app')