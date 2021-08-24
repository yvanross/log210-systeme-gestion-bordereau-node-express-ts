import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from 'md5';
import app from '../../src/App';



chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

describe('StudentsRouter', () => {
  beforeEach(async () => {
  });
  
  it('login', async () => {
    const res = await chai.request(app).get('/api/v3/student/login?email=first_name.last_name%2B1%40gmail.com&password=1234')
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body.token).to.eq('e649905a37aa58c397647862118e3474')
    expect(res.body.user.id).to.eq('first_name.last_name+1@gmail.com');
  }, 10000);
  
  
  
  it('Login with invalid email', async () => {
    const res = await chai.request(app).get('/api/v3/student/login?email=invalid%2B3%40gmail.com&password=1234')
    expect(res.status).to.equal(500);
    expect(res).to.be.json;
    expect(res.body.error).to.eq('Error: Email and password do not match student')
  }, 10000);
  
  
  
  it('request all students', async () => {
    const res = await chai.request(app).get('/api/v3/student/all')
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body.data.length).to.equal(100);
    expect(res.body.data[0]).to.deep.equal({"first_name": "first_name_1", "id": "first_name.last_name+1@gmail.com", "last_name": "last_name_1"})
  }, 10000);
  
  it('from token', async () => {
    const res = await chai.request(app).get('/api/v3/student/fromtoken?token=e649905a37aa58c397647862118e3474')
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body).to.deep.equal({"message": "Success", "user": {"first_name": "first_name_1", "id": "first_name.last_name+1@gmail.com", "last_name": "last_name_1"}}
    );
  }, 10000);
  
  it('from invalid token', async () => {
    const res = await chai.request(app).get('/api/v3/student/fromtoken?token=invalid')
    expect(res.status).to.equal(500);
    expect(res).to.be.json;
    expect(res.body.error).to.deep.equal('Error: Student token not found');
  }, 10000);
  
  
  it('get groupstudent', async () => {
    const res = await chai.request(app).get('/api/v3/student/groupstudent')
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body.data.length).to.deep.equal(100);
    expect(res.body.data[0]).to.deep.equal( {"group_id": "S20213-LOG121-01", "student_id": "first_name.last_name+1@gmail.com"});
  }, 10000);
  
});
