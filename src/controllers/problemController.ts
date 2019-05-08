import { Problem, validateProblem } from '../models/problem';
import { Request, Response } from 'express';

// CRUD operations

export function getAll(req: Request, res: Response) {
  const options = {
    page: parseInt(req.query.pageNumber) || 1,
    limit: parseInt(req.query.pageSize) || 10,
    populate: {
      path: "setter",
      select: "name"
    },
    customLabels: {
      docs: 'problems'
    }
  };
  Problem.paginate({}, options, (err, result) => {
    if (err) return res.json({ message: err });
    res.send(result);
  });
}

export function getWithId(req: Request, res: Response) {
  const problemId = req.params.id;

  Problem.findById(problemId).then((result) => {
    res.send(result);
  }).catch((error) => {
    res.status(404).send(error);
  });
}

export function create(req: Request | any, res: Response) {
  const { error } = validateProblem(req.body);
  if (error) return res.status(422).json({ message: error.details[0].message });

  const problem = new Problem(req.body);
  problem.setter = req.user._id;
  problem.save();
  res.send(problem);

}

export function updateWithId(req: Request, res: Response) {

}

export function deleteWithId(req: Request, res: Response) {

}
