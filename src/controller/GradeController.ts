import { Grade } from '../model/Grade';
import type { GradeJSON} from '../model/json-types';


// import type { GradeJSON } from "../data";

// classe contrôleur de session GRASP
export class GradeController {

    /**
    *  opérations systèmes
    */
    public insert(student_id: string, group_id: string, type: string, type_id: number, note: number): string {
      return Grade.getInstance().insert(student_id, group_id, type, type_id, note);
    }

  public group(group_id: string) : GradeJSON[] {
    return Grade.getInstance().group(group_id);
  }

  public student(student_id: string) : GradeJSON[] {
    return Grade.getInstance().student(student_id);
  }

  public clear() {
    return Grade.getInstance().clear();
  }
}
