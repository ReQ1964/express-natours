import { Request, Response } from 'express';

export const modifyQuery = async (req: Request, res: Response, tourModel: any) => {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  let query = tourModel.find(queryObj);

  if (req.query.sort) {
    const sortBy = req.query.sort.toString().split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('_id');
  }

  if (req.query.fields) {
    const fields = req.query.fields.toString().split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 100);
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numTours = await tourModel.countDocuments();
    if (skip >= numTours) throw new Error('This page does not exist');
  }

  return query;
};
