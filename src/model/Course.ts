import type { CourseJSON } from "./json-types";

export class Course {
  static all(): CourseJSON[] {
    return require('../../data/courses.json');
  }
}
