import md5 from 'md5';
import type { CourseStudentJSON, StudentJSON } from '../data';
import { Course } from './Course';
import { User } from './User';


export class Student extends User {
  protected _permanent_code: string

  static login(email: string, password: string) {
    let students: StudentJSON[] = require('../data/students.json');
    for (var student in students) {
      if (students[student].email == email) {
        return md5(email);
      }
    }
    return null;
  }

  static loginV2(email: string, password: string) {
    let students: StudentJSON[] = require('../data/students.json');
    for (var student in students) {
      if (students[student].email == email) {
        let current_student = students[student];
        current_student.password = '';
        return [md5(email), current_student];
      }
    }
    return null;
  }
  static fromId(id: number) {
    let students: StudentJSON[] = require('../data/students.json');
    for (var student in students) {
      if (students[student].id == id) {
        return new this(
          students[student].id,
          students[student].first_name,
          students[student].last_name,
          students[student].email,
          students[student].permanent_code);
      }
    }
    throw new Error("Student id not found");
  }

  static fromToken(token: string) {
    let students: StudentJSON[] = require('../data/students.json');
    for (var student in students) {
      if (md5(students[student].email) == token) {
        return new this(
          students[student].id,
          students[student].first_name,
          students[student].last_name,
          students[student].email,
          students[student].permanent_code);
      }
    }
    throw new Error("Student token not found");
  }

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    permanent_code: string
  ) {
    super(id, first_name, last_name, email);
    this._permanent_code = permanent_code;
  }

  public id() {
    return this._id;
  }

  public name() {
    return this._first_name + " " + this._last_name;
  }

  public email() {
    return this._email;
  }
  // public token(){
  //   return md5(this._email);
  // }

  public permanent_code() {
    return this._permanent_code;
  }

  public followCourse(course_id: number) {
    let courses = this.courses();
    for (let index in courses) {
      if (courses[index].id() == course_id)
        return true;
    }
    return false;
  }
  public courses(): Course[] {
    let courseStudents: CourseStudentJSON[] = require('../data/course_student.json');
    let courses = [];
    for (let i in courseStudents) {
      if (this.id() == courseStudents[i].student_id) {
        courses.push(Course.fromId(courseStudents[i].course_id));
      }
    }
    return courses;
  }
}
