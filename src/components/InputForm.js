import React, { useContext, useState } from 'react';
import { Context } from './Context';

const InputForm = () => {
  const { AddToDo, inputValue, setInputValue, editMode, editToDo } =
    useContext(Context);
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
    </>
  );
};

export default InputForm;
