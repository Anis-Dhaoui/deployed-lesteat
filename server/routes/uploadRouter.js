const express = require('express');
const auth = require('../auth');
const multer = require('multer');
const cors = require('./cors');
const fs = require('fs');

const uploadRouter = express.Router();
uploadRouter.use(express.json());

// Configure destination upload of the image file and with which name
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/images');
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

// Check uploaded file extension
const imageFilter = (req, file, cb) =>{
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        cb(null, true);
    }else{
        const err = new Error("This file is not an image");
        cb(err, false)
    }
};

const upload = multer({storage: storage, fileFilter: imageFilter});

uploadRouter.route('/')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.post(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, upload.single('image'), (req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(req.file);
})

uploadRouter.route('/delete')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.delete(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    var notExistFiles = [];
    var deletedFiles = [];
    for(let i of req.body){
        if(!fs.existsSync(`public/${i}`)){
            notExistFiles.push(i);
        }else{
            fs.unlink(`public/${i}`, (err) =>{
                if(err) next(err);
            });
            deletedFiles.push(i);
        }
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({notExistFiles: notExistFiles, deletedFiles: deletedFiles}); 
});

module.exports = uploadRouter;