import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from 'md5';
import { Student } from '../../src/model/Student';

chai.use(chaiHttp);
const expect = chai.expect;

describe('StudentTest', () => {

  it('fail to get student by token', () => {
    expect(() => { Student.fromToken(md5('invalidemail') as string); }).to.throw('Student token not found');
  });


  it('get student by Token', () => {
    let student = Student.fromToken(md5('first_name.last_name+1@gmail.com') as string);
    expect(student.id()).to.equal('first_name.last_name+1@gmail.com');
  });

  it('login', () => {
    let student = Student.login('first_name.last_name+1@gmail.com', 'unknown');
    expect(student.token).to.equal('e649905a37aa58c397647862118e3474')

    expect(student.user.id).to.equal('first_name.last_name+1@gmail.com')
  })
  it('fail to login', () => {
    let student = Student.login('student+100@gmail.com', 'unknown');
    expect(student).to.be.null
  })

});
