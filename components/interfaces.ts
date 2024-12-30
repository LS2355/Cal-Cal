import {StyleProp, GestureResponderHandlers} from 'react-native'
export interface BlockPostionCords {
    x: number
    y: number
    type?: string
}

export interface BlockProps {
    style?: StyleProp<any>
    dragStartAnimationStyle: StyleProp<any>
    onPress?: () => void
    onLongPress: () => void
    panHandlers: GestureResponderHandlers
    position: any // go back and switch this to the propper type 
    delayLongPress: number
    children?: React.ReactNode
  }