import { useEffect, useState,} from "react";
import {GridStack} from 'gridstack';
import defaultWidgets from "../Data/widgets.json"
import 'gridstack/dist/gridstack.css'
import ProgressBar from 'progressbar.js';
import 'gridstack/dist/gridstack-extra.css'
import { duration } from "moment";

//  grid.addWidget('<div class="grid-stack-item"><div class=" grid-stack-item-content ">hello</div></div>', {w: 3, h:1, x:2, y:0, noMove: true, }) //dashboard


function Dashboard ({nutritionInfo}) {

  const [widgetData, setWidgetData] = useState(defaultWidgets)

  


  










useEffect (()=>{
  const grid = GridStack.init({
    float:true,
    cellHeight: "170px",
    minRow: 1,
    maxRow: 6,
    column: 7,
    disableResize: true,
    margin: 8,
  })

  //this build all of our widgets stored in the widgetData state  
  widgetData.map((widgetEl : object)=>{
    grid.addWidget(widgetEl)
  })


  //progress bars
    const bar = new ProgressBar.Circle('#barContainer', {
      easing: 'easeInOut',
      strokeWidth: 7.5,
      color: "green", //bar color
      trailColor: "blue", //left over bar color
      trailWidth: 4,
      svgStyle:{
        display: "block",
        width: '100%',
      },
      text: {
        value: 'cals',
        className: 'BarContent',
        style: {
          color: '#f00',
          position: 'absolute',
          left: '50%',
          top: '50%',
          padding: 0,
          margin: 0,

          transform: {
            prefix: true, value: 'translate(-50%, -50%)'
          }
        }
      }
    })
    bar.animate(0.542)




})  
  


  return(
    <div className="w-full h-screen overflow-auto">
            <div className="grid-stack ">
                <div className=" grid-stack-item ui-draggable-disabled ui-resizable-disabled" data-gs-width="4" data-gs-height="4" gs-w="5" gs-x="1" gs-y="0">
                    <div className=" grid-stack-item-content">
                      {nutritionInfo.total.calories}                    
                      <div id="barContainer">
                      </div>
                    </div>
                </div>
            </div>


    
    </div>
  )
}

export default Dashboard;