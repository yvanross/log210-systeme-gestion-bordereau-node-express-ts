import Multimap = require('multimap');
import md5 = require('md5');
import { Student } from './Student';
export class Course {
    private _id: number;
    private _sigle: string;
    private _nb_max_student: number;
    private _groupe: string;
    private _titre: string;
    private _date_debut: string;
    private _date_fin: string;

    static fromId(id: number) {
        let courses = require('../data/courses.json');
        for (var course in courses) {
            if (courses[course].id == id) {
                return new this(
                    courses[course].id,
                    courses[course].sigle,
                    courses[course].nb_max_student,
                    courses[course].groupe,
                    courses[course].titre,
                    courses[course].date_debut,
                    courses[course].date_fin
                );
            }
        }
        throw new Error('Course id not found');
    }

    constructor(
        id: number,
        sigle: string,
        nb_max_student: number,
        groupe: string,
        titre: string,
        date_debut: string,
        date_fin: string
    ) {
        this._id = id;
        this._sigle = sigle;
        this._nb_max_student = nb_max_student;
        this._groupe = groupe;
        this._titre = titre;
        this._date_debut = date_debut;
        this._date_fin = date_fin;
    }

    public id() {
        return this._id;
    }

    public sigle() {
        return this._sigle;
    }

    public nb_max_student() {
        return this._nb_max_student;
    }

    public groupe() {
        return this._groupe;
    }

    public titre() {
        return this._titre;
    }

    public date_debut() {
        return this._date_debut;
    }

    public date_fin() {
        return this._date_fin;
    }

    public students() {
        let course_student = require('../data/course_student.json');
        let _students = [];
        for (let index in course_student) {
            if (course_student[index].course_id == this._id) {
                _students.push(
                    Student.fromId(course_student[index].student_id)
                );
            }
        }
        return _students;
    }
}
