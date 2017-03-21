
const recipeData = [
    { id: 1,
      name: "cheese",
     category: "dinner",
     ingredients: [
       {name: "cheese", quantity: "1 cup"},
       {name: "black pepper", quantity: "1 T"}
     ],
     steps: [
       {direction: "put pepper in cheese"},
       {direction: "eat cheese"}
     ],
     media1: "http://madisoneasthotel.com/wp-content/uploads/2016/07/cheese-018.png"
   },
   { id: 2,
     name: "cheese",
    category: "dinner",
    ingredients: [
      {name: "cheese", quantity: "1 cup"},
      {name: "black pepper", quantity: "1 T"}
    ],
    steps: [
      {direction: "put pepper in cheese"},
      {direction: "eat cheese"}
    ],
    media1: "http://madisoneasthotel.com/wp-content/uploads/2016/07/cheese-018.png"
  },
  { id: 3,
    name: "cheese",
   category: "dinner",
   ingredients: [
     {name: "cheese", quantity: "1 cup"},
     {name: "black pepper", quantity: "1 T"}
   ],
   steps: [
     {direction: "put pepper in cheese"},
     {direction: "eat cheese"}
   ],
   media1: "http://madisoneasthotel.com/wp-content/uploads/2016/07/cheese-018.png"
 },
 { id: 4,
   name: "cheese",
  category: "dinner",
  ingredients: [
    {name: "cheese", quantity: "1 cup"},
    {name: "black pepper", quantity: "1 T"}
  ],
  steps: [
    {direction: "put pepper in cheese"},
    {direction: "eat cheese"}
  ],
  media1: "http://madisoneasthotel.com/wp-content/uploads/2016/07/cheese-018.png"
},

]

export const STORE = {
 _data: {
    recipeList: {recipeData},
    currentNavRoute: '',
    shownMealType: 'ALL',
    singleRecipe: {}
 },
 getStoreData: function(){
  return this._data
 },

 setStore: function(storeProp, payload){
   if (typeof this._data[storeProp] === 'undefined' ) {
     throw new Error('cannot pass undefined property to .setStore() ')
   }
   this._data[storeProp] = payload

   if(typeof this._callBack === 'function'){
     this._callBack()
   }
 },




}
