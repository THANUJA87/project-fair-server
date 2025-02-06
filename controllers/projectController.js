const { query } = require("express");
const projects = require("../Models/projectModel")


exports.addProjectController = async (req,res) =>{
    console.log("iside addprojectcontroller");
    const userId = req.userId
    console.log(userId);
    // console.log(req.body);
    const {title,languages,overview,github,website} = req.body
    const projectImg = req.file.filename
    console.log(title,languages,overview,github,website,projectImg);
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("project already exists.. add another one!!")
        }else{
            const newproject = new projects({
                title,languages,overview,github,website,projectImg,userId
            })
        await newproject.save()
        res.status(200).json(newproject)
        }
    }catch(err){
        res.status(401).json(err)
    }

}

exports.homePageController = async (req,res) =>{
    console.log("iside homePagecontroller");
   
    try{
        const allHomeProject = await projects.find().limit(3)
        res.status(200).json(allHomeProject)
     
    }catch(err){
        res.status(401).json(err)
    }

}

exports.allProjectController = async (req,res) =>{
    const searchkey = req.query.search
    console.log(searchkey);
    
    console.log("iside allProjectcontroller");

    const query ={
        languages:{
            $regex:searchkey,$options:'i' //case insensitive
        }
    }
   
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
     
    }catch(err){
        res.status(401).json(err)
    }

}

// get user project
exports.userProjectController = async (req,res) =>{
    console.log("iside userProjectcontroller");
    const userId = req.userId
  
   
    try{
        const allUserProjects = await projects.find({userId})
       
        res.status(200).json(allUserProjects)
     
    }catch(err){
        res.status(401).json(err)
    }

}

// // edit project details - need authorization
exports.editProjectController = async (req,res) =>{
    console.log("iside editProjectcontroller");
    const id = req.params.id
    const userId = req.userId
    const {title,languages,overview,github,website,projectImg} =  req.body
    const reUploadProjectImg = req.file ? req.file.filename: projectImg
    try{
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,languages,overview,github,website,projectImg:reUploadProjectImg,userId},
        {new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
       
     
    }catch(err){
        res.status(401).json(err)
    }

}

exports.removeProjectController = async(req,res)=>{
    console.log("removeProjectController");
    const {id} = req.params
    try{
        const deleteproject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(deleteproject)
    }catch(err){
        res.status(401).json(err)
    }
}