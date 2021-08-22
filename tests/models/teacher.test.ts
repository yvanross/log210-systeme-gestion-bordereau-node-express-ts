import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from 'md5';
import { Teacher } from '../../src/model/Teacher';

chai.use(chaiHttp);
const expect = chai.expect;

describe('TeacherTest', () => {

  it('fail to create teacher by token', () => {
    expect(() => { Teacher.fromToken(md5("invalidemail") as string); }).to.throw('Teacher token not found');
    // expect(new Teacher(1)).to.throw(ex);
  });



  it('get teacher by Token', () => {
    let teacher = Teacher.fromToken(md5("cc-yvan.ross@etsmtl.ca") as string);
    expect(teacher.id).to.equal("cc-yvan.ross@etsmtl.ca");
    expect(teacher.first_name).to.equal("Yvan");
  });

  // it('get teacher groups', () => {
  //   let teacher = Teacher.fromId("cc-yvan.ross@etsmtl.ca");
  //   expect(teacher.groups().length).to.equal(4);
  // });

  it('login', () => {
    let teacher = Teacher.login('cc-yvan.ross@etsmtl.ca', 'unknown');
    expect(teacher.token).to.equal('7f1b6b7c407b1292560e61a21e47d645')
    expect(teacher.user.id).to.equal('cc-yvan.ross@etsmtl.ca')
  })
  it('fail to login', () => {
    let teacher = Teacher.login('teacher+100@gmail.com', 'unknown');
    expect(teacher).to.be.null
  })

 
});
