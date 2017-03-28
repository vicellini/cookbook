import React from 'react';
import {BookmarkComponent} from '../components/bookmark-component.js'
import {ACTIONS} from '../actions.js';

export const BookmarkView = React.createClass ({

  componentDidMount: function(){
    ACTIONS.fetchAllBookmarks()
  },

  _createBookmarkJSX: function(bookmarkArr){
    let finalJSX = bookmarkArr.map(function(bookmarkObj, i){
      return (
        <BookmarkComponent
          key={i}
          data={bookmarkObj}
        />
        )
      })
      return finalJSX
  },


  render: function(){
    let bookmarkArray = this.props.bookmarks
    let bookmarkJSX
    if( bookmarkArray ) bookmarkJSX = this._createBookmarkJSX(bookmarkArray)
    console.log(this.props.bookmarks)
    return (
      <div className="bookmarks">
        <h2>My Bookmarked Recipes:</h2>
          <ul className="bookmark-list">
            {bookmarkJSX}
          </ul>
      </div>
    )
  }

})
