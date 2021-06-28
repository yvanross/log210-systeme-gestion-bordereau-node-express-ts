import md5 from 'md5';
import type { CourseTeacherJSON, TeacherJSON } from '../data';
import { Course } from './Course';
import { User } from './User';

export class Teacher extends User{
  static login(email: string, password: string) {
    let teachers: TeacherJSON[] = require('../data/teachers.json');
    for (var teacher in teachers) {
      if (teachers[teacher].email == email) {
        return md5(email);
      }
    }
    return null;
  }

  static loginV2(email: string, password: string) {
    let teachers: TeacherJSON[] = require('../data/teachers.json');
    for (var teacher in teachers) {
      if (teachers[teacher].email == email) {
        let current_teacher = teachers[teacher];
        current_teacher.password = '';
        return [md5(email), current_teacher];
      }
    }
    return null;
  }

  static fromId(id: number) {
    let teachers: TeacherJSON[] = require('../data/teachers.json');
    for (var teacher in teachers) {
      if (teachers[teacher].id == id) {
        return new this(
          teachers[teacher].id,
          teachers[teacher].first_name,
          teachers[teacher].last_name,
          teachers[teacher].email
        );
      }
    }
    throw new Error("Teacher id not found");
  }

  static fromToken(token: string) {
    let teachers: TeacherJSON[] = require('../data/teachers.json');
    for (var teacher in teachers) {
      if (md5(teachers[teacher].email) == token) {
        return new this(
          teachers[teacher].id,
          teachers[teacher].first_name,
          teachers[teacher].last_name,
          teachers[teacher].email);
      }
    }
    console.log("XXXXX");
    console.log(token);
    throw new Error("Teacher token not found");
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
    let courses = this.courses()
    for (let index in courses) {
      if (courses[index].id() == course_id)
        return true;
    }
    return false;
  }
  // public token(){
  //   return md5(this._email);
  // }

  public courses() {
    let course_teacher: CourseTeacherJSON[] = require('../data/course_teacher.json');
    let _courses = [];
    for (let i in course_teacher) {
      if (this.id() == course_teacher[i].teacher_id) {
        _courses.push(Course.fromId(course_teacher[i].course_id));
      }
    }
    return _courses;
  }
}
