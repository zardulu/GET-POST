import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostIndex from './components/PostIndex';


function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route exact path='/posts' element={<PostIndex />} />        
        
      </Routes>
    </div>
  </Router>
    
    
  );
}

export default App;
