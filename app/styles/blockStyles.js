import { Platform, StyleSheet } from "react-native";
import {ScreenWidth} from '../constants'
import {BlockColor} from '../userConfig'

const defaultBlockStyles = {
  position: 'absolute',
  padding: 12,
  borderWidth: 1,
  // borderColor: 'white',
  borderStyle: 'solid'
}

const blocksStyles = StyleSheet.create({
  blockStyle:{
    ...defaultBlockStyles,
    width: ScreenWidth / 2,
    height: ScreenWidth / 2,
  },
  XLBlockStyle: {
    ...defaultBlockStyles,
    width: ScreenWidth
  },
  defualtBlockChild: {
    flex:1,
    padding: 8,
    borderRadius: 16,
    color: '#fff',
    backgroundColor: BlockColor,
  }



})

export {blocksStyles}