import Backbone from 'backbone';
import ReactDOM from 'react-dom'
import React from 'react'
import {ViewController} from './view-controller.js'

if(window.location.hostname === 'localhost' && window.location.port === "5000" ){
    let headEl = document.querySelector('head')
    let linkEl = document.querySelector('link[href="./css/styles.css"]')
    headEl.removeChild(linkEl)
}

const AppRouter = Backbone.Router.extend({
	initialize: function(){
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
		ReactDOM.render(<ViewController fromRoute={'ACCOUNT'}/>, document.querySelector('#app-container'))
	},

	showNewRecipeComponent: function(){
		ReactDOM.render(<ViewController fromRoute={'NEWRECIPE'} />, document.querySelector('#app-container'))
	},

  showSingleRecipeComponent: function(id){
    ReactDOM.render(<ViewController fromRoute={'SINGLERECIPE'} routeParams={{recipeId: id}}/>, document.querySelector('#app-container'))
  },

  showCookbookComponent: function(){
    ReactDOM.render(<ViewController fromRoute={'COOKBOOK'}/>, document.querySelector('#app-container'))
  },

  showAllBookmarksComponent: function(){
    ReactDOM.render(<ViewController fromRoute={'BOOKMARKS'}/>, document.querySelector('#app-container'))
  }

})

new AppRouter()
