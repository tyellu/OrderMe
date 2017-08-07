/**
 * Created by Nick on 2017-06-30.
 */

import express from 'express';
import validate from 'express-validation';
import orderCtrl from '../controllers/order.controller';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controller';


const router = express.Router(); // eslint-disable-line new-cap
//localhost/api/order
router.route('/createOrder')
/** POST /api/createListing - Create new Listing */
  .post(authCtrl.checkConsumerAuth, validate(paramValidation.createOrder), orderCtrl.create);

router.route('/payOrder')
  .post(authCtrl.checkConsumerAuth, orderCtrl.pay);

router.route('/getAllOrders')
  .get(authCtrl.checkAdminAuth, orderCtrl.getAllOrders);

router.route('/getOrderById/:id')
/** GET /api/getOrderById/:id - Get Listing by ID */
  .get(authCtrl.checkConsumerAuth, orderCtrl.getById);

router.route('/setOrderShippedById/:id')
/** PUT /api/setOrderShipped/:id - Sets an Order by ID to shipped status*/
  .put(authCtrl.checkSupplierAuth, orderCtrl.setOrderShipped);

router.route('/calculateTax/:price/:amount')
  .get(authCtrl.checkConsumerAuth, orderCtrl.calculateTax);

router.route('/removeAll')
  .delete(authCtrl.checkAdminAuth, orderCtrl.removeAll);

export default router;