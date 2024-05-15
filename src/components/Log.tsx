import { useState, useRef, useMemo, useEffect} from "react";
import { GetNutritionInfo, GetTotalCalories, TimeStamp } from "./subcomponts/algorithms";
import LogForm from "./LogForm";
import { FormDataInterface } from "./subcomponts/interfaces";
import '../assets/sass/log.scss';



function Log ({foodLogEntry, setFoodLogEntry} : {foodLogEntry: object, setFoodLogEntry: object}) {

  const [logFoodEntryIsOpen, setLogFoodEntryIsOpen] = useState<boolean>(false);

  useEffect(()=>{
    //run onece on start and again on entry
    const info = GetNutritionInfo(foodLogEntry)
    console.log(info)






  }, [foodLogEntry])




  function BuildLogs(meal : string){  
    let totalCalories : number = 0;
    const foodLog = foodLogEntry[meal].map((entryObj :FormDataInterface, index :number)=>{
      const {type, name, calories, fat, carbs, protine, serving_size, serving_type, servings} = entryObj
        totalCalories = totalCalories + calories


      return(
          <div className="flex justify-around w-full py-2 border-y" key={index}>
            <div className="text-center grow-2">{name}</div>
            <div className="text-center grow">{calories}</div>
            <div className="text-center grow">{protine}</div>
            <div className="text-center grow">{fat}</div>
            <div className="text-center grow">{carbs}</div>
            <div className="text-center grow">{serving_size}</div>
            <div className="text-center grow">{serving_type}</div>
            <div className="text-center grow">{servings}</div>
          </div>)
    })
      // if (meal == "breakfast") totalBreakfastCalories.current = totalCalories
      // if (meal == "lunch") totalLunchCalories.current = totalCalories
      // if (meal == "dinner") totalDinnerCalories.current = totalCalories
      // if (meal == "snack") totalSnackCalories.current = totalCalories
    return foodLog
  }

  


  return(
    <>
    <div className="relative grid w-full h-full place-content-center">
    {/* log form */}
    {logFoodEntryIsOpen ? <LogForm setLogFoodEntryIsOpen = {setLogFoodEntryIsOpen}/> : "" }


     <div className="absolute top-0 left-0 p-2 font-semibold log-day">Log: {TimeStamp().day}</div>
      <div className="absolute top-0 right-0 flex flex-wrap p-2 log-day">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="m8.854 11.646 5.792-5.792a.5.5 0 0 1 .854.353v11.586a.5.5 0 0 1-.854.353l-5.792-5.792a.5.5 0 0 1 0-.708Z"></path>
         </svg>
       </div>
       <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="m15.146 12.354-5.792 5.792a.5.5 0 0 1-.854-.353V6.207a.5.5 0 0 1 .854-.353l5.792 5.792a.5.5 0 0 1 0 .708Z"></path>
        </svg>
      </div>
      {TimeStamp().full}
      </div>

      <div className="w-5/6 flex flex-wrap justify-between min-w-[500px] log">
        <div className="w-full p-3 font-semibold tracking-wide">Breakfast <span className="float-right font-semibold tracking-wider"></span> </div>
        {BuildLogs("breakfast")}
        <div className="grid w-full p-2 place-content-center log-add-entry" onClick={()=>setLogFoodEntryIsOpen(!logFoodEntryIsOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24">
            <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path>
          </svg>
        </div>
      </div>
    </div>
    </>
  )
}

export default Log;







    // <div className="grid w-full h-full place-content-center">
    //   <div className="w-full h-full min-w-[500px] log md:w-5/6 flex flex-wrap">
    //     <div className="flex justify-between w-full px-3 py-1 log-title">Log: {TimeStamp().day} <span className="flaot">{TimeStamp().full}</span></div>
    //     <div className="w-full p-3">Breakfast</div>
    //     <div className="grid w-full p-2 border place-content-center">
    //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
    //         <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path>
    //       </svg>
    //     </div>
    //   </div>      
    // </div>