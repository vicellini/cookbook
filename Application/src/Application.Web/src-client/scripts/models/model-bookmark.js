import Backbone from 'backbone';

export const BookmarkModel = Backbone.Model.extend({
	urlRoot: '/api/bookmarks',
	idAttribute: 'id'
})

export const BookmarkCollection = Backbone.Collection.extend({
	model: BookmarkModel,
	url: '/api/bookmarks'
})
