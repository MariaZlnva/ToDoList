import React, { useState } from "react";
import "./ToDoForm.scss";
import plusIcon from "../../assets/white-plus.svg";
import clear from "../../assets/clear-icon.svg";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  addTask,
  resetSearchList,
  searchTask,
  setIsError,
  sortTask,
  sortTaskDate,
} from "../../redux/taskSlice";

const ToDoForm: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const searchTaskList = useAppSelector((state) => state.task.searchTaskList);
  const taskList = useAppSelector((state) => state.task.taskList);
  const isError = useAppSelector((state) => state.task.isError);

  const dispatch = useAppDispatch();
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleAdd = (evt: React.FormEvent) => {
    evt.preventDefault();
    const date = new Date();
    const taskDate = date.toLocaleString();
    if (value === "") return;
    dispatch(addTask({ task:value, isDone: false, date: taskDate }));
    setValue("");
  };

  const handleSearch = () => {
    if(value === '') return
    dispatch(searchTask(value));
    if(searchTaskList.length === 0) return dispatch(setIsError(true));
  };

  const handleReset = () => {
    dispatch(resetSearchList());
    setValue("");
    dispatch(setIsError(false));
  };
  const handleSort = () => {
    dispatch(sortTask());
  };
  const handleSortDate = () => {
    dispatch(sortTaskDate());
  };

  return (
    <form onSubmit={handleAdd} className="todo-form">
      <label className="todo-form__label">
        <input
          className="todo-form__input"
          type="text"
          placeholder="Добавить задачу"
          onChange={handleChange}
          name="input"
          value={value || ""}
          required
          // autoFocus
        ></input>
        <img className="todo-form__image" src={clear} alt="Скрый крестик" onClick={handleReset}/>
        <button className="todo-form__btn-add">
          <img src={plusIcon} alt="Белый плюсик" />
        </button>
      </label>
      {(isError && searchTaskList.length ===0) && <span className="todo-form__error">Ничего не найдено.</span>}

      {taskList.length || searchTaskList.length ? (
        <div className="todo-form__wrap">
          <button
            className="todo-form__btn_to-list"
            type="button"
            onClick={handleSearch}
          >
            Найти в списке
          </button>
          {searchTaskList.length ? (
            <button
              className="todo-form__btn_to-list"
              type="button"
              onClick={handleReset}
            >
              Отменить поиск
            </button>
          ) : null}
          <button
            className="todo-form__btn_to-list"
            type="button"
            onClick={handleSort}
          >
            Сортировать по имени
          </button>
          <button
            className="todo-form__btn_to-list"
            type="button"
            onClick={handleSortDate}
          >
            Сортировать по дате создания
          </button>
        </div>
      ) : null}
    </form>
  );
};
export default ToDoForm;
