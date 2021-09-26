import Multimap = require("multimap");
import { GradeJSON } from ".";

export class Grade {
  private static multimap: Multimap;
  private static instance: Grade;

  public static getInstance(): Grade {
    if (!Grade.instance) {
      Grade.instance = new Grade();
      Grade.multimap = new Multimap();
    }
    return Grade.instance;
  }

  private constructor() { }

  public insert(student_id: string, group_id: string, type: string, type_id: number, note: number) : string{
    Grade.multimap.set(student_id, { "student_id": student_id, "group_id": group_id, "type": type, "type_id": type_id, "note": note });
    return student_id;
  }

  public student(student_id: string): GradeJSON[] {
    return Grade.multimap.get(student_id);
  }

  public group(group_id: string): GradeJSON[] {
    const results = [];
    Grade.multimap.forEach((entry, key) => {
      if (entry.group_id === group_id) {
        results.push(entry);
      }
    })
    return results;
  }

  public clear() {
    Grade.multimap = new Multimap();
  }

}
