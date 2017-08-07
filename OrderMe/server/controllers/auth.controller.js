import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/config';
import passwordHash from 'password-hash';

import User from '../models/user.model';

// sample user, used for authentication
const user = {
  username: 'react',
  password: 'express'
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
/*function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  if (req.body.username === user.username && req.body.password === user.password) {
    const token = jwt.sign({
      username: user.username
    }, config.jwtSecret);
    return res.json({
      token,
      username: user.username
    });
  }

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  return next(err);
}*/

function login(username, password, cb){

  console.log(username, password);
  User.findOne({username: username}, function(err, user){
    if (err) return cb(err);
    if (!user) return cb(null, {error: "User Not Registered"});
    if (!passwordHash.verify(password, user.passwordHash)) return cb(null, {error:"Wrong Password"});
    if (user.Banned) return cb(null, {error:"Banned"});
    return cb(null, user);

  })
}

function logout(req, res, next){

  req.logout();
  req.user = null;
  console.log(req.session);
  req.session.destroy(function(err){
    if (err) return res.send(err);
    res.send({message:'OK'});
  })

  //res.send({message: 'OK'});

}

function isLoggedIn(req, res, next){
  if(req.user){

    User.findOne({_id: req.user._id}, function(err, user){
        req.user = user;
        res.send(req.user);
    })


  }
}

function checkAnyAuth(req,res,next){
  if(req.user && !req.user.Banned){
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
     res.header('Pragma', 'no-cache');
    return next()
  }
  return res.status(401).send({error: 'Unauthorized'})
}

function checkAdminAuth(req,res,next){
  if(req.user && !req.user.Banned){
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
    if(req.user.accountType == 'admin'){
      return next();
    }
  }
  return res.status(401).send({error: 'Unauthorized'})
}

function checkSupplierAuth(req, res, next){
  if(req.user && !req.user.Banned){
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
    if(req.user.accountType == 'producer' || req.user.accountType == 'admin'){
      return next();
    }
  }
  return res.status(401).send({error: 'Unauthorized'})
}

function checkConsumerAuth(req, res, next){
  if(req.user && !req.user.Banned){
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
    if(req.user.accountType == 'consumer' || req.user.accountType == 'admin'){
      return next()
    }
  }
  return res.status(401).send({error: 'Unauthorized'})
}

export default { login, checkConsumerAuth, checkSupplierAuth, checkAnyAuth, checkAdminAuth, logout, isLoggedIn };
