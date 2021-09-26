
import { Student } from '../model/Student';
import type { GroupStudentJSON, StudentJSON, validUserJSON } from '../model/json-types';

// classe contrôleur GRASP
export class StudentController {

  /**
  *  opérations systèmes
  */

  public login(email: string, password: string): validUserJSON {
    let teacher = Student.login(email, password);
    if (teacher !== null)
      return teacher;

    throw new Error("Email and password do not match student");
  }

  public fromToken(token: string): StudentJSON {
    return Student.fromToken(token);
  }

  public all():StudentJSON[] {
    return Student.all();
  }

  public groupStudent():GroupStudentJSON[] {
  return Student.groupStudent();
  }
}
