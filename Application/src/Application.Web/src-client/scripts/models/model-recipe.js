import Backbone from 'backbone';

export const RecipeModel = Backbone.Model.extend({
	urlRoot: '/api/recipes',
	idAttribute: '_id'
})

export const RecipeCollection = Backbone.Collection.extend({
	model: RecipeModel,
	url: '/api/recipes'
})
