 const mongoose = require('mongoose')

 const connectionString = process.env.DBCONNECTIONSTRING
 
 mongoose.connect(connectionString).then(res=>{
    console.log("mongodbatlas connect successfully with pf server");
    
 }).catch(err=>{
    console.log("mongodb atlas connection failed");
    console.log(err);
    
    
 })