import { Routes, Route } from 'react-router-dom';
import './App.css';
import Account from './components/Account';
import Welcome from './components/Welcome';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Welcome/>}></Route>
        <Route path='/account' element={<Account/>}></Route>
      </Routes>
    </>
  );
}

export default App;
