import Backbone from 'backbone';
import {STORE} from './store.js';
import {UserModel} from './models/model-user.js';


export const ACTIONS = {

  navChange: function(selectedAppRoute, urlRoute){
    STORE.setStore('currentNavRoute', selectedAppRoute)
    window.location.hash = urlRoute
  },

  registerNewUser: function(newUserInfoObj){
    UserModel.register(newUserInfoObj).then(function(serverRes){
      ACTIONS.navChange('COOKBOOK', 'cookbook')
    })
  },
  loginUser: function(usr, pw){
    UserModel.login(usr, pw).then(function(serverRes){
      STORE.setStore('currentUser', serverRes)
      ACTION.navChange('COOKBOOK', 'cookbook')
    })
  },
  fetchCurrentUser: function(){
    UserModel.getCurrentUser().then(function(serverRes){
      if(serverRes.user !== null){
        STORE.setStore('currentUser', serverRes.user)
      }
    })
  }
}
