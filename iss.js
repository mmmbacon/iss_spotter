const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (err, res, body) => {

    if (err) {
      callback(err, null);
    }

    if (res) {
      if (res.statusCode === 200) {
        let data = JSON.parse(body);
        callback(null, data.ip);
      } else {
        let msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
        let error = Error(msg);
        callback(error, null);
      }
    }

    return;
    
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (err, res, body) => {

    if (err) {
      callback(err, null);
    }

    if (res) {
      if (res.statusCode === 200) {
        let data = JSON.parse(body);
        callback(null, { longitude: data.longitude, latitude: data.latitude});
      } else {
        let msg = `Status Code ${res.statusCode} when fetching Coords. Response: ${body}`;
        let error = Error(msg);
        callback(error, null);
      }
    }

    return;
    
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, res, body) => {

    if (err) {
      callback(err, null);
    }

    if (res) {
      if (res.statusCode === 200) {
        let data = JSON.parse(body);
        callback(null, data.response);
      } else {
        let msg = `Status Code ${res.statusCode} when fetching Flyovers. Response: ${body}`;
        let error = new Error(msg);
        callback(error, null);
      }
    }

    return;
    
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, data) => {
    if (err) {
      callback(err, null);
    } else {
      fetchCoordsByIP(data, (err, data) => {
        if (err) {
          callback(err, null);
        } else {
          fetchISSFlyOverTimes(data ,(err, data) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, data);
            }
          });
        }
      });
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };