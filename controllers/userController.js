const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')
// register 

exports.registerController = async (req,res)=>{
    console.log("inside register controller");
    console.log(req.body);
    const {username,email,password} =req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Already existing user please login !!!")
        }else{
            const newUser = new users({
                username,
                email,
                password,
                github:'',
                linkdin:'',
                profilepic:''
            })
            await newUser.save()
            res.status(200).json("registered successfully")
        }

    }catch(err){
    
    res.status(401).json(err)
    }
}
//login

exports.loginController = async (req,res) =>{
    console.log("inside login controller");
    const {email,password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token =jwt.sign({userid:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
        }else{
            res.status(404).json("Incorrect Email/Password")
        }

    }catch(err){
        res.status(401).json(err)
    }
    
    
}
//profile updation

exports.editUserController = async(req,res) =>{
    console.log("editUserController");
    const {username,email,password,github,linkdin,profilepic} = req.body
    const uploadProfilePic = req.file ? req.file.filename : profilepic
    const userId = req.userId
    try {
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkdin,profilepic: uploadProfilePic},{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    } catch (err) {
       res.status(401).json(err)
        
        
    }
    
}


