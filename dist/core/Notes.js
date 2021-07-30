"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notes = void 0;
const Multimap = require("multimap");
class Notes {
    constructor() {
        this.multimap = new Multimap();
    }
    set(student_id, course_id, type, type_id, note) {
        this.multimap.set(student_id, { "course": course_id, "type": type, "type_id": type_id, "note": note });
    }
    student(student_id) {
        return this.multimap.get(student_id);
    }
    course(course_id) {
        var results = new Array();
        this.multimap.forEach((entry, key) => {
            if (entry.course == course_id) {
                entry["student"] = key;
                results.push(entry);
            }
        });
        return results;
    }
    clear() {
        this.multimap = new Multimap();
    }
}
exports.Notes = Notes;
