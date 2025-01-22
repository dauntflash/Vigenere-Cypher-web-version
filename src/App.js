import { BrowserRouter as Router,Route, Routes } from "react-router-dom";

import './App.css';
import Header from './Components/header';
import Main from './Components/Main';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <div className="app">
      <div className="top">
        <Header/>
      </div>
      <div className='bottom'>
        <Main/>
      </div>
    </div>

  );
}

export default App;
