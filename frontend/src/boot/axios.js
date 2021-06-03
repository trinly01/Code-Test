import Vue from 'vue'
import axios from 'axios'


const VueGlobalData = ($global) => {
  $global.install = () => {
    Object.defineProperty(Vue.prototype, '$global', {
      get () { return $global }
    })
  }
  return $global
}

const $global = {
  movie: null
}

Vue.prototype.$global = Vue.observable({  movie: ''  })

Vue.prototype.$axios = axios
Vue.prototype.$movieAPI = 'http://www.omdbapi.com/?apikey=a5a151fa&page=1&'