import Backbone from 'backbone';
import ReactDOM from 'react-dom'
import React from 'react'
import {ViewController} from './view-controller.js'
import {ACTIONS} from './actions.js'

if(window.location.hostname === 'localhost' && window.location.port === "5000" ){
    let headEl = document.querySelector('head')
    let linkEl = document.querySelector('link[href="./css/styles.css"]')
    headEl.removeChild(linkEl)
}

export const AppRouter = Backbone.Router.extend({
	initialize: function(){
    console.log('router firing')
		Backbone.history.start()
	},

	routes: {
    'recipe/bookmarks' : 'showAllBookmarksComponent',
    'recipe/create' : 'showNewRecipeComponent',
    'recipe/:id' : 'showSingleRecipeComponent',
		'cookbook' : 'showCookbookComponent',
    '' : 'showAccountComponent' ,
	},

	showAccountComponent: function(){
		ACTIONS.setView('ACCOUNT')
	},

	showNewRecipeComponent: function(){
		ACTIONS.setView('NEWRECIPE')
	},

  showSingleRecipeComponent: function(id){
    ACTIONS.setView('SINGLERECIPE', {recipeId: id})
  },

  showCookbookComponent: function(){
    console.log('cookbook firing')
    ACTIONS.setView('COOKBOOK')
  },

  showAllBookmarksComponent: function(){
    ACTIONS.setView('BOOKMARKS')
  }

})

new AppRouter()
ReactDOM.render(<ViewController/>, document.querySelector('#app-container'))
