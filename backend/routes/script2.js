const { ObjectId } = require('mongodb');
const Application = require('../models/application');
const Project = require('../models/project');

const projectIds = [
    {
        "_id": "666522a47424ef4ea4978359"
    },
    {
        "_id": "666522a47424ef4ea497835a"
    },
    {
        "_id": "666522a47424ef4ea497835b"
    },
    {
        "_id": "666522a47424ef4ea497835c"
    },
    {
        "_id": "666522a47424ef4ea497835d"
    },
    {
        "_id": "666522a47424ef4ea497835e"
    },
    {
        "_id": "666522a47424ef4ea497835f"
    },
    {
        "_id": "666522a47424ef4ea4978360"
    },
    {
        "_id": "666522a47424ef4ea4978361"
    },
    {
        "_id": "666522a47424ef4ea4978362"
    },
    {
        "_id": "666522a47424ef4ea4978363"
    },
    {
        "_id": "666522a47424ef4ea4978364"
    },
    {
        "_id": "666522a47424ef4ea4978365"
    },
    {
        "_id": "666522a47424ef4ea4978366"
    },
    {
        "_id": "666522a47424ef4ea4978367"
    }
]

const userIds = [
    "6664b03291eb3a7d37dbdf6a",
    "6664b03291eb3a7d37dbdf6b",
    "6664b03291eb3a7d37dbdf6c",
    "6664b03291eb3a7d37dbdf6d",
    "666518b30f632b74de6033e1"
]


async function handler(req, res) {
    try{
        for(let i=0;i<35;i++){
            const randomIndex1 = Math.floor(Math.random() * projectIds.length);
            const randomIndex2 = Math.floor(Math.random() * userIds.length);

            const application = new Application({
                projectId : projectIds[randomIndex1]._id,
                userId : new ObjectId(userIds[randomIndex2]),
                status : 'pending',
            });
            await application.save();
            console.log(i);
        }
        res.status(200).json({
            success : true,
            message : 'Applications created'
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Internal server error'
        });
    }
}

module.exports = handler;