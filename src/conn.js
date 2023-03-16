const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/registration').then(()=>{
    console.log("Database Connnected Sucessfully")
}).catch((e)=>{
    console.log("Can't Connect Database")
    console.log(e)
})