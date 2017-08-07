import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router(); // eslint-disable-line new-cap
//localhost/api/user
router.route('/')
  /** GET /api/user - Get current users */
  .get(authCtrl.checkConsumerAuth, userCtrl.get)

  /** POST /api/user - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);


/** GET /api/user - Get list of current users */
router.route('/userList')
    .get(authCtrl.checkAdminAuth, userCtrl.list);

router.route('/updateUser')
	.put(authCtrl.checkAnyAuth, userCtrl.update);

router.route('/removeAll')
   .delete(authCtrl.checkAdminAuth, userCtrl.removeAll);

router.route('/removeById/:id')
	.delete(authCtrl.checkAdminAuth, userCtrl.removeById);

router.route('/getOrders')
  .get(authCtrl.checkSupplierAuth, userCtrl.getOrders);

router.route('/updateBillingInfo/:id')
	.post(authCtrl.checkConsumerAuth, userCtrl.updateBillingInfo);

router.route('/updateShippingInfo/:id')
	.post(authCtrl.checkConsumerAuth, userCtrl.updateShippingInfo);

router.route('/updatePaymentInfo/:id')
	.post(authCtrl.checkConsumerAuth, userCtrl.updatePaymentInfo);

router.route('/getListingsByUser/:id')
	.post(authCtrl.checkSupplierAuth, userCtrl.getListingsByUser);

router.route('/getOrdersByUser/:id')
	.post(authCtrl.checkAnyAuth, userCtrl.getOrdersByUser);

export default router;
