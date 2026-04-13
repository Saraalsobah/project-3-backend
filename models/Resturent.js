const mongoose= require ('mongoose');
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