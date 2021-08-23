
import { Student } from '../model/Student';
import type { GroupStudentJSON, StudentJSON } from '../data';

// classe contrôleur GRASP
export class StudentController {
  
  /**
  *  opérations systèmes
  */
  
  public login(email: string, password: string) {
    let teacher = Student.login(email, password);
    if (teacher !== null)
      return teacher;
    
    throw new Error("Email and password do not match student");
  }
  
  public fromToken(token: string) {
    return Student.fromToken(token);
  }

  public all():StudentJSON[] {
    return Student.all();
  }
  
  public groupStudent():GroupStudentJSON[] {
  return Student.groupStudent();
  }
}
