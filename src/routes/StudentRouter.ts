import { Router, Request, Response, NextFunction } from 'express';
import { StudentController } from '../controller/StudentController';

export class StudentRouter {
  router: Router;
  controller: StudentController;  // contrôleur GRASP

  /**
  * Initialize the Router
  */
  constructor() {
    this.controller = new StudentController();  // init contrôleur GRASP
    this.router = Router();
    this.init();
  }

  public login(req: Request, res: Response, next: NextFunction) {
    try {
      // Invoquer l'opération système (du DSS) dans le contrôleur GRASP
      let data = this.controller.login(
        req.query.email as string,
        req.query.password as string);
        res.status(200)
        .send({
          message: 'Success',
          status: res.status,
          token: data.token,
          user: data.user
        });
      } catch (error) {
        console.error(error);
        let code = 500; // internal server error
        res.status(code).json({ error: error.toString() });
      }
    }

    /**
    * lister les étudiants
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

    public fromtoken(req: Request, res: Response, next: NextFunction) {
      try {
        // Invoquer l'opération système (du DSS) dans le contrôleur GRASP
        let token = req.query.token as string;

        let data = this.controller.fromToken(token);
        res.status(200)
        .send({
          message: 'Success',
          status: res.status,
          user: data
        });
      } catch (error) {
        console.log(error);
        let code = 500; // internal server error
        res.status(code).json({ error: error.toString() });
      }
    }

    public groupstudent(req: Request, res: Response, next: NextFunction) {
      let data = this.controller.groupStudent();
      res.status(200)
      .send({
        message: 'Success',
        status: res.status,
        data: data
      });
    }

    //apidoc -i src/routes/ -o docs/

    /**
    * Take each handler, and attach to one of the Express.Router's
    * endpoints.
    */
    init() {


      /**
      * Take each handler, and attach to one of the Express.Router's
      * endpoints.
      * @api {get} /api/v3/student/login  login
      * @apiGroup Student
      * @apiDescription Authentification de l'étudiant et récupération du token d'authentification
      * @apiVersion 3.0.0
      * @apiParam {String} email courriel de l'étudiant.  Vous devez encoder email avec https://www.w3schools.com/tags/ref_urlencode.ASP
      * @apiParam {String} password non vérifier.
      *
      * @apiSuccess (200) {String}  message Success
      * @apiSuccess (200) {String}  token Authentification token à inclure dans les requêtes subséquentes
      * @apiSuccess (200) {JSON}  user {first_name: string, last_name: string, id: string}
      */
      this.router.get('/login', this.login.bind(this)); // pour .bind voir https://stackoverflow.com/a/15605064/1168342

      /**
      * Take each handler, and attach to one of the Express.Router's
      * endpoints.
      * @api {get} /api/v3/student/all all
      * @apiGroup Student
      * @apiDescription récupération de tout les enseignant
      * @apiVersion 3.0.0
      * @apiSuccess (200) {JSON}  data [{
      *   first_name: string,
      *   last_name: string,
      *   id: string that match email
      * }
      * ]
      */
      this.router.get('/all', this.all.bind(this)); // pour .bind voir https://stackoverflow.com/a/15605064/1168342


      /**
      * Take each handler, and attach to one of the Express.Router's
      * endpoints.
      * @api {get} /api/v3/student/fromtoken fromtoken
      * @apiGroup Student
      * @apiDescription Récupérer un étudiant à partir de son token
      * @apiVersion 3.0.0
      *
      * @apiParam {String} token Authentification token
      *
      * @apiSuccess (200) {JSON}   data {
      *   first_name: string,
      *   last_name: string,
      *   id: string,
      *    }
      */
      this.router.get('/fromtoken', this.fromtoken.bind(this)); // pour .bind voir https://stackoverflow.com/a/15605064/1168342


      /**
      * Take each handler, and attach to one of the Express.Router's
      * endpoints.
      * @api {get} /api/v3/student/groupstudent groupstudent
      * @apiGroup Student
      * @apiDescription Récupérer le lien entre les étudiants et les groupes
      * @apiVersion 3.0.0
      *
      *
      * @apiSuccess (200) {JSON}   data [{
      *   group_id: string,
      *   student_id: string
      *    }
      */
      this.router.get('/groupstudent', this.groupstudent.bind(this)); // pour .bind voir https://stackoverflow.com/a/15605064/1168342
    }

  }

  // exporter its configured Expres.Router
  export const studentRouter = new StudentRouter();
  studentRouter.init();
