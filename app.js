const express=require('express');
const morgan = require('morgan')  
app.set('view engine','ejs');  
const app=express();
const userModel=require('./models/user.js'); 
app.use(morgan('dev'));
const dbConnection=require('./cofig/db'); 


app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(express.static('public'));
app.get('/register',(req,res)=>{
    res.render('register'); 
});

app.post('/register',async(req,res)=>{

   const{username,email,password}=req.body; 
   const newUser=await userModel.create({
    username:username,
    email:email,
    password:password
})
   res.send(newUser); 
    });

app.get('/get-users',async(req,res)=>{
    userModel.findOne({
        username:"_abha"
    }).then((user)=>{
        res.send(user); 
    })
    
}); 

app.get('/update-user',async(req,res)=>{
   await userModel.findOneAndUpdate({
        username:"_abha"}
        ,{
            email: 'cbd@.com'
    })
    res.send('user updated'); 
})

app.get('/delete-user',async(req,res)=>{
    await userModel.findOneAndDelete({
        username:"_abha"}
        ,{
            email: 'cbd@.com'
    })
    res.send('user deleted'); 
})


app.set('view engine','ejs'); 

app.get('/',(req,res)=>{
    res.render('index'); 
}
); 
app.post('/get-form-data',(req,res)=>{
    console.log(req.body);
    res.send('data recieved') 
}
); 



app.listen(3000)    
app.get('/about',(req,res)=>{
    res.send('The about page'); 
}
); 

app.get('/profile',(req,res)=>{
    res.send('The profile page'); 
    
}   ); 