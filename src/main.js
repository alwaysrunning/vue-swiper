import Vue from 'vue'
import App from './App'

import swiper from './components'
Vue.use(swiper);

new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
})
