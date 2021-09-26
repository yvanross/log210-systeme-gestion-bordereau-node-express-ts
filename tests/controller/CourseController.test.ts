import chai from 'chai';
import { CourseController } from '../../src/controller/CourseController';
import chaiHttp from 'chai-http';
import type { CourseJSON } from "../../src/model/json-types";

const COURSE_DATA: CourseJSON[] = require("../../data/courses.json")

chai.use(chaiHttp);
const expect = chai.expect;

describe('CourseControllerTest', () => {

  it('get all courses', () => {
    let controller: CourseController = new CourseController();
    let courses: CourseJSON[] = controller.all();
    expect(courses).to.deep.equal(COURSE_DATA)
  })

});
