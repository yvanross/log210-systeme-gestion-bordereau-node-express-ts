import type { SessionJSON } from "../data";

export class Session {
  static all() {
    let courses: SessionJSON[] = require('../data/session.json');
    return courses;
  }  
}
 