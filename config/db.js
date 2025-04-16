const mongoose=require('mongoose'); //importing mongoose

const connection=mongoose.connect('mongodb://localhost/BYTEME_HACKGENX_MAIN').then(()=>{
    console.log('connected to database'); //logging the message to the console
})


module.exports=connection; //exporting the connection to use it in other files  