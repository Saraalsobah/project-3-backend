const mongoose = require('mongoose');

const menuitemSchema = new mongoose.Schema(
    {

        name:{
            type:String ,
            required:true,
            trim:true,
        },

        price:{
            type:Number ,
            required:true,
            min:0,
        },

        category:{
            type:String ,
            enum:['Appetizer','Main','Dessert','Drink','Side'],
            required:true,
        },

    },
    
    {timestamps:true}
);


const restaurantSchema = new mongoose.Schema({
    name: {type:String, required:true},
    location: {type:String, required:true},
    cuisine: {type:String, required:true},
    logourl: {type:String, required:true},
    menuItems: [menuItemSchema],    
    author: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    reviews: [reviewSchema] 
}, {timestamps:true})



const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant
