const express = require('express');
const mongoose = require('mongoose');
const WishList = require('../models/wishListSchema');
const auth = require('../auth');
const cors = require('./cors');

const wishListRouter = express.Router();

wishListRouter.use(express.json());

// /wishList/ endpoint:
wishListRouter.route('/')
.options(cors.corsWithOpts, (req, res) =>{ res.sendStatus(200); })
.get(cors.cors, auth.verifyUser, (req, res, next) =>{
    WishList.findOne({user: req.user._id})
    .populate('likeDish')
    .populate('user')
    .then((plate) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(plate);
    },
    (err) => next(err))
    .catch((err) => next(err))
})
.delete(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    WishList.deleteOne({user: req.user._id}, (err, result) =>{
        if (!err){
            console.log("Document of " + req.user._doc.firstname + " " + req.user._doc.lastname   + " has been removed");
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        }else{
            next(err);
        }
    },
    (err) => next(err))
    .catch((err) => next(err))
})


wishListRouter.route('/:plateId/')
.options(cors.corsWithOpts, (req, res) =>{ res.sendStatus(200); })
.post(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    WishList.findOne({user: req.user._id})
    .then((userList) =>{
        if (userList){
            if (userList.likeDish.indexOf(req.params.plateId) == -1){
                console.log("User exist and Plate doesn't exist, I'm gonna  add a new Plate to your fav list...");
                userList.likeDish.push(req.params.plateId);
                userList.save()
                .then((newFD) =>{
                    WishList.findById(newFD._id)
                    .populate('user')
                    .populate('likeDish')
                    .then((fav) =>{
                        console.log("New Plate added:\n", req.params.plateId);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(fav);
                    })
                })    
            }else{
                err = new Error("Plate " + req.params.plateId + " is already added to your plate list");
                next(err);
            }

        }else{
            console.log("User NOT exist");
            WishList.create({
                user: req.user._id,
                likeDish: req.params.plateId
            })
            .then((newFD) =>{
                WishList.findById(newFD._id)
                .populate('user')
                .populate('likeDish')
                .then((fav) =>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(fav);
                })
            })  
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    WishList.findOne({user: req.user._id})
    .then((userList) =>{
        if (userList){
            if (userList.likeDish.indexOf(req.params.plateId) !== -1){
                if (userList.likeDish.length > 1){
                    userList.update(
                        { $pull: { likeDish: req.params.plateId } }
                    )
                    .then(() =>{
                        WishList.findById(userList._id)
                        .populate('user')
                        .populate('likeDish')
                        .then((fav) =>{
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(fav);
                        })
                        },
                    (err) => next(err))
    
                }else{
                    WishList.deleteOne({user: req.user._id}, (err, result) =>{
                        if (!err){
                            console.log("Document of " + req.user._doc.firstname + " " + req.user._doc.lastname   + " has been removed");
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(result);
                        }else{
                            next(err);
                        }
                    },
                    (err) => next(err))
                    .catch((err) => next(err))
                }
            }else{
                err = new Error("Plate " + req.params.plateId + " is not found");
                return next(err);    
            }
        }else{
            err = new Error("user not found");
            return next(err);
        }
    },
    (err) => next(err))
    .catch((err) => next(err));
})

module.exports = wishListRouter;