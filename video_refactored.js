function statement(customer, movies) {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let partialResult = `Rental Record for ${customer.name}\n`;

  for (let rental of customer.rentals) {
    const movie = movies[rental.movieID];
    const movieAmount = getMovieAmount(movie, rental);

    frequentRenterPoints = updateFrequentRenterPoints(
      frequentRenterPoints,
      movie.code,
      rental.days
    );

    //print figures for this rental
    partialResult += `\t${movie.title}\t${movieAmount}\n`;
    totalAmount += movieAmount;
  }

  const result = addFooterLines(
    partialResult,
    totalAmount,
    frequentRenterPoints
  );

  return result;
}

function updateFrequentRenterPoints(
  frequentRenterPoints,
  movieCode,
  rentalDays
) {
  frequentRenterPoints++;

  // add bonus for a two day new release rental
  if (movieCode === "new" && rentalDays > 2) frequentRenterPoints++;

  return frequentRenterPoints;
}

function getMovieAmount(movie, currentRental) {
  let movieAmount = 0;

  switch (movie.code) {
    case "regular":
      movieAmount = 2;
      if (currentRental.days > 2) {
        movieAmount += (currentRental.days - 2) * 1.5;
      }
      break;
    case "new":
      movieAmount = currentRental.days * 3;
      break;
    case "childrens":
      movieAmount = 1.5;
      if (currentRental.days > 3) {
        movieAmount += (currentRental.days - 3) * 1.5;
      }
      break;
  }
  return movieAmount;
}

function addFooterLines(partialResult, totalAmount, frequentRenterPoints) {
  partialResult += `Amount owed is ${totalAmount}\n`;
  partialResult += `You earned ${frequentRenterPoints} frequent renter points\n`;
  return partialResult;
}

module.exports = statement;
