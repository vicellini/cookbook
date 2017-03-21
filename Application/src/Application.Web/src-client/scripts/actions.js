import Backbone from 'backbone';
import {UserModel} from './models/model-user.js';
import {RecipeModel, RecipeCollection} from './models/model-recipe.js'
import {STORE} from './store.js';


export const ACTIONS = {
  saveNewRecipe: function(recipeObject){
    let newRecipeInstance = new RecipeModel()
    newRecipeInstance.set(recipeObject)
    newRecipeInstance.save().then(function(){
      console.log('recipe saved!!!!')
      ACTIONS.fetchAllRecipies()
    })
  },

  fetchAllRecipies: function(){
    let newRecipeCollInstance = new RecipeCollection()
    shoutsCollInstance.fetch().then(function(serverRes){
    STORE.setStore('recipeList', serverRes)
  })
  },

  deleteCurrentRecipe: function(id){
    let newRecipeInstance = new RecipeModel
    newRecipeInstance.set({_id: id})
    newRecipeInstance.destroy().then(function(){
      console.log('recipe deleted', newRecipeInstance)
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
    console.log(usr, pw)
    UserModel.logIn(usr, pw).then(function(serverRes){
      // console.log(this.fetchCurrentUser())
      // STORE.setStore('currentUser', serverRes)
      ACTIONS.navChange('COOKBOOK', 'cookbook')
    })
  },

  logOutUser: function(){
    UserModel.logOut().then(function(){
      ACTIONS.navChange('ACCOUNT', '')
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
