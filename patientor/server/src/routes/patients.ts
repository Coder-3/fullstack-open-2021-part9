import express, { Request, Response } from 'express';
import patientsService from '../services/patients';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  const patients = patientsService.getNonSensitivePatients();
  res.send(patients);
});

export default router;