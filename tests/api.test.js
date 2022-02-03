'use strict';

const request = require('supertest');
const expect = require('chai').expect;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

const RIDES_NOT_FOUND_ERROR = {
  error_code: 'RIDES_NOT_FOUND_ERROR',
  message: 'Could not find any rides',
};
const START_COORDINATES_ERROR = {
  error_code: 'VALIDATION_ERROR',
  message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
};
const END_COORDINATES_ERROR = {
  error_code: 'VALIDATION_ERROR',
  message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
};
const RIDER_ERROR = {
  error_code: 'VALIDATION_ERROR',
  message: 'Rider name must be a non empty string',
};

const SAMPLE_REQUEST_BODY = {
  'start_lat': 1,
  'start_long': 1,
  'end_lat': 6,
  'end_long': 6,
  'rider_name': 'Rider',
  'driver_name': 'Driver',
  'driver_vehicle': 'Vehicle',
};
const SAMPLE_RESPONSE = {
  'rideID': 1,
  'startLat': 1,
  'startLong': 1,
  'endLat': 6,
  'endLong': 6,
  'riderName': 'Rider',
  'driverName': 'Driver',
  'driverVehicle': 'Vehicle',
  'created': '2007-04-30 13:10:02',
};
const FIELDS_TO_CHECK = {
  'startLat': 1,
  'startLong': 1,
  'endLat': 6,
  'endLong': 6,
  'riderName': 'Rider',
  'driverName': 'Driver',
  'driverVehicle': 'Vehicle',
};

describe('API tests', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }

      buildSchemas(db);

      done();
    });
  });

  describe('/health', () => {
    it('should return health after GET request', (done) => {
      request(app)
          .get('/health')
          .expect('Content-Type', /text/)
          .expect(200, done);
    });
  });

  describe('/rides', () => {
    it('should return an error with no Rides found after GET request', (done) => {
      request(app)
          .get('/rides')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(RIDES_NOT_FOUND_ERROR))
          .expect(200, done);
    });

    it('should return a new Rides entity after POST request', (done) => {
      request(app)
          .post('/rides')
          .send(SAMPLE_REQUEST_BODY)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => {
            expect(res.body[0]).to.have.keys(...Object.keys(SAMPLE_RESPONSE));
            expect(res.body[0]).to.include(FIELDS_TO_CHECK);
          })
          .expect(200, done);
    });

    it('should return Rides found after GET request', (done) => {
      request(app)
          .get('/rides')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body.length).to.eql(1))
          .expect(200, done);
    });
  });

  describe('/rides/:id', () => {
    it('should return a Rides entity with a specified ID after GET request', (done) => {
      request(app)
          .get('/rides/1')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => {
            expect(res.body[0]).to.have.keys(...Object.keys(SAMPLE_RESPONSE));
            expect(res.body[0]).to.include({'rideID': 1});
          })
          .expect(200, done);
    });

    it('should return an error after GET request for the Rides entity with wrong ID', (done) => {
      request(app)
          .get('/rides/666')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(RIDES_NOT_FOUND_ERROR))
          .expect(200, done);
    });
  });

  describe('/rides POST validation', () => {
    it('should return an error if wrong start coordinates are provided', (done) => {
      request(app)
          .post('/rides')
          .send({...SAMPLE_REQUEST_BODY, start_lat: 100})
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(START_COORDINATES_ERROR))
          .expect(200, done);
    });

    it('should return an error if wrong end coordinates are provided', (done) => {
      request(app)
          .post('/rides')
          .send({...SAMPLE_REQUEST_BODY, end_lat: 100})
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(END_COORDINATES_ERROR))
          .expect(200, done);
    });

    it('should return an error if no rider name is provided', (done) => {
      request(app)
          .post('/rides')
          .send({...SAMPLE_REQUEST_BODY, rider_name: ''})
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(RIDER_ERROR))
          .expect(200, done);
    });

    it('should return an error if no driver name is provided', (done) => {
      request(app)
          .post('/rides')
          .send({...SAMPLE_REQUEST_BODY, driver_name: ''})
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(RIDER_ERROR))
          .expect(200, done);
    });

    it('should return an error if no driver vehicle is provided', (done) => {
      request(app)
          .post('/rides')
          .send({...SAMPLE_REQUEST_BODY, driver_vehicle: ''})
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(RIDER_ERROR))
          .expect(200, done);
    });
  });

  describe('/rides GET pagination', () => {
    before( (done) => {
      // adds more Rides to the database
      const postRide = (agent, i = 50) => {
        agent.post('/rides').send(SAMPLE_REQUEST_BODY).end(() => {
          i--;
          i > 0 ? postRide(agent, i) : done();
        });
      };
      postRide(request(app));
    },
    );

    it('should return the number of Rides entities stated in a limit parameter', (done) => {
      request(app)
          .get('/rides?limit=40')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => {
            console.log(res.body);
            expect(res.body.length).to.eql(40);
          })
          .expect(200, done);
    });

    it('should return the default number of Rides entities if no limit parameter is provided', (done) => {
      request(app)
          .get('/rides')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => {
            console.log(res.body);
            expect(res.body.length).to.eql(50);
          })
          .expect(200, done);
    });
  });
});
