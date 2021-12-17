import './App.css';
import Header from './header/Header';
import Players from './players/Players';
import { Routes, Route } from 'react-router-dom';
import HomePage from './homepage/HomePage';
import LoginForm from './login/LoginForm';



function App() {
  return (
    <div className="App">
      <Header></Header>
      <main>
        <Routes>
          <Route path='/' element={ <HomePage/> }></Route>

          <Route path='/login' element={ <LoginForm/>}></Route>

          <Route path='/players' element={ <Players/> }></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
