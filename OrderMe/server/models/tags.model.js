import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * TAGS Schema
 */
const TAGSSchema = new mongoose.Schema({
  name: {type: String, required: true}
});

/**
 * Methods
 */
TAGSSchema.method({
});

/**
 * Statics
 */
TAGSSchema.statics = {

  get(id) {
    return this.findById(id)
      .exec()
      .then((tag) => {
        if (tag) {
          return tag;
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
 * @typedef TAGS
 */
export default mongoose.model('tags', TAGSSchema);