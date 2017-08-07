/**
 * Created by Nick on 2017-06-30.
 */

import Order from '../models/order.model';
import Listing from  '../models/listing.model';
import User from '../models/user.model';
import paypal from 'paypal-rest-sdk';

paypal.configure({
  host: "api.sandbox.paypal.com",
  port: "",
  client_id : "ATVUs8u1i4Nnz4taHKNv8WyFgavljnSNeuZYBEaTEDGBBHGWiNrhrrijyK3blLkxPeHyO80xN4O0JFMo",
  client_secret: 'EFonBoGzRH4m4HxJFaS4M1__50vO5Ysu6LNou_qTJUY96w9M0FHn4gYhPbxvxysVNir9nSn11_z3aijC',
})

/**
 * Get Order list.
 * @property {number} req.query.skip - Number of orders to be skipped.
 * @property {number} req.query.limit - Limit number of orders to be returned.
 * @returns {Order[]}
 */
function getAllOrders(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Order.list({ limit, skip })
    .then(orders => res.json(orders))
    .catch(e => next(e));
}

/**
 * Get order by id
 * @property {string} req.params.id - The id of the order.
 * @returns {Listing}
 */
function getById(req, res, next) {
  return Order.get(req.params.id)
    .then(prod => res.json(prod))
    .catch(e => next(e));
}

/**
 * Create new Order
 * @property {Number} orderListingId - Id of listing.
 * @property {String} orderListingName - Name of listing.
 * @property {Number} orderAmount- How many to order.
 * @property {String} orderPayment - Type of payment.
 * @property {Number} orderListingPrice - The price of item.
 * @property {Number} orderTotalPrice - Total price of order.
 * @property {Number} orderVendorId - Vendor Id in DB.
 * @property {String} orderVendorName- Vendor name in DB.
 * @property {Number} orderBuyerId- Buyer user Id in DB.
 * @property {String} orderBuyerName - Buyer username in DB.
 * @property {Date}
 * @returns {order}
 */


function pay(req, res, next){
    paypal.payment.execute(req.body.paymentID, {payer_id: req.body.payerID}, function(error, payment){
      if (error) return res.send(error);
      Order.findOneAndUpdate({paypalid: req.body.paymentID},{$set: {isPaid: true, orderPaid: true}} ,function(err, order){
        if(err) return res.send(err);
        res.send(order);
      });

    })
}

function create(req, res, next) {

  var amount = req.body.orderAmount;
  Listing.findOneAndUpdate({_id: req.body.orderListingId, listingStock: {$gt: amount}},
    {$inc: {listingStock: -amount}},
    {new: true},
    function (err, doc) {
      if (err) {
        console.error('Something went wrong.', err)
      }
      if (!doc) {
        res.status(500).send({error: "Not found"})
      } else {
        const order = new Order({

          orderListingId: req.body.orderListingId,

          orderListingName: doc.listingName,

          orderAmount: amount,

          orderPricePerUnit: doc.listingPrice,
          orderPricePreTax: req.body.orderAmount * doc.listingPrice,
          orderPriceAfterTax: req.body.orderAmount * doc.listingPrice * 1.13,

          orderVendorId: doc.listingUser,
          orderVendorName: {
            Fname: doc.Fname,
            Lname: doc.Lname,
          },

          orderBuyerId: req.user,

          ShippingAddress: req.user.ShippingAddress,
        });
/*
        var payment ={
          intent: "sale",
          experience_profile_id: "",
          payer:{
            payment_method: "paypal"
          },
          redirect_urls:{
            return_url: "http://localhost:4040",
            cancel_url: "http://localhost:4040"
          },
          transactions: {
            amount:
              {
                total:  req.body.orderAmount * doc.listingPrice * 1.13,
                subtotal: req.body.orderAmount * doc.listingPrice,
                tax:  req.body.orderAmount * doc.listingPrice * 0.13,
              }
          },
          item_list: {
             items:[
               {
                 quantity: amount,
                 name: doc.listingName,
                 price: doc.listingPrice,
                 currency: 'CAD',
                 tax: 1,
               }
             ],
          },
          description: "Buy items"
        };*/

        var payment = {
          "intent": "sale",
          "payer": {
            "payment_method": "paypal"
          },
          "redirect_urls": {
            "return_url": "http://yoururl.com/execute",
            "cancel_url": "http://yoururl.com/cancel"
          },
          "transactions": [{
            "amount": {
              "total": Math.round(req.body.orderAmount * doc.listingPrice * 1.13 * 100) / 100,
              "currency": "CAD"
            },
            "description": "Buy Items"
          }]
        };

        paypal.payment.create(payment, function(error, payment){
          if(error) return res.send(error);

          order.paypalid = payment.id;

          order.save()
            .then(savedOrder => {

              Object.assign(payment, savedOrder);
              return res.send(payment);
            })
            .catch(e => next(e));
        });

   /*     */
        var vId = order.orderVendorId;
        var cId = order.orderBuyerId;
        var oId = order.id;

        User.findByIdAndUpdate(
          vId,
          {$push: {'orders': oId}},
          {safe: true, upsert: true, new: true},
          function (err, User) {
            if (err) {
              return res.status(500).send();
            }
          }
        );

        User.findByIdAndUpdate(
          cId,
          {$push: {'orders': oId}},
          {safe: true, upsert: true, new: true},
          function (err, User) {
            if (err) {
              return res.status(500).send();
            }
          }
        );
      }
    })
}

function setOrderShipped(req,res,next){
  console.log(req.params.id);
  Order.findByIdAndUpdate(req.params.id, {$set: {'orderShipped': true}}, {new: true}, function(err, order){
    if(err) {
      return res.status(500).send();
    } else{
      return res.json(order);
    }
  })
}

function removeAll(req, res, next) {
  Order.remove({}, function (err, Order) {
    if (err) return res.status(500).send("remove unsuccessful");
    res.send(Order);
  });

  User.update({}, {orders: []}, {multi: true}, function(err){
    if(err){
      return res.status(500).send();
    }else{
      console.log('removed from the list');
    }
  });
}

function calculateTax(req, res, next){
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var priceSchema = new Schema({
    perUnit: Number,
    amount: Number,
    subTotal: Number,
    tax: Number,
    grandTotal: Number
  });

  var price = mongoose.model('price', priceSchema);

  var ret = new price({
    perUnit: req.params.price,
    amount: req.params.amount,
    subTotal: req.params.price * req.params.amount,
    tax: req.params.price * req.params.amount*0.13,
    grandTotal: req.params.price * req.params.amount*1.13
  })

  res.status(200).json(ret);
}

export default{create, getById, removeAll, setOrderShipped, calculateTax, getAllOrders, pay}
