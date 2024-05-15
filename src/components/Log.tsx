import { useState } from "react";
import { TimeStamp } from "./subcomponts/algorithms";
import LogForm from "./LogForm";
import '../assets/sass/log.scss';



function Log () {

  const [logFoodEntryIsOpen, setLogFoodEntryIsOpen] = useState<boolean>(false);
  const [foodLogEntry, setFoodLogEntry] = useState()

  function logFood(){
    console.log("food")   
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
        <div className="w-full p-3">Breakfast</div>
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