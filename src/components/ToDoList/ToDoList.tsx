import React, { useState } from "react";
import "./ToDoList.scss";
import edit from "../../assets/edit-icon.svg";
import del from "../../assets/delete-icon1.svg";
import save from "../../assets/save-icon.svg";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  changeTask,
  deleteTask,
  resetSearchList,
  setIsEdit,
  statusTask,
} from "../../redux/taskSlice";

const ToDoList: React.FC = () => {
  const [value, setValue] = useState<string>("");

  const taskList = useAppSelector((state) => state.task.taskList);
  const searchTaskList = useAppSelector((state) => state.task.searchTaskList);
  const dispatch = useAppDispatch();
  const handleDelete = (index: number) => {
    if (searchTaskList.length === 0) return dispatch(deleteTask(index));
    else {
      dispatch(deleteTask(index));
      dispatch(resetSearchList());
    }
  };
  const handleChangeValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleDone = (index: number) => {
    dispatch(statusTask(index));
  };
  const handleEdit = ({ index, task }: { index: number; task: string }) => {
    setValue(task);
    dispatch(setIsEdit(index));
  };
  const handleSaveEdit = ({ index }: { index: number }) => {
    dispatch(changeTask({ index, value }));
  };

  const listToRender = searchTaskList.length ? searchTaskList : taskList;
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
                onClick={() => handleDone(index)}
              ></input>

              {item.isEdit ? (
                <input
                  value={value || ""}
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
                <button
                  type="button"
                  onClick={() => handleSaveEdit({ index })}
                >
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
        ) : (
          <p className="todo-list__empty">Список задач пуст.</p>
        )}
      </ul>
    </div>
  );
};
export default ToDoList;
