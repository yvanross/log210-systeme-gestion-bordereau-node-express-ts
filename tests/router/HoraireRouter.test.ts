import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/App';
import type { ScheduleJSON } from '../../src/model';



chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();



describe("ScheduleRouterTest", () => {

      it('get all Schedules', async () => {
        const res = await chai.request(app).get('/api/v3/Schedule/all')
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        
        let Schedules: ScheduleJSON[] = require('../../src/data/Schedule.json');
        expect(res.body.data).to.deep.equal(Schedules);
      }, 10000);

});
