import md5 = require('md5');
import { User } from './User';

export class Student extends User {

  static login(email: string, password: string) {
    const student = Student.all().find(student => email == student.id);
    return student ? { token: md5(email), user: student } : null;
  }

  static fromToken(token: string) {
    const student = Student.all().find(student => md5(student.id) == token);

    if (!student) {
      throw new Error("Student token not found");
    }

    return new this(
      student.id,
      student.first_name,   
      student.last_name,
    );
  }

  static all() {
    let students = []
    for (let i = 1; i <= 100; i++){
      students.push({first_name: `first_name_${i}`,last_name: `last_name_${i}`,id: `first_name.last_name+${i}@gmail.com` })  // console.log(i);
    }
    return students;
  }

}
