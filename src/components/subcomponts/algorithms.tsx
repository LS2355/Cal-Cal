import moment from "moment"
function GetCalorieInfo () {
  
}

function TimeStamp () {
  return {
    day: moment().format('dddd'),
    full: moment().format('L'),
  }
}


export {GetCalorieInfo, TimeStamp}