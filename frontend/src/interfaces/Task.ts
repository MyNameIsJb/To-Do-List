export interface Task {
  _id?: string;
  taskName: string;
  status: string;
  category: string;
  description: string;
  endDate: Date | string;
  creator: string | null;
}
