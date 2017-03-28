import Backbone from 'backbone';
import {UserModel} from './models/model-user.js';
import {RecipeModel, RecipeCollection} from './models/model-recipe.js';
import {BookmarkModel, BookmarkCollection} from './models/model-bookmark.js';
import {STORE} from './store.js';


export const ACTIONS = {
  saveNewRecipe: function(recipeObject){
    let newRecipeInstance = new RecipeModel()
    newRecipeInstance.set(recipeObject)
    newRecipeInstance.save().then(function(){
      ACTIONS.fetchAllRecipies()
    })
  },

  fetchAllRecipies: function(){
    let newRecipeCollInstance = new RecipeCollection()
    newRecipeCollInstance.fetch().then(function(serverRes){
    STORE.setStore('recipeList', serverRes)
    })
  },
  fetchAllBookmarks: function(){
    let newBookmarkCollInstance = new BookmarkCollection()
    newBookmarkCollInstance.fetch().then(function(serverRes){
      STORE.setStore('bookmarks', serverRes)
    })
  },

  fetchSingleRecipe: function(id){
    let singleRecipeInstance = new RecipeModel()
    singleRecipeInstance.set({id: id})
    singleRecipeInstance.fetch().then(function(serverRes){
      STORE.setStore('singleRecipe', serverRes)
    })
  },

  deleteCurrentRecipe: function(id){
    let newRecipeInstance = new RecipeModel()
    newRecipeInstance.set({id: id})
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
    UserModel.register(newUserInfoObj).then(function(){
      ACTIONS.navChange('COOKBOOK', 'cookbook')
    })
  },

  logInUser: function(usr, pw){
    UserModel.logIn(usr, pw).then(function(serverRes){
      ACTIONS.navChange('COOKBOOK', 'cookbook')
    })
  },

  logOutUser: function(){
    UserModel.logOut().then(function(){
      ACTIONS.navChange('ACCOUNT', '')
    })
  }

}
