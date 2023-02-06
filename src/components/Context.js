import React, { createContext, useEffect, useState } from 'react';

export const Context = createContext({});

export const Provider = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([
    {
      name: 'Buy Milk',
      status: 'active',
      date: '2023-02-05',
      id: 0
    },
    {
      name: 'Take the car to the mechanic',
      status: 'active',
      date: '2023-02-10',
      id: 1
    },
    {
      name: 'treto',
      status: 'active',
      date: '2023-02-15',
      id: 2
    },
    {
      name: 'cetvrto',
      status: 'active',
      date: '2023-02-20',
      id: 3
    },
    {
      name: 'petto',
      status: 'completed',
      date: '2023-02-15',
      id: 4
    }
  ]);
  const [editToDo, setEditToDo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);
  const [filterByStatus, setFilterByStatus] = useState('');
  const [filterByDate, setFilterByDate] = useState('');
  useEffect(() => {
    setFilteredArray(todoList);
    // document.getElementById('completedCheckBox').checked = false;
    // document.getElementById('activeCheckBox').checked = false;
  }, [todoList]);

  useEffect(() => {
    FilterByStatus();
  }, [filterByStatus || filterByDate]);
  // AddToDo is a function that adds a to-do item to the list.
  // It takes in 3 parameters: inputValue (the name of the to-do item), date, and id.
  // It first checks if there's already a to-do item with the same name,
  // and alerts the user if there is.
  // If the input value is an empty string, the function alerts the user to enter a valid name.
  // If the input value is not an empty string, it checks if the `editMode` is true.
  // If it's true, the function updates the existing to-do item with the new input value.
  // If the `editMode` is false, the function adds a new to-do item to the list with the input value as the name.
  // The function also clears the input field and calls the `ClearFilters` function.
  const AddToDo = (inputValue, date, id) => {
    let sameName = todoList.find((el) => el.name === inputValue);
    if (sameName) {
      alert('Todo is already listed!');
    } else if (inputValue === '') {
      alert('Please enter a valid name!');
    } else if (inputValue.length > 28) {
      alert('Todo name cannot be longer than 28 letters');
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
        document.getElementById(id).style.animation = 'none';
        setEditMode(false);
      } else {
        let newDate = new Date();
        let formatedDate = newDate.toISOString().substr(0, 10);
        let toDo = {
          name: inputValue,
          status: 'active',
          date: formatedDate,
          id: todoList.length === 0 ? 0 : todoList.length
        };
        setTodoList([...todoList, toDo]);
      }
    }
    document.getElementById('input').value = '';
    ClearFilters();
  };
  // Function to delete a ToDo from the list based on its id
  const deleteToDo = (id) => {
    // Copy the original ToDo list into a new array
    let Array = [...todoList];
    // Remove the element from the new array using the id
    Array.splice(id, 1);
    // Update the id property of all elements in the array
    Array.map((el) => (el.id = Array.map((ele) => ele.name).indexOf(el.name)));
    // Update the ToDo list with the modified array
    setTodoList(Array);
  };

  // Function to edit a ToDo in the list based on its id
  const EditToDo = (id) => {
    // Find the ToDo element with the given id
    let elementToBeEdited = todoList.find((el) => el.id === id);
    // Store the ToDo element to be edited for reference
    setEditToDo(elementToBeEdited);
    // Set the input value to the name of the ToDo element
    document.getElementById('input').value = elementToBeEdited.name;
    // Add animation to the ToDo element being edited
    document.getElementById(id).style.animation =
      'EditAnimation 1.5s linear infinite';
    // Enable the edit mode
    setEditMode(true);
  };

  // Function to mark a ToDo as completed in the list based on its id
  const FinishToDo = (id) => {
    // Find the ToDo element with the given id
    let finishedToDo = todoList.find((el) => el.id === id);
    // Set the status of the ToDo element to 'completed'
    finishedToDo.status = 'completed';
    // Copy the original ToDo list into a new array
    let temporaryArr = [...todoList];
    // Replace the element in the new array with the updated ToDo element
    temporaryArr.splice(id, 1, finishedToDo);
    // Update the ToDo list with the modified array
    setTodoList(temporaryArr);
    // Add a line through the text of the completed ToDo element
    document.getElementById(id).classList.add('line');
    // Disable buttons of the completed ToDo element
    let btns =
      document.getElementById(id).nextElementSibling.nextElementSibling
        .nextElementSibling.childNodes;
    btns.forEach((el) => el.setAttribute('disabled', 'true'));
  };
  // SortByNameAscending - Sorts the "todoList" array in ascending order based on the "name" property of each element
  const SortByNameAscending = (array) => {
    let arrayToBeSorted = [...array];
    // sorts the arrayToBeSorted in ascending order based on the "name" property of each element
    arrayToBeSorted.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    // updates the id of each element in the sorted array to match its position
    arrayToBeSorted.map(
      (el) => (el.id = arrayToBeSorted.map((ele) => ele.name).indexOf(el.name))
    );
    // sets the "todoList" to the sorted array
    setTodoList(arrayToBeSorted);
  };
  // SortByNameDescending - Sorts the "todoList" array in descending order based on the "name" property of each element
  const SortByNameDescending = (array) => {
    let arrayToBeSorted = [...array];
    // sorts the arrayToBeSorted in descending order based on the "name" property of each element
    arrayToBeSorted.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
    // updates the id of each element in the sorted array to match its position
    arrayToBeSorted.map(
      (el) => (el.id = arrayToBeSorted.map((ele) => ele.name).indexOf(el.name))
    );
    // sets the "todoList" to the sorted array
    setTodoList(arrayToBeSorted);
  };
  // SortByDateAscending sorts the to-do items in the array by date in ascending order
  const SortByDateAscending = (array) => {
    // Create a copy of the original array to avoid modifying the original array
    let arrayToBeSorted = [...array];
    // Sort the copy of the array based on the date
    arrayToBeSorted.sort((a, b) => {
      let aDate = new Date(a.date);
      let bDate = new Date(b.date);
      return aDate - bDate;
    });
    // Update the id of each item based on its position in the sorted array
    arrayToBeSorted.map(
      (el) => (el.id = arrayToBeSorted.map((ele) => ele.name).indexOf(el.name))
    );
    // Update the to-do list with the sorted array
    setTodoList(arrayToBeSorted);
  };

  // SortByDateDescending sorts the to-do items in the array by date in descending order
  const SortByDateDescending = (array) => {
    // Create a copy of the original array to avoid modifying the original array
    let arrayToBeSorted = [...array];
    // Sort the copy of the array based on the date
    arrayToBeSorted.sort((a, b) => {
      let aDate = new Date(a.date);
      let bDate = new Date(b.date);
      return bDate - aDate;
    });
    // Update the id of each item based on its position in the sorted array
    arrayToBeSorted.map(
      (el) => (el.id = arrayToBeSorted.map((ele) => ele.name).indexOf(el.name))
    );
    // Update the to-do list with the sorted array
    setTodoList(arrayToBeSorted);
  };
  // SortByStatusAscending function sorts the todo list in ascending order of status
  const SortByStatusAscending = (array) => {
    // Creating a copy of the todo list so as to not change the original array
    let arrayToBeSorted = [...array];
    // Sorting the todo list based on the status in ascending order
    arrayToBeSorted.sort((a, b) => {
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
      return 0;
    });
    // Re-assigning the 'id' property of each element based on its position in the sorted array
    arrayToBeSorted.map(
      (el) => (el.id = arrayToBeSorted.map((ele) => ele.name).indexOf(el.name))
    );
    // Updating the todo list with the sorted array
    setTodoList(arrayToBeSorted);
  };

  // SortByStatusDescending function sorts the todo list in descending order of status
  const SortByStatusDescending = (array) => {
    // Creating a copy of the todo list so as to not change the original array
    let arrayToBeSorted = [...array];
    // Sorting the todo list based on the status in descending order
    arrayToBeSorted.sort((a, b) => {
      if (a.status < b.status) {
        return 1;
      }
      if (a.status > b.status) {
        return -1;
      }
      return 0;
    });
    // Re-assigning the 'id' property of each element based on its position in the sorted array
    arrayToBeSorted.map(
      (el) => (el.id = arrayToBeSorted.map((ele) => ele.name).indexOf(el.name))
    );
    // Updating the todo list with the sorted array
    setTodoList(arrayToBeSorted);
  };
  const FilterByStatus = () => {
    // create a temporary array from the todoList
    let temporaryArr = [...todoList];

    // if filterByStatus is not an empty string, filter the todoList by status
    if (filterByStatus !== '') {
      let newArr = temporaryArr.filter((el) => el.status === filterByStatus);
      temporaryArr = newArr;
    }

    // if filterByDate is not an empty string, filter the todoList by date
    if (filterByDate !== '') {
      let newArr = temporaryArr.filter((el) => el.date === filterByDate);
      temporaryArr = newArr;
    }

    // set the filteredArray to the temporary array
    setFilteredArray(temporaryArr);
  };
  // SetCheckBox function takes the id of an element (checkbox) as its argument and sets its value to false, meaning it unchecks the checkbox.
  const SetCheckBox = (elementId) => {
    document.getElementById(elementId).checked = false;
  };
  // ClearFilters function unchecks the checkboxes with id's "completedCheckBox" and "activeCheckBox" and sets the values of filterByDate and filterByStatus to an empty string, which resets the filter properties.
  const ClearFilters = () => {
    document.getElementById('completedCheckBox').checked = false;
    document.getElementById('activeCheckBox').checked = false;
    setFilterByDate('');
    setFilterByStatus('');
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
        SortByStatusDescending,
        FilterByStatus,
        filteredArray,
        setFilteredArray,
        SetCheckBox,
        setFilterByStatus,
        setFilterByDate,
        ClearFilters
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
