import User from '../models/user.model';
import Listing from '../models/listing.model';
import Order from '../models/order.model';
import Tags from '../models/tags.model';

function getNumListings(cb){
  Listing.count({}, function( err, count){
    if (err) return res.send(err);
    cb(count);
  })
}

function getNumUsers(cb){
  User.count({}, function(err, count){
    if (err) return res.send(err);
    cb(count);
  })
}

function getNumConsumers(cb) {
  User.count({accountType: 'consumer'}, function(err, count){
    if (err) return res.send(err);
    cb(count);
  })
}


function getNumSupplier(cb) {
  User.count({accountType: 'producer'}, function(err, count){
    if (err) return res.send(err);
    cb(count);
  })
}

function getNumListings(cb) {
  Listing.count({}, function(err, count){
    if (err) return res.send(err);
    cb(count);
  })
}


function getNumAdmin(cb) {
  User.count({accountType: 'admin'}, function(err, count){
    if (err) return res.send(err);
    cb(count);
  })
}

function getNumOrders(cb){
  Order.count({}, function(err, count){
    if(err) return res.send(err);
    cb(count);
  })
}


function makeAdmin(req, res, next){
  User.findOneAndUpdate({username: req.body.username}, { $set: {accountType: 'admin'}},  {new: true}, function(err, user){
    if (err) return res.send(err);
    if (!user) return res.send({error: "User not found"});

    res.send(user);
  })
}

function totalTags(cb){
  Tags.count({},function (err, count) {
    if (err) return res.send(err);
    cb(count)

  })
}



function banUser(req, res, next){
  User.findOneAndUpdate({username: req.body.username}, { $set: {Banned: true}},  {new: true}, function(err, user){
    if (err) return res.send(err);
    if (!user) return res.send({error: "User not found"});
    res.send(user);
  })
}

function unbanUser(req, res, next){
  User.findOneAndUpdate({username: req.body.username}, { $set: {Banned: false}},  {new: true}, function(err, user){
    if (err) return res.send(err);
    if (!user) return res.send({error: "User not found"});


    res.send(user);
  })
}



function getAnalytics(req,res,next){
  var obj = {};
  getNumListings(function(numListings){
    obj["numListings"] = numListings;
    getNumUsers(function(numUsers){
      obj['numUsers'] = numUsers;
      getNumAdmin(function(numAdmin){
        obj['numAdmin'] = numAdmin;
        getNumConsumers(function(numConsumer){
          obj['numConsumer'] = numConsumer;
          getNumSupplier(function(numSupplier){
            obj['numSupplier'] = numSupplier;
            getNumListings(function(numListings){
              obj['numListings'] = numListings;
                getNumOrders(function(numOrders){
                  obj['numOrders'] = numOrders;
                  totalTags(function(totalTags){
                    obj['numTags'] = totalTags;
                    res.send(obj);
                  })
                })
            })
          })
        })
      })
    })
  })

}




export default {makeAdmin, getAnalytics, banUser, unbanUser}
