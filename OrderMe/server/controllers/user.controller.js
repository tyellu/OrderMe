 import User from '../models/user.model';
import passwordHash from 'password-hash';

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    username: req.body.username,
    passwordHash: passwordHash.generate(req.body.password, {algorithm: 'sha256'}),
    accountType: req.body.accountType
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  var id = req.user;
  User.findByIdAndUpdate(
    id,
    {$set : {'Fname' : req.body.Fname,
             'Lname' : req.body.Lname,
             'City' : req.body.City,
             'Country' : req.body.Country,
             'Phone' : req.body.Phone,
             'Email' : req.body.Email,
             'Company' : req.body.Company,
             'CPosition': req.body.CPosition,
             'Image' : req.body.Image}},
    {safe: true, upsert: true, new: true},
    function(err, user){
      if(err){
        return res.status(500).send()
      }else{
        return res.json(user);
      }
    });
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */


/**
  * removes all users from the database
  * @returns {Users[]}
*/
function removeAll(req, res, next){
  User.remove({}, function(err, User){
    if(err) return res.status(500).send({error: "remove unsuccessful"});
    res.send(Listing);
  });

}


/** removes a user from the database given its id
  * @returns {user}
  */
function removeById(req, res, next){
  var id = req.params.id;
  User.remove({_id: id}, function(err, removedUser){
    if(err){
      return res.status(500).send();
    }else{
      if(!removedUser){
        return res.status(404).send();
      }else{
        return res.json(removedUser);
      }
    }
  });
}

 /** Get order of current user, available to consumers
  */
function getOrders(req, res, next){
 var id = req.user;
   User.
   findOne({_id: id}).
   populate('orders').
   exec(function (err, user){
     if (err) return res.status(500).send();
     res.json(user.orders);
   });
 }

 /** Get order by userId, available for admin use only
  * @returns
  */
 function getOrdersByUser(req, res, next){
   var id = req.params.id;
   User.
   findOne({_id: id}).
   populate('orders').
   exec(function (err, user){
     if (err) return res.status(500).send();
     res.json(user.orders);
   });
 }

 function updateBillingInfo(req, res, next){
  var id = req.params.id;
  User.findByIdAndUpdate(
    id,
    {$set: {"BillingAddress.Fname" : req.body.Fname,
            "BillingAddress.Lname" : req.body.Lname,
            "BillingAddress.aptNo" : req.body.aptNo,
            "BillingAddress.Street" : req.body.Street,
            "BillingAddress.City" : req.body.City,
            "BillingAddress.Province" : req.body.Province,
            "BillingAddress.Country" : req.body.Country,
            "BillingAddress.PostalCode" : req.body.PostalCode}},
    {safe: true, upsert: true, new: true},
    function(err, user){
      if(err){
        return res.status(500).send()
      }else{
        return res.json(user);
      }
  });
}

function updateShippingInfo(req, res, next){
  var id = req.params.id;
  User.findByIdAndUpdate(
    id,
    {$set: {"ShippingAddress.Fname" : req.body.Fname,
            "ShippingAddress.Lname" : req.body.Lname,
            "ShippingAddress.aptNo" : req.body.aptNo,
            "ShippingAddress.Street" : req.body.Street,
            "ShippingAddress.City" : req.body.City,
            "ShippingAddress.Province" : req.body.Province,
            "ShippingAddress.Country" : req.body.Country,
            "ShippingAddress.PostalCode" : req.body.PostalCode}},
    {safe: true, upsert: true, new: true},
    function(err, user){
      if(err){
        return res.status(500).send()
      }else{
        return res.json(user);
      }
  });
}

function updatePaymentInfo(req, res, next){
  var id = req.params.id;
  User.findByIdAndUpdate(
    id,
    {$set: {"PaymentInfo.name" : req.body.name,
            "PaymentInfo.cardNo" : req.body.cardNo,
            "PaymentInfo.type" : req.body.type,
            "PaymentInfo.expiryYear" : req.body.expiryYear,
            "PaymentInfo.expiryMonth" : req.body.expiryMonth,
            "PaymentInfo.code" : req.body.code}},
    {safe: true, upsert: true, new: true},
    function(err, user){
      if(err){
        return res.status(500).send()
      }else{
        return res.json(user);
      }
  });
}

 function getListingsByUser(req, res, next){
  var id = req.params.id;
  User.
    findOne({_id: id}).
    populate('listings').
    exec(function (err, user){
      if (err) return res.status(500).send();
      res.json(user.listings);
    });
 }

export default { get, create, update, list, removeAll, removeById , getOrders, getOrdersByUser, updateBillingInfo, updateShippingInfo, updatePaymentInfo, getListingsByUser};
