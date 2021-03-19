const video = require("./video_refactored");
// const video = require("./video");

describe("Original behaviour Suite", () => {
  test("The input are empty objects", () => {
    const customer = {
      name: "",
      rentals: [],
    };
    const movies = [];
    const expectedMovieRecord = "";

    response = expect(video(customer, movies)).toBe(
      _buildResponse({
        expectedMovieRecord,
        customerName: customer.name,
        amountOwed: 0,
        renterPoints: 0,
      })
    );
  });

  test("The input is not empty: 1 movie", () => {
    customer = {
      name: "José",
      rentals: [
        {
          movieID: 0,
          days: 1,
        },
      ],
    };
    movies = [
      {
        code: "regular",
        title: "<Movie 0>",
      },
    ];

    const expectedMovieRecord = `\t${movies[0].title}\t2`;

    response = expect(video(customer, movies)).toBe(
      _buildResponse({
        expectedMovieRecord,
        customerName: customer.name,
        amountOwed: 2,
        renterPoints: 1,
      })
    );
  });

  test("The input has 3 movies and 3 rentals", () => {
    customer = {
      name: "José",
      rentals: [
        {
          movieID: 0,
          days: 1,
        },
        {
          movieID: 1,
          days: 2,
        },
        {
          movieID: 2,
          days: 3,
        },
      ],
    };
    movies = [
      {
        code: "regular",
        title: "<Movie 0>",
      },
      {
        code: "new",
        title: "<Movie 0>",
      },
      {
        code: "childrens",
        title: "<Movie 0>",
      },
    ];

    const expectedMovieRecord = `\t${movies[0].title}\t2\n\t${movies[1].title}\t6\n\t${movies[2].title}\t1.5`;

    response = expect(video(customer, movies)).toBe(
      _buildResponse({
        expectedMovieRecord,
        customerName: customer.name,
        amountOwed: 9.5,
        renterPoints: 3,
      })
    );
  });

  test("The input has long days", () => {
    customer = {
      name: "José",
      rentals: [
        {
          movieID: 0,
          days: 10,
        },
        {
          movieID: 1,
          days: 20,
        },
        {
          movieID: 2,
          days: 30,
        },
      ],
    };
    movies = [
      {
        code: "regular",
        title: "<Movie 0>",
      },
      {
        code: "new",
        title: "<Movie 0>",
      },
      {
        code: "childrens",
        title: "<Movie 0>",
      },
    ];

    const expectedMovieRecord = `\t${movies[0].title}\t14\n\t${movies[1].title}\t60\n\t${movies[2].title}\t42`;

    response = expect(video(customer, movies)).toBe(
      _buildResponse({
        expectedMovieRecord,
        customerName: customer.name,
        amountOwed: 116,
        renterPoints: 4,
      })
    );
  });

  function _buildResponse({
    customerName,
    expectedMovieRecord,
    amountOwed,
    renterPoints,
  }) {
    let expectedResult = `Rental Record for ${customerName}`;

    if (expectedMovieRecord !== "") {
      expectedResult = expectedResult + `\n${expectedMovieRecord}`;
    }
    expectedResult += `\nAmount owed is ${amountOwed}`;

    expectedResult += `\nYou earned ${renterPoints} frequent renter points\n`;
    return expectedResult;
  }
});
