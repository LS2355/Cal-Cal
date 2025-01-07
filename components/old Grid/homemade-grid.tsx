import React, {useState, useEffect, useRef} from 'react'
import { RequireContext } from 'expo-router';
import Animated, {useAnimatedScrollHandler, useDerivedValue, useSharedValue} from 'react-native-reanimated'
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
	I18nManager
} from 'react-native';
import {getEquippedBlockData, updateEquippedBlockData} from '../Blocks/BlockDataMangement';
import { addBlock, removeBlock, moveBlock, ImportsForEquippedBlocks, buildEquippedBlocks, generateBlockPositions} from '../GridHandles/BlockManagment';
import { BlockPostionCords } from '../interfaces';
import LoadingScreen from '../loadingScreen';
import Block from '../Blocks/BlockTypes/Block';
import BlockXL from '../Blocks/BlockTypes/BlockXL';
function DragGrid () {
	//states
	const [loading, setLoading] = useState(true)
	const [editMode, setEditMode] = useState<boolean>(false)
	const [blockElements, setBlockElements] = useState<any>([])	
  const [equippedBlockElements, setEquippedBlockElements] = useState<any>()	
	const blockPosition = useRef<BlockPostionCords[]>([])
	const [positionsIsReady, setPositionIsReady] = useState<boolean>(false)
	const [panResponderCapture, setPanResponderCapture] = useState<boolean>(false)
	const [activeItemIndex, setActiveItemIndex] = useState<number | undefined>(1)
	//refs
	const blockElementsFunctionsRefMap = useRef<any>({}) //key is function name //value is its function
	const blockElementsSizeType = useRef<object[]>([])
	//other variables
  let heightOfGrid = 800  
	let offsetForActiveBlock = {x:0, y:0}

	const fetchBlockData = async () =>{
		const result = await getEquippedBlockData()
		console.log('result', result)
		setLoading(false)
		setEquippedBlockElements(result)
	}
	
	//defaultBlock
	const defaultBlockWidth = ScreenWidth / 2
	const defaultBlockHeight = defaultBlockWidth
	// XLBlock
	const XLBlockWidth = ScreenWidth
	//objects of states used to pass to functions
	const ObjOfCommonStates = {blockElements, equippedBlockElements, setEquippedBlockElements}
	const ObjForMoveBlockStates = {blockElementsFunctionsRefMap, equippedBlockElements, blockPosition, setBlockElements}
	const ObjForImportsForEquippedBlocksStates = {equippedBlockElements, blockElementsFunctionsRefMap }
	const ObjForBuildEquippedBlocksStates = {blockElementsFunctionsRefMap,setBlockElements, blockPosition ,positionsIsReady}
	const ObjForGeneratingBlockPostions = {blockElements, defaultBlockWidth, blockPosition, setPositionIsReady }
	// we will only rerender block position state when the block is release
	
	function buildEquippedBlocks( {blockElementsFunctionsRefMap,setBlockElements, blockPosition, positionsIsReady}:{
		blockElementsFunctionsRefMap: React.MutableRefObject<any>;
		setBlockElements: React.Dispatch<any>;
		blockPosition: React.MutableRefObject<BlockPostionCords[]>;
		positionsIsReady: boolean;
	}) {
		const refValues = Object.values(blockElementsFunctionsRefMap.current)
		const	blockElementsArray = refValues.map((blockElementObj: any, index : number)=> {
				const {BlockName, BlockType, BlockData}= blockElementObj.default;
				console.log('blockDADS', blockElementObj.default)
				console.log('Block',blockElementObj.default.BlockData())
			if(BlockType){
				if(BlockType == 'default'){
				return ( 
						<Block
						onPress={()=>onBlockPress}
						onLongPress={()=>setActiveBlock(index)}
						panHandlers={PanResponder.panHandlers}
						style={{color:'blue'}}
						key={BlockName}>
							<BlockData/>
						</Block>
					)
				}
				else if (BlockType == 'full'){
					
					return(
						<BlockXL
							onPress={()=>onBlockPress}
							onLongPress={()=>setActiveBlock(index)}
							panHandlers={PanResponder.panHandlers}
							style={{color:'blue'}}
							key={BlockName}>
							<BlockData/>
						</BlockXL>
						)
	
				}
				else{console.error('incorrect blockType. only options are "default" & "full"')}
	
			}else{console.error('missing blockType')}
	
			})
		setBlockElements(blockElementsArray)
	}


function onBlockPress(itemIndex: number) {
	console.log('press')
	return true
}

function setActiveBlock (activeBlockIndex : number) { //look at this one again
setPanResponderCapture(true)
setActiveItemIndex(activeBlockIndex)
}

//going to need a funtion that updates the local storage when a value in EquippedBlockElements changes
//this is going to be for the order of the array and the amount of calues in it


//Finger tracking
						//look into panResponderCapture and where its used
// const panResponder = PanResponder.create({
// 	onStartShouldSetPanResponder: () => true,
// 	onStartShouldSetPanResponderCapture: () => false,
// 	onMoveShouldSetPanResponder: () => panResponderCapture,
// 	onMoveShouldSetPanResponderCapture: () => panResponderCapture,
// 	onShouldBlockNativeResponder: ()=> false,
// 	onPanResponderTerminationRequest: ()=> false,

// 	//how app responds
// 	onPanResponderGrant: onStartDrag,
// 	onPanResponderMove: onHandMove,
// 	onPanResponderRelease: onHandRelease
// })

// function onStartDrag(_: GestureResponderEvent, gestureState: PanResponderGestureState) {
// 	const activeItem = getActiveItem()
// 	if (!activeItem) return false
// 	const { x0, y0, moveX, moveY} = gestureState
// 	const activeItemOrigin = blockPosition[activeItemIndex]
// 	const x = activeItemOrigin.x + (I18nManager.isRTL ? x0: -x0)
// 	const y = activeItemOrigin.y - y0
// 	activeItem.

// }

// function onHandMove () {

// }

// function onHandRelease () {

// }

// function getActiveItem () {
// 	if (activeItemIndex === undefined) return false
// 	return blockElements[activeItemIndex]
// }


function handleInitailization () {
	console.log('da load', loading, 'init')
	ImportsForEquippedBlocks(ObjForImportsForEquippedBlocksStates)
	buildEquippedBlocks(ObjForBuildEquippedBlocksStates)
}



//Grid size - what is the size of our grid
	
	// function TS() {
	// 	blockElements.map(())
	// }

// //used when you only need the size type of one block 
// 	function getBlockElementSizeType(index: number) {	
// 		return blockElements[index].type.name
// 	}
	//this will only run on initialization to gett all sizetypes

	function getBlockElementSizes() {

		//the height for these will be determained in the actual block
		//i will need to navigte to that block proporites to get the height and add it to the block cords



	}

	function getBlockType() {
		blockElements.forEach((el: JSX.Element,index : number)=>{
		const BlockElementType = el.type.name
		if(BlockElementType == 'BlockXl'){
		}
		if (blockElementsSizeType.current[index]) {
			blockElementsSizeType.current[index] = el.type.name
			return
		}
		blockElementsSizeType.current.push(el.type.name)
		})	
	}

//save the equippedBlockElements state to local storage for next bootup
	function saveEquippedBlockElements (){
		updateEquippedBlockData(equippedBlockElements)
	}





//initail block Positions- where are the blocks going to be when i load up
function InitailBlockPositions () {
	const ArrayOfBlockCords = equippedBlockElements.map((_,index)=>{
	//need to figure out a good system for setting up the width and height of the blocks
	// maybe make a custom block that takes a few parrams to set that up
	// {width: default|| 'full', height: default || 4/5 || more}

	
	})
}
//get the Block Positions By order

//PanResponder to dictate how everything should move

//What happens when you press on the block

//what happens when you hold on the block

//what happens when you drag the block

// what happens when you start a drag
// what happens when you actully drag
// what happend when you realse drag
    // reset the blocks to be in position
    //how the blocks move to there position



// misc funcs

//get key by order

//get sorted data

//get distance between blocks

//set active block

//start drag start animation
//start drag animation

//useEffects
	//load the saved data 
	useEffect(()=>{fetchBlockData()},[])
	//whenever blockElements changes do this
	useEffect(()=>{
		getBlockElementSizes()
		if(blockElements.length > 0){generateBlockPositions(ObjForGeneratingBlockPostions)}
		}, [blockElements])
	//whenever equippedBlockElemnts changes do this
	useEffect(()=>{
		if (!loading){
			handleInitailization()
		}
	},[equippedBlockElements])
	useEffect(()=>{	buildEquippedBlocks(ObjForBuildEquippedBlocksStates)}, [positionsIsReady]) //going to need to switch blockPosition to ref

	if(loading){
		return (
			<>
			<LoadingScreen />
			</>
		)
	}else{
	return (
  <Animated.View
  style={[
      GridStyles.Grid,
      {height: heightOfGrid}
  ]}
  >
		{/* {blockElements} */}
		{/* {ReqSrc.map((block)=>(<View>{block}</View>))} */}
		{loading ? (<Text>Not loaded yet</Text>): blockElements}
		
		<Button
  onPress={()=>{console.log(blockPosition)}}
  title="move position"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
{/* <Button
  onPress={()=>{removeBlock('calcal-macros', ObjOfCommonStates)}}
  title="Console.log"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/> */}
  </Animated.View>
)
}
}

const GridStyles = StyleSheet.create({
  Grid: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap'
  },
	BlockContainerDefautStyles:{
		position: 'absolute',
		padding: 8,
		borderRadius: 12,
		color: 'grey'
	},
	BlockDefaultSyles: {
		color: 'black'
	}
})

export default DragGrid