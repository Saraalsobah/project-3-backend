const mongoose = require('mongoose');

const resturentsSchema = new mongoose.Schema({
    name: {type:String, required:true},
    location: {type:String, required:true},
    cuisine: {type:String, required:true},
    logourl: {type:String, required:true},
    menu: [{type:mongoose.Schema.Types.ObjectId, ref:'Menu'}],
    author: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    reviews: [{type:mongoose.Schema.Types.ObjectId, ref:'Review'}]
}, {timestamps:true})

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
module.exports = mongoose.model('Menuitem', menuitemSchema);

const Resturents = mongoose.model('Resturents', resturentsSchema)
module.exports = Resturents
