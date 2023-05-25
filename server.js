const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const Registeruser = require('./model');
const middleware = require('./middleware');
const jwt = require('jsonwebtoken');
const Msgmodel = require('./Msgmodel');

mongoose.connect('mongodb+srv://gottipativenkatanagapavan2022:techpg@cluster0.r1pfqgy.mongodb.net/?retryWrites=true&w=majority',
{
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(
    ()=>{})


app.get('/',(req,res)=>{
    res.send("Hello World!");
});

app.use(express.json());

app.use(cors({origin:"*"}));

//For registration
app.post('/register',async(req,res)=>{
    try{
        const username=req.body.username;
        const email=req.body.email;
        const password=req.body.password;
        const confirmpassword=req.body.confirmpassword;

        //checking
        let exist = await Registeruser.findOne({email:email})//1 schema 2 user value
        if(exist){
            return res.status(400).send('user already exist');
        }
        if(password!==confirmpassword)
        {
            return res.status(400).send("Passwords not matching");
        }
        let newUser = new Registeruser({
            username,
            email,
            password,
            confirmpassword
        })
        await newUser.save();
        res.status(200).send('User registered successfully.......');
    }catch(err){
        return res.status(500).send("Internal server error");
    }
})


//For Login
app.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;

        const exist = await Registeruser.findOne({email:email});
        if(!exist)
        {
           return res.status(400).send("User not found");
        }
        if(exist.password!==password)
        {
            return res.status(400).send("Invalid password");
        }
        //creating a payload
        let payload={
            user:{
                id:exist.id
            }
        }

        jwt.sign(payload,'jwtPassword',{expiresIn:3600000},
        (err,token)=>{
            if(err) throw err;
            return res.json({token});
        })
    }
    catch(err){
        return res.status(500).send('Server Error Occurred');
    }
})


//Myprofile - protected route
app.get('/myprofile',middleware,async (req,res)=>{
    try{
        let exist = await Registeruser.findById(req.user.id);
        if(!exist)
        {
            return res.status(400).send('User not found');
        }
        return res.json(exist)
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Invalid token');
    }
})

//Send a message - protected route
app.post('/addmsg',middleware,async (req,res)=>{
    try{
        let exist = await Registeruser.findById(req.user.id);
        const {text}=req.body;
        let newmsg = new Msgmodel({
            user:req.user.id,
            username:exist.username,
            text
        })
        await newmsg.save();
        let allmsg = await Msgmodel.find();
        return res.json(allmsg);
    }
    catch(err){
        return res.status(500).send('Server Error....')
    }
})

//getting all the details of the messages
app.get('/getmsg',middleware,async(req,res)=>{
    try{
        let allmsg = await Msgmodel.find();
        return res.json(allmsg);
    }
    catch(err){
        return res.status(500).send('Server Error')
    }
})

app.listen(5000,()=>{
})

//git