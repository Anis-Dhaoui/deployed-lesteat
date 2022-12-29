const express = require('express');
const Plates = require('../models/plateSchema');
const mongoose = require('mongoose');
const auth = require('../auth');
const cors = require('./cors');

const plateRouter = express.Router();
plateRouter.use(express.json());

// /plates/
plateRouter.route('/')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) =>{
    Plates.find({})
    .populate('comments.author')
    .then((plates) =>{
        if (plates !== null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(plates);
        }else{
            err = new Error("Plates collection is empty or not found");
            next(err);
        }
    },
    err => next(err))
    .catch(err => next(err))
})
.post(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    Plates.create(req.body)
    .then((plate) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, message: "Dish added successfully"});
    },
    err => {
        // if err.code === 11000 that means there is a duplicate key
        if(err.code && err.code === 11000){
            res.statusCode = 409;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: "Dish name is already exist"});
        }else
        next(err);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    res.statusCode = 403;
    res.json(req.method + " method is not supported for REST API endpoint /plates/");
})
.delete(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    for (let i of req.body){
        Plates.findByIdAndRemove(i).exec().catch(err => next(err));
    };
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, message: "Dishes deleted successfully"});

    // Plates.remove({})
    // .then((result) =>{
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(result);
    // },
    // err => next(err))
    // .catch(err => next(err));
});


// /plates/:plateId/
plateRouter.route('/:plateId')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) =>{
    Plates.findById(req.params.plateId)
    .populate('comments.author')
    .then((plate) =>{
        if (plate != null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(plate);
        }else{
            err = new Error("Plate not found");
            next(err);
        }
    },
    err => next(err))
    .catch(err => next(err))
})
.post(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    res.statusCode = 403;
    res.end(req.method + " method is not supported for the REST API endpoint " + req.originalUrl);
})
.put(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    Plates.findByIdAndUpdate(req.params.plateId, {$set: req.body}, {new: true})
    .then((plate) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, message: "Dish updated successfully"});
    },
    err => next(err))
    .catch(err => next(err))
})
.delete(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    Plates.findByIdAndRemove(req.params.plateId)
    .then((plate) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');7
        res.json(plate);
    },
    err => next(err))
    .catch(err => next(err))
});

// /plates/:plateId/comments/
plateRouter.route('/:plateId/comments')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) =>{
    Plates.findById(req.params.plateId)
    .populate('comments.author')
    .then((plate) =>{
        if (plate !== null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(plate.comments);
        }else{
            err = new Error("Plate not found");
            next(err);
        }
    },
    err => next(err))
    .catch(err => next(err))
})
.post(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    Plates.update({_id: req.params.plateId}, {$push: {"comments": {"": req.body, author: req.user._id}}}).exec()

    Plates.findById(req.params.plateId)
    .populate('comments.author')
    .then((plate) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(plate.comments);
    },
    err => next(err))
    .catch(err => next(err))
})
.put(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    res.statusCode = 403;
    res.end(req.method + " method is not supported for the REST API endpoint " + req.originalUrl);
})
.delete(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    Plates.update({_id: req.params.plateId}, {$pull: { comments: {} }}, {multi: true})
    .then((plate) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(plate)
    },
    err => next(err))
    .catch(err => next(err))
});

// /plates/:plateId/comments/:commentId/
plateRouter.route('/:plateId/comments/:commentId')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) =>{
    Plates.findById(req.params.plateId)
    .populate('comments.author')
    .then((plate) =>{
        if (plate !== null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(plate.comments.id(req.params.commentId));
        }else{
            err = new Error("Plate not found");
            next(err);
        }
    },
    err => next(err))
    .catch(err => next(err))
})
.post(cors.corsWithOpts, auth.verifyUser, auth.verifyOwner, (req, res, next) =>{
    res.statusCode = 403;
    res.end(req.method + " method is not supported for the REST API endpoint " + req.originalUrl);
})
.put(cors.corsWithOpts, auth.verifyUser, auth.verifyOwner, (req, res, next) =>{
    Plates.update({ "_id": req.params.plateId, "comments._id": req.params.commentId },
            { $set: { "comments.$.rating": req.body.rating, "comments.$.comment": req.body.comment } })
          .exec();
    
    Plates.findById(req.params.plateId)
    .populate('comments.author')
    .then((plate) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(plate.comments.id(req.params.commentId));
    },
    err => next(err))
    .catch(err => next(err))
})
.delete(cors.corsWithOpts, auth.verifyUser, auth.verifyOwner, (req, res, next) =>{
    Plates.update({_id: req.params.plateId}, {$pull: { comments: {_id: req.params.commentId} }}, {multi: true})
    .then((plate) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(plate)
    },
    err => next(err))
    .catch(err => next(err))
});

module.exports = plateRouter;