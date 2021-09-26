import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/App';
import type { ScheduleJSON } from '../../src/model/json-types';

const SCHEDULE_DATA: ScheduleJSON[] = require('../../data/Schedule.json')

chai.use(chaiHttp);
const expect = chai.expect;

describe("ScheduleRouterTest", () => {

      it('get all Schedules', async () => {
        const res = await chai.request(app).get('/api/v3/Schedule/all')
        expect(res.status).to.equal(200);
        expect(res).to.be.json;

        expect(res.body.data).to.deep.equal(SCHEDULE_DATA);
      }, 10000);

});
