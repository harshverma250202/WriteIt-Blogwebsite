const mongoose=require('mongoose')
const bcryptjs=require('bcryptjs')
const jwt =require('jsonwebtoken')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        requred:true
    },
    email:{
        type:String,
        requred:true
    },
    phone:{
        type:Number,
        required:true
    }
    ,
    password:{
        type:String,
        requred:true
    },
    tokens:{
        
            type:String,
            required:false
        
    },
    

})


//hashing
UserSchema.pre('save',async function(next){

    if(this.isModified('password'))
    {
        this.password=await bcryptjs.hash(this.password,12);

    }
    next();
})


UserSchema.methods.generateAuthToken=async function()
{
    try{
        let token=jwt.sign({_id:this._id},process.env.SecretKey)
        this.tokens=token;
        await this.save();
        console.log(token); 
        return token;
    }
    catch(err)
    {
        console.log(err)

    }
}


const User=mongoose.model('USER',UserSchema);

module.exports=User;