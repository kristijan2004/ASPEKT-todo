import React, { useContext } from 'react';
import { Context } from './Context';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  @media screen and (min-width: 320px) and (max-width: 425px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 0px;
  }
`;
const FilterDiv = styled.div`
  display: flex;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 425px) {
    label {
      padding: 5px 0px 5px 5px;
      font-size: 12px;
    }
    button {
      transform: translate(0px, 0px);
    }
  }
  p {
    font-size: 18px;
    @media screen and (min-width: 320px) and (max-width: 425px) {
      font-size: 14px;
    }
  }
  label {
    padding: 5px 0px 5px 10px;
  }
  .colorRed {
    color: red;
  }
  .colorGreen {
    color: green;
  }
  button {
    border: 1px solid black;
    background-color: transparent;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.6s;
    transform: translate(10px, 0px);
    &:hover {
      background-color: red;
      color: white;
      border-color: transparent;
      transition: 0.6s;
    }
  }
  input {
    cursor: pointer;
  }
`;
const Form = styled.form`
  input {
    padding: 10px 5px;
    &:focus-within {
      outline: none;
    }
    &:first-of-type {
      border: none;
      -webkit-box-shadow: 0px 6px 5px 0px rgba(0, 0, 0, 0.5);
      -moz-box-shadow: 0px 6px 5px 0px rgba(0, 0, 0, 0.5);
      box-shadow: 0px 6px 5px 0px rgba(0, 0, 0, 0.5);
      width: 300px;
    }
    &:last-of-type {
      border: none;
      background-color: #555ed7;
      color: white;
      cursor: pointer;
      padding: 5px;
      transform: translate(-20px, 0px);
      font-size: 17px;
    }
  }
`;

const InputForm = () => {
  const {
    AddToDo,
    inputValue,
    setInputValue,
    editMode,
    editToDo,
    SetCheckBox,
    setFilterByStatus,
    ClearFilters
  } = useContext(Context);
  return (
    <Main>
      <Form
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
        <input type='submit' value='Add Todo' />
      </Form>
      <FilterDiv>
        <p>Filter By:</p>
        <label className='colorGreen'>Completed</label>
        <input
          type='checkbox'
          id='completedCheckBox'
          // onClick={(e) =>
          //   e.target.checked === false
          //     ? setFilteredArray([])
          //     : (FilterByStatus('completed'), SetCheckBox('activeCheckBox'))
          // }
          onClick={(e) =>
            e.target.checked === true
              ? (setFilterByStatus('completed'), SetCheckBox('activeCheckBox'))
              : setFilterByStatus('')
          }
        />
        <label className='colorRed'>Active</label>
        <input
          type='checkbox'
          id='activeCheckBox'
          // onClick={(e) =>
          //   e.target.checked === false
          //     ? setFilteredArray([])
          //     : (FilterByStatus('active'), SetCheckBox('completedCheckBox'))
          // }
          onClick={(e) =>
            e.target.checked === true
              ? (setFilterByStatus('active'), SetCheckBox('completedCheckBox'))
              : setFilterByStatus('')
          }
        />
        <button onClick={() => ClearFilters()}>Clear Filters</button>
      </FilterDiv>
    </Main>
  );
};

export default InputForm;
