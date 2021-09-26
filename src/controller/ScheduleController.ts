
import type { ScheduleJSON } from "../model/json-types";
import { Schedule } from '../model/Schedule';

// classe contrôleur de GRASP
export class ScheduleController {

  public all(): ScheduleJSON[]{
    return Schedule.all();
 }

}
