import React from "react";
import "./ToDoList.scss";
import edit from "../../assets/edit-icon.svg";
import del from "../../assets/delete-icon1.svg";
import save from "../../assets/save-icon.svg";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  changeTask,
  deleteTask,
  setIsEdit,
  setIsValueInput,
  statusTask,
} from "../../redux/taskSlice";

const ToDoList: React.FC = () => {
  const [valueTask, setValueTask] = React.useState<string>("");
  const valueInput = useAppSelector((state) => state.task.valueInput);
  const taskList = useAppSelector((state) => state.task.taskList);
  const dispatch = useAppDispatch();
  const handleDelete = (index: number) => {
    dispatch(deleteTask(index));
  };
  const handleChangeValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValueTask(evt.target.value);
  };

  const handleDone = (index: number) => {
    dispatch(statusTask(index));
  };
  const handleEdit = ({ index, task }: { index: number; task: string }) => {
    console.log(index, task);
    setValueTask(task);
    dispatch(setIsEdit(index));
  };
  const handleSaveEdit = ({ index }: { index: number }) => {
    console.log(valueTask);
    dispatch(changeTask({ index, valueTask }));
    dispatch(setIsValueInput(""));
    setValueTask('')
  };

  const listToRender = taskList.filter((item) => {
    if (valueInput) {
      return item.task.toLowerCase().includes(valueInput.toLowerCase().trim());
    } else return item;
  });

  console.log(listToRender);
  return (
    <div>
      <ul className="todo-list">
        {listToRender.length > 0 ? (
          listToRender.map((item, index) => (
            <li key={index} className="todo-list__item">
              <input
                type="checkbox"
                name="status"
                checked={item.isDone}
                onChange={() => handleDone(index)}
              ></input>

              {item.isEdit ? (
                <input
                  value={valueTask || ""}
                  name="todo"
                  onChange={handleChangeValue}
                  autoFocus
                  className="todo-list__input"
                ></input>
              ) : (
                <p
                  className={
                    item.isDone
                      ? " todo-list__text todo-list__text_checked"
                      : "todo-list__text"
                  }
                >
                  {item.task || ""}
                </p>
              )}
              {item.isEdit ? (
                <button type="button" onClick={() => handleSaveEdit({ index })}>
                  <img
                    src={save}
                    className="todo-list__btn_image"
                    alt="Знак переработки"
                    title="Сохранить"
                  ></img>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleEdit({ index, task: item.task })}
                >
                  <img
                    src={edit}
                    className="todo-list__btn_image"
                    alt="Серый карандаш"
                    title="Редактировать"
                  ></img>
                </button>
              )}

              <button type="button" onClick={() => handleDelete(index)}>
                <img
                  src={del}
                  className="todo-list__btn_image"
                  alt="Серый крестик"
                  title="Удалить"
                ></img>
              </button>
            </li>
          ))
        ) : (listToRender.length === 0 && valueInput !== '') ? 
          <p className="todo-list__not-found">Ничего не найдено.</p> : (
          <p className="todo-list__empty">Список задач пуст.</p>
        )}
      </ul>
    </div>
  );
};
export default ToDoList;
