import React from 'react';
import {ACTIONS} from '../actions.js';

export const BookmarkComponent = React.createClass({

  _handleDeleteBookmark: function(evt){
    let bookmarkId = evt.target
    let result = confirm("Are you sure you want to delete this bookmark?")
      if(result === true){
        ACTIONS.deleteCurrentBookmark(bookmarkId.dataset.id)
      }else{
        alert("*phew*")
      }
  },


  render: function(){
    return (
      <li className="bookmark-single u_column-container">
        <a className="bookmark-link u_column" href={this.props.data.link}>{this.props.data.bookMarkName}</a>
        <i className="fa fa-trash u_column" data-id={this.props.data.id} aria-hidden="true" onClick={this._handleDeleteBookmark}></i>
      </li>
    )
  }
})
