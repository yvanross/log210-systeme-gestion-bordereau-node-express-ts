import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/App';
import type { SessionJSON } from '../../src/data';



chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();



describe("SessionRouterTest", () => {

      it('get all sessions', async () => {
        const res = await chai.request(app).get('/api/v3/session/all')
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        
        let sessions: SessionJSON[] = require('../../src/data/session.json');
        expect(res.body.data).to.deep.equal(sessions);
      }, 10000);

});
