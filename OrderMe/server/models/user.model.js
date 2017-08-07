import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import listing from '../models/listing.model.js'

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    required: true
  },
  PaymentInfo:{
    name: String,
    cardNo: String,
    type: String,
    expiryYear: String,
    expiryMonth: String,
    code: String
  },
  Fname: String,
  Lname: String,
  Banned: {
    type: Boolean,
    default: false,
    required: true
  },
  City: String,
  Country: String,
  Phone: String,
  Email: String,
  Company: String,
  CPosition: String,
  Image: String,
  listings: [{type: mongoose.Schema.Types.ObjectId, ref: 'listing'}],
  BillingAddress: {
    Fname: String,
    Lname: String,
    aptNo: String,
    Street: String,
    City: String,
    Province: String,
    Country: String,
    PostalCode: String
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
  },
  orders : [{type: mongoose.Schema.Types.ObjectId, ref: 'order'}]
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
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
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
