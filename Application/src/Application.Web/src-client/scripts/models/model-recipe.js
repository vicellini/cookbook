import Backbone from 'backbone';

export const RecipeModel = Backbone.Model.extend({
	urlRoot: '/api/recipe',
	idAttribute: '_id'
})

export const RecipeCollection = Backbone.Collection.extend({
	model: RecipeModel,
	url: '/api/recipes'
})
