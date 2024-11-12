import { View, StyleSheet, Button} from "react-native";
import Animated from "react-native-reanimated";
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import { pullDownTabStyling } from "@/app/styles/styles";
export default function PullDownTab ({tabDownHeight}:any) {
  console.log('props',tabDownHeight)

 const {top} = useSafeAreaInsets()
 console.log(top)

  return (
    <>
    <Animated.View 
      style={{...pullDownTabStyling.PullDownTabContainer, height: tabDownHeight }} />
    </>

  )

}

