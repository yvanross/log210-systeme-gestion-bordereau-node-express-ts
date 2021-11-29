import { Grade } from '../model/Grade';
import { GradeJSON} from '../model';


// import type { GradeJSON } from "../data";

// classe contrôleur de session GRASP
export class GradeController {

    /**
    *  opérations systèmes
    */
  public insert(query: any): string {
      return Grade.getInstance().insert(query);
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
