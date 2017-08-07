import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      accountType: Joi.string().regex(/(consumer|producer)/g).required()

    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/listing/createListing
   createListing:{
     listingName: Joi.string().required(),
     listingPrice: Joi.number().required(),
     listingStock: Joi.number().required(),
     listingDescription: Joi.string().required(),
     listingImage: Joi.string().required(),
     listingTags: Joi.array().items(Joi.string().required()).optional()
   },

   // POST /api/order/createOrder
  createOrder:{
    orderListingId: Joi.number().required(),
    orderAmount: Joi.number().required(),
    orderBillingAddress: {
      aptNo: Joi.string().required(),
      Street: Joi.string().required(),
      City: Joi.string().required(),
      Country: Joi.string().required(),
      PostalCode: Joi.string().required(),
    },
    orderShippingAddress: {
      aptNo: Joi.string().required(),
      Street: Joi.string().required(),
      City: Joi.string().required(),
      Country: Joi.string().required(),
      PostalCode: Joi.string().required(),
    }
  },

  // POST /api/tags/create
  createTag:{
    name: Joi.string().required()
  },

  // POST /api/listing/addReview
  addReview:{
    rating: Joi.number().required(),
    review: Joi.string().required()
  }
};
