import { useEffect, useState,} from "react";
import {GridStack} from 'gridstack';
import defaultWidgets from "../Data/widgets.json"

import 'gridstack/dist/gridstack.css'
import 'gridstack/dist/gridstack-extra.css'

//  grid.addWidget('<div class="grid-stack-item"><div class=" grid-stack-item-content ">hello</div></div>', {w: 3, h:1, x:2, y:0, noMove: true, }) //dashboard


function Dashboard () {

  const [widgetData, setWidgetData] = useState(defaultWidgets)
  
useEffect (()=>{
  const grid = GridStack.init({
    float:true,
    cellHeight: "170px",
    minRow: 1,
    column: 7,
    disableResize: true,
    margin: 8,
  })

  //this build all of our widgets stored in the widgetData state  
  widgetData.map((widgetEl : object)=>{
    grid.addWidget(widgetEl)
  })
})  
  


 

    





  return(
    <div className="w-full h-screen ">
            <div className="grid-stack">
                <div className=" grid-stack-item ui-draggable-disabled ui-resizable-disabled" data-gs-width="4" data-gs-height="4" gs-w="5" gs-x="1" gs-y="0" gs-no-Move="true">
                    <div className=" grid-stack-item-content">
                    
                    
                    
                    
                    </div>
                </div>
            </div>


    
    </div>
  )
}

export default Dashboard;