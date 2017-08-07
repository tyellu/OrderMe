import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * TAGS Schema
 */
const ReviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true
  },
  review:{
    type: String,
    required: true
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  username:{
    type: String,
    required: true
  }
});

/**
 * Methods
 */
ReviewSchema.method({
});

/**
 * Statics
 */
ReviewSchema.statics = {

  get(id) {
    return this.findById(id)
      .exec()
      .then((review) => {
        if (review) {
          return review;
        }
        const err = new APIError('No such TAG exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Review
 */
export default mongoose.model('Review', ReviewSchema);
