import request from 'supertest';
import {expect} from 'chai';
import database from '../configs/database';
import app from '../app';
import {ridesPath} from '../routes/rides';
import HttpStatusCodes from '../utils/consts/http-statuses-codes';
import {
  FIELDS_TO_CHECK,
  RIDES_NOT_FOUND_ERROR,
  SAMPLE_REQUEST_BODY,
  SAMPLE_RESPONSE,
} from '../../tests/mocks/instances';
import {healthPath} from '../routes/health';

describe('API controllers tests', () => {
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

  describe('/health', () => {
    it('should return health after GET request', (done) => {
      request(app)
          .get(healthPath)
          .expect('Content-Type', /text/)
          .expect(HttpStatusCodes.OK, done);
    });
  });
});
