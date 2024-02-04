import {
	Request,
	Response,
	ErrorRequestHandler,
	NextFunction,
	RequestParamHandler,
} from 'express';
const fs = require('fs');

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkID = (
	req: Request,
	res: Response,
	next: NextFunction,
	val: RequestParamHandler
) => {
	if (parseInt(req.params.id) > tours.length) {
		console.log(`Tour id is ${val}`);

		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}
};

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
		`${__dirname}/../dev-data/data/tours-simple.json`,
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
	const id = parseInt(req.params.id);
	const tour = tours.find((el: any) => el.id === id);
	const updatedTour = Object.assign(tour, req.body);

	const updatedTours = tours.map((singleTour: any) => {
		return singleTour.id === updatedTour.id ? updatedTour : tour;
	});

	fs.writeFile(
		`${__dirname}/../dev-data/data/tours-simple.json`,
		JSON.stringify(updatedTours),
		(_err: ErrorRequestHandler) => {
			res.status(200).json({
				status: 'success',
				data: {
					tour: updatedTour,
				},
			});
		}
	);
};

const deleteTour = (req: Request, res: Response) => {
	res.status(204).json({
		status: 'success',
		data: null,
	});
};

export { getAllTours, getTour, createTour, updateTour, deleteTour, checkID };
