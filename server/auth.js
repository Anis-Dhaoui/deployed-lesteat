var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/userSchema');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var Plates = require('./models/plateSchema');

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ Based local auth Strategy $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// $$$$$$$$$$$$$$$$$$$$$$$ JWT based strategy $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Creating the Token
exports.getToken = (user) => {
    return (
        jwt.sign(user, process.env.SECRETKEY, { expiresIn: 604800 })
    )
};

var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRETKEY
};

passport.use(new JwtStrategy(options, (jwt_payload, done) => {

    User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
            done(err, false);
        } else
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
    })
}));

// *****************************************Start verify user *****************************************
exports.verifyUser = passport.authenticate('jwt', { session: false });
// *****************************************End verify user *****************************************

// *****************************************Start verify admin *****************************************
exports.verifyAdmin = (req, err, next) => {

    if (req.user.admin) {
        next();
    } else {
        var err = new Error("You're not admin, you're not allowed to perform this operation.");
        err.status = 403;
        next(err);
    }
};
// *****************************************End verify admin *****************************************

// *****************************************Start verify owner *****************************************
exports.verifyOwner = (req, err, next) => {

    Plates.findById(req.params.plateId)
        .then((plate) => {
            if (plate.comments.id(req.params.commentId)) {
                var author = plate.comments.id(req.params.commentId).author;
                var user = req.user._id;

                if (user.equals(author)) {
                    next();
                } else {
                    err = new Error("You're not the owner of this comment, you're not allowed to perform this operation.");
                    err.status = 403;
                    next(err);
                }
            } else {
                err = new Error("Comment not found");
                err.status = 403;
                next(err);
            }
        }, err => next(err))
        .catch((err) => next(err));
};
// *****************************************End verify owner *****************************************