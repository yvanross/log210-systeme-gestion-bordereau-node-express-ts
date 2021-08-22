import { Course } from '../model/Course';

import type { CourseJSON } from "../data";

// classe contrôleur de session GRASP
export class CourseController {

    /**
    *  opérations systèmes
    */
    public all():CourseJSON[] {
      return Course.all();
    }
}
