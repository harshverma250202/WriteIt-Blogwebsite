const mongoose=require('mongoose')

const db=process.env.db

mongoose.connect(db,{

    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>{console.log('success connection')}).catch((err)=>{
    console.log('no connection')
})