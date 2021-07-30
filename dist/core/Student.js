"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const md5 = require("md5");
const Course_1 = require("./Course");
class Student {
    constructor(id, first_name, last_name, email, permanent_code) {
        this._id = 0;
        this._id = id;
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._permanent_code = permanent_code;
    }
    static login(email, password) {
        let students = require('../data/students.json');
        for (var student in students) {
            if (students[student].email == email) {
                return md5(email);
            }
        }
        return null;
    }
    static loginV2(email, password) {
        let students = require('../data/students.json');
        for (var student in students) {
            if (students[student].email == email) {
                let current_student = students[student];
                current_student.password = '';
                return [md5(email), current_student];
            }
        }
        return null;
    }
    static fromId(id) {
        let students = require('../data/students.json');
        for (var student in students) {
            if (students[student].id == id) {
                return new this(students[student].id, students[student].first_name, students[student].last_name, students[student].email, students[student].permanent_code);
            }
        }
        throw new Error("Student id not found");
    }
    static fromToken(token) {
        let students = require('../data/students.json');
        for (var student in students) {
            if (md5(students[student].email) == token) {
                return new this(students[student].id, students[student].first_name, students[student].last_name, students[student].email, students[student].permanent_code);
            }
        }
        throw new Error("Student token not found");
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
    // public token(){
    //   return md5(this._email);
    // }
    permanent_code() {
        return this._permanent_code;
    }
    followCourse(course_id) {
        let courses = this.courses();
        for (let index in courses) {
            if (courses[index].id() == course_id)
                return true;
        }
        return false;
    }
    courses() {
        let course_student = require('../data/course_student.json');
        let _courses = [];
        for (let i in course_student) {
            if (this.id() == course_student[i].student_id) {
                _courses.push(Course_1.Course.fromId(course_student[i].course_id));
            }
        }
        return _courses;
    }
}
exports.Student = Student;
