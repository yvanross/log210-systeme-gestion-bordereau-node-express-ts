import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/App';
import type { SemesterJSON } from '../../src/data';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

describe("SemesterRouterTest", () => {

      it('get all semesters', async () => {
        const res = await chai.request(app).get('/api/v3/semester/all')
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        
        let semesters: SemesterJSON[] = require('../../src/data/semester.json');
        expect(res.body.data).to.deep.equal(semesters);
      }, 10000);

});
