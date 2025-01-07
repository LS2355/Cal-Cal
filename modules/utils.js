import {Dimensions} from 'react-native';

const COL = 2;
const ScreenDimensions= Dimensions.get('window')
export const MARGIN = 8;
export const ScreenWidth = ScreenDimensions.width
export const ScreenHeight = ScreenDimensions.height
export const SIZE = ScreenWidth / COL;
export const DefaultBlockSize = ScreenWidth / COL
export const XLBlockWidth = ScreenWidth


export const getPosition = (index) => {
  'worklet';
  return {
    x: (index % COL) * SIZE,  // 0 or 1 * Size
    y: Math.floor(index/ COL) * SIZE 
  }
}

export const getPositionCordsObj = (PositionsIndex, dataArray, redo = false) => {
  'worklet';
  if (redo)console.log('redo is active, dataArray:', dataArray)

  const positionsArr = []
  dataArray.forEach((block, index)=>{
    let xCord, yCord
    if (index == 0 ) {xCord = 0, yCord = 0}
    else{
      const prevPosition = positionsArr[index-1]
      const prevTypeIsFull = prevPosition.type === 'full' ? true : false
      const currTypeIsFull = block.BlockType === 'full' ? true : false
      if(prevPosition.x === DefaultBlockSize) {

        /*
        current issue

        full block and half block dont swap positions 
        full custom block and full block dont swap positions
          before they did but it wouldnt subtract the diffrence of the defaultHeight and the custom block height
      
      
        */
        xCord = 0
        if (prevPosition.y < positionsArr[index-2].y){        console.log('%cthis is where it broke' , 'color: tan', index)
          const prevprevBlock = positionsArr[index-2]
        console.log('prevprevBlock:', prevprevBlock)
          yCord = prevprevBlock.y + (prevprevBlock.customBlockHeight ? prevprevBlock.customBlockHeight : DefaultBlockSize)
        }
        else{
        yCord = prevPosition.y + (prevPosition.customBlockHeight ? prevPosition.customBlockHeight : 0)
        }
      }
      else if(prevPosition.x == 0 && !prevTypeIsFull && !currTypeIsFull){
        xCord = DefaultBlockSize
        yCord = prevPosition.y
      }
      else if(prevPosition.x == 0 && prevTypeIsFull) {
        if(currTypeIsFull) {
          xCord = 0
          yCord = prevPosition.y + (prevPosition.customBlockHeight ? prevPosition.customBlockHeight : DefaultBlockSize)
        }
        else{
          let tempIdx = index - 1
          while(positionsArr[tempIdx].type == 'full'){
            tempIdx -= 1
          }
          if(positionsArr[tempIdx].x == 0) {
            xCord = DefaultBlockSize 
            yCord = positionsArr[tempIdx].y
          }
          else{
            xCord = 0
            yCord = prevPosition.y + (prevPosition.customBlockHeight ? prevPosition.customBlockHeight : DefaultBlockSize)
          }
        }
      }
      else{
        xCord = 0
        yCord = prevPosition.y + (prevPosition.customBlockHeight? prevPosition.customBlockHeight: DefaultBlockSize)
      }
    }
    positionsArr[index] = {
      blockId: block.BlockName,
      x: xCord,
      y: yCord,
      type: block.BlockType,
      customBlockHeight: block.BlockHeight? block.BlockHeight : false,
    }
    
  })
  console.log('PositionsArr ------------------:', positionsArr)
  return positionsArr
}



export const getOrder = (x,y) => {
  'worklet';
  const row = Math.round(y / SIZE);
  const col = Math.round(x / SIZE);
  return row * COL + col;
}


export function getClosestBlock(x, y, PositionCordsObj, id) {
  'worklet';
  try {
    const TargetCurrTypeIsFull = PositionCordsObj[id].type == 'full';
    const TargetBlockWidth = TargetCurrTypeIsFull ? XLBlockWidth : DefaultBlockSize;
    const TargetBlockHeight = PositionCordsObj[id].customBlockHeight ? PositionCordsObj[id].customBlockHeight : DefaultBlockSize;
    const TargetCenterOfBlockX = x + TargetBlockWidth / 2;
    const TargetCenterOfBlockY = y + TargetBlockHeight / 2;
    
    let closestBlockId = null;
    let minDistance = Infinity;
    
    PositionCordsObj.forEach((block, index) => {     
      const currTypeIsFull = block.type == 'full';
      const blockWidth = currTypeIsFull ? XLBlockWidth : DefaultBlockSize;
      const blockHeight = block.customBlockHeight ? block.customBlockHeight : DefaultBlockSize;
      const CenterOfBlockX = block.x + blockWidth / 2;
      const CenterOfBlockY = block.y + blockHeight / 2;
      
      const distance = Math.sqrt((CenterOfBlockX - TargetCenterOfBlockX) ** 2 + (CenterOfBlockY - TargetCenterOfBlockY) ** 2);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestBlockId = index;
      }
    });
    
    return closestBlockId;
  } catch (error) {
    console.error('Error in getClosestBlock:', error);
    return null;
  }
}


function remakePosition (PositionCordsObj, newDataArr) {
  'worklet';
  console.log('remakePosition Ran')
  const newArray = [];
  PositionCordsObj.forEach((obj) => {
    let blockFound = false
    for (let i = 0; i < newDataArr.length && !blockFound; i++) {
      if (newDataArr[i].BlockName == obj.blockId){
        newArray.push(newDataArr[i])
        blockFound = true
      }
    }
  })
  const newPositionCordsObj = getPositionCordsObj(null, newArray, true)
  return newPositionCordsObj
}


export const GetOrder = (x, y, PositionCordsObj, id, newDataArr) => {
  'worklet';
  try {
    console.log('GetOrder called with:', { x, y, id, PositionCordsObj });
    const closestBlockId = getClosestBlock(x, y, PositionCordsObj, id);
    console.log('Closest block:', closestBlockId)

    if (id === closestBlockId) return PositionCordsObj

    const  newPositions = [...PositionCordsObj]
    console.log('%c newPositions:', 'color: green', newPositions)

    // swapPositions(PositionCordsObj, id , closestBlockId)

    // swap the positions of the id block and closestBlock
    // if the blocks' types are different then we will remake the list 
    if (newPositions[id].type == newPositions[closestBlockId].type) {
      console.log('%c this is where i am checking', 'color: blue', newPositions[id].type, newPositions[closestBlockId].customBlockHeight, newPositions[id].customBlockHeight)
        if (newPositions[id].type == 'full' && (newPositions[id].customBlockHeight || newPositions[closestBlockId].customBlockHeight)) { // if they are both full and even one has a custom height then we will have to remake the list
            const te =  remakePosition(newPositions, newDataArr); 
            console.log('tehe ran 1')
            return te
        } else {
            // we are just going to swap the x and y cords
            console.log('Before Swap:', JSON.stringify(newPositions));

            let tempX = newPositions[closestBlockId].x;
            let tempY = newPositions[closestBlockId].y;

            newPositions[closestBlockId].x = newPositions[id].x;
            newPositions[closestBlockId].y = newPositions[id].y;

            newPositions[id].x = tempX;
            newPositions[id].y = tempY;

            console.log('After Swap:', JSON.stringify(PositionCordsObj));
        }
    } else {
                    const te =  remakePosition(newPositions, newDataArr);
            console.log('tehe ran')
            return te
    }
    console.log('%cThis is a red text', 'color: red');
    console.log(`%c ClosestBlockId: ${closestBlockId}, id: ${id}`, 'color: yellow', 'New Positions:', PositionCordsObj);
    // if they are the same then we will just swap the positions
    // BUT if they are both full we have to check if any of them have a custom height
    console.log('New Positions:', PositionCordsObj);
    console.log('%c newPositions:', 'color: pink', newPositions)
    return newPositions

  } catch (error) {
    console.error('Error in GetOrder:', error);
  }
};






export const getGridHeight = (PositionsCordsObj) => {
  let HeighestYCord = 0
  let lastBlockHeight = DefaultBlockSize


  PositionsCordsObj.forEach((obj)=>{
    if (obj.y > HeighestYCord) {
      HeighestYCord = obj.y;
      if(obj.BlockHeight)lastBlockHeight = obj.BlockHeight
    }
  })
  
  return HeighestYCord + lastBlockHeight
}