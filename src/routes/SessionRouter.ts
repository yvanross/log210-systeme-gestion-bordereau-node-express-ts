import { Router, Request, Response, NextFunction } from 'express';
import { SessionController } from '../controller/SessionController';

export class SessionRouter {
  router: Router;
  controller: SessionController;
  router_latency: number;
  
  /**
  * Initialize the Router
  */
  constructor() {
    this.router_latency = 0;
    this.controller = new SessionController();
    this.router = Router();
    this.init();
  }
  /**
  * lister les Schedules
  */
  public all(req: Request, res: Response, next: NextFunction) {
    let data = this.controller.all()
    res.status(200)
    .send({
      message: 'Success',
      status: res.status,
      data: data
    });
  }
  
  
  /**
  * Take each handler, and attach to one of the Express.Router's
  * endpoints.
  */
  init() {
    
    /**
    * Take each handler, and attach to one of the Express.Router's
    * endpoints.
    * @api {get} api/v3/session/all all
    * @apiGroup Session
    * @apiDescription Récupérer la liste de toutes les sessions
    * @apiVersion 3.0.0
    *
    * @apiSuccess (200) {JSON} data
    [
      {
        id: string,
        name: string,
        start: string,
        end: string,
      }
    ]
    */
    this.router.get('/all', this.all.bind(this)); // pour .bind voir https://stackoverflow.com/a/15605064/1168342
    
    
    
  }
}

// exporter its configured Express.Router
export const sessionRouter = new SessionRouter();
sessionRouter.init();
