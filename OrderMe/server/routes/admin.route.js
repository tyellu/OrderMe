import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import adminCtrl from '../controllers/admin.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router(); // eslint-disable-line new-cap
//localhost/api/user


router.route('/makeAdmin')
  .post(authCtrl.checkAdminAuth, adminCtrl.makeAdmin);


router.route('/analytics')
  .get(authCtrl.checkAdminAuth, adminCtrl.getAnalytics);

router.route('/banUser')
  .post(adminCtrl.banUser);

router.route('/unbanUser')
  .post(adminCtrl.unbanUser);

export default router;
