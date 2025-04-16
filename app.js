const express=require('express');
const morgan = require('morgan')  
const app=express();
const userModel=require('./models/user.js'); 
const dbConnection=require('./config/db.js'); 

app.set('view engine','ejs');  

app.use(morgan('dev'));
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

app.post('/dashboard',(req,res)=>{
    res.render('dashboard'); 
});