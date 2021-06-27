import { Student } from './Student';
import { Teacher } from './Teacher';

export class User {
  private _id: number  = 0;
  private _first_name: string;
  private _last_name: string;
  private _email: string;
  private _permanent_code: string


	public login(email:string, password:string){
		let  students = require('../data/students.json');
		for( var student in students){
			if(students[student].email == email) {
				return Student.fromId(students[student].id)
			}
		}

		let  teachers = require('../data/teachers.json');
		for( var teacher in teachers){
			if(teachers[teacher].email == email){
				return Teacher.fromId(teachers[teacher])
			}
		}
		throw new Error("Email and password do not match a student or a student")
	}


}