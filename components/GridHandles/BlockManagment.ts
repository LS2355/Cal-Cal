import * as React from 'react'
import { BlockPostionCords } from "../interfaces"


// use the usecontext api to grab the states
export function addBlock (blockFileName : string, {blockElements, equippedBlockElements, setEquippedBlockElements}: any){
	console.log('blockEl',blockElements[0])
	//if module is already equipped then return error else add it to EquippedBlockElements
	if (equippedBlockElements.includes(blockFileName))return console.error('Module is already Equipped')

	setEquippedBlockElements([...equippedBlockElements, blockFileName] )
}

export function removeBlock (blockFileName: string, {blockElements, equippedBlockElements, setEquippedBlockElements}: any) {
	setEquippedBlockElements((prevArray: string[]) => prevArray.filter((item : string) => item !== blockFileName))
}

export function moveBlock(blockBeingMoved: string, {blockElementsFunctionsRefMap, equippedBlockElements, blockPosition, setBlockElements}:{
    blockElementsFunctionsRefMap: any;
    equippedBlockElements: any;
    blockPosition: any;
    setBlockElements: any;
}) {

	console.log('TSXel', blockElementsFunctionsRefMap.current)
	const func = blockElementsFunctionsRefMap.current[blockBeingMoved]
	const indexOfBlockBeingMoved = equippedBlockElements.indexOf(blockBeingMoved)
		//change the obj cords
		blockPosition[indexOfBlockBeingMoved]= {x: 200, y:420}


		//end of change the obj cords
	console.log('jdkjfkdkjf;', indexOfBlockBeingMoved)

	const TSXel =func.default(blockPosition[indexOfBlockBeingMoved])
	
	// update the state 
	setBlockElements((oldState: JSX.Element[])=> {
		return oldState.map(
			(TSXElements)=>(TSXElements.key === blockBeingMoved? TSXel: TSXElements)
		)
	})

}



export function ImportsForEquippedBlocks ({equippedBlockElements, blockElementsFunctionsRefMap }:{
	equippedBlockElements: string[];
	blockElementsFunctionsRefMap: React.MutableRefObject<any>;
}) {
	const requireContextForBlock = require.context('../Blocks', false, /\.tsx$/)
	equippedBlockElements.forEach((BlockName, index) => {
		const log = requireContextForBlock(`./${BlockName}.tsx`)
		blockElementsFunctionsRefMap.current[BlockName] = log
	})
}

// export function buildEquippedBlocks( {blockElementsFunctionsRefMap,setBlockElements, blockPosition, positionsIsReady}:{
// 	blockElementsFunctionsRefMap: React.MutableRefObject<any>;
// 	setBlockElements: React.Dispatch<any>;
// 	blockPosition: React.MutableRefObject<BlockPostionCords[]>;
// 	positionsIsReady: boolean;
// }) {
// 	const refValues = Object.values(blockElementsFunctionsRefMap.current)
// 	let blockElementsArray
// 	if (positionsIsReady){
// 		blockElementsArray = refValues.map((myComponents: any, index : number)=> myComponents.default(blockPosition.current[index]))
// 	}
// 	else{
// 		blockElementsArray = refValues.map((myComponents: any, index : number)=> myComponents.default({x:0, y:0}))
// 	}
// 	setBlockElements(blockElementsArray)
// }

// export function generateBlockPositions ({blockElements, defaultBlockWidth, blockPosition, setPositionIsReady }:{
// 	blockElements: any;
// 	defaultBlockWidth: number;
// 	blockPosition: React.MutableRefObject<BlockPostionCords[]>;
// 	setPositionIsReady: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
// 	const positions: any[] = []
// 	console.log('blockELsss',blockElements)
// 	blockElements.forEach((BlockElement: JSX.Element, index: number)=>{
// 		const type = BlockElement.type.name == 'BlockXL'? 'full' : 'default' 
// 		let xCord: number, yCord : number
// 		const prevPosition = positions[index - 1] || null
// 		//get x cordinate
// 		if(!positions[0]){
// 			xCord = 0
// 		}
// 		else {
// 			if(prevPosition.x == defaultBlockWidth) xCord = 0
// 			if(prevPosition.x == 0 && prevPosition.type == 'default' && type == 'default') xCord = defaultBlockWidth
// 			if(prevPosition.x == 0 && prevPosition.type == 'full'){
// 				if(type == 'default'){
// 					//this statement checks if all the positions in the grid are filled
// 					let idx: number = 1
// 					while ( positions[index - idx]== 'full'){
// 						idx += 1
// 					}
// 					//if the previous default width block has a width other than the screen is filled
// 					if (positions[index-idx].xCord == 0) xCord = defaultBlockWidth
// 					else{xCord = 0} 
// 				}
// 				else{
// 					xCord = 0
// 				} 
// 			}	
// 			if(prevPosition.type == 'full') xCord = 0 //with y cord make it a new line
// 		}
		
// 		if (!positions[0]) yCord = 0
// 		else if (prevPosition.x== 0){
// 			if(prevPosition.type == 'full'){yCord = getNewYCord(index)} //get new height
// 			else{yCord = prevPosition.y}
// 		} 
// 		else {
// 			yCord = getNewYCord(index)
// 		}
// 		//get y cordinate
			
// 		//when setting up full height just check if the previous el was a full if it was set get the height of that el and set the offset amount
// 		positions.push({x:xCord, y:yCord, type: type})
// 	 })
// 	 console.log('positions arr ', positions)
// 	function getNewYCord (idx: number) {
// 	//get prev block height and add the prev position height for new height
// 	const prevBlockHeight = blockElements[idx-1].props.style.height || defaultBlockWidth
// 	const prevBlockYCord = positions[idx - 1].y
	
// 	const newYCord = prevBlockHeight + prevBlockYCord
// 	return newYCord
// 	}

// 	blockPosition.current= positions
// 	setPositionIsReady(true)
// 	//remember to set blockpositions = to positions 
// }

























//test


export function generateBlockPositions ({blockElements, defaultBlockWidth, blockPosition, setPositionIsReady }:{
	blockElements: any;
	defaultBlockWidth: number;
	blockPosition: React.MutableRefObject<BlockPostionCords[]>;
	setPositionIsReady: React.Dispatch<React.SetStateAction<boolean>>;
}) {
console.log('blslsss',blockElements)
}
