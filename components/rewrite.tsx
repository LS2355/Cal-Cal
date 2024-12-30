import React, {useState, useEffect, useRef} from 'react'
import { RequireContext } from 'expo-router';
// import Animated, {useAnimatedScrollHandler, useDerivedValue, useSharedValue} from 'react-native-reanimated'
import { ScreenWidth } from '@/app/constants'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  PanResponder,
  PanResponderGestureState,
  GestureResponderEvent,
  I18nManager, 
  Platform,
  Animated // i will come back and changes this to reanimated once i have a better understanding of how it works
} from 'react-native';
import {getEquippedBlockData, updateEquippedBlockData} from './Blocks/BlockDataMangement';
// import { addBlock, removeBlock, moveBlock, ImportsForEquippedBlocks, buildEquippedBlocks, generateBlockPositions} from './GridHandles/BlockManagment';
import { BlockPostionCords } from './interfaces';
import LoadingScreen from './loadingScreen';
import Block from './Blocks/BlockTypes/Block';
import BlockXL from './Blocks/BlockTypes/BlockXL';
import { dragGridStyling } from '@/app/styles/styles';
function DragGrid () {
//boolean states mostly for checking if something is active/on
  const [loading, setLoading] = useState(true) //is everything done loading
  const [editMode, setEditMode] = useState(false) //are we editing the block layout
  const [panResponderCapture, setPanResponderCapture] = useState(false)

  //blockData
  const blockElementsFunctionsRefMap = useRef<any>({})
  const [equippedBlockElements, setEquippedBlockElements] = useState<[string] | false>(false)
  const [blockElements, setBlockElements] = useState([])//items
  const [orderMap] = useState({}) //order map is going to be key:blockName, value:positionindex
  const [itemMap] = useState({})
  const blockPositions = useRef<BlockPostionCords[]>([])
  const [activeBlockIndex, setActiveBlockIndex] = useState()


  //temp solution
  const blockPostionOrder = useRef([
    {x: 0, y:0},
    {x:50, y:50},
    {x:0, y:150, height: 200},
    {x:50, y:200},
    {x:0, y:450, height: 80}
  ]
  )

  //gridData
  const [gridHeight] = useState<Animated.Value>(new Animated.Value(0))
  const [gridLayout, setGridLayout] = useState({
    x:0,
    y:0,
    width: 0,
    height: 0
  })

  //other States / Refs
  const [dragStartAnimatedValue] = useState(new Animated.Value(1))

  //more stored values 
    //blocks
  const defaultBlockWidth = ScreenWidth / 2
  const defaultBlockHeight = defaultBlockWidth
  const XLBlockWidth = ScreenWidth
  


  //get Equipped Blocks From local storage -- the will already be in order

  function importEquippedBlocks (){
    if(equippedBlockElements){
      
    const requireContexForBlocks = require.context('./Blocks', false, /\.tsx$/)
    equippedBlockElements.forEach((BlockName, index)=> {
      
      blockElementsFunctionsRefMap.current[BlockName] = requireContexForBlocks(`./${BlockName}.tsx`).default
    })
    }
    else{console.error('No Equipped Block Elements', equippedBlockElements)}
    console.log('final', blockElementsFunctionsRefMap.current)
  } 

  function buildEquippedBlocks () {
    const arrayOfBlockElementObjs = Object.values(blockElementsFunctionsRefMap.current) 
    const BuiltBlockObjectsArray = arrayOfBlockElementObjs.map((blockElementObj: any, index: number)=>{
      const {BlockName, BlockType, BlockData}: {BlockName:string, BlockType:string, BlockData: any} = blockElementObj 
      let JSXBeingReturned
      if(BlockType){
        if(BlockType == 'default'){
          JSXBeingReturned = (
            <Block
						onPress={()=>onBlockPress}
						onLongPress={()=>setActiveBlock(index)}
						panHandlers={PanResponder.panHandlers}
            position={}
						style={buildBlockPosition(BlockType)}
						key={BlockName}
					>
						<BlockData/>
					</Block>
          )
        }
        else if(BlockType == 'full') {
          JSXBeingReturned = (
						<BlockXL
							onPress={()=>onBlockPress}
							onLongPress={()=>setActiveBlock(index)}
							panHandlers={PanResponder.panHandlers}
              position={}
							style={buildBlockPosition(BlockType, blockElementObj.BlockHeight)}
							key={BlockName}
						>
							<BlockData/>
						</BlockXL>
          )
        }
      }else{console.error('missing blockType')}


      return {
        key: BlockName,
        block: JSXBeingReturned,
        currentPosition: new Animated.ValueXY()
      }


    })
    setBlockElements(BuiltBlockObjectsArray)
    setLoading(false)
  }




  function buildBlockPosition (blockType, blockHeight?) {
    if (!blockHeight) blockHeight = defaultBlockHeight

    const positions: any[] = []


  }

  function getBlockPositionByOrder() {
    // we need a system that will keep track of all the props heights
    // we need to give each of the blocks there own index and keep track like that 
    //or we can use a hashmap and get the values using the equipped blocks 
    // only storring the height of the xl blocks

    c
    
  }

  function getBlockPostion () {
    return {
      top: /* return current block poistion.top */false,
      left: I18nManager.isRTL && Platform.OS === 'web' ? undefined : false,//return block currentPosition.getLayout().left,
      right: I18nManager.isRTL && Platform.OS === 'web' ? /* return blockposition.top */false : undefined
    }
  }












//need to fix the XLBlock component and how it handles its props









//fetching data 

const fetchEquippedBlocksNames = async () => {
  const response  = await getEquippedBlockData() 
  setEquippedBlockElements(response)
}


//effect hooks 
useEffect(()=>{fetchEquippedBlocksNames()}, [])
useEffect(()=>{
  if(equippedBlockElements){
    importEquippedBlocks()
    buildEquippedBlocks()
  }
},[equippedBlockElements])








if(loading){
  return (
    <>
      <LoadingScreen/>
      <Button
      onPress={()=>console.log('blockels',blockElements)}
      title='test btn'
      color={'#ffff'}
    />
    </>
  )
}

return(
  <Animated.View
    style={[
      dragGridStyling.grid,
      {height: gridHeight}
    ]}
  >
    {blockElements.map((blockElement)=>{
      return blockElement.block
    })}

    <Button
      onPress={()=>console.log('button press')}
      title='test btn'
      color={'#ffff'}
    />

  </Animated.View>
)
}
export default DragGrid