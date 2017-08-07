import express from 'express';
import validate from 'express-validation';

import passport from 'passport';
import passportHttp from 'passport-http';

var BasicStrategy = passportHttp.BasicStrategy;

import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controller';
import config from '../../config/config';
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new BasicStrategy(authCtrl.login));

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
/*
router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);
*/
router.use(function(req,res,next){
    console.log('kek');
    next()
});

router.route('/login')
    .post(passport.authenticate('basic', {session: true}),
    function(req, res){
        if (req.user == "Unauthorized"){
          req.session = null;
          return res.status(403).send("Unauthorized");
        }


        return res.json(req.user);
    }
    );


router.route('/logout')
    .get(authCtrl.checkAnyAuth, authCtrl.logout);

router.route('/isLoggedIn')
    .get(authCtrl.checkAnyAuth, authCtrl.isLoggedIn);



export default router;
