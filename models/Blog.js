const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,'Please provide a title'],
    maxLength:40
  },
  content:{
    type:String,
    required:[true,'Please provide some text'],
    maxLength:200
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    required:[true,'No User for this blog'],
    ref:'User'
  },
  status:{
    type:String,
    enum:['private','public']
  }
},{timestamps:true})