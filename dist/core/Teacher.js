"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const md5 = require("md5");
const Course_1 = require("./Course");
class Teacher {
    constructor(id, first_name, last_name, email) {
        this._id = 0;
        this._id = id;
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
    }
    static login(email, password) {
        let teachers = require('../data/teachers.json');
        for (var teacher in teachers) {
            if (teachers[teacher].email == email) {
                return md5(email);
            }
        }
        return null;
    }
    static loginV2(email, password) {
        let teachers = require('../data/teachers.json');
        for (var teacher in teachers) {
            if (teachers[teacher].email == email) {
                let current_teacher = teachers[teacher];
                current_teacher.password = '';
                return [md5(email), current_teacher];
            }
        }
        return null;
    }
    static fromId(id) {
        let teachers = require('../data/teachers.json');
        for (var teacher in teachers) {
            if (teachers[teacher].id == id) {
                return new this(teachers[teacher].id, teachers[teacher].first_name, teachers[teacher].last_name, teachers[teacher].email);
            }
        }
        throw new Error("Teacher id not found");
    }
    static fromToken(token) {
        let teachers = require('../data/teachers.json');
        for (var teacher in teachers) {
            if (md5(teachers[teacher].email) == token) {
                return new this(teachers[teacher].id, teachers[teacher].first_name, teachers[teacher].last_name, teachers[teacher].email);
            }
        }
        throw new Error("Teacher token not found");
    }
    id() {
        return this._id;
    }
    name() {
        return this._first_name + " " + this._last_name;
    }
    email() {
        return this._email;
    }
    giveCourse(course_id) {
        let courses = this.courses();
        for (let index in courses) {
            if (courses[index].id() == course_id)
                return true;
        }
        return false;
    }
    // public token(){
    //   return md5(this._email);
    // }
    courses() {
        let course_teacher = require('../data/course_teacher.json');
        let _courses = [];
        for (let i in course_teacher) {
            if (this.id() == course_teacher[i].teacher_id) {
                _courses.push(Course_1.Course.fromId(course_teacher[i].course_id));
            }
        }
        return _courses;
    }
}
exports.Teacher = Teacher;
