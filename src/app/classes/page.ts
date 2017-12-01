import {TaskItem} from './task-item';

export class Page {
  content: Array<TaskItem>;
  number: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
