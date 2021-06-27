import chai from 'chai';
import { Course } from '../src/core/Course';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const expect = chai.expect;

describe('CourseTest', () => {

  it('fail to get Course by id', () => {
    expect(() => { Course.fromId(0); }).to.throw('Course id not found');
    //  expect(new Teacher(1)).to.throw(ex);
  });

  it('create course by Id', () => {
    let course = Course.fromId(1);
    expect(course.id()).to.equal(1);
    expect(course.sigle()).to.equal("LOG210");
    expect(course.nb_max_student()).to.equal(5);
    expect(course.groupe()).to.equal("01");
    expect(course.titre()).to.equal("Analyse et conception de logiciels");
    expect(course.date_debut()).to.equal("2019-09-01");
    expect(course.date_fin()).to.equal("2019-09-02");
  });

  it('get course students', () => {
    let course = Course.fromId(1);
    expect(course.students().length).to.equal(2);
  });

  it('get course from sigle', () => {
    // throw new Error("allo");
    let courses: Course[] = Course.fromSigle("LOG210");
    expect(courses.length).to.equal(4);
    let course_id_array: number[] = courses.map(c => c.id());
    expect(course_id_array.sort()).to.deep.equal([1, 2, 3, 4].sort());
  })

  it('course.students', () => {
    let course = Course.fromId(1);
    console.log("XXXXX");
    console.log(course.students());
  });
});
