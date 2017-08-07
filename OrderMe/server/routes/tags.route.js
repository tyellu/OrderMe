import express from 'express';
import validate from 'express-validation';
import tagsCtrl from '../controllers/tags.controller';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';


//TODO
const router = express.Router(); // eslint-disable-line new-cap
// //localhost/api/tags
router.route('/createTag')
	/** POST /api/createTag - Create new tag */
  .post(authCtrl.checkSupplierAuth, validate(paramValidation.createTag), tagsCtrl.create);

router.route('/getAlltags')
	/** GET /api/getAlltags - Get all tags from database */
  .get(authCtrl.checkAnyAuth, tagsCtrl.getList);

router.route('/removeTag/:id')
  .delete(authCtrl.checkSupplierAuth, tagsCtrl.removeById);

export default router;
