
import type { SemesterJSON } from "../model/json-types";
import { Semester } from '../model/Semester';

// classe contrôleur GRASP
export class SemesterController {

  public all(): SemesterJSON[]{
    return Semester.all();
 }

}
