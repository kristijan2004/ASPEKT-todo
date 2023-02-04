import React, { createContext, useState } from 'react';

export const Context = createContext({});

export const Provider = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [deletedToDo, setDeletedToDo] = useState({});

  const AddToDo = (inputValue) => {
    let date = new Date();
    let toDo = {
      name: inputValue,
      status: 'active',
      date: date,
      id: todoList.length === 0 ? 0 : todoList.length
    };
    setTodoList([...todoList, toDo]);
  };

  const deleteToDo = (id) => {
    let deletedElement = todoList.find((el) => el.id === id);
    setDeletedToDo(deletedElement);
    let Array = [...todoList];
    Array.splice(id, 1);
    Array.map((el) => (el.id = Array.map((ele) => ele.name).indexOf(el.name)));
    setTodoList(Array);
  };
  return (
    <Context.Provider
      value={{
        todoList,
        setTodoList,
        AddToDo,
        inputValue,
        setInputValue,
        deleteToDo
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
