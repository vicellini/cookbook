import Backbone from 'backbone';

export const BookmarkModel = Backbone.Model.extend({
	urlRoot: '/api/bookmarks',
	idAttribute: '_id'
})

export const BookmarkCollection = Backbone.Collection.extend({
	model: RecipeModel,
	url: '/api/bookmarks'
})
