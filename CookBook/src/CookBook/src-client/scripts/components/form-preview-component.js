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


  render: function(){
    return(
      <div className="new-recipe_preview">
        <h2>Ingredient List Preview:</h2>
        <div className="ingredient-list">
          {this._createIngredientJSX(this.props.ingredientList)}
        </div>
        <h2>Directions Preview:</h2>
        <div className="direction-list">
          {this._createDirectionJSX(this.props.directionList)}
        </div>
      </div>
    )
  }


})



const SingleIngredient = React.createClass({

  _handleDelete: function(){
    let singleIngred = this.props.data
    this.props._updateIngredientList(singleIngred)
    },


    render: function(){
    return (
      <div className="ingredient-single .u_column-container">
         <div className="single_qty u_column">
           <span>{this.props.data.qty}</span>
         </div>
         <div className="single_name u_column">
           <span>{this.props.data.nameOfIngredient}</span>
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
         <span className="direction-text u_column">{this.props.data.direction}</span>
         <div className="btn-delete u_column">
           <i onClick={this._handleDelete} className="fa fa-trash-o" aria-hidden="true"></i>
         </div>
       </div>
     )
    }
})
