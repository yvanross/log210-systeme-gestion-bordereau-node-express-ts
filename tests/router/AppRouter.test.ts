import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('AppRouterTest', () => {

    it('return documentation', async () => {
      const res = await chai.request(app).get('/')
      expect(res.status).to.equal(200);
      expect(res).to.be.html;
    }, 10000);

});
