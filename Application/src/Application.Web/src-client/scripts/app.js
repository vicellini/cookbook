import Backbone from 'backbone';
import ReactDOM from 'react-dom'
import React from 'react'
import {ViewController} from './view-controller.js'

const AppRouter = Backbone.Router.extend({
	initialize: function(){
		Backbone.history.start()
	},

	routes: {
		'recipe/create' : 'showNewRecipeComponent',
		'' : 'showAccountComponent'
	},

	showAccountComponent: function(){
		ReactDOM.render(<ViewController fromRoute={'ACCOUNT'}/>, document.querySelector('#app-container'))
	},

	showNewRecipeComponent: function(){
		ReactDOM.render(<ViewController fromRoute={'NEWRECIPE'}/>, document.querySelector('#app-container'))
	}

})
