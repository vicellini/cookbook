import React from 'react';

export const RecipeSearchComponent = React.createClass({

  _handleSearch: function(evt){
    let formEl = evt.target
    console.log(formEl.value)
  },

  render: function(){
      console.log(this.props)
      return (
        <form className="recipe-search" onSubmit={this._handleSearch}>
          <input className="search_input" type="text" name="search" placeholder="Search Recipes"/>
          <button className="btn-search" type="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </form>
      )
  }
})
