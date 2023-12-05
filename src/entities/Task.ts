import { Comment } from './Comment';

export interface Task {
  _id?: string;
  title: string;
  totalHours: number;
  startDate: string;
  endDate: string;
  totalRealized: number;
  responsibleUserId: {
    fullname: string;
  };
  area: string;
  local: string;
  order: string;
  isCanceled: boolean;
  comments: Comment[];
}
