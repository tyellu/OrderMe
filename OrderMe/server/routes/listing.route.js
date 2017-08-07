import express from 'express';
import validate from 'express-validation';
import listingCtrl from '../controllers/listing.controller';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router(); // eslint-disable-line new-cap
//localhost/api/listing
router.route('/createListing')
	/** POST /api/createListing - Create new Listing */
  .post(authCtrl.checkSupplierAuth, validate(paramValidation.createListing), listingCtrl.create);

router.route('/getAllListings')
	/** GET /api/getAllListings - Get all Listings from database */
  .get(authCtrl.checkAnyAuth, listingCtrl.getList);

router.route('/getListingById/:id')
	/** GET /api/getListingById/:id - Get Listing by ID */
  .get(authCtrl.checkAnyAuth, listingCtrl.get);

router.route('/removeAll')
	/** DELETE /api/getListingById/:id - Remove all listings from the database */
   .delete(authCtrl.checkAdminAuth, listingCtrl.removeAll);

router.route('/editListing/:id')
	/** PUT /api/getListingById/:id - udates listing information in the database*/
	// .put(((userCtrl.checkAdminAuth || userCtrl.checkSupplierAuth) && paramValidation.editListing), listingCtrl.editListing);
	.put(authCtrl.checkSupplierAuth,listingCtrl.editListing);

router.route('/remove/:id')
	.delete(authCtrl.checkSupplierAuth, listingCtrl.removeById);

router.route('/addReview/:id')
	.post(authCtrl.checkConsumerAuth, validate(paramValidation.addReview), listingCtrl.addReview);

router.route('/getAllReviews')
	.get(authCtrl.checkAnyAuth, listingCtrl.getAllReviews);

router.route('/removeReviewById/:rid/:lid')
	.delete(authCtrl.checkConsumerAuth, listingCtrl.removeReviewById);

router.route('/getAllReviewsByListing/:id')
	.post(authCtrl.checkAnyAuth, listingCtrl.getAllReviewsById);
// router.route('/removeAllReviewsByListing/:id')
// 	.post(listingCtrl.removeAllReviewsByListing);
export default router;
