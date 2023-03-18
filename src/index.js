const express = require('express');
require('./conn');
const path = require('path');
const Register = require('./schema');
const bcrypt = require('bcrypt');

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const port=3000 || process.env.PORT
// const static_path=path.join(__dirname,"../public")

// console.log(path.join(__dirname,"../public"))

// app.use(express.static(static_path))
app.set("view engine","hbs")

app.get('/register',(req,res)=>{
    res.render("register")
})

app.get('/login',(req,res)=>{
    res.render("login")
})

app.post('/register',async(req,res)=>{
    try {
        const db=new Register({
            email:req.body.email,
            password:req.body.password
        })
        const data=await db.save();

        res.status(201).send("Registered Sucessfully")
    } catch (error) {
        res.status(400).send("No Data Found")
    }
})

app.post('/login',async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        let data=await Register.findOne({email})
        console.log(data.password)
        if (data.password===password) {
            res.status(200).send("You are Logged in Sucessfully")
        } else {
            res.send("Invalid Login Details")
        }
    } catch (error) {
        res.status(400).send("Invalid Email")
    }
})

app.listen(port,()=>{
    console.log(`Connection sucessfull at ${port}`);
})
