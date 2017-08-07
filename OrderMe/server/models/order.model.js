/**
 * Created by Nick on 2017-06-27.
 */

import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Order Schema
 */
const OrderSchema = new mongoose.Schema({

  orderListingId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  orderListingName:{
    type: String,
    required: true
  },
  orderAmount:{
    type: Number,
    required: true
  },
  orderPricePerUnit:{
    type: Number,
    required: true
  },
  orderPricePreTax:{
    type: Number,
    required: true
  },
  paypalid:{
    type: String,
    required: true
  },
  isPaid:{
    type: Boolean,
    required: true,
    default: false
  },
  orderPriceAfterTax:{
    type: Number,
    required: true
  },
  orderVendorId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  orderVendorName:{
    Fname: String,
    Lname: String,
  },
  orderBuyerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  orderDate:{
    type: Date,
    default: Date.now
  },
  orderShipped:{
    type:Boolean,
    default: false
  },
  orderPaid:{
    type:Boolean,
    default: false
  },
  ShippingAddress: {
    Fname: String,
    Lname: String,
    aptNo : String,
    Street: String,
    City: String,
    Province: String,
    Country: String,
    PostalCode: String
  }

});

/**
 * Methods
 */
OrderSchema.method({
});

/**
 * Statics
 */
OrderSchema.statics = {
  // /**
  //  * Get Listing
  //  * @param {ObjectId} id - The objectId of user.
  //  * @returns {Promise<Listing, APIError>}
  //  */
  get(id) {
    return this.findById(id)
      .exec()
      .then((order) => {
        if (order) {
          return order;
        }
        const err = new APIError('No such order exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Listings in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Listing[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Order
 */
export default mongoose.model('order', OrderSchema);
