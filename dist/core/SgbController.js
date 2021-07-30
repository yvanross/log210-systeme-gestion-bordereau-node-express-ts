"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SgbController = void 0;
const Teacher_1 = require("./Teacher");
const Student_1 = require("./Student");
const Course_1 = require("./Course");
const Notes_1 = require("./Notes");
const util_1 = require("util");
// classe contrôleur GRASP
class SgbController {
    constructor() {
        this.notes = new Notes_1.Notes();
    }
    /**
    *  opérations systèmes
    */
    login(email, password) {
        let token = Student_1.Student.login(email, password);
        if (!util_1.isNull(token))
            return token;
        token = Teacher_1.Teacher.login(email, password);
        if (!util_1.isNull(token))
            return token;
        throw new Error("Email and password do not match a student or a teacher");
    }
    loginV2(email, password) {
        let token = Student_1.Student.loginV2(email, password);
        if (!util_1.isNull(token))
            return token;
        token = Teacher_1.Teacher.loginV2(email, password);
        if (!util_1.isNull(token))
            return token;
        throw new Error("Email and password do not match a student or a teacher");
    }
    courses(token) {
        let teacher = Teacher_1.Teacher.fromToken(token);
        return JSON.stringify(teacher.courses()); // will generate an error if token is invalid
    }
    students(token, course_id) {
        let teacher = Teacher_1.Teacher.fromToken(token); // will generate an error if token is invalid
        if (teacher.giveCourse(course_id))
            return JSON.stringify(Course_1.Course.fromId(course_id).students());
        throw new Error("This teacher do not give this course");
    }
    /** teacher will assigne note to a student work */
    note(token, student_id, course_id, type, type_id, note) {
        let teacher = Teacher_1.Teacher.fromToken(token); // will generate an error if token is invalid
        if (!teacher.giveCourse(course_id))
            throw new Error("This teacher do not give this course");
        let student = Student_1.Student.fromId(student_id);
        if (!student.followCourse(course_id))
            throw new Error("This student to not follow this course");
        this.notes.set(student_id, course_id, type, type_id, note);
    }
    studentNote(token, course, type, type_id, note) {
        let student = Student_1.Student.fromToken(token); // will generate an error if token is invalid
        this.notes.set(student.id(), course, type, type_id, note);
    }
    studentNotes(token) {
        let student = Student_1.Student.fromToken(token); // will generate an error if token is invalid
        return this.notes.student(student.id());
    }
    studentCourses(token) {
        let student = Student_1.Student.fromToken(token);
        return JSON.stringify(student.courses()); // will generate an error if token is invalid
    }
    courseNotes(token, course_id) {
        Teacher_1.Teacher.fromToken(token); // will generate an error if token is invalid
        return this.notes.course(course_id);
    }
    clearNotes(token) {
        Teacher_1.Teacher.fromToken(token); // will generate an error if token is invalid
        this.notes.clear();
    }
}
exports.SgbController = SgbController;
