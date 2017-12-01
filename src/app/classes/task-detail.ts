

import {ActionHistory} from './action-history';

export class TaskDetail {
  creator: string;
  actions: Array<ActionHistory>;
  title: string;
  assignee: string;
  state: string;
  description: string;
  startTime: number;
  endTime: number;
  curDuration: string;
}
