import type { ScheduleJSON } from ".";

export class Schedule {
  static all(): ScheduleJSON[]{
    return require('../../data/schedule.json');
  }

  static groups(): string[]{
    const uniqueGroup =  [... new Set(Schedule.all().map(item => item.group_id))];
    return uniqueGroup;
  }


}
