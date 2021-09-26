import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/App';
import type { CourseJSON } from '../../src/model/json-types';

const COURSE_DATA: CourseJSON[] = require("../../data/courses.json")

chai.use(chaiHttp);
const expect = chai.expect;

describe("CourseRouterTest", () => {

      it('get all courses', async () => {
        const res = await chai.request(app).get('/api/v3/course/all')
        expect(res.status).to.equal(200);
        expect(res).to.be.json;

        expect(res.body.data).to.deep.equal(COURSE_DATA);
      }, 10000);

});
