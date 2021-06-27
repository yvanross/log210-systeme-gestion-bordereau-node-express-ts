import Multimap from 'multimap';
import { Teacher } from './Teacher';
import { Student } from './Student';
import { Course } from './Course';
import { Notes } from './Notes';

// classe contrôleur GRASP
export class SgbController {
    multimap: Multimap;
    notes: Notes;

    constructor() {
        this.notes = new Notes();
    }

    /**
    *  opérations systèmes
    */
    public login(email: string, password: string) {
        let token = Student.login(email, password);
        if (token !== null)
            return token;

        token = Teacher.login(email, password)
        if (token !== null)
            return token;

        throw new Error("Email and password do not match a student or a teacher");
    }

    public loginV2(email: string, password: string) {
        let token = Student.loginV2(email, password);
        if (token !== null)
            return token;

        token = Teacher.loginV2(email, password)
        if (token !== null)
            return token;

        throw new Error("Email and password do not match a student or a teacher");
    }


    public courses(token: string) {
        let teacher = Teacher.fromToken(token);
        return teacher.courses();// will generate an error if token is invalid

    }

    public students(token: string, course_id: number) {
        let teacher = Teacher.fromToken(token); // will generate an error if token is invalid
        if (teacher.giveCourse(course_id))
            return Course.fromId(course_id).students();

        throw new Error("This teacher do not give this course");
    }


    /** teacher will assigne note to a student work */
    public note(token: string, student_id: number, course_id: number, type: string, type_id: number, note: number) {
        let teacher = Teacher.fromToken(token); // will generate an error if token is invalid
        if (!teacher.giveCourse(course_id))
            throw new Error("This teacher do not give this course");

        let student = Student.fromId(student_id);
        if (!student.followCourse(course_id))
            throw new Error("This student to not follow this course");

        this.notes.set(student_id, course_id, type, type_id, note);
    }


    public studentNote(token: string, course: number, type: string, type_id: number, note: number) {
        let student = Student.fromToken(token); // will generate an error if token is invalid
        this.notes.set(student.id(), course, type, type_id, note);
    }

    public studentNotes(token: string) {
        let student = Student.fromToken(token); // will generate an error if token is invalid
        return this.notes.student(student.id());
    }

    public studentCourses(token: string) {
        let student = Student.fromToken(token);
        return student.courses(); // will generate an error if token is invalid
    }

    public courseNotes(token: string, course_id: number) {
        Teacher.fromToken(token); // will generate an error if token is invalid
        return this.notes.course(course_id);
    }

    public clearNotes(token: string,) {
        Teacher.fromToken(token); // will generate an error if token is invalid
        this.notes.clear();
    }

}
