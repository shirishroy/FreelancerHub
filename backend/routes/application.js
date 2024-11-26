const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Application = require('../models/application');
const { ObjectId } = require('bson');

router.use(express.json());

router.post('/get', async (req,res)=>{
    try{
        const projectId = req.body.projectId;
        // const ObjectId = mongoose.Types.ObjectId
        const newObject = new ObjectId(projectId);
        const applications = await Application.find({ projectId : objectId }).populate('userId');
        res.status(200).json({
            success : true,
            applications
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Internal server error'
        });
    }
})

module.exports = router;