import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import { Switch, Route, useLocation } from 'react-router-dom';
import Success from './components/Success';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/success">
          <Success />
        </Route>
      </Switch>
    </>
  )
}

export default App
