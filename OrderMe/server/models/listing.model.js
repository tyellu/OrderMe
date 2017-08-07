import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Review from './review.model'

/**
 * Listing Schema
 */
const ListingSchema = new mongoose.Schema({
  listingName: {
    type: String,
    required: true
  },
  listingPrice: {
    type: Number,
    required: true
  },
  listingStock: {
    type: Number,
    required: true
  },
  listingDescription: {
    type:String,
    required: true
  },
  listingTags: [{type: String}],
  listingUser: {
    type: String,
  },
  listingUsername:{
    type: String,
  },
  listingImage: {
    type: String,
    required: true
  },
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});


/**
 * Methods
 */
ListingSchema.method({
});

/**
 * Statics
 */
ListingSchema.statics = {
  // /**
  //  * Get Listing
  //  * @param {ObjectId} id - The objectId of user.
  //  * @returns {Promise<Listing, APIError>}
  //  */
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
 * @typedef Listing
 */
export default mongoose.model('listing', ListingSchema);
