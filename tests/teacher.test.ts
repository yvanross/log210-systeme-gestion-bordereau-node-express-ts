import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from 'md5';
import { Teacher } from '../src/core/Teacher';

chai.use(chaiHttp);
const expect = chai.expect;

describe('TeacherTest', () => {

  it('fail to create teacher by id', () => {
    expect(() => { Teacher.fromId(0); }).to.throw('Teacher id not found');
    // expect(new Teacher(1)).to.throw(ex);
  });

  it('fail to create teacher by token', () => {
    expect(() => { Teacher.fromToken(md5("invalidemail")); }).to.throw('Teacher token not found');
    // expect(new Teacher(1)).to.throw(ex);
  });


  it('get teacher by Id', () => {
    let teacher = Teacher.fromId(1);
    expect(teacher.id()).to.equal(1);
    expect(teacher.name()).to.equal("firstname1 last_name1");
    expect(teacher.email()).to.equal("teacher+1@gmail.com");
  });


  it('get teacher by Token', () => {
    let teacher = Teacher.fromToken(md5("teacher+1@gmail.com"));
    expect(teacher.id()).to.equal(1);
    expect(teacher.name()).to.equal("firstname1 last_name1");
    expect(teacher.email()).to.equal("teacher+1@gmail.com");
  });

  it('get teacher courses', () => {
    let teacher = Teacher.fromId(1);
    expect(teacher.courses().length).to.equal(2);
  });


});
