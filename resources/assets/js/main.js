import Vue from 'vue';
import index from './components/calendar/index.vue';
import Vuetify from 'vuetify'
Vue.use(Vuetify)

new Vue({
  el: '#app',
  components: {index}
});