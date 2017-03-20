import Backbone from 'backbone';
import {UserModel} from './models/model-user.js';
import {RecipeModel, RecipeCollection} from './models/model-recipe.js'
import {STORE} from './store.js';


export const ACTIONS = {
  saveNewRecipe: function(recipeObject){
    let newRecipeInstance = new RecipeModel()
    newRecipeInstance.set(recipeObject)
    newRecipeInstance.save().then(function(){
      console.log('recipie saved!!!!')
      this.fetchAllRecipies()
    })
  },

  fetchAllRecipies: function(){
    let newRecipeCollInstance = new RecipeCollection()
    shoutsCollInstance.fetch().then(function(serverRes){
    STORE.setStore('recipeList', serverRes)
  })
  },

  changeShownMeal: function(mealType){
    STORE.setStore('shownMealType', mealType)
  },


  navChange: function(selectedAppRoute, urlRoute){
    STORE.setStore('currentNavRoute', selectedAppRoute)
    window.location.hash = urlRoute
  },

  registerNewUser: function(newUserInfoObj){
    UserModel.register(newUserInfoObj).then(function(serverRes){
      console.log(serverRes)
      ACTIONS.navChange('COOKBOOK', 'cookbook')
    })
  },

  logInUser: function(usr, pw){
    UserModel.logIn(usr, pw).then(function(serverRes){
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
