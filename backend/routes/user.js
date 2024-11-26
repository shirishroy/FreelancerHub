const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.use(express.json());

router.post('/getUser',async (req,res)=>{
    try{
        const user = await User.findOne({ clerkId : req.body.clerkId });
        if(user){
            // console.log(user);
            res.status(200).json({
                success : true,
                user
            });
        }
        else{
            res.status(404).json({
                success : false,
                message : 'User not found'
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Internal server error'
        });
    }
});

async function checkIsUser(clerkId){
    try{
        const user = await User.findOne({ clerkId });
        if(user){
            console.log('User found');
            return true;            
        }
        else{
            console.log('User not found');
            return false;
        }
    }
    catch(err){
        console.log(err);
        return false;
    }
}

async function createUser(user, res){
    console.log('Creating user');
    console.log(user);
    try{
        const newUser = new User(user);
        const resUser = await newUser.save();
        return resUser;
    }
    catch(err){
        console.log(err);
        return false
    }
}

router.post('/createUser',async (req,res)=>{
    const { name, email, clerkId, resumeLink, skills } = req.body;
    try{
        const user = new User({
            name,
            email,
            clerkId,
            resumeLink,
            skills
        });
        await user.save()
        res.status(201).json({
            success : true,
            message : 'User created successfully'
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Internal server error'
        });
    };
});

router.post('/updateUser',async (req,res)=>{
    console.log(req.body);
    const testuser = req.body;
    const isUser = await checkIsUser(testuser.clerkId);
    if(!isUser){
        const newCreatedUser = await createUser(testuser);
        if(newCreatedUser){
            res.status(201).json({
                success : true,
                message : 'User created successfully',
                user : newCreatedUser
            });
        }
        else{
            res.status(500).json({
                success : false,
                message : 'Internal server error'
            });
        }
        return;
    }
    const { name, email, resumeLink, skills, userId, image , clerkId } = req.body;
    try{
        const user = await User.findOne({ clerkId });
        if(user){
            user.name = name || user.name;
            user.email = email || user.email;
            user.resumeLink = resumeLink || user.resumeLink;
            user.skills = skills || user.skills;
            user.image = image || user.image;
            const updatedUser = await user.save();
            res.status(200).json({
                success : true,
                message : 'User updated successfully',
                user : updatedUser
            });
        }
        else{
            res.status(404).json({
                success : false,
                message : 'User not found'
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Internal server error'
        });
    }
});

// router.post('')

module.exports = router;