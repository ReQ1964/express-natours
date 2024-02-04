import { Request, Response, ErrorRequestHandler } from 'express';
const fs = require('fs');

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req: Request, res: Response) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours,
		},
	});
};

const getTour = (req: Request, res: Response) => {
	console.log(req.params);
	const id = parseInt(req.params.id);

	const tour = tours.find((el: any) => el.id === id);

	res.status(200).json({
		status: 'success',
		data: {
			tour,
		},
	});
};

const createTour = (req: Request, res: Response) => {
	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);

	tours.push(newTour);

	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(_err: ErrorRequestHandler) => {
			res.status(201).json({
				status: 'success',
				data: {
					tour: newTour,
				},
			});
		}
	);
};

const updateTour = (req: Request, res: Response) => {
	res.status(200).json({
		status: 'success',
		data: {
			tour: '<Updated tour here...>',
		},
	});
};

const deleteTour = (req: Request, res: Response) => {
	res.status(204).json({
		status: 'success',
		data: null,
	});
};

export { getAllTours, getTour, createTour, updateTour, deleteTour };
