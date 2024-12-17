import {View} from 'react-native'
import { blocksStyles } from "@/app/styles/blockStyles"
import { ScreenWidth } from '@/app/constants'
//variables

const defaultBlockXLHeight = ScreenWidth/8 * 3 // default height will be 3/8 of the screen width
//this block will span the full width of the page
function BlockXL ({children, style}: any) {
  if (!style.height) style.height = defaultBlockXLHeight
  console.log(style.height)

  return (
    <View style={{...blocksStyles.XLBlockStyle, ...style}}>
    {children}
    </View>
  )
}

export default BlockXL


//this is the standard block and will only span half the page