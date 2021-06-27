import express from 'express';
import logger from 'morgan';

import { sgbRoutes } from './routes/SgbRouter';
import { sgbRoutesV2 } from './routes/SgbRouterV2';



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
    // placeholder route handler
    // router.get('/', (req, res, next) => {
    //   res.json({
    //     message: 'Bonjour monde!'
    //   });
    // });

    router.get('/', function (req, res) {
      res.redirect('/docs/index.html');
    });

    this.express.use('/', router);  // routage de base
    this.express.use('/api/v1', sgbRoutes.router);  // tous les URI pour le scénario du système de gestion des bordereau commencent ainsi
    this.express.use('/api/v2', sgbRoutesV2.router);  // tous les URI pour le scénario du système de gestion des bordereau commencent ainsi
    this.express.use('/docs', express.static('dist/docs'))

  }

}
export default new App().express;
