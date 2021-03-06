import React from 'react';
import {ACTIONS} from '../actions.js';


export const PreviewLists = React.createClass({

  _createIngredientJSX: function(ingredientArr){
    let component = this
    let finalJSX = ingredientArr.map(function(ingredientObj, i){
      return (
          <SingleIngredient key={i}
            data = {ingredientObj}
            _updateIngredientList = {component.props._updateIngredientListCB}
          />
        )
        })
      return finalJSX
    },

  _createDirectionJSX: function(directionArr){
      let component = this
      let finalJSX = directionArr.map(function(directionStr, i){
        return (
            <SingleDirection key={i}
              data = {directionStr}
              _updateDirectionList = {component.props._updateDirectionListCB}
            />
          )
          })
        return finalJSX
      },

  _handleClear: function(evt){
    let previewEl = evt.target
    this.props._clearPreviewListCB(previewEl.name)
  },


  render: function(){
    return(
      <div className="new-recipe_preview">
        <h2>Ingredient List Preview:</h2>
        <div className="ingredient-list">
          {this._createIngredientJSX(this.props.ingredientList)}
        </div>
        <button className="preview-delete" name="ingredients" onClick={this._handleClear}>Clear All</button>
        <h2>Directions Preview:</h2>
        <div className="direction-list">
          {this._createDirectionJSX(this.props.directionList)}
        </div>
        <button className="preview-delete" name="directions" onClick={this._handleClear}>Clear All</button>
      </div>
    )
  }


})



const SingleIngredient = React.createClass({

  _handleDelete: function(){
    let singleIngred = this.props.data
    console.log(singleIngred)
    this.props._updateIngredientList(singleIngred)
    },


    render: function(){
    return (
      <div className="ingredient-single .u_column-container">
         <div className="single_qty u_column">
           <span>{this.props.data.quantity}</span>
         </div>
         <div className="single_name u_column">
           <span>{this.props.data.name}</span>
         </div>
         <div className="btn-delete u_column">
           <i onClick={this._handleDelete} className="fa fa-trash-o" aria-hidden="true"></i>
         </div>
     </div>
   )
  }
})

const SingleDirection = React.createClass({

    _handleDelete: function(){
      let singleDirection = this.props.data
      this.props._updateDirectionList(singleDirection)
      },


      render: function(){
      return (
        <div className="single-direction u_column-container">
         <span className="direction-text u_column">{this.props.data.description}</span>
         <div className="btn-delete u_column">
           <i onClick={this._handleDelete} className="fa fa-trash-o" aria-hidden="true"></i>
         </div>
       </div>
     )
    }
})
