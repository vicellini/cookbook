import Backbone from 'backbone';
import {STORE} from './store.js'

export const ACTIONS = {

  changeNav: function(selectedAppRoute, urlRoute){
    STORE.setStore('currentNavRoute', selectedAppRoute)
    window.location.hash = urlRoute
  }
}
