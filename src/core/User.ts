import { Student } from './Student';
import { Teacher } from './Teacher';

export class User {
	protected _id: number = 0;
	protected _first_name: string;
	protected _last_name: string;
	protected _email: string;

	constructor(
		id: number,
		first_name: string,
		last_name: string,
		email: string,
	) {
		this._id = id;
		this._first_name = first_name;
		this._last_name = last_name;
		this._email = email;
	}


    public login(email: string, password: string) {
        let students = require('../data/students.json');
        for (var student in students) {
            if (students[student].email == email) {
                return Student.fromId(students[student].id);
            }
        }

        let teachers = require('../data/teachers.json');
        for (var teacher in teachers) {
            if (teachers[teacher].email == email) {
                return Teacher.fromId(teachers[teacher]);
            }
        }
        throw new Error("Email and password do not match a student or a teacher");
    }
}
