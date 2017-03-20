import Backbone from 'backbone'
import $ from 'jquery'

export const UserModel = Backbone.Model.extend({
	initialize: function(){

	},
	urlRoot: '/api/users',
	idAttribute: '_id'
})

UserModel.logIn =  function(username, password){
	if(typeof username !== 'string' || typeof password !== 'string'  ){ throw new Error(`UserModel.login() must receive string 2 string paramaters for username and password`) }

	return $.ajax({
		method: 'POST',
		data: JSON.stringify({ username: username, password: password}),
		headers: {
			'Content-Type': 'application/json'
		},
		url: '/authentication/login'
	})
}

UserModel.register =  function(dataObj){
	if(typeof dataObj !== 'object' ){ throw new Error(`UserModel.register() must receive an object`) }
	if(typeof dataObj.username === 'undefined' || typeof dataObj.password === 'undefined'  ){ throw new Error(`UserModel.register() must receive an object w/ username + password`) }
//dataObj.username was old field
	return $.ajax({
		method: 'POST',
		data: JSON.stringify(dataObj),
		headers: {
			'Content-Type': 'application/json'
		},
		url: '/authentication/register'
	})
}

UserModel.getCurrentUser =  function(){
	return $.ajax({
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		url: '/authentication/current'
	})
}

UserModel.logOut =  function(){
	console.log('logging in!')
	return $.ajax({
		method: 'GET',
		url: '/authentication/logout'
	})
}
