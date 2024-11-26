const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const quizRouter = require('./routes/quiz');
const skillRouter = require('./routes/genAI');
const userRouter = require('./routes/user');
const jobRouter = require('./routes/job');
const applicationRouter = require('./routes/application');
const formidable = require('formidable');
const uploader = require('./cloudinary');
const multer = require('multer');
const uploadToS3 = require('./aws-s3-Uploader');
const handler = require('./routes/script2');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(cors());

connectDB();

app.use('/quiz', quizRouter);
app.use('/extractSkills', skillRouter);
app.use('/quiz', quizRouter);
app.use('/user', userRouter);
app.use('/job', jobRouter);
app.use('/application', applicationRouter);
app.post('/upload',upload.single('file'), (req,res)=>{
    // const formData = new formidable.IncomingForm();
    // formData.parse(req, (error, fields, files)=>{
    //     if(error){
    //         return res.status(400).json({
    //             error: 'Error in uploading file'
    //         });
    //     }
        console.log(req.file);
        console.log(req.file?.path);
        // uploader(req.file.path, res);
        uploadToS3(req.file, res);
    // });
});

app.get('/script', (req,res)=>{
    handler(req,res);
});

app.get('/',(req,res)=>{
    res.send('EEhe Backend to chalu he bhai!!');
});




app.listen(3000, ()=>{
    console.log('Backend Hu main!!');
});