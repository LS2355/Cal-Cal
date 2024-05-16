import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GetNutritionInfo } from './components/subcomponts/algorithms';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Log from './components/Log';
import Customize from './components/Customize';
import Settings from './components/Settings';
import './assets/sass/app.scss';

// import 'gridstack/dist/gridstack.css'




function App() {


  const [foodLogEntry, setFoodLogEntry] = useState({
    breakfast: [
      {
        "type": "item",
        "name":"egg",
        "calories": 60,
        "fat": 4.8,
        "carbs": 0.6,
        "protine": 6,
        "serving_size": 50,
        "serving_type": "grams",
        "servings": 1
      }
    ],
    lunch: [
      {
        "type": "item",
        "name": "apple juice",
        "calories": 113,
        "fat": 0.3,
        "carbs": 28,
        "protine": 0.2,
        "serving size": 1,
        "serving type": "cup",
        "amount of servings": 1,
      }
    ],
    dinner:[
      {
        "type": "item",
        "name": "apple",
        "calories": 95,
        "fat": 0.3,
        "carbs": 25,
        "protine": 0.5,
        "serving size": 1,
        "serving type": "medium apple",
        "amount of servings": 1,
      },
      {
        "type": "item",
        "name": "cracker",
        "calories": 81,
        "fat": 4.1,
        "carbs": 10,
        "protine": 1.1,
        "serving size": 5,
        "serving type": "crackers",
        "amount of servings": 1
      }
    ], 
    snacks:[
      {
        "type": "item",
        "name": "snickers",
        "calories": 215,
        "fat": 11,
        "carbs": 28,
        "protine": 3,
        "serving size": 1.56,
        "serving type": "oz",
        "amount of servings": 1 ,
      }
    ]
  })


  const [nutritionInfo, setNutritionInfo] = useState(()=>GetNutritionInfo(foodLogEntry))




  

  return (
    <div className="w-screen h-screen p-0 m-0 overflow-x-hidden text-white bg-color-background sm:flex">
      <Sidebar />
      <div className='flex flex-wrap justify-center w-full p-0 m-0 app'>
        {/* going to need to figure out plan for nav bar */}
         <Routes>
            <Route path='/' element = {
              <Dashboard 
                nutritionInfo = {nutritionInfo}
              />
            }/>
            <Route path='/Log' element = {
              <Log 
              foodLogEntry = {foodLogEntry}
              setFoodLogEntry = {setFoodLogEntry}
              nutritionInfo = {nutritionInfo}
              setNutritionInfo = {setNutritionInfo}
              />
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
