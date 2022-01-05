export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: 'male' | 'female' | 'other';
  occupation: string;
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export type NewPatient = Omit<Patient, 'id'>;