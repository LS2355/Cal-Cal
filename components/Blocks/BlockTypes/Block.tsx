//this is the standard block and will only span half the page
import {TouchableWithoutFeedback} from 'react-native'
import {blocksStyles} from '@/app/styles/blockStyles'
import { BlockProps } from "@/components/interfaces"
import Animated from "react-native-reanimated"
//variables

function Block ({
  children,
  style, 
  dragStartAnimationStyle, 
  onPress, 
  onLongPress, 
  panHandlers, 
  position,
  delayLongPress
}: BlockProps) {
  console.log('XLBlock Position', position)
  return (
    <Animated.View style={[blocksStyles.blockStyle, style, dragStartAnimationStyle,]} {...panHandlers}>
      <TouchableWithoutFeedback delayLongPress={delayLongPress} onPress={onPress} onLongPress={onLongPress}>
        {children}
      </TouchableWithoutFeedback>
    </Animated.View>
  )
}


export default Block



// //this is the standard block and will only span half the page
// import {TouchableWithoutFeedback} from 'react-native'
// import {blocksStyles} from '@/app/styles/blockStyles'
// import { BlockProps } from "@/components/interfaces"
// import Animated from "react-native-reanimated"
// //variables

// function Block ({children, style, dragStartAnimationStyle, onPress, onLongPress, panHandlers, delayLongPress}: BlockProps) {

//   return (
//     <Animated.View style={[blocksStyles.blockStyle, style, dragStartAnimationStyle]} {...panHandlers}>
//       <TouchableWithoutFeedback delayLongPress={delayLongPress} onPress={onPress} onLongPress={onLongPress}>
//         {children}
//       </TouchableWithoutFeedback>
//     </Animated.View>
//   )
// }


// export default Block