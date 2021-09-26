import chai from 'chai';
import { StudentController } from '../../src/controller/StudentController';
import type { GroupStudentJSON } from '../../src/model';

import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const expect = chai.expect;

describe('StudentControllerTest', () => {

  it('must login', () => {
    let controller: StudentController = new StudentController();
    let teacher = controller.login("first_name.last_name+1@gmail.com", "unknown");
    expect(teacher.token).to.equal('e649905a37aa58c397647862118e3474');
    expect(teacher.user.id).to.equal("first_name.last_name+1@gmail.com");
  })

  it('must fail to login', () => {
    let controller: StudentController = new StudentController();
    expect(() => { controller.login("teacher+100@gmail.com", "unknown"); }).to.throw('Email and password do not match student')
  })

  it('get all students', () => {
    let controller: StudentController = new StudentController();
    expect(controller.all().length).to.equal(100)
  })

  it('must get groupstudent', () => {
    let controller: StudentController = new StudentController();
    let groupStudent: GroupStudentJSON[] = controller.groupStudent();
    expect(groupStudent.length).to.equal(100);
    expect(groupStudent[0]).to.deep.equal( {"group_id": "S20213-LOG121-01", "student_id": "first_name.last_name+1@gmail.com"})
  })

});
