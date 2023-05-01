const express = require('express');
const Staff = require('../models/staffSchema');
const mongoose = require('mongoose');
const auth = require('../auth');
const cors = require('./cors');

const staffRouter = express.Router();
staffRouter.use(express.json());

// /staff/
staffRouter.route('/')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) =>{
    Staff.find({})
    .then((staff) =>{
        if (staff != null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(staff);
        }else{
            err = new Error("staff collection is empty or not found");
            next(err);
        }
    },
    err => next(err))
    .catch(err => next(err))
})
.post(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    Staff.create(req.body)
    .then((staff) =>{
        console.log("New staff created");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(staff);
    },
    err => next(err))
    .catch(err => next(err))
})
.put(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    res.statusCode = 403;
    res.json(req.method + " method is not supported for REST API endpoint /staff/");
})
.delete(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    Staff.remove({})
    .then((result) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    },
    err => next(err))
    .catch(err => next(err))
});

// /staff/:staffId
staffRouter.route('/:staffId')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) =>{
    Staff.findById(req.params.staffId)
    .then((staff) =>{
        if (staff != null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(staff);
        }else{
            err = new Error("staff not found");
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
    Staff.findByIdAndUpdate(req.params.staffId, {$set: req.body}, {new: true})
    .then((staff) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');7
        res.json(staff);
    },
    err => next(err))
    .catch(err => next(err))
})
.delete(cors.corsWithOpts, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    Staff.findByIdAndRemove(req.params.staffId)
    .then((staff) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');7
        res.json(staff);
    },
    err => next(err))
    .catch(err => next(err))
});

module.exports = staffRouter;