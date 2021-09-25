import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe("HealtRouterTest", () => {

      it('ping', async () => {
        const res = await chai.request(app).get('/api/v3/healt/ping')
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body.message).to.equal("Success")
      }, 10000);

});
