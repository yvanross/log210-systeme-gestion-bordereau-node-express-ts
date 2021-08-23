import type { SemesterJSON } from "../data";

export class Semester {
  static all() {
    let courses: SemesterJSON[] = require('../data/semester.json');
    return courses;
  }  
}
 