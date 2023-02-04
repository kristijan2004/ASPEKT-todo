import React, { useContext, useState } from 'react';
import { Context } from './Context';

const InputForm = () => {
  const [asceDesceStatus, setAsceDesceStatus] = useState(true);
  const [asceDesceDate, setAsceDesceDate] = useState(true);
  const [asceDesceName, setAsceDesceName] = useState(true);
  const {
    AddToDo,
    inputValue,
    setInputValue,
    todoList,
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
  } = useContext(Context);
  return (
    <>
      <form
        autoComplete='off'
        onSubmit={(e) => {
          e.preventDefault();
          {
            editMode
              ? AddToDo(inputValue, editToDo.date, editToDo.id)
              : AddToDo(inputValue);
          }
        }}
      >
        <input
          type='text'
          id='input'
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input type='submit' />
      </form>
      {editMode ? 'TRUE' : 'FALSE'}
      <table>
        <thead>
          <tr>
            <th
              onClick={() =>
                asceDesceName
                  ? (SortByNameAscending(todoList), setAsceDesceName(false))
                  : (SortByNameDescending(todoList), setAsceDesceName(true))
              }
            >
              Name
            </th>
            <th
              onClick={() =>
                asceDesceDate
                  ? (SortByDateAscending(todoList), setAsceDesceDate(false))
                  : (SortByDateDescending(todoList), setAsceDesceDate(true))
              }
            >
              Date
            </th>
            <th
              onClick={() =>
                asceDesceStatus
                  ? (SortByStatusAscending(todoList), setAsceDesceStatus(false))
                  : (SortByStatusDescending(todoList), setAsceDesceStatus(true))
              }
            >
              Status
            </th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((el) => (
            <tr key={el.id}>
              <td id={el.id}>{el.name}</td>
              <td>{el.date}</td>
              <td>{el.status}</td>
              <td>
                <button onClick={() => deleteToDo(el.id)}>
                  delete {el.id}
                </button>
                <button onClick={() => EditToDo(el.id)}>Edit</button>
                <button onClick={() => FinishToDo(el.id)}>finish</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default InputForm;
