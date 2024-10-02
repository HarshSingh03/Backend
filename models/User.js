const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:[true,'Please provide email'],
    unique:true,
    match:[/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Please provide valid email"]
  },
  name:{
    type:String,
    required:[true, 'Please provide name'],
    minLength:3,
    maxLength:50
  },
  password:{
    type:String,
    required:[true,'Please enter password'],
    minLength:6
  },
  address:{
    type:String,
    maxLength:50
  }
},{timestamps:true})

userSchema.pre('save',async function(){
  const salt =await bcrypt.genSalt(12)
  this.password =await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function(givenPassword){
  const isMatch = await bcrypt.compare(givenPassword,this.password);
  return isMatch
}

module.exports = mongoose.model('User',userSchema)