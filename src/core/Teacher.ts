import Multimap = require('multimap');
import md5 = require('md5');
import { Course } from './Course';

export class Teacher {
  private _id: number  = 0;
  private _first_name: string;
  private _last_name: string;
  private _email: string;

  static login(email:string,password:string){
    let  teachers = require('../data/teachers.json');
		for( var teacher in teachers){
			if(teachers[teacher].email == email){
				return md5(email)
			}
    }
    return null; 
  }

  static loginV2(email:string,password:string){
  	let  teachers = require('../data/teachers.json');
		for( var teacher in teachers){
			if(teachers[teacher].email == email) {
				let current_teacher = teachers[teacher]
				current_teacher.password = ''
				return [md5(email),current_teacher]
      }
    }
    return null;
  }
  
  static fromId(id:number){
    let  teachers = require('../data/teachers.json');
    let teacher = teachers.find(element => element.id == id);
    if(teacher == null)
      throw new Error("Teacher id not found");

    return new Teacher(
        teacher.id,
        teacher.first_name,
        teacher.last_name,
        teacher.email);
  }

  static fromToken(token:string){
    let  teachers = require('../data/teachers.json');
    let teacher = teachers.find(element => md5(element.email) == token);
    if(teacher == null)
      throw new Error("Teacher token not found");

	  return new Teacher(
       teacher.id,
       teacher.first_name,
       teacher.last_name,
       teacher.email);
  }
  constructor(
    id:number, 
    first_name:string, 
    last_name:string, 
    email:string) {
      this._id = id
      this._first_name = first_name
      this._last_name = last_name
      this._email = email
		}

  public id(){
    return this._id;
  }

  public name(){
    return this._first_name + " " + this._last_name;
  }

  public email(){
    return this._email;
  }
  public giveCourse(course_id: number){
    let courses = this.courses()
    for(let index in courses){
      if(courses[index].id() == course_id)
      return true
    }
    return false
  }
  // public token(){
  //   return md5(this._email);
  // }

  public courses(){
    let   course_teacher = require('../data/course_teacher.json');
    let _courses = []
    for(let i in course_teacher){
      if(this.id() == course_teacher[i].teacher_id){
        _courses.push(Course.fromId(course_teacher[i].course_id))
      }
    }
    return _courses;
  }
}