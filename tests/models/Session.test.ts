import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from 'md5';
import { SessionJSON } from '../../src/data';
import { Session } from '../../src/model/Session';

chai.use(chaiHttp);
const expect = chai.expect;

describe('SessionTest', () => {

  it('get all', ()=> {
    let sessions:SessionJSON[] = Session.all();
    expect(sessions).to.deep.equal(  [{"end": "2021-04-24", "id": "S20211", "name": "Hiver 2021", "start": "2021-12-27"}, {"end": "2021-08-28", "id": "S20212", "name": "Été 2021", "start": "2021-04-25"}, {"end": "2021-12-25", "id": "S20213", "name": "Automne 2021", "start": "2021-08-29"}]);
  })

});
