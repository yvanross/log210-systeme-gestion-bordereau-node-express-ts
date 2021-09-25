import type { CourseJSON } from ".";

export class Course {
  static all(): CourseJSON[] {
    return require('../../data/courses.json');
  }
}
