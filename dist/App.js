"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const SgbRouter_1 = require("./routes/SgbRouter");
const SgbRouterV2_1 = require("./routes/SgbRouterV2");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        /* This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        // router.get('/', (req, res, next) => {
        //   res.json({
        //     message: 'Bonjour monde!'
        //   });
        // });
        router.get('/', function (req, res) {
            res.redirect('/docs/index.html');
        });
        this.express.use('/', router); // routage de base
        this.express.use('/api/v1', SgbRouter_1.sgbRoutes.router); // tous les URI pour le scénario du système de gestion des bordereau commencent ainsi
        this.express.use('/api/v2', SgbRouterV2_1.sgbRoutesV2.router); // tous les URI pour le scénario du système de gestion des bordereau commencent ainsi
        this.express.use('/docs', express.static('dist/docs'));
    }
}
exports.default = new App().express;
