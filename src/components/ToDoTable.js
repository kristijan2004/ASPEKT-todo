import React, { useContext, useState } from 'react';
import { Context } from './Context';

const ToDoTable = () => {
  const [asceDesceStatus, setAsceDesceStatus] = useState(true);
  const [asceDesceDate, setAsceDesceDate] = useState(true);
  const [asceDesceName, setAsceDesceName] = useState(true);
  const {
    todoList,
    deleteToDo,
    EditToDo,
    FinishToDo,
    SortByNameAscending,
    SortByNameDescending,
    SortByDateAscending,
    SortByDateDescending,
    SortByStatusAscending,
    SortByStatusDescending,
    FilterByStatus,
    filteredArray,
    setFilteredArray,
    SetCheckBox
  } = useContext(Context);
  return (
    <table>
      <thead>
        <tr>
          <th>
            Filter by
            <input
              type='checkbox'
              id='completedCheckBox'
              onClick={(e) =>
                e.target.checked === false
                  ? setFilteredArray([])
                  : (FilterByStatus('completed'), SetCheckBox('activeCheckBox'))
              }
            />
            <input
              type='checkbox'
              id='activeCheckBox'
              onClick={(e) =>
                e.target.checked === false
                  ? setFilteredArray([])
                  : (FilterByStatus('active'), SetCheckBox('completedCheckBox'))
              }
            />
            {/* <button onClick={() => FilterByStatus('completed')}>
              Completed
            </button> */}
            {/* <button onClick={() => FilterByStatus('active')}>Active</button> */}
          </th>
        </tr>
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
        {filteredArray.length > 0
          ? filteredArray.map((el) => (
              <tr key={el.id}>
                <td
                  id={el.id}
                  className={el.status === 'completed' ? 'line' : ''}
                >
                  {el.name}
                </td>
                <td>{el.date}</td>
                <td>{el.status}</td>
                <td>
                  <button
                    onClick={() => deleteToDo(el.id)}
                    disabled={el.status === 'completed'}
                  >
                    delete {el.id}
                  </button>
                  <button
                    onClick={() => EditToDo(el.id)}
                    disabled={el.status === 'completed'}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => FinishToDo(el.id)}
                    disabled={el.status === 'completed'}
                  >
                    finish
                  </button>
                </td>
              </tr>
            ))
          : todoList.map((el) => (
              <tr key={el.id}>
                <td
                  id={el.id}
                  className={el.status === 'completed' ? 'line' : ''}
                >
                  {el.name}
                </td>
                <td>{el.date}</td>
                <td>{el.status}</td>
                <td>
                  <button
                    disabled={el.status === 'completed'}
                    onClick={() => deleteToDo(el.id)}
                  >
                    delete {el.id}
                  </button>
                  <button
                    disabled={el.status === 'completed'}
                    onClick={() => EditToDo(el.id)}
                  >
                    Edit
                  </button>
                  <button
                    disabled={el.status === 'completed'}
                    onClick={() => FinishToDo(el.id)}
                  >
                    finish
                  </button>
                </td>
              </tr>
            ))}
        {/* {todoList.map((el) => (
          <tr key={el.id}>
            <td id={el.id}>{el.name}</td>
            <td>{el.date}</td>
            <td>{el.status}</td>
            <td>
              <button onClick={() => deleteToDo(el.id)}>delete {el.id}</button>
              <button onClick={() => EditToDo(el.id)}>Edit</button>
              <button onClick={() => FinishToDo(el.id)}>finish</button>
            </td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};

export default ToDoTable;
