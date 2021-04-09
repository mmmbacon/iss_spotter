const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((err, passTimes) => {
  if (err) {
    console.log(err);
  } else {
    for (const index in Object.keys(passTimes)) {
      const date = new Date(passTimes[index].risetime);
      console.log(`Next pass at ${date} for ${passTimes[index].duration} seconds!`);
    }
  }
});