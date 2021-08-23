"use strict";
exports.__esModule = true;
var express = require("express");
var logger = require("morgan");
var CourseRouter_1 = require("./routes/CourseRouter");
var ScheduleRouter_1 = require("./routes/ScheduleRouter");
var SessionRouter_1 = require("./routes/SessionRouter");
var StudentRouter_1 = require("./routes/StudentRouter");
var TeacherRouter_1 = require("./routes/TeacherRouter");
var HealtRouter_1 = require("./routes/HealtRouter");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        /* This function will change when we start to add more
         * API endpoints */
        var router = express.Router();
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
        this.express.use('/api/v3/healt', HealtRouter_1.healtRouter.router);
        this.express.use('/api/v3/course', CourseRouter_1.courseRouter.router);
        this.express.use('/api/v3/Schedule', ScheduleRouter_1.scheduleRouter.router);
        this.express.use('/api/v3/session', SessionRouter_1.sessionRouter.router);
        this.express.use('/api/v3/student', StudentRouter_1.studentRouter.router);
        this.express.use('/api/v3/teacher', TeacherRouter_1.teacherRouter.router);
        this.express.use('/docs', express.static('dist/docs'));
        this.express.use('/dcl', express.static('dist/docs/dcl.svg'));
        this.express.use('/', router); // routage de base
    };
    return App;
}());
exports["default"] = new App().express;
