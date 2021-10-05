import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(height, weight);

  res.send({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isExercisesInvalid = daily_exercises.map((e: any) => !isNaN(Number(e)) ? false : true).includes(true);

  if (isExercisesInvalid || isNaN(Number(target))) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, target);

  res.send(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, access through http://localhost:${PORT}`);
});