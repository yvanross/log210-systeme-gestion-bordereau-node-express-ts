import type { CourseJSON, CourseStudentJSON } from "../data";
import { Student } from "./Student"

export class Course {
  private _id: number;
  private _sigle: string;
  private _nb_max_student: number;
  private _groupe: string;
  private _titre: string;
  private _date_debut: string;
  private _date_fin: string;

  static fromId(id: number) {
    let courses: CourseJSON[] = require('../data/courses.json');
    const course = courses.find(course => course.id == id);

    if (!course)
      throw new Error("Course id not found");

    return new this(
      course.id,
      course.sigle,
      course.nb_max_student,
      course.groupe,
      course.titre,
      course.date_debut,
      course.date_fin
    );
  }

  static fromSigle(sigle: string): Course[] {
    const courses: CourseJSON[] = require('../data/courses.json');

    return courses
      .filter(course => course.sigle === sigle)
      .map(course => new this(
        course.id,
        course.sigle,
        course.nb_max_student,
        course.groupe,
        course.titre,
        course.date_debut,
        course.date_fin)
      );
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

  public id(): number {
    return this._id;
  }

  public sigle(): string {
    return this._sigle;
  }

  public nb_max_student(): number {
    return this._nb_max_student;
  }

  public groupe(): string {
    return this._groupe;
  }

  public titre(): string {
    return this._titre;
  }

  public date_debut(): string {
    return this._date_debut;
  }

  public date_fin(): string {
    return this._date_fin;
  }


  public students(): Student[] {
    let courseStudents: CourseStudentJSON[] = require('../data/course_student.json');

    return courseStudents
      .filter(courseStudent => courseStudent.course_id == this._id)
      .map(courseStudent => Student.fromId(courseStudent.student_id));

  }

}
