"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Student_1 = require("./Student");
const Teacher_1 = require("./Teacher");
class User {
    constructor() {
        this._id = 0;
        // /** student will assigne note to a student work */
        // 	public note(token:string, student_id:number, course_id:number, type:string, type_id:number, note:number) {
        // 		let student:Mailable = this.studentFromToken(token); // will generate an error if token is invalid
        // 		let student:Mailable = this.studentFromId(student_id)
        // 		if (!student.giveCourse(course_id))
        // 			throw new Error("This student do not give this course")
        // 		if (!student.followCourse(course_id))
        // 			throw new Error("This student to not follow this course")
        // 			this.multimap.set(student_id.toString(),{"course": course_id, "type":type, "type_id":type_id, "note":note});
        // 	}
        // 	public studentNote(token:string, course:number, type:string, type_id:number, note:number) {
        // 		let student:Mailable = this.studentFromToken(token); // will generate an error if token is invalid
        // 		this.multimap.set(student.id.toString(),{"course": course, "type":type, "type_id":type_id, "note":note});
        // 	}
        // 	public studentNotes(token:string){
        // 		let student = this.studentFromToken(token); // will generate an error if token is invalid
        // 		return this.multimap.get(student.id.toString());
        // 	}
        // 	public courseNotes(token:string,course_id:number){
        // 		this.studentFromToken(token); // will generate an error if token is invalid
        // 		var results = new Array();
        // 		this.multimap.forEach((entry,key)=> {
        // 			if(entry.course == course_id.toString()){
        // 				entry["student"]=key
        // 				results.push(entry)
        // 			}
        // 		})
        // 		return results
        // 	}
        // 	public clearNotes(token:string,){
        // 		this.studentFromToken(token); // will generate an error if token is invalid
        // 		this.multimap = new Multimap();
        // 	}
        // 	//*********************************  privte *****************************
    }
    // static fromId(id:number){
    //   let  students = require('../data/students.json');
    // 	for( var student in students){
    // 		if(students[student].id == id){
    //       return new this(
    //         students[student].id,
    //       students[student].first_name,
    //       students[student].last_name,
    //       students[student].email,
    //       students[student].permanent_code);
    // 		}
    //   }
    //    throw new Error("Student id not found");
    // }
    // static fromToken(token:string){
    //   let  students = require('../data/students.json');
    // 	for( var student in students){
    // 		if(md5(students[student].email) == token){
    //       return new this(
    //         students[student].id,
    //       students[student].first_name,
    //       students[student].last_name,
    //       students[student].email,
    //       students[student].permanent_code);
    // 		}
    //   }
    //    throw new Error("Student token not found");
    // }
    // constructor(
    //   id:number, 
    //   first_name:string, 
    //   last_name:string, 
    //   email:string,
    //   permanent_code:string) {
    //     this._id = id;
    //     this._first_name = first_name;
    //     this._last_name = last_name;
    //     this._email = email;
    //     this._permanent_code = permanent_code;
    // 	}
    // public id(){
    //   return this._id;
    // }
    // public name(){
    //   return this._first_name + " " + this._last_name;
    // }
    // public email(){
    //   return this._email;
    // }
    // public token(){
    //   return md5(this._email);
    // }
    // public permanent_code(){
    //   return this._permanent_code;
    // }
    /**
    *  opérations systèmes
    */
    login(email, password) {
        let students = require('../data/students.json');
        for (var student in students) {
            if (students[student].email == email) {
                return Student_1.Student.fromId(students[student].id);
            }
        }
        let teachers = require('../data/teachers.json');
        for (var teacher in teachers) {
            if (teachers[teacher].email == email) {
                return Teacher_1.Teacher.fromId(teachers[teacher]);
            }
        }
        throw new Error("Email and password do not match a student or a student");
    }
}
exports.User = User;
