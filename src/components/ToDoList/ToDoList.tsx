import React, { useState } from "react";
import "./ToDoList.scss";
import edit from "../../assets/edit-icon.svg";
import del from "../../assets/delete-icon1.svg";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  deleteTask,
  resetSearchList,
  setIsEdit,
  statusTask,
} from "../../redux/taskSlice";

const ToDoList: React.FC = () => {
  const [value, setValue] = useState<string>("");

  const taskList = useAppSelector((state) => state.task.taskList);
  const searchTaskList = useAppSelector((state) => state.task.searchTaskList);
  const isEdit = useAppSelector((state) => state.task.isEdit);
  const dispatch = useAppDispatch();
  const handleDelete = (index: number) => {
    if (searchTaskList.length === 0) return dispatch(deleteTask(index));
    else {
      dispatch(deleteTask(index));
      dispatch(resetSearchList());
    }
  };
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    // setValues((value) => ({ ...value, [name]: value }))
    setValue(evt.target.value);
    console.log(evt.target.value);
  };

  const handleDone = (index: number) => {
    dispatch(statusTask(index));
  };
  const handleEdit = ({ value, key }: { value: string; key: number }) => {
    setValue(value);
    dispatch(setIsEdit());
  };
  const handleSave = () => {};

  const listToRender = searchTaskList.length ? searchTaskList : taskList;
  return (
    <div>
      <ul className="todo-list">
        {listToRender.length > 0
          ? listToRender.map((item, index) => (
              <li key={index} className="todo-list__item">
                <input
                  type="checkbox"
                  name="status"
                  checked={item.isDone}
                  onClick={() => handleDone(index)}
                ></input>

                {isEdit ? (
                  <input
                    value={value || ""}
                    name="todo"
                    onChange={handleChange}
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

                <button
                  type="button"
                  className="todo-list__btn-edit"
                  onClick={() => handleEdit(item)}
                >
                  <img
                    src={edit}
                    className="todo-list__btn_image"
                    alt="Серый карандаш"
                    title="Редактировать"
                  ></img>
                </button>
                {isEdit && (
                  <button type="button" onClick={handleSave}>
                    Сохранить
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
          : <p className="todo-list__empty">Список задач пуст.</p>}
      </ul>
    </div>
  );
};
export default ToDoList;
