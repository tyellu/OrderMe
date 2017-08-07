import Listing from '../models/listing.model';
import User from '../models/user.model';
import Review from '../models/review.model';

/**
 * Get Listing list.
 * @property {number} req.query.skip - Number of listings to be skipped.
 * @property {number} req.query.limit - Limit number of listings to be returned.
 * @returns {Listing[]}
 */
function getList(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Listing.list({ limit, skip })
    .then(listings => res.json(listings))
    .catch(e => next(e));
}

function checkGetParams(req, res, next) {
  if (typeof req.body.listingId === 'string') {
    return next();
  }
  return res.status(401).send('Product does not exist.');
}
/**
  * Get Listing by id
  * @property {string} req.body.listingName - The name of Listing.
  * @returns {Listing}
 */
function get(req, res, next) {
    return Listing.get(req.params.id)
      .then(prod => res.json(prod))
      .catch(e => next(e));
}

/**
 * Create new Listing
 * @property {string} req.body.listingname - The name of Listing.
 * @property {int} req.body.listingPrice - The price of Listing.
 * @property {int} req.body.listingStock - The stock of Listing.
 * @property {string} req.body.listingDesc - The description of Listing.
 * @property {[string]} req.body.listingtags - The tags of Listings.
 * @returns {Listing}
 */
function create(req, res, next) {
  const listing = new Listing({
    listingName: req.body.listingName,
    listingPrice: req.body.listingPrice,
    listingStock: req.body.listingStock,
    listingDescription: req.body.listingDescription,
    listingUser: req.user,
    listingUsername: req.user.username,
    listingImage: req.body.listingImage,
    listingTags: req.body.tags
  });

  listing.save()
    .then(savedListing => res.json(savedListing))
    .catch(e => next(e));

  var listingId = listing.id;

  User.findByIdAndUpdate(
      req.user,
      {$push: {'listings' : listingId}},
      {safe: true, upsert: true, new: true},
      function(err, User){
        if(err){
          return res.status(500).send();
        }
      }
    )
}


/**
  * removes all Listings from the database
  * @returns {Listing[]}
 */
function removeAll(req, res, next){
  Listing.remove({}, function(err, Listing){
    if(err) return res.status(500).send("remove unsuccessful");
    res.send(Listing);
  });

}

/**
 * Edits an existing Listing
 * @property {string} req.body.listingname - The name of Listing.
 * @property {int} req.body.listingPrice - The price of Listing.
 * @property {int} req.body.listingStock - The stock of Listing.
 * @property {string} req.body.listingDesc - The description of Listing.
 * @property {[string]} req.body.listingtags - The tags of Listings.
 * @returns {Listing}
 */
 function editListing(req, res, next){
    var id = req.params.id;

    Listing.findOne({_id: id}, function(err,listing){

      if(err){
        return res.status(500).send();
      }else{
        if(!listing){
          return res.status(404).send();
        }else{
          if(req.body.listingName){
            listing.listingName = req.body.listingName;
          }
          if(req.body.listingPrice){
            listing.listingPrice = req.body.listingPrice;
          }
          if(req.body.listingStock){
            listing.listingStock = req.body.listingStock;
          }
          if(req.body.listingDescription){
            listing.listingDescription = req.body.listingDescription;
          }
          if(req.body.listingImage){
            listing.listingImage = req.body.listingImage;
          }
          if(req.body.tags){
            listing.listingTags = req.body.tags;
          }

          listing.save()
          .then(updatedListing => res.json(updatedListing))
          .catch(e => next(e));
        }
      }

    });
 }

/** removes a Listings from the database given its id
  * @returns {Listing}
  */
 function removeById(req, res, next){
  var listingId = req.params.id;
  var listingUser;

  Listing.findOne({_id: listingId}, function(err,listing){
    if(err){
      return res.status(500).send();
    }else{
      if(!listing){
        res.status(404).send();
      }else{
        console.log('listingUser: ' + listing.listingUser);
        User.findByIdAndUpdate(
          listing.listingUser,
          {$pullAll: {'listings' : [listingId] }},
          function(err, User){
            if(err){
              return res.status(500).send();
            }else{
              console.log('removed from the list');
            }
          });
      }
    }
  });


  Listing.remove({_id: listingId}, function(err, removedListing){
    if(err){
      return res.status(500).send();
    }else{
      if(!removedListing){
        return res.status(404).send();
      }else{
        res.json(removedListing);
      }
    }
  });

 }

/** adds a review to the listing
  * @returns {Listing}
  */
function addReview(req, res, next){
  var listingId = req.params.id;

  const review = new Review({
    author : req.user,
    rating : req.body.rating,
    review: req.body.review,
    listing: listingId,
    username: req.user.username
  });

  review.save()
    .then(savedReview => res.json(savedReview))
    .catch(e => next(e));

  var rId = review.id;

  Listing.findByIdAndUpdate(
      listingId,
      {$push: {'reviews' : rId}},
      {safe: true, upsert: true, new: true},
      function(err, listing){
        if(err){
          return res.status(500).send();
        }
      }
  );
}


function getAllReviews(req, res, next){
  const { limit = 50, skip = 0 } = req.query;
  Review.list({ limit, skip })
    .then(reviews => res.json(reviews))
    .catch(e => next(e));
}

/** removes a Listings from the database given its id
  * @returns {Listing}
  */
 function removeReviewById(req, res, next){
  var ReviewId = req.params.rid;
  var ListingId = req.params.lid;
  Listing.findByIdAndUpdate(
    ListingId,
    {$pullAll: {'reviews' : [ReviewId] }},
    function(err, Listing){
      if(err){
        return res.status(500).send();
      }else{
        console.log('removed from the list');
      }
  });


  Review.remove({_id: ReviewId}, function(err, removedReview){
    if(err){
      return res.status(500).send();
    }else{
      if(!removedReview){
        return res.status(404).send();
      }else{
        res.json(removedReview);
      }
    }
  });
 }

 function getAllReviewsById(req, res, next){
  var id = req.params.id;
  Listing.
    findOne({_id: id}).
    populate('reviews').
    exec(function (err, listing){
      if (err) return res.status(500).send();
      res.json(listing.reviews);
    });
 }

 // function removeAllReviewsByListing(req, res, next){
 //    var listingId = req.params.id;
 //    Listing.findByIdAndUpdate(
 //      listingId,
 //      {$pullAll : {'reviews' : ["59670a41ad9ea428fb75fb1b"]}},
 //      function(err, listing){
 //        if(err){
 //          return res.status(500).send();
 //        }else{
 //          console.log('removed from the list');
 //        }
 //      });
 // }


export default {getList, create, get, removeAll, editListing, removeById, addReview,  getAllReviews, removeReviewById, getAllReviewsById};

