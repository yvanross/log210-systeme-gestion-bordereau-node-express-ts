import chai from 'chai';
import { Course } from '../../src/model/Course';
import chaiHttp from 'chai-http';
import type { CourseJSON } from '../../src/model/json-types';

const COURSE_DATA = require("../../data/courses.json")

chai.use(chaiHttp);
const expect = chai.expect;

describe('CourseTest', () => {

  it('get all', () => {
    let courses: CourseJSON[] = Course.all();
    expect(courses).to.deep.equal(COURSE_DATA)
  });

});
