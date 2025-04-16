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


app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await userModel.findOne({ email });

        if (!user) {
            // If the user doesn't exist, create a new user
            user = await userModel.create({
                username: username,
                email: email,
                password: password,
            });
        }

        if (username === 'abha' && password === '1234' && email === 'dhandreabha1@gmail.com') {
            // Redirect to admin dashboard
            res.render('ad_dashboard', { user }); // Pass user data to the admin dashboard
        } else if (user.password === password) {
            // Redirect to the dashboard if credentials are valid
            res.render('dashboard', { user }); // Pass user data to the dashboard
        } else {
            // If credentials are invalid, redirect back to login with an error
            res.redirect('/?error=Invalid credentials');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
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



// app.listen(3000)    
// app.get('/about',(req,res)=>{
//     res.send('The about page'); 
// }
// ); 

app.get('/profile',(req,res)=>{
    res.send('The profile page'); 
    
}   ); 

app.post('/dashboard',(req,res)=>{
    res.render('dashboard'); 
});

app.get('/bloodbank', (req, res) => {
    res.render('bloodbank'); // Render the bloodbank.ejs file
});


app.get('/alerts', (req, res) => {
    res.render('alert'); // Render the alert.ejs file
});

app.get('/ad_dashboard', (req, res) => {
    const loggedInUser = { username: 'AdminUser', email: 'admin@example.com' }; // Example user data
    res.render('ad_dashboard', { user: loggedInUser });
});

app.post('/add-user', async (req, res) => {
    const { loggedInUser, newUserName, newUserEmail, newUserRole } = req.body;

    try {
        // Save the new user to the database
        const newUser = await userModel.create({
            username: newUserName,
            email: newUserEmail,
            role: newUserRole,
            addedBy: loggedInUser, // Track who added the user
        });

        console.log(`New user added by ${loggedInUser}:`, newUser);

        // Redirect back to the admin dashboard
        res.redirect('/ad_dashboard');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});