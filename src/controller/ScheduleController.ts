
import type { ScheduleJSON } from "../model";
import { Schedule } from '../model/Schedule';

// classe contrôleur de GRASP
export class ScheduleController {

  public all(): ScheduleJSON[]{
    return Schedule.all();
 }

}
