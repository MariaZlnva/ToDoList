export interface ITask {
    task: string;
    isDone: boolean;
    date: string;
    isEdit?: boolean
  }
  export type TaskType = {
    taskList: ITask[];
    searchTaskList: ITask[];
    isEdit: boolean;
    isError: boolean
  }
export interface IChangeTask {
    index: number
    value: string
}