import md5 from 'md5';
import type { CourseStudentJSON, StudentJSON } from '../data';
import { Course } from './Course';
import { User } from './User';


export class Student extends User {
  protected _permanent_code: string

  static login(email: string, password: string) {
    let students: StudentJSON[] = require('../data/students.json');
    const student = students.find(student => email == student.email);

    return student ? md5(email) : null;
  }

  static loginV2(email: string, password: string) {
    let students: StudentJSON[] = require('../data/students.json');
    const student = students.find(student => email == student.email);

    return student ? { token: md5(email), user: student } : null;
  }
  static fromId(id: number) {
    let students: StudentJSON[] = require('../data/students.json');
    const student = students.find(student => id == student.id);

    if (!student)
      throw new Error("Student id not found");

    return new this(
      student.id,
      student.first_name,
      student.last_name,
      student.email,
      student.permanent_code);
  }

  static fromToken(token: string) {
    let students: StudentJSON[] = require('../data/students.json');
    const student = students.find(student => token == md5(student.email));

    if (!student)
      throw new Error("Student token not found");

    return new this(
      student.id,
      student.first_name,
      student.last_name,
      student.email,
      student.permanent_code);
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

  public permanent_code() {
    return this._permanent_code;
  }

  public followCourse(course_id: number) {
    const courses = this.courses();
    const index = courses.findIndex(course => course_id == course.id());

    return index !== -1;
  }

  public courses(): Course[] {
    const courseStudents: CourseStudentJSON[] = require('../data/course_student.json');

    return courseStudents
      .filter(courseStudent => this.id() == courseStudent.student_id)
      .map(courseStudent => Course.fromId(courseStudent.course_id));
  }
}
