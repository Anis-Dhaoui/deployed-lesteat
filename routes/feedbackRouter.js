const express = require('express');
const mongoose = require('mongoose');
const Feedbacks = require('../models/feedbackSchema');
const GuestFeedback = require('../models/guestFeedbackSchema');
const auth = require('../auth');
const cors = require('./cors');

const feedbackRouter = express.Router();

feedbackRouter.use(express.json());

// Not logged users feedback
feedbackRouter.route('/guest')
.options(cors.corsWithOpts, (req, res) =>{ res.sendStatus(200); })
.post(cors.corsWithOpts, (req, res, next) =>{

    if (req.body !== null){
        GuestFeedback.create(req.body)
        .then((feedback) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(feedback);
        }, (err) => next(err))
        .catch((err) => next(err));
    }else{
        err = new Error("The request body is empty");
        err.status = 404;
        return next(err);
    }
})

// Logged user Feedback
feedbackRouter.route('/')
.options(cors.corsWithOpts, (req, res) =>{ res.sendStatus(200); })
.get(cors.cors, (req, res, next) =>{
    Feedbacks.find(req.query)
    .populate('author')
    .then((feedback) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    },
    (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    if (req.body !== null){
        req.body.author = req.user._id;
        
        Feedbacks.create(req.body)
        .then((feedback) =>{
            Feedbacks.findById(feedback._id)
            .populate('author')
            .then((feedback) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(feedback);
            })
        }, (err) => next(err))
        .catch((err) => next(err));
    }else{
        err = new Error("The request body is empty");
        err.status = 404;
        return next(err);
    }
})
.put(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    res.statusCode = 403;
    res.end(req.method + " method is not supported for /feedbacks/");
})
.delete(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    Feedbacks.remove({})
    .then((resp) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },
    (err) => next(err))
    .catch((err) => next(err));
});

// /feedbacks/:feedbackId/ endpoint:
feedbackRouter.route('/:feedbackId')
.options(cors.corsWithOpts, (req, res) =>{ res.sendStatus(200); })
.get(cors.cors, (req, res, next) =>{
    Feedbacks.findById(req.params.feedbackId)
    .populate('author')
    .then((feedback) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    },
    (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOpts, auth.verifyUser, auth.verifyOwner, (req, res, next) =>{
    res.statusCode = 403;
    res.end("Post method is not supported for /feedbacks/" + req.params.feedbackId);    
})
.put(cors.corsWithOpts, auth.verifyUser, auth.verifyOwner, (req, res, next) =>{
    Feedbacks.findById(req.params.feedbackId)
    .then((feedback) =>{
        if (feedback != null){
            if (req.body.author === undefined){
                req.body.author = req.user._id;
                Feedbacks.findByIdAndUpdate(req.params.feedbackId, {$set: req.body}, {new: true})
                .then((feedback) =>{
                    Feedbacks.findById(feedback._id)
                    .populate('author')
                    .then((feedback) =>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(feedback);
                    })
                },
                (err) => next(err));
            }else{
                err = new Error("Author field couldn't be changed");
                return next(err);    
            }
        }else{
            err = new Error("feedback " + req.params.feedbackId + " is not found");
            return next(err);
        }
    },
    (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOpts, auth.verifyUser, auth.verifyOwner, (req, res, next) =>{
    Feedbacks.findById(req.params.feedbackId)
    .then((feedback) =>{
        if (feedback != null){
            Feedbacks.findByIdAndRemove(req.params.feedbackId)
            .then((resp) =>{
                Feedbacks.findById(resp._id)
                .populate('author')
                .then((feedback) =>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(feedback);
                })
            },
            (err) => next(err))
            .catch((err) => next(err));
        }else{
            err = new Error("feedback " + req.params.feedbackId + " is not found");
            return next(err);
        }
    },
    (err) => next(err))
    .catch((err) => next(err));
});



module.exports = feedbackRouter;