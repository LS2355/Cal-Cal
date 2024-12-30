import {TouchableWithoutFeedback} from 'react-native'
import { blocksStyles } from "@/app/styles/blockStyles"
import { ScreenWidth } from '@/app/constants'
import { BlockProps } from '@/components/interfaces'
import Animated from 'react-native-reanimated'
//variables


const defaultBlockXLHeight = ScreenWidth/8 * 3 // default height will be 3/8 of the screen width
//this block will span the full width of the page
function BlockXL ({children, style, dragStartAnimationStyle, onPress, onLongPress, panHandlers, delayLongPress}: BlockProps) {
  console.log('styheight',style.height)
  if (!style.height) style.height = defaultBlockXLHeight

  return (
    <Animated.View style={[blocksStyles.XLBlockStyle, style, dragStartAnimationStyle]} {...panHandlers}>
      <TouchableWithoutFeedback delayLongPress={delayLongPress} onPress={onPress} onLongPress={onLongPress}>
        {children}
      </TouchableWithoutFeedback>
    </Animated.View>
  )
}

export default BlockXL


//this is the standard block and will only span half the page



// import {TouchableWithoutFeedback} from 'react-native'
// import { blocksStyles } from "@/app/styles/blockStyles"
// import { ScreenWidth } from '@/app/constants'
// import { BlockProps } from '@/components/interfaces'
// import Animated from 'react-native-reanimated'
// //variables


// const defaultBlockXLHeight = ScreenWidth/8 * 3 // default height will be 3/8 of the screen width
// //this block will span the full width of the page
// function BlockXL ({children, style, dragStartAnimationStyle, onPress, onLongPress, panHandlers, delayLongPress}: BlockProps) {
//   if (!style.height) style.height = defaultBlockXLHeight
//   console.log(style.height)

//   return (
//     <Animated.View style={[blocksStyles.XLBlockStyle, style, dragStartAnimationStyle]} {...panHandlers}>
//       <TouchableWithoutFeedback delayLongPress={delayLongPress} onPress={onPress} onLongPress={onLongPress}>
//         {children}
//       </TouchableWithoutFeedback>
//     </Animated.View>
//   )
// }

// export default BlockXL
