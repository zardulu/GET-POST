import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';


function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route exact path='/home' element={ <Home /> } />        
        
      </Routes>
    </div>
  </Router>
    
    
  );
}

export default App;
