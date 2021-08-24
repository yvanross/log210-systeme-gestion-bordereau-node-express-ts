import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from 'md5';
import { SemesterJSON } from '../../src/model';
import { Semester } from '../../src/model/Semester';

chai.use(chaiHttp);
const expect = chai.expect;

describe('SemesterTest', () => {

  it('get all', ()=> {
    let semesters:SemesterJSON[] = Semester.all();
    expect(semesters).to.deep.equal(  [{"end": "2021-04-24", "id": "S20211", "name": "Hiver 2021", "start": "2021-12-27"}, {"end": "2021-08-28", "id": "S20212", "name": "Été 2021", "start": "2021-04-25"}, {"end": "2021-12-25", "id": "S20213", "name": "Automne 2021", "start": "2021-08-29"}]);
  })

});
