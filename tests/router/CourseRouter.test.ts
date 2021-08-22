import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from 'md5';
import app from '../../src/App';
import { Teacher } from '../../src/model/Teacher';
import { Student } from '../../src/model/Student';
import type { CourseJSON, StudentJSON } from '../../src/data';



chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();



describe("CourseRouterTest", () => {

      it('get all courses', async () => {
        const res = await chai.request(app).get('/api/v3/course/all')
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        
        let courses: CourseJSON[] = require('../../src/data/courses.json');
        expect(res.body.data).to.deep.equal(courses);
      }, 10000);

});
