import React, {useState, useEffect, useRef} from 'react'
import { RequireContext } from 'expo-router';
import Animated, {useAnimatedScrollHandler, useDerivedValue, useSharedValue} from 'react-native-reanimated'
import { ScreenWidth } from '@/app/constants'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
	Button
} from 'react-native';
import {getEquippedBlockData, updateEquippedBlockData} from './Blocks/BlockDataMangement';
import { addBlock, removeBlock, moveBlock, ImportsForEquippedBlocks, buildEquippedBlocks} from './GridHandles/BlockManagment';
import { BlockPostionCords } from './interfaces';
import LoadingScreen from './loadingScreen';

function DragGrid () {
	//states
	const [loading, setLoading] = useState(true)
	const [editMode, setEditMode] = useState<boolean>(false)
	const [blockElements, setBlockElements] = useState<any>([])	
  const [equippedBlockElements, setEquippedBlockElements] = useState<any>()	
	const blockPosition = useRef<BlockPostionCords[]>([])
	const [positionsIsReady, setPositionIsReady] = useState<boolean>(false)
	//refs
	const blockElementsFunctionsRefMap = useRef<any>({}) //key is function name //value is its function
	const blockElementsSizeType = useRef<object[]>([])
	//other variables
  let heightOfGrid = 800  

	const fetchBlockData = async () =>{
		const result = await getEquippedBlockData()
		console.log('result', result)
		setLoading(false)
		setEquippedBlockElements(result)
	}
	
	//defaultBlock
	const defaultBlockWidth = ScreenWidth / 2
	const defaultBlockHeight = defaultBlockWidth
	//XLBlock
	const XLBlockWidth = ScreenWidth
	//objects of states used to pass to functions
	const ObjOfCommonStates = {blockElements, equippedBlockElements, setEquippedBlockElements}
	const ObjForMoveBlockStates = {blockElementsFunctionsRefMap, equippedBlockElements, blockPosition, setBlockElements}
	const ObjForImportsForEquippedBlocksStates = {equippedBlockElements, blockElementsFunctionsRefMap }
	const ObjForBuildEquippedBlocksStates = {blockElementsFunctionsRefMap,setBlockElements, blockPosition ,positionsIsReady}
	// we will only rerender block position state when the block is release
	
	
	//load block Data when component mounts






//going to need a funtion that updates the local storage when a value in EquippedBlockElements changes
//this is going to be for the order of the array and the amount of calues in it


function generateBlockPositions () {
	const positions: any[] = []
	console.log('blockELsss',blockElements)
	blockElements.forEach((BlockElement: JSX.Element, index: number)=>{
	  const type = BlockElement.type.name == 'BlockXL'? 'full' : 'default' 
	  let xCord: number, yCord : number
		const prevPosition = positions[index - 1] || null
		//get x cordinate
		if(!positions[0]){
			xCord = 0
		}
		else {
			if(prevPosition.x == defaultBlockWidth) xCord = 0
			if(prevPosition.x == 0 && prevPosition.type == 'default' && type == 'default') xCord = defaultBlockWidth
			if(prevPosition.x == 0 && prevPosition.type == 'full'){
				if(type == 'default'){
					//this statement checks if all the positions in the grid are filled
					let idx: number = 1
					while ( positions[index - idx]== 'full'){
						idx += 1
					}
					//if the previous default width block has a width other than the screen is filled
					if (positions[index-idx].xCord == 0) xCord = defaultBlockWidth
					else{xCord = 0} 
				}
				else{
					xCord = 0
				} 
			}	
			if(prevPosition.type == 'full') xCord = 0 //with y cord make it a new line
		}
		
		if (!positions[0]) yCord = 0
		else if (prevPosition.x== 0){
			if(prevPosition.type == 'full'){yCord = getNewYCord(index)} //get new height
			else{yCord = prevPosition.y}
		} 
		else {
			yCord = getNewYCord(index)
		}
		//get y cordinate
			
		//when setting up full height just check if the previous el was a full if it was set get the height of that el and set the offset amount
	  positions.push({x:xCord, y:yCord, type: type})
	 })
	 console.log('positions arr ', positions)
	function getNewYCord (idx: number) {
	//get prev block height and add the prev position height for new height
	const prevBlockHeight = blockElements[idx-1].props.style.height || defaultBlockWidth
	const prevBlockYCord = positions[idx - 1].y
	
	const newYCord = prevBlockHeight + prevBlockYCord
	return newYCord
	}

	blockPosition.current= positions
	setPositionIsReady(true)
	//remember to set blockpositions = to positions 
}








//other then that it will just be moved with an animation 




	//every time equippedBlockElements changes run this function

//what if i dont automaticly call the Blocks and instead just save them


	//Dynamic imports for Equipped blocks

	//create the block then import the module then add that to the state

//  function ImportTheEquippedBlocks

//rewrite




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
		if(blockElements.length > 0){generateBlockPositions()}
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