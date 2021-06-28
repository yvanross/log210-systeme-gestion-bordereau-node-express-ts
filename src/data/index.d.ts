interface EntityJSON {
  id: number;
}

interface UserJSON extends EntityJSON {
  first_name: string;
  last_name: string;
  email: string;
  permanent_code: string;
}

export interface CourseStudentJSON extends EntityJSON {
  student_id: number;
  course_id: number;
}

export interface CourseTeacherJSON extends EntityJSON {
  teacher_id: number;
  course_id: number;
}

export interface CourseJSON extends EntityJSON {
  sigle: string;
  nb_max_student: number;
  groupe: string;
  titre: string;
  date_debut: string;
  date_fin: string;
}

export interface StudentJSON extends UserJSON {
  permanent_code: string;
}

export interface TeacherJSON extends UserJSON {

}


