import Multimap = require('multimap');
import md5 = require('md5');
import {Student} from "./Student"
export class Course {
  
 
    private _id: number;
    private _sigle: string
    private _nb_max_student: number
    private _groupe: string
    private _titre: string
    private _date_debut: string
    private _date_fin: string

  static fromId(id:number){
    let   courses = require('../data/courses.json');
    const found = courses.find(element => element.id == id);
   
    if(found === undefined)
      throw new Error("Course id not found");
    
    return new this(
      found.id,
      found.sigle,
      found.nb_max_student,
      found.groupe,
      found.titre,
      found.date_debut,
      found.date_fin
    );

  }
  
  static fromId2(id:number){
    let   courses = require('../data/courses.json');
		for( var course in courses){
			if(courses[course].id == id){
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
     throw new Error("Course id not found");
  }

  static fromSigle(sigle: string): Course[] {
    let   courses = require('../data/courses.json');
    const found = courses.filter(element => element.sigle == sigle);

    let result:Course[] = new Array();
    
    for(var course of found){
      result.push(new this(
          course.id,
          course.sigle,
          course.nb_max_student,
          course.groupe,
          course.titre,
          course.date_debut,
          course.date_fin
        ));
    }

    return result;
  }



  constructor(
    id: number,
    sigle: string,
    nb_max_student: number,
    groupe: string,
    titre: string,
    date_debut: string,
    date_fin: string) {
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
    return this._nb_max_student
  }

  public groupe(): string{
    return this._groupe;
  }

  public titre(): string{
    return this._titre;
  }

  public date_debut(): string{
    return this._date_debut;
  }

  public date_fin():string {
    return this._date_fin;
  }


	public students() {
		let course_student = require('../data/course_student.json');
		let _students = []
    for(let index in course_student){
      if(course_student[index].course_id == this._id){
        _students.push(Student.fromId(course_student[index].student_id))
      }
    }
		return _students;
	}

}


   