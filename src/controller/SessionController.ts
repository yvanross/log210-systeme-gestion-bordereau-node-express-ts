
import type { SessionJSON } from "../data";
import { Session } from '../model/Session';

// classe contrôleur GRASP
export class SessionController {

  public all(): SessionJSON[]{
    return Session.all();
 }

}
