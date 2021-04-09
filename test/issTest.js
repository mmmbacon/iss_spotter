const assert = require('chai').assert;
const expect = require('chai').expect;
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('../iss');


describe('#fetchMyIP', () => {
  it('should return an error if the url is incorrect', (done) => {
    fetchMyIP(`https://api.ipiAAAfy.org?format=json`, (err, data) => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('should return an error if the status code is > 300', (done) => {
    fetchMyIP(`https://api.ipify.org?format=json`, (err, data) => {
      //expect(err).to.have.property('status').above(300);
      done();
    });
  });


});