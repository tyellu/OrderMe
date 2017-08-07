import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import listingRoutes from './listing.route';
import adminRoutes from './admin.route';
import orderRoutes from './order.route';
import tagsRoutes from './tags.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /user
router.use('/user', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

//mount listing routes at /listing
router.use('/listing', listingRoutes);

router.use('/admin', adminRoutes);

//mount order routes at /order
router.use('/order', orderRoutes);

//mount tags routes at /tags
router.use('/tags', tagsRoutes);

export default router;
