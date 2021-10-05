interface Results {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Values {
  target: number,
  hours: Array<number>
}

const parseArgs = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error('not enough arguments');

  args.slice(2, args.length).forEach(arg => { if (isNaN(Number(arg))) throw new Error(`Provided value not a number: ${arg}`); });

  const target = Number(args[2]);
  const hours = args.slice(3, args.length).map(arg => Number(arg));

  return { target, hours };
};

export const calculateExercises = (hours: Array<number>, target: number): Results => {
  const periodLength = hours.length;
  const average = hours.reduce((a, b) => a + b) / periodLength;
  const trainingDays = hours.reduce((a, b) => b === 0 ? a + 1 : a);
  const success = average < target ? false : true;
  
  let rating = 0;
  let ratingDescription = '';

  if (target - average >= 1) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (target - average < 1 && target - average > 0) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'good';
  }

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

try {
  const { target, hours } = parseArgs(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened:', error.message);
}