import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from 'md5';
import app from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

describe('TeacherRouteTest', () => {
  
  it('Login teacher', async () => {
    const res = await chai.request(app).get('/api/v3/teacher/login?email=cc-yvan.ross%40etsmtl.ca&password=1234')
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body.token).to.eq("7f1b6b7c407b1292560e61a21e47d645")
    expect(res.body.user.id).to.equal('cc-yvan.ross@etsmtl.ca')
  }, 10000);
  
  it('Login  fail', async () => {
    const res = await chai.request(app).get('/api/v3/teacher/login?email=teacher%2B100%40gmail.com&password=1234')
    expect(res.status).to.equal(500);
    expect(res).to.be.json;
    expect(res.body.error).to.equal('Error: Email and password do not match teacher')
  }, 10000);
  
  it('get all teacher', async () => {
    const res = await chai.request(app).get('/api/v3/teacher/all')
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body.data.length).to.equal(8)
    expect(res.body.data[0]).to.deep.equal(   {"first_name": "Vincent", "id": "cc-vincent.lacasse@etsmtl.ca", "last_name": "Lacasse"});
  }, 10000);
  
  
  it('from teacher token', async () => {
    const res = await chai.request(app).get('/api/v3/teacher/fromtoken?token=7f1b6b7c407b1292560e61a21e47d645')
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body.user.id).to.equal('cc-yvan.ross@etsmtl.ca')
  }, 10000);
  
  it('from teacher with invalid token', async () => {
    const res = await chai.request(app).get('/api/v3/teacher/fromtoken?token=invalid')
    expect(res.status).to.equal(500);
    expect(res).to.be.json;
    expect(res.body.error).to.equal('Error: Teacher token not found')
  }, 10000);
  
  
});

