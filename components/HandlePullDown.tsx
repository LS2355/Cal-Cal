//to use add to imports and put HandlePullDown in the onScrollEndDrag prop function
import { Vibration } from "react-native"
import { withSpring } from "react-native-reanimated"
import { StatusBarHeight } from "@/app/constants"

function HandlePullDown (eventPullDistance: any, pullDistanceTillFunctionGetsRan?: any) {
  // const DistanceElementIsPulled = event.nativeEvent.contentOffset.y;

  //if pullDistanceTillFunctionGetsRan is not declared the default the value to -80
  pullDistanceTillFunctionGetsRan = pullDistanceTillFunctionGetsRan || -55
  if(eventPullDistance <= pullDistanceTillFunctionGetsRan){
    return true
  }
  else{return false}
  }


//Focus Page pull down
export function FocusPagePullDown (event: any, tabDownHeight: any){
  console.log('tab', tabDownHeight)
  if(tabDownHeight.value > 0){tabDownHeight.value = withSpring(0)}
  else if (HandlePullDown(event.nativeEvent.contentOffset.y)){
    Vibration.vibrate(100)    
    tabDownHeight.value = withSpring(210 + StatusBarHeight )
  }
}
