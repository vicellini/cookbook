import React from 'react';

export const RecipeSearchComponent = React.createClass({



  render: function(){

      return (
        <form className="recipe-search">
          <input className="search_input" type="text" name="search" placeholder="Search Recipes"/>
          <button className="btn-search" type="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </form>
      )
  }
})
