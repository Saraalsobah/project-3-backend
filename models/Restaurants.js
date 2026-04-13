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




const Resturents = mongoose.model('Resturents', resturentsSchema)
module.exports = Resturents
