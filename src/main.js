// main.js

import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Importar FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHome, faRightToBracket, faRightFromBracket, faMagnifyingGlass, faPenToSquare, faTrash, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Añadir los iconos que desees utilizar al conjunto de iconos de FontAwesome
library.add(faHome, faRightToBracket, faRightFromBracket, faMagnifyingGlass, faPenToSquare, faTrash, faEye, faEyeSlash);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
