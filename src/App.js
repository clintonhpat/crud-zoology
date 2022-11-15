import './App.css';
import {Home} from './Home';
import {AnimalClass} from './AnimalClass';
import {Animal} from './Animal';
import {Navigation} from './Navigation';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className='m-3 d-flex justify-content-center'>
      CRUD Zoology App
      </h3>
      <Navigation/>

      <Routes>
        <Route path='/' index element={<Home />}/>
        <Route path='/Animal' element={<Animal />}/>
        <Route path='/AnimalClass' element={<AnimalClass />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
