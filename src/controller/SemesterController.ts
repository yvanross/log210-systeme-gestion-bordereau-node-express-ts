
import type { SemesterJSON } from "../model";
import { Semester } from '../model/Semester';

// classe contrôleur GRASP
export class SemesterController {

  public all(): SemesterJSON[]{
    return Semester.all();
 }

}
