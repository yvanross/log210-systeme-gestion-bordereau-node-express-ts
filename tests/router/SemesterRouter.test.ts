import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/App';
import { SemesterJSON } from '../../src/model/json-types'

const SEMESTER_DATA: SemesterJSON[] = require('../../data/semester.json')

chai.use(chaiHttp);
const expect = chai.expect;

describe("SemesterRouterTest", () => {

      it('get all semesters', async () => {
        const res = await chai.request(app).get('/api/v3/semester/all')
        expect(res.status).to.equal(200);
        expect(res).to.be.json;

        expect(res.body.data).to.deep.equal(SEMESTER_DATA);
      }, 10000);

});
