import React, { useContext } from 'react';
import { Context } from './Context';

const InputForm = () => {
  const { AddToDo, inputValue, setInputValue, todoList, deleteToDo } =
    useContext(Context);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          AddToDo(inputValue);
          console.log(todoList);
        }}
      >
        <input type='text' onChange={(e) => setInputValue(e.target.value)} />
        <input type='submit' />
      </form>
      {todoList.map((el) => (
        <div>
          <span>{el.name}</span>
          <button onClick={() => deleteToDo(el.id)}>delete {el.id}</button>
        </div>
      ))}
    </>
  );
};

export default InputForm;
