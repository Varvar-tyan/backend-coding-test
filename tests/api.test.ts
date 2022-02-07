import request from 'supertest';
import {expect} from 'chai';

import database from '../src/configs/database';
import app from '../src/app';
import {
  END_COORDINATES_ERROR,
  FIELDS_TO_CHECK, RIDER_ERROR,
  RIDES_NOT_FOUND_ERROR, SAMPLE_INJECTION,
  SAMPLE_REQUEST_BODY,
  SAMPLE_RESPONSE,
  START_COORDINATES_ERROR,
} from './mocks/instances';
import {ridesPath} from '../src/routes/rides';
import {healthPath} from '../src/routes/health';
import HttpStatusCodes from '../src/utils/consts/http-statuses-codes';

describe('API tests', () => {
  before(async () => {
    await database.init();
  });

  describe('/rides', () => {
    it('should return an error with no Rides found after GET request', (done) => {
      request(app)
          .get(ridesPath)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(RIDES_NOT_FOUND_ERROR))
          .expect(HttpStatusCodes.NOT_FOUND, done);
    });

    it('should return a new Rides entity after POST request', (done) => {
      request(app)
          .post(ridesPath)
          .send(SAMPLE_REQUEST_BODY)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => {
            expect(res.body).to.have.keys(...Object.keys(SAMPLE_RESPONSE));
            expect(res.body).to.include(FIELDS_TO_CHECK);
          })
          .expect(HttpStatusCodes.CREATED, done);
    });

    it('should return Rides found after GET request', (done) => {
      request(app)
          .get(ridesPath)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body.length).to.eql(1))
          .expect(HttpStatusCodes.OK, done);
    });
  });

  describe('/rides/:id', () => {
    it('should return a Rides entity with a specified ID after GET request', (done) => {
      request(app)
          .get(`${ridesPath}/1`)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => {
            expect(res.body).to.have.keys(...Object.keys(SAMPLE_RESPONSE));
            expect(res.body).to.include({'rideID': 1});
          })
          .expect(HttpStatusCodes.OK, done);
    });

    it('should return an error after GET request for the Rides entity with wrong ID', (done) => {
      request(app)
          .get(`${ridesPath}/666`)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(RIDES_NOT_FOUND_ERROR))
          .expect(HttpStatusCodes.NOT_FOUND, done);
    });
  });

  describe('/rides POST validation', () => {
    it('should return an error if wrong start coordinates are provided', (done) => {
      request(app)
          .post(ridesPath)
          .send({...SAMPLE_REQUEST_BODY, start_lat: 100})
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(START_COORDINATES_ERROR))
          .expect(HttpStatusCodes.BAD_REQUEST, done);
    });

    it('should return an error if wrong end coordinates are provided', (done) => {
      request(app)
          .post(ridesPath)
          .send({...SAMPLE_REQUEST_BODY, end_lat: 100})
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(END_COORDINATES_ERROR))
          .expect(HttpStatusCodes.BAD_REQUEST, done);
    });

    it('should return an error if no rider name is provided', (done) => {
      request(app)
          .post(ridesPath)
          .send({...SAMPLE_REQUEST_BODY, rider_name: ''})
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(RIDER_ERROR))
          .expect(HttpStatusCodes.BAD_REQUEST, done);
    });

    it('should return an error if no driver name is provided', (done) => {
      request(app)
          .post(ridesPath)
          .send({...SAMPLE_REQUEST_BODY, driver_name: ''})
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(RIDER_ERROR))
          .expect(HttpStatusCodes.BAD_REQUEST, done);
    });

    it('should return an error if no driver vehicle is provided', (done) => {
      request(app)
          .post(ridesPath)
          .send({...SAMPLE_REQUEST_BODY, driver_vehicle: ''})
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(RIDER_ERROR))
          .expect(HttpStatusCodes.BAD_REQUEST, done);
    });
  });

  describe('/rides GET pagination', () => {
    before( (done) => {
      // adds more Rides to the database
      const postRide = (request, ridesIndex = 50) => {
        request.post(ridesPath).send(SAMPLE_REQUEST_BODY).end(() => {
          ridesIndex--;
          ridesIndex ? postRide(request, ridesIndex) : done();
        });
      };
      postRide(request(app));
    },
    );

    it('should return the number of Rides entities stated in a limit parameter', (done) => {
      const limit = 40;
      request(app)
          .get(`${ridesPath}?limit=${limit}`)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => {
            expect(res.body.length).to.eql(limit);
          })
          .expect(HttpStatusCodes.OK, done);
    });

    it('should return the default number of Rides entities if no limit parameter is provided', (done) => {
      request(app)
          .get(ridesPath)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => {
            expect(res.body.length).to.eql(50);
          })
          .expect(HttpStatusCodes.OK, done);
    });
  });

  describe('SQL injection', () => {
    it('should return a new Rides entity after POST request', (done) => {
      request(app)
          .post(ridesPath)
          .send(SAMPLE_INJECTION)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => {
            expect(res.body).to.have.keys(...Object.keys(SAMPLE_RESPONSE));
          })
          .expect(HttpStatusCodes.CREATED, done);
    });

    it('should return an error with no Rides found', (done) => {
      const injectionID = ';DROP TABLE Rides;';
      request(app)
          .get(`${ridesPath}/${injectionID}`)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect((res) => expect(res.body).to.eql(RIDES_NOT_FOUND_ERROR))
          .expect(HttpStatusCodes.NOT_FOUND, done);
    });
  });


  describe('/health', () => {
    it('should return health after GET request', (done) => {
      request(app)
          .get(healthPath)
          .expect('Content-Type', /text/)
          .expect(HttpStatusCodes.OK, done);
    });
  });
});
