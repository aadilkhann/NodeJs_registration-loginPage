const express = require('express');
require('./conn');
const path = require('path');
const Register = require('./schema');

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const port=3000 || process.env.PORT
// const static_path=path.join(__dirname,"../public")

// console.log(path.join(__dirname,"../public"))

// app.use(express.static(static_path))
app.set("view engine","hbs")

app.get('/',(req,res)=>{
    res.render("index")
})

app.post('/index',async(req,res)=>{
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

app.listen(port,()=>{
    console.log(`Connection sucessfull at ${port}`);
})
