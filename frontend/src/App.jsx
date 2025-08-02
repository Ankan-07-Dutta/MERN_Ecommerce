import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react'
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetails />}/>
      </Routes>
    </Router>
  )
}

export default App
