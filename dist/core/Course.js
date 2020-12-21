"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const Student_1 = require("./Student");
class Course {
    constructor(id, sigle, nb_max_student, groupe, titre, date_debut, date_fin) {
        this._id = id;
        this._sigle = sigle;
        this._nb_max_student = nb_max_student;
        this._groupe = groupe;
        this._titre = titre;
        this._date_debut = date_debut;
        this._date_fin = date_fin;
    }
    static fromId(id) {
        let courses = require('../data/courses.json');
        for (var course in courses) {
            if (courses[course].id == id) {
                return new this(courses[course].id, courses[course].sigle, courses[course].nb_max_student, courses[course].groupe, courses[course].titre, courses[course].date_debut, courses[course].date_fin);
            }
        }
        throw new Error("Course id not found");
    }
    static fromSigle(sigle) {
        let courses = require('../data/courses.json');
        let result = new Array();
        for (var course in courses) {
            if (courses[course].sigle === sigle) {
                result.push(new this(courses[course].id, courses[course].sigle, courses[course].nb_max_student, courses[course].groupe, courses[course].titre, courses[course].date_debut, courses[course].date_fin));
            }
        }
        return result;
    }
    id() {
        return this._id;
    }
    sigle() {
        return this._sigle;
    }
    nb_max_student() {
        return this._nb_max_student;
    }
    groupe() {
        return this._groupe;
    }
    titre() {
        return this._titre;
    }
    date_debut() {
        return this._date_debut;
    }
    date_fin() {
        return this._date_fin;
    }
    students() {
        let course_student = require('../data/course_student.json');
        let _students = [];
        for (let index in course_student) {
            if (course_student[index].course_id == this._id) {
                _students.push(Student_1.Student.fromId(course_student[index].student_id));
            }
        }
        return _students;
    }
}
exports.Course = Course;
