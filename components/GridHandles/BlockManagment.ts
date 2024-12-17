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

export function buildEquippedBlocks( {blockElementsFunctionsRefMap,setBlockElements, blockPosition, positionsIsReady}:{
	blockElementsFunctionsRefMap: React.MutableRefObject<any>;
	setBlockElements: React.Dispatch<any>;
	blockPosition: React.MutableRefObject<BlockPostionCords[]>;
	positionsIsReady: boolean;
}) {
	const refValues = Object.values(blockElementsFunctionsRefMap.current)
	let blockElementsArray
	if (positionsIsReady){
		blockElementsArray = refValues.map((myComponents: any, index : number)=> myComponents.default(blockPosition.current[index]))
	}
	else{
		blockElementsArray = refValues.map((myComponents: any, index : number)=> myComponents.default({x:0, y:0}))
	}
	setBlockElements(blockElementsArray)
}

