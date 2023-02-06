import React, { useContext, useState } from 'react';
import { Context } from './Context';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

import editImg from '../Images/edit.png';
import deleteImg from '../Images/delete.png';
import checkImg from '../Images/check.png';
const Main = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
`;
const Table = styled.table`
  border-collapse: collapse;
  min-width: 750px;
  height: fit-content;
`;
const Thead = styled.thead`
  border-bottom: 1px double red;
  border-color: black;
  text-align: center;

  tr {
    border-bottom: 1px solid #ddd;
    th {
      padding: 10px 20px;
      cursor: pointer;
      &:first-of-type {
        cursor: unset;
      }
      &:last-of-type {
        cursor: unset;
      }
    }
  }
`;
const Tbody = styled.tbody`
  tr {
    border-bottom: 1px solid #ddd;
    text-align: center;
    .colorRed {
      color: red;
    }
    .colorGreen {
      color: green;
    }
    td {
      padding: 8px 20px;
      text-transform: capitalize;
      &:nth-child(2) {
        min-width: 200px;
      }
      button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        transition: 0.5s;
        &:disabled {
          cursor: not-allowed;
          &:hover {
            transform: rotate(0deg);
          }
        }
        &:hover {
          transition: 0.5s;
          transform: rotate(20deg);
        }
      }
      img {
        width: 50%;
      }
    }
  }
`;

const ToDoTable = () => {
  const [asceDesceStatus, setAsceDesceStatus] = useState(true);
  const [asceDesceDate, setAsceDesceDate] = useState(true);
  const [asceDesceName, setAsceDesceName] = useState(true);
  const {
    deleteToDo,
    EditToDo,
    FinishToDo,
    SortByNameAscending,
    SortByNameDescending,
    SortByDateAscending,
    SortByDateDescending,
    SortByStatusAscending,
    SortByStatusDescending,
    filteredArray,
    setFilterByDate
  } = useContext(Context);
  return (
    <Main>
      <Table>
        <Thead>
          {/* <tr>
            <th>
              <button onClick={() => FilterByStatus('completed')}>
              Completed
            </button>
              <button onClick={() => FilterByStatus('active')}>Active</button>
            </th>
          </tr> */}
          <tr>
            <th>#</th>
            <th
              onClick={() =>
                asceDesceName
                  ? (SortByNameAscending(filteredArray),
                    setAsceDesceName(false))
                  : (SortByNameDescending(filteredArray),
                    setAsceDesceName(true))
              }
            >
              Task Name
            </th>
            <th
              onClick={() =>
                asceDesceDate
                  ? (SortByDateAscending(filteredArray),
                    setAsceDesceDate(false))
                  : (SortByDateDescending(filteredArray),
                    setAsceDesceDate(true))
              }
            >
              Date
            </th>
            <th
              onClick={() =>
                asceDesceStatus
                  ? (SortByStatusAscending(filteredArray),
                    setAsceDesceStatus(false))
                  : (SortByStatusDescending(filteredArray),
                    setAsceDesceStatus(true))
              }
            >
              Status
            </th>
            <th>Controls</th>
          </tr>
        </Thead>
        <Tbody>
          {filteredArray.map((el) => (
            <tr
              key={Math.random()}
              // className={el.status === 'completed' ? 'bg-green' : 'bg-red'}
            >
              <td>{el.id + 1}</td>
              <td
                id={el.id}
                className={el.status === 'completed' ? 'line' : ''}
              >
                {el.name}
              </td>
              <td>{el.date}</td>
              <td
                className={
                  el.status === 'completed' ? 'colorGreen' : 'colorRed'
                }
              >
                {el.status}
              </td>
              <td>
                <button
                  onClick={() => deleteToDo(el.id)}
                  disabled={el.status === 'completed'}
                >
                  <img alt='Delete' src={deleteImg} />
                </button>
                <button
                  onClick={() => EditToDo(el.id)}
                  disabled={el.status === 'completed'}
                >
                  <img alt='Edit' src={editImg} />
                </button>
                <button
                  onClick={() => FinishToDo(el.id)}
                  disabled={el.status === 'completed'}
                >
                  <img alt='Complete' src={checkImg} />
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
        </Tbody>
      </Table>
      <Calendar
        id='calendar'
        onClickDay={
          (date, e) =>
            setFilterByDate(
              date.getFullYear() +
                '-' +
                (date.getMonth() + 1).toString().padStart(2, '0') +
                '-' +
                date.getDate().toString().padStart(2, '0')
            )
          // FilterByDate(
          //   date.getFullYear() +
          //     '-' +
          //     (date.getMonth() + 1).toString().padStart(2, '0') +
          //     '-' +
          //     date.getDate().toString().padStart(2, '0')
          // )
        }
      />
    </Main>
  );
};

export default ToDoTable;
