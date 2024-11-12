import { Platform, StyleSheet } from "react-native";
import {ScreenWidth, ScreenHeight, StatusBarHeight} from '../constants'
// console.log(StatusBar.currentHeight)
//the styling for the index page

import Constants from 'expo-constants'
const he = Constants.statusBarHeight
console.log('he',he)




const indexPageStyling = StyleSheet.create({
  appContainer: {
    position: 'relative',
    backgroundColor: 'black',
    flex: 1
  },
  pagerView: {
    flex: 1,
    alignSelf: 'stretch'
  }
})  

//styling for the focusPage
const focusPageStyling = StyleSheet.create({
  scrollView:{flex:1},
  tileContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  tileSingleContainer:{
    padding: 14,
    width: ScreenWidth / 2,
    height: ScreenWidth / 2
  },
  tileDoubleContainer: {
    width: ScreenWidth,
    height: ScreenWidth / 2,
    padding: 10
  },
  tile: {
    flex:1,
    backgroundColor: 'grey',
    color: '#fff',
    borderRadius: 16,
    padding: 10
  }
}) 

//styling for nutrition page
const nutritionPageStyling = StyleSheet.create({

})

//styling for workout page
const workoutPageStyling = StyleSheet.create({

})

//styling for pullDownTab
const pullDownTabStyling = StyleSheet.create({
  PullDownTabContainer: {
    width: ScreenWidth,
    //height is animated so this will be on the actual pullDownTab file
    backgroundColor: 'tan',
    zIndex: 5,
    elevation: 5,

    position: 'absolute',
    top: 0,
    left: 0
  }
})


export {
  indexPageStyling,
  focusPageStyling, 
  nutritionPageStyling, 
  workoutPageStyling, 
  pullDownTabStyling
}