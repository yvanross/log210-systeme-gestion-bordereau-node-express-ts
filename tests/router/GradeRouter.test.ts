import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe("GradeRouterTest", () => {

  it('insert grade', async () => {
    let res = await chai.request(app).get('/api/v3/grade/insert?student_id=first_name.last_name%2B1%40gmail.com&group_id=S20213-LOG210-01&type=Devoir1&type_id=2&note=75.1')
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body.data).to.deep.equal("first_name.last_name+1@gmail.com");

    res = await chai.request(app).get('/api/v3/grade/student?student_id=first_name.last_name%2B1%40gmail.com')
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body.data).to.deep.equal([{"group_id": "S20213-LOG210-01", "note": 75.1, "student_id": "first_name.last_name+1@gmail.com", "type": "Devoir1", "type_id": 2}]);

    res = await chai.request(app).get('/api/v3/grade/group?group_id=S20213-LOG210-01')
    expect(res.status).to.equal(200);
    expect(res).to.be.json;
    expect(res.body.data).to.deep.equal(
      [{"group_id": "S20213-LOG210-01", "note": 75.1, "student_id": "first_name.last_name+1@gmail.com", "type": "Devoir1", "type_id": 2}]
    );

  }, 10000);

});
