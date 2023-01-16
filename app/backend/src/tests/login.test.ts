import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const randomToken = 'eyJhbIUzI1NiJ9.JDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBX.uUv'
const user = { id: 1, 
  username: 'User', 
  role: 'user', 
  email: 'user@user.com', 
  password: '$2a$08$xi.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'}

describe('Teste de cobertura da Seção Users e Login', () => {
  describe('POST /Login', () => {
    beforeEach(() => {
      sinon.stub(User, 'findOne').resolves(user as User)
      sinon.stub(jwt, 'sign').resolves(randomToken)
    })

    afterEach(() => sinon.restore())

    it('POST /login, executado com sucesso', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' })
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.deep.equal({ token: randomToken });
    });
  })
});