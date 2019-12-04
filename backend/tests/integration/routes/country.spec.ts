import {app, server} from '@/index';
import * as supertest from 'supertest';
import { userModel as UserModel} from "@/models/user.model";

describe('country route', () => {
  afterEach(async () => {
    await server.close();
  });
  let token = {};
  const email = 'test+email+4@gmail.com';
  it('Test auth/register should return', (done) => {
    supertest(app)
      .post('/api/auth/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ name: 'Test', password: 'password', email: email })
      .end((err: any, res: supertest.Response) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect( typeof res.body ).toBe( 'object' );
          done();
        }
      });
  });

  it('Test auth/login should return', (done) => {
    supertest(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({ password: 'password', email: email })
      .end((err: any, res: supertest.Response) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect( typeof res.body ).toBe( 'object' );
          token = res.body.token;
          done();
        }
      });
  });

  it('Without auth should return 401', (done) => {
    supertest(app)
      .get('/api/countries')
      .end((err: any, res: supertest.Response) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(401);
          expect( typeof res.body ).toBe( 'object' );
          done();
        }
      });
  });

  it('With auth should return 200', (done) => {
    supertest(app)
      .get('/api/countries')
      .set('Accept', 'application/json')
      .set('Authorization', 'token ' + token)
      .expect('Content-Type', /json/)
      .end((err: any, res: supertest.Response) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect( typeof res.body ).toBe( 'object' );

         UserModel.findOne({ email: email }, (err, user) => {
           user.key_to_delete = undefined;
           user.save();
         });
          done();
        }
      });
  });

});

