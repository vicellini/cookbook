// 
// const recipeData = [
//     { id: 1,
//       name: "cheese",
//      category: "Breakfast",
//      ingredients: [
//        {name: "cheese", quantity: "1 cup"},
//        {name: "black pepper", quantity: "1 T"}
//      ],
//      steps: [
//        {direction: "put pepper in cheese"},
//        {direction: "eat cheese"}
//      ],
//      media1: "http://madisoneasthotel.com/wp-content/uploads/2016/07/cheese-018.png"
//    },
//    { id: 2,
//      name: "cheese",
//     category: "Lunch",
//     ingredients: [
//       {name: "cheese", quantity: "1 cup"},
//       {name: "black pepper", quantity: "1 T"}
//     ],
//     steps: [
//       {direction: "put pepper in cheese"},
//       {direction: "eat cheese"}
//     ],
//     media1: "http://madisoneasthotel.com/wp-content/uploads/2016/07/cheese-018.png"
//   },
//   { id: 3,
//     name: "cheese",
//    category: "Dinner",
//    ingredients: [
//      {name: "cheese", quantity: "1 cup"},
//      {name: "black pepper", quantity: "1 T"}
//    ],
//    steps: [
//      {direction: "put pepper in cheese"},
//      {direction: "eat cheese"}
//    ],
//    media1: "http://madisoneasthotel.com/wp-content/uploads/2016/07/cheese-018.png"
//  },
//  { id: 4,
//    name: "cheese",
//   category: "Dessert",
//   ingredients: [
//     {name: "cheese", quantity: "1 cup"},
//     {name: "black pepper", quantity: "1 T"}
//   ],
//   steps: [
//     {direction: "put pepper in cheese"},
//     {direction: "eat cheese"}
//   ],
//   media1: "http://madisoneasthotel.com/wp-content/uploads/2016/07/cheese-018.png"
// }]

export const STORE = {
 _data: {
    recipeList: [],
    currentNavRoute: '',
    shownMealType: 'ALL',
    loggedIn: false,
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

 onStoreChange: function(cbFunc){
   if(typeof cbFunc !== 'function'){
     throw new Error('argument passed to STORE.onStoreChange() must be a function')
   }

   if(typeof this._callMeLaterPls !== 'undefined'){
     throw new Error('STORE.onStoreChange() already has a function to handle changes')
   }

   this._callBack = cbFunc
 }




}
