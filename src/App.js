// App.js
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {indexPattern} from './Routes'
import Header from './components/Header'
import Home from './components/Home'

const App = () => {
  console.log('test1')
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path={indexPattern} element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
