//this is the standard block and will only span half the page
import { ScreenWidth } from "@/app/constants"
import {View} from 'react-native'
import {blocksStyles} from '@/app/styles/blockStyles'
//variables

function Block ({children, style}: any) {

  return (
    <View style={{...blocksStyles.blockStyle, ...style}}>
    {children}
    </View>
  )
}


export default Block