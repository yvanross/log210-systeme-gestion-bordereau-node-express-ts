import type { CourseJSON } from "../data";

export class Course {
  static all() {
    let courses: CourseJSON[] = require('../data/courses.json');
    return courses;
  }  
}
 