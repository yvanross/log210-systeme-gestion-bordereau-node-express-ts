import type { SemesterJSON } from ".";

export class Semester {
  static all(): SemesterJSON[] {
    return require('../../data/semester.json');
  }
}
