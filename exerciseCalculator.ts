interface Results {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: Array<number>, target: number): Results => {
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
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))