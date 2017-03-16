import Backbone from 'backbone';
import {STORE} from './store.js'

export const ACTIONS = {

  navChange: function(selectedAppRoute, urlRoute){
    STORE.setStore('currentNavRoute', selectedAppRoute)
    window.location.hash = urlRoute
  }
}
