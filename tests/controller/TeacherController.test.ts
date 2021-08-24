import chai from 'chai';
import { TeacherController } from '../../src/controller/TeacherController';
import chaiHttp from 'chai-http';
import type { TeacherJSON } from '../../src/model';

chai.use(chaiHttp);
const expect = chai.expect;

describe('TeacherControllerTest', () => {
  
  it('must login', () => {
    let controller: TeacherController = new TeacherController();
    let teacher = controller.login("cc-yvan.ross@etsmtl.ca", "unknown");
    expect(teacher.token).to.equal('7f1b6b7c407b1292560e61a21e47d645');
    expect(teacher.user.id).to.equal("cc-yvan.ross@etsmtl.ca");
  })
  
  it('must fail to login', () => {
    let controller: TeacherController = new TeacherController();
    expect(() => { controller.login("teacher+100@gmail.com", "unknown"); }).to.throw('Email and password do not match teacher')
  })
  
  it('get all teacher', () => {
    let controller: TeacherController = new TeacherController();
    let teachers = controller.all();
    expect(teachers.length).to.equal(8);
    expect(teachers[0]).to.deep.equal(   {"first_name": "Vincent", "id": "cc-vincent.lacasse@etsmtl.ca", "last_name": "Lacasse"});
  })
  
  
  it('get teacher from token', () => {
    let controller: TeacherController = new TeacherController();
    let teacher: TeacherJSON = controller.fromToken("7f1b6b7c407b1292560e61a21e47d645");
    expect(teacher.id).to.equal("cc-yvan.ross@etsmtl.ca");
    
  });
});
