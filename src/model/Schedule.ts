import type { ScheduleJSON } from "../data";

export class Schedule {
  static all(): ScheduleJSON[]{
    let Schedules: ScheduleJSON[] = require('../data/Schedule.json');
    return Schedules;
  }

}
 