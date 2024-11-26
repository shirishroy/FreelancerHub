const { Uploader } = require('@aws-sdk/client-s3');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const s3 = new AWS.S3({
    secretAccessKey : "dcN9QDwh0dTD/c0VVUnXsEgY/j8xhbV7wTPXWHju",
    accessKeyId : "AKIAW3MEAXU37W42Q7O6",
    region : "ap-southeast-1"
});

const bucketName = 'agarwalvivek29';

const uploadToS3 = async (file, res)=>{
    const fileStream = fs.createReadStream(file.path);
    fileStream.on('error',()=>{
        console.log('File error');
        res.status(400).json({
            success: false,
            error: 'Error in uploading file'
        });
        return;
    });
    console.log(file)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: Date.now() + '_' + path.extname(file.originalname),
    };

    s3.upload(uploadParams, (error,data)=>{
        if(error){
            console.log(error);
            res.status(400).json({
                success: false,
                error: 'Error in writing file to AWS S3'
            });
            return;
        }
        if(data){
            console.log(data);
            res.status(200).json({
                success: true,
                message: 'File uploaded successfully',
                url: data.Location
            });
        }
    });
}

module.exports = uploadToS3;