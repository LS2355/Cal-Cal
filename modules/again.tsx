import {View, StyleSheet} from 'react-native'
import Box from './tempBlock'
import Draggable from './draggable'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'
import { useRef, useEffect, useState, useMemo } from 'react'
import { getGridHeight, getPosition, getPositionCordsObj, MARGIN, ScreenHeight, XLBlockWidth } from './utils'
import XLBox from './tempBlockXL'
// make a default export for all these components 
import calcalCaloriesConsumed from '@/components/Blocks/calcal-calories-consumed'
import calcalCaloriesBurned from '@/components/Blocks/calcal-calories-burned'
import calcalMacros from '@/components/Blocks/calcal-macros'
import calcalAudioControll from '@/components/Blocks/calcal-audio-controll'
import calcalTestBlock from '@/components/Blocks/calcal-test-block'


//what if in the item Grid i just push a bunch of objects and get the data from that 







function Again () {
  const newDataArr = useMemo(() => [
    calcalCaloriesBurned,
    calcalCaloriesConsumed,
    calcalAudioControll,
    calcalMacros,
    // calcalTestBlock
  ], []);

  const newPositionsIndex = useSharedValue(Object.assign({}, ...newDataArr.map((block, index) => ({ [index]: block.BlockName }))));
  const newPositionsCords = useSharedValue(getPositionCordsObj(newPositionsIndex, newDataArr));
  const DataArrLength = newDataArr.length;

  console.log('newPositionCords', newPositionsCords.value);
  console.log(newDataArr);

  const [gridHeight, setGridHeight] = useState(() => {
    const GRIDHEIGHT = getGridHeight(newPositionsCords.value);
    const extraSpace = MARGIN + 25;
    if (GRIDHEIGHT < ScreenHeight) return ScreenHeight + extraSpace;
    return GRIDHEIGHT + extraSpace;
  });



  // const dataArr = new Array(25).fill('').map((_,i)=> i)
  // console.log(dataArr)
  // const totalNumberOfBlocks = dataArr.length
  // const positions = useSharedValue(Object.assign({}, ...dataArr.map((item) => ({[item]: item})))) //this is just stores the index
  // console.log('po0sitions', positions.value)
  
  // const [gridHeight, setGridHeight] = useState(()=>{
  //   const GRIDHEIGHT = getGridHeight(totalNumberOfBlocks - 1) 
  //   const extraSpace = MARGIN + 25
  //   if (GRIDHEIGHT < ScreenHeight) return ScreenHeight + extraSpace 
  //   return GRIDHEIGHT + extraSpace
  // })


  //we can get rid of count 
  const DefaultDraggableBlockTemplate = (block,index) => {

    return (
    <Draggable key={index} positions={positions} id={index} type={block.type}>
      {block.BlockData()}
    </Draggable>
    )
  }





  // function blockSwitcher (item) {

  //   //get the type 

  //   if (type == XLBlockWidth) return  XLDraggableBlockTemplate(item)
  //   return DefaultDraggableBlockTemplate(item)
  // }

  console.log('curGridHeight',gridHeight)
    return( 
    <View style={{flex:1}}>
      <GestureHandlerRootView style={styles.container}>
        <View style={[styles.wrapper,  {height:gridHeight}]}>
          {newDataArr.map((block, index)=>{
           const tempType = true
            return(
            <Draggable key={index} positionCords={newPositionsCords} positionIndexArr={newPositionsIndex} id={index} type={block.BlockType} height={block.BlockHeight || false} newDataArr={newDataArr}>
              {block.BlockData()}
            </Draggable>
          )})}
      </View>
      </GestureHandlerRootView>
    </View>
  )
  // return( 
  //   <View style={{flex:1}}>
  //     <GestureHandlerRootView style={styles.container}>
  //       <View style={[styles.wrapper,  {height:gridHeight}]}>
  //         {dataArr.map((item, index)=>{
  //          const tempType = true
  //           return(
  //           <Draggable key={item} positions={positions} id={item} type={true}>
  //             <Box key={item} count={item}/>
  //           </Draggable>
  //         )})}
  //     </View>
  //     </GestureHandlerRootView>
  //   </View>
  // )
}

export default Again

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'black',
  },
  wrapper:{
    flexDirection:'row',
    flexWrap:'wrap',
  }
})