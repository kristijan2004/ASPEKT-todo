import './App.css';
import { Provider } from './components/Context';
import InputForm from './components/InputForm';
import ToDoTable from './components/ToDoTable';

function App() {
  return (
    <div className='App'>
      <Provider>
        <InputForm />
        <ToDoTable />
      </Provider>
    </div>
  );
}

export default App;
