import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$global = Vue.observable({  movie: ''  })

Vue.prototype.$axios = axios
Vue.prototype.$movieAPI = 'https://www.omdbapi.com/?apikey=a5a151fa&page=1&'