import './App.css';
import { Provider } from './components/Context';
import InputForm from './components/InputForm';

function App() {
  return (
    <div className='App'>
      <Provider>
        <InputForm />
      </Provider>
    </div>
  );
}

export default App;
