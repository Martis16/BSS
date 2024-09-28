import './App.css';
import Home from './Pages/Home';
import Employee from './Pages/Employee';
import {Route, NavLink, Routes} from 'react-router-dom';

function App() {
  return (
    <>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Employee CRUD
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/employee">
              Employee
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/home' Component={Home}/>
        <Route path='/employee' Component={Employee}/>
      </Routes>
    </div>
    </>
  );
}

export default App;

