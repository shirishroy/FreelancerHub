const cloudinary = require('cloudinary').v2;

cloudinary.config({
    secure: true,
});

async function uploader(file, res){
    try{
        const result = await cloudinary.uploader.upload(file, {
            use_filename: false,
            unique_filename: true,
            folder: 'skillBridge',
        });
        console.log(result);
        res.status(200).json({
            message: 'File uploaded successfully',
            url: result.url,
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error: 'Error in uploading file',
        });
    }
}

module.exports = uploader;