import md5 from 'md5';
import type { CourseTeacherJSON, TeacherJSON } from '../data';
import { Course } from './Course';
import { User } from './User';

export class Teacher extends User {
  static login(email: string, password: string) {
    let teachers: TeacherJSON[] = require('../data/teachers.json');
    const teacher = teachers.find(teacher => email == teacher.email);

    return teacher ? md5(email) : null;
  }

  static loginV2(email: string, password: string) {
    const teachers: TeacherJSON[] = require('../data/teachers.json');
    const teacher = teachers.find(teacher => email == teacher.email);

    return teacher ? { token: md5(email), user: teacher } : null;
  }

  static fromId(id: number) {
    let teachers: TeacherJSON[] = require('../data/teachers.json');
    const teacher = teachers.find(teacher => teacher.id == id);

    if (!teacher)
      throw new Error("Teacher id not found");

    return new this(
      teacher.id,
      teacher.first_name,
      teacher.last_name,
      teacher.email
    );
  }

  static fromToken(token: string) {
    let teachers: TeacherJSON[] = require('../data/teachers.json');
    const teacher = teachers.find(teacher => md5(teacher.email) == token);

    if (!teacher) {
      throw new Error("Teacher token not found");
    }

    return new this(
      teacher.id,
      teacher.first_name,
      teacher.last_name,
      teacher.email
    );
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

  public giveCourse(course_id: number) {
    const courses = this.courses();
    const courseIndex = courses.findIndex(course => course_id == course.id());

    return -1 !== courseIndex;
  }

  public courses() {
    const courseTeachers: CourseTeacherJSON[] = require('../data/course_teacher.json');

    return courseTeachers
      .filter(courseTeacher => this._id == courseTeacher.teacher_id)
      .map(courseTeacher => Course.fromId(courseTeacher.course_id));
  }
}
