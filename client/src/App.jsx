import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {

  return (
    <Routes>
        <Route path = "/" element = {<MainLayout />} >
        <Route index element = {<Home/>} />
        <Route path = "/courses" element = {<Courses/>} />
        <Route path = "/dashboard" element = {<Dashboard/>} />
        <Route path = "*" element = {<NotFound/ >} />
      </Route>
    </Routes>
  )
}

export default App
