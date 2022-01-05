import express, { Request, Response } from 'express';
import patientsService from '../services/patients';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  const patients = patientsService.getNonSensitivePatients();
  res.send(patients);
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;