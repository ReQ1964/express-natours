import express from 'express';
import {
  getAllTours,
  getTour,
  deleteTour,
  updateTour,
  createTour,
  checkID,
  checkBody
} from '../controllers/tourController';

const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
