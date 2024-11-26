const Project = require('../models/project');
const { ObjectId } = require('mongodb');

const userIds = [
    "6664b03291eb3a7d37dbdf6a",
    "6664b03291eb3a7d37dbdf6b",
    "6664b03291eb3a7d37dbdf6c",
    "6664b03291eb3a7d37dbdf6d",
    "666518b30f632b74de6033e1"
]

const images = [
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRLVEXYJA-k4ph_uX9dZSfMRA6FHJvL1pgKheAw5tIQT_HtW-jtkAxru_aUWHzA",
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTZu3vFKFKCXNuzKER2ZUIa-934sx70NUwwcAPAcso-lMFcKTd20VJqITvyQlAS",
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT9haYqHCAyshYN9mtESGY4ywW18uNduArbjZ6_BcooOy2EkfZasRrTMdVF6-FR",
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRE_i2BmHn0RtiZNSVwk6mLmw5HFSULixLhwHHgIJ4bNn6lrUNFZ0Zbw_XjwpD-",
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS1GGS9I7dDab_zG7GmEXf3PSgmdZktXMtJnB94WGqserLhFZSd0AbH_rjHTKpD",
    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS9S2v_EWVCZ5Ew1jBtoy-c-0rcDbDnmaGZIOnJZmK_35TuTx7H50zENJ7t_55Q",
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS38SSOXt6LJBNv4FQvSHFfuUtH0vDI-yT0tI1xze5JpPgPFdR0fZBmTz-yU5Ev"
]

async function handler(req, res) {
    try{
        const projects = await Project.find();
        console.log(projects.length);
        for(let i=0;i<projects.length;i++){
            const randomIndex2 = Math.floor(Math.random() * images.length);
            projects[i].image = images[randomIndex2];

            await projects[i].save();
            console.log(i);
        }
        res.status(200).json({
            success : true,
            message : 'Projects updated'
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