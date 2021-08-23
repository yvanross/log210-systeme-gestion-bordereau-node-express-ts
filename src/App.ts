import express = require('express');
import logger = require('morgan');

import { courseRouter } from './routes/CourseRouter';
import { scheduleRouter } from './routes/ScheduleRouter';
import { semesterRouter } from './routes/SemesterRouter';
import { studentRouter } from './routes/StudentRouter';
import { teacherRouter } from './routes/TeacherRouter';
import { healtRouter } from './routes/HealtRouter';


// Creates and configures an ExpressJS web server.
 
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
   
    /**
         * @api {get} /dcl
         * @apiGroup Documentation
         * @apiDescription  Afficher le diagramme de classe
         */
    // router.get('/dcl', function (req, res) {
    //   res.redirect('/docs/dcl.svg');
    // })
    router.get('/', function (req, res) {
      res.redirect('/docs/index.html');
    });

    this.express.use('/api/v3/healt', healtRouter.router);
    this.express.use('/api/v3/course',courseRouter.router)
    this.express.use('/api/v3/Schedule',scheduleRouter.router)
    this.express.use('/api/v3/semester',semesterRouter.router)
    this.express.use('/api/v3/student',studentRouter.router)
    this.express.use('/api/v3/teacher',teacherRouter.router)
    this.express.use('/docs', express.static('dist/docs'));
    this.express.use('/dcl', express.static('dist/docs/dcl.svg'));
    this.express.use('/', router);  // routage de base

  }
}
export default new App().express;
