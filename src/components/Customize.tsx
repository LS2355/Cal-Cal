import { useState } from "react";

function Customize ({healthInfo, setHealthInfo}) {
const [activeLevel, setActiveLevel] = useState<string>('medium')


function handleActivityLevelChange (selected : string) {
  setActiveLevel(selected)
  //update so that it is sending data to setHealthInfo
  //i might want to make a functin for the updating a state variable with an existion object since im doing it so much
}







  return(
    <div className="w-full m-4">
      Please select you activity level
      <div className="customize-radio-input">
        <label>
        <input value="light" name="activity-level" type="radio" onClick={()=>handleActivityLevelChange('light')} checked={healthInfo.activity_level == 'light'? true: false}/>
        <span>light</span>
        </label>
        <label>
          <input value="medium" name="activity-level" type="radio" onClick={()=>handleActivityLevelChange('medium')} checked={healthInfo.activity_level == 'medium'? true: false}/>
        <span>medium</span>
        </label>
        <label>
          <input value="heavy" name="activity-level" type="radio" onClick={()=>handleActivityLevelChange('heavy')} checked={healthInfo.activity_level == 'heavy'? true: false}/>
        <span>heavy</span>
        </label>
        <label>
          <input value="custom" name="activity-level" type="radio" onClick={()=>handleActivityLevelChange('custom')} checked={healthInfo.activity_level == 'custom'? true: false}/>
        <span>custom</span>
        </label>
        <span className="customize-activity-selection"></span>
      </div>
      
      {activeLevel == "custom" ?<div>
        Please input your maintenance calories <br />
          <input type="text" placeholder="ex: 1600" inputMode="numeric" className="customize_input"/>
        </div>: ""} <br />
      Enter Weight <br />
      <input className="w-12 font-semibold customize_input" placeholder="lb" /><br />
      Enter Height <br />
      <input className="w-8 font-semibold text-center border-r-2 customize_input" type="text" placeholder="ft" />
      <input className="w-16 ml-1 text-center customize_input" type="text" placeholder="in" /><br/>
    </div>
  )
}

export default Customize;




        // <div className={activeLevel == "custom" ? activeActivityBox : activityBox} onClick={()=>handleActivityLevelChange('custom')}>
        //   custom
        // </div>