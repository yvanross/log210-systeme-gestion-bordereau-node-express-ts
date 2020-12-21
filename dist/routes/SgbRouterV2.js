"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sgbRoutesV2 = exports.SgbRouterV2 = void 0;
const express_1 = require("express");
const SgbController_1 = require("../core/SgbController");
class SgbRouterV2 {
    /**
    * Initialize the Router
    */
    constructor() {
        this.router_latency = 0;
        this.controller = new SgbController_1.SgbController(); // init contrôleur GRASP
        this.router = express_1.Router();
        this.init();
    }
    login(req, res, next) {
        try {
            // Invoquer l'opération système (du DSS) dans le contrôleur GRASP
            let data = this.controller.loginV2(req.query.email, req.query.password);
            // console.log("V2: login called with email: " + req.query.email + " and password")
            // console.log("token = ",data[0], "user = ", data[1])
            // console.log(data[1])
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                token: data[0],
                user: data[1]
            });
        }
        catch (error) {
            let code = 500; // internal server error
            res.status(code).json({ error: error.toString() });
        }
    }
    /**
    * Take each handler, and attach to one of the Express.Router's
    * endpoints.
    */
    init() {
        /**
         * @api {get} /v2/login?email=email&password=password Login
         * @apiGroup Application
         * @apiDescription Authentification de l'usager et récupération du token d'authentification
         * @apiVersion 2.0.0
         * @apiParam {String} email courriel de l'usager.  Vous devez encoder email avec https://www.w3schools.com/tags/ref_urlencode.ASP
         * @apiParam {String} password non vérifier.
         *
         * @apiSuccess (200) {String}  message Success
         * @apiSuccess (200) {String}  status
         * @apiSuccess (200) {String}  token Authentification token à inclure dans le header des requêtes subséquentes
         * @apiSuccess (200) {String}  user Information sur l'usager courant { id: 3,
      first_name: 'firstname3',
      last_name: 'last_name3',
      email: 'teacher+3@gmail.com',
      password: '' }
         */
        this.router.get('/login', this.login.bind(this)); // pour .bind voir https://stackoverflow.com/a/15605064/1168342
    }
}
exports.SgbRouterV2 = SgbRouterV2;
// exporter its configured Express.Router
exports.sgbRoutesV2 = new SgbRouterV2();
exports.sgbRoutesV2.init();
