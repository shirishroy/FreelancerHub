const express = require('express');
const router = express.Router();
const Project = require('../models/project');

router.use(express.json());

router.get('/getAll',async (req,res)=>{
    try{
        const jobs = await Project.find();
        res.status(200).json({
            success : true,
            jobs
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Internal server error'
        });
    }
});

module.exports = router;