export interface ITask {
    task: string;
    isDone: boolean;
    date: string;
    isEdit: boolean
  }
  export type TaskType = {
    taskList: ITask[];
    isEdit: boolean;
    isError: boolean;
    valueInput: string;
    valueTask: string;
  }
export interface IChangeTask {
    index: number
    valueTask: string
}