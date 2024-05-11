import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Log from './components/Log';
import Customize from './components/Customize';
import Settings from './components/Settings';
import './assets/sass/app.scss';



function App() {

  return (
    <div className="w-screen h-screen p-0 m-0 overflow-x-hidden text-white bg-color-background sm:flex">
      <Sidebar />
      <div className='flex justify-center w-full app'>
        {/* going to need to figure out plan for nav bar */}
        working
         <Routes>
            <Route path='/' element = {
              <Dashboard />
            }/>
            <Route path='/Log' element = {
              <Log />
            }/>
            <Route path='/Settings' element = {
              <Settings />
            }/>
            <Route path='/Customize' element = {
              <Customize />
            }/>
          </Routes>
      </div>
    </div>
  )
}

export default App
