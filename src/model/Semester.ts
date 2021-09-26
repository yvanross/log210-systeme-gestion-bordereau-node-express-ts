import type { SemesterJSON } from "./json-types";

export class Semester {
  static all(): SemesterJSON[] {
    return require('../../data/semester.json');
  }
}
