interface EntityJSON {
  id: string;
}

interface SessionJSON extends EntityJSON {
  id: string;
  name: string;
  start: string;
  end: string;
}
interface UserJSON extends EntityJSON {
  first_name: string;
  last_name: string;
  email: string;
  permanent_code: string;
}


export interface ScheduleJSON extends EntityJSON {
  group_id: string;
  day: string;
  hours: string;
  activity: string;
  mode: string
  local: string
  teacher_id: string
}
export interface CourseJSON extends EntityJSON {
  id: string;
  prealable: string;
  titre: string;
}

export interface StudentJSON extends UserJSON {
  permanent_code: string;
}

export interface TeacherJSON extends UserJSON {
  
}


