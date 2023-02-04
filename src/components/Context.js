import React, { createContext, useState } from 'react';

export const Context = createContext({});

export const Provider = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [deletedToDo, setDeletedToDo] = useState({});
  const [editToDo, setEditToDo] = useState({});
  const [editMode, setEditMode] = useState(false);

  const AddToDo = (inputValue, date, id) => {
    let sameName = todoList.find((el) => el.name === inputValue);
    if (sameName) {
      alert('error');
    } else {
      if (editMode) {
        let toDo = {
          name: inputValue,
          status: 'active',
          date: date,
          id: id
        };
        let temporaryArr = [...todoList];
        temporaryArr.splice(id, 1, toDo);
        setTodoList(temporaryArr);
        document.getElementById(id).style.textDecoration = 'none';
        setEditMode(false);
      } else {
        let newDate = new Date();
        let formatedDate = newDate.toISOString().substr(0, 10);
        // let day = newDate.getDate();
        // let month = newDate.getMonth();
        // let year = newDate.getFullYear();

        let toDo = {
          name: inputValue,
          status: 'active',
          // date: `${day.length > 1 ? day : '0' + day}.${
          //   month.length > 1 ? month + 1 : '0' + (month + 1)
          // }.${year}`,
          date: formatedDate,
          id: todoList.length === 0 ? 0 : todoList.length
        };
        setTodoList([...todoList, toDo]);
      }
    }
    document.getElementById('input').value = '';
  };

  const deleteToDo = (id) => {
    let deletedElement = todoList.find((el) => el.id === id);
    setDeletedToDo(deletedElement);
    let Array = [...todoList];
    Array.splice(id, 1);
    Array.map((el) => (el.id = Array.map((ele) => ele.name).indexOf(el.name)));
    setTodoList(Array);
  };
  const EditToDo = (id) => {
    let elementToBeEdited = todoList.find((el) => el.id === id);
    setEditToDo(elementToBeEdited);
    document.getElementById('input').value = elementToBeEdited.name;
    document.getElementById(id).style.textDecoration = 'line-through';
    setEditMode(true);
  };
  const FinishToDo = (id) => {
    let finishedToDo = todoList.find((el) => el.id === id);
    finishedToDo.status = 'completed';
    let temporaryArr = [...todoList];
    temporaryArr.splice(id, 1, finishedToDo);
    setTodoList(temporaryArr);
    document.getElementById(id).style.textDecoration = 'line-through';
    let btns =
      document.getElementById(id).nextElementSibling.nextElementSibling
        .nextElementSibling.childNodes;
    btns.forEach((el) => el.setAttribute('disabled', 'true'));
  };
  const SortByNameAscending = (array) => {
    let arrayToBeSorted = [...array];
    arrayToBeSorted.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    arrayToBeSorted.map(
      (el) => (el.id = arrayToBeSorted.map((ele) => ele.name).indexOf(el.name))
    );
    setTodoList(arrayToBeSorted);
  };
  const SortByNameDescending = (array) => {
    let arrayToBeSorted = [...array];
    arrayToBeSorted.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
    arrayToBeSorted.map(
      (el) => (el.id = arrayToBeSorted.map((ele) => ele.name).indexOf(el.name))
    );
    setTodoList(arrayToBeSorted);
  };
  const SortByDateAscending = (array) => {
    let arrayToBeSorted = [...array];
    arrayToBeSorted.sort((a, b) => {
      let aDate = new Date(a.date);
      let bDate = new Date(b.date);
      return aDate - bDate;
    });
    arrayToBeSorted.map(
      (el) => (el.id = arrayToBeSorted.map((ele) => ele.name).indexOf(el.name))
    );
    setTodoList(arrayToBeSorted);
    console.log('asd');
  };
  const SortByDateDescending = (array) => {
    let arrayToBeSorted = [...array];
    arrayToBeSorted.sort((a, b) => {
      let aDate = new Date(a.date);
      let bDate = new Date(b.date);
      return bDate - aDate;
    });
    arrayToBeSorted.map(
      (el) => (el.id = arrayToBeSorted.map((ele) => ele.name).indexOf(el.name))
    );
    setTodoList(arrayToBeSorted);
    console.log('asd');
  };
  const SortByStatusAscending = (array) => {
    let arrayToBeSorted = [...array];
    arrayToBeSorted.sort((a, b) => {
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
      return 0;
    });
    arrayToBeSorted.map(
      (el) => (el.id = arrayToBeSorted.map((ele) => ele.name).indexOf(el.name))
    );
    setTodoList(arrayToBeSorted);
  };
  const SortByStatusDescending = (array) => {
    let arrayToBeSorted = [...array];
    arrayToBeSorted.sort((a, b) => {
      if (a.status < b.status) {
        return 1;
      }
      if (a.status > b.status) {
        return -1;
      }
      return 0;
    });
    arrayToBeSorted.map(
      (el) => (el.id = arrayToBeSorted.map((ele) => ele.name).indexOf(el.name))
    );
    setTodoList(arrayToBeSorted);
  };
  return (
    <Context.Provider
      value={{
        todoList,
        setTodoList,
        AddToDo,
        inputValue,
        setInputValue,
        deleteToDo,
        EditToDo,
        editMode,
        editToDo,
        FinishToDo,
        SortByNameAscending,
        SortByNameDescending,
        SortByDateAscending,
        SortByDateDescending,
        SortByStatusAscending,
        SortByStatusDescending
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
