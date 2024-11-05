//to use add to imports and put HandlePullDown in the onScroll prop function

export default function HandlePullDown ({event}:any) {
  const DistanceElementIsPulled = event.nativeEvent.contentOffset.y;
  const pullDistanceTillFunctionGetsRan = -80 //this is in pixles
  
  if(DistanceElementIsPulled <= pullDistanceTillFunctionGetsRan){
    console.log("display pull down screen")
  }
  }
