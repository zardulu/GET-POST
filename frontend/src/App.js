import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ViewPost from './pages/ViewPost';


function App() {
  return (
    
    <Router>
    <div>
      <Routes>
        <Route exact path='/home' element={ <Home /> } />  {/* Route for Homepage*/}        
        <Route exact path='/post/:id' element={ <ViewPost /> } />   {/* Route for post page*/}
      </Routes>
    </div>
  </Router>
    
    
  );
}

export default App;
