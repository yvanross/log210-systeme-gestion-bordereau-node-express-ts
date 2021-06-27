import Multimap from "multimap";

export class Notes {
    multimap: Multimap;

    constructor() {
        this.multimap = new Multimap();
    }

    public set(student_id: number, course_id: number, type: string, type_id: number, note: number) {
        this.multimap.set(student_id, { "course": course_id, "type": type, "type_id": type_id, "note": note });
    }

    public student(student_id: number) {
        return this.multimap.get(student_id);
    }

    public course(course_id: number) {
        var results = new Array();
        this.multimap.forEach((entry, key) => {
            if (entry.course == course_id) {
                entry["student"] = key
                results.push(entry)
            }
        })
        return results
    }

    public clear() {
        this.multimap = new Multimap();
    }

}