import Backbone from 'backbone';
import {UserModel} from './models/model-user.js';
import {RecipeModel, RecipeCollection} from './models/model-recipe.js';
import {BookmarkModel, BookmarkCollection} from './models/model-bookmark.js';
import {STORE} from './store.js';


// ACTIONS.fetchAllRecipies().when(()=>{
//   console.log('second hey')
//   ACTIONS.routeTo('COOKBOOK', 'cookbook')

export const ACTIONS = {
  saveNewRecipe: function(recipeObject){
    let newRecipeInstance = new RecipeModel()
    newRecipeInstance.set(recipeObject)
    newRecipeInstance.save().then(function(){
    })
    ACTIONS.routeTo('thankyou')
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
    newRecipeInstance.destroy()
    ACTIONS.routeTo('byebye')
  },

  deleteCurrentBookmark: function(id){
    let newBookmarkModInstance = new BookmarkModel()
    newBookmarkModInstance.set({id: id})
    newBookmarkModInstance.destroy()
  },

  changeShownMeal: function(mealType){
    STORE.setStore('shownMealType', mealType)
  },

  setView: function(viewType, routeParamsObj){
    if(typeof routeParamsObj === 'object'){
      STORE.setStore('routeParams', routeParamsObj)
    }
    STORE.setStore('currentNavRoute', viewType)
  },

  routeTo: function(path){
    window.location.hash = path
  },

  registerNewUser: function(newUserInfoObj){
    UserModel.register(newUserInfoObj).then(function(){})
    ACTIONS.routeTo('cookbook')
  },

  logInUser: function(usr, pw){
    UserModel.logIn(usr, pw).then(function(serverRes){})
    ACTIONS.routeTo('cookbook')
  },

  logOutUser: function(){
    UserModel.logOut().then(function(){
      ACTIONS.routeTo('')
    })
  },


}
