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

export const getPositionCordsObj = (PositionsIndex, dataArray) => {
  'worklet';
  const positionsArr = []
  dataArray.forEach((block, index)=>{
    let xCord, yCord
    if (index == 0 ) {xCord = 0, yCord = 0}
    else{
      const prevPosition = positionsArr[index-1]
      const prevTypeIsFull = prevPosition.type === 'full' ? true : false
      const currTypeIsFull = block.BlockType === 'full' ? true : false
      if(prevPosition.x === DefaultBlockSize) {
        xCord = 0
        yCord = prevPosition.y + (prevPosition.customBlockHeight ? prevPosition.customBlockHeight : 0)
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
      x: xCord,
      y: yCord,
      type: block.BlockType,
      customBlockHeight: block.BlockHeight? block.BlockHeight : false,
    }
    
  })
  
  return positionsArr
}

const getSinglePosition = () => {
  
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
      console.log('Distance:', distance, 'Block:', block);
      
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



function resortPositionsArr (PosArr, startIndex, endIndex , partnerIndex, partnerdWith) {
  'worklet';

  function BumpDownOtherIndexs(start, end, fullBlockPartner){
    let tempBlock
    
    for (let i = start; i > end; i--){
      tempBlock = PosArr[i-1]
      if (i == start){
        PosArr[i-1] = fullBlockPartner
      }
      else{
      PosArr[i-1] = PosArr[i]
      }
    } 
  }
  if(partnerdWith == 'first'){
    if(partnerIndex < startIndex){ //if the partner is on the left side
      const tempEndBlockPartner = PosArr[endIndex - 1]
      const tempPartnerBlock = PosArr[partnerIndex]
      PosArr[partnerIndex] = PosArr[endIndex]
      PosArr[endIndex] = PosArr[startIndex]
      PosArr[endIndex-1] = tempPartnerBlock

      //from here we loop till we get to the startIndex
      BumpDownOtherIndexs(endIndex - 1, startIndex, tempEndBlockPartner)
    }else{
      const tempEndBlockPartner = PosArr[endIndex - 1]
      const tempEndBlock = PosArr[endIndex]
      PosArr[endIndex] = PosArr[startIndex]
      PosArr[endIndex - 1] = PosArr[partnerIndex]
      PosArr[startIndex] = tempEndBlock
      BumpDownOtherIndexs(endIndex - 1, startIndex, tempEndBlockPartner)
    }

    let currIdx = endIndex;
    while(currIdx != startIndex){
      
    }
  }
  else{
    if(partnerIndex < startIndex){ //if the partner is on the left side
      const tempEndBlockPartner = PosArr[endIndex + 1]
      const tempPartnerBlock = PosArr[partnerIndex]
      PosArr[partnerIndex] = PosArr[endIndex]
      PosArr[endIndex] = PosArr[startIndex]
      PosArr[endIndex+1] = tempPartnerBlock

      //from here we loop till we get to the startIndex
      BumpDownOtherIndexs(endIndex + 1, startIndex, tempEndBlockPartner)
    }else{
      const tempEndBlockPartner = PosArr[endIndex + 1]
      const tempEndBlock = PosArr[endIndex]
      PosArr[endIndex] = PosArr[startIndex]
      PosArr[endIndex + 1] = PosArr[partnerIndex]
      PosArr[startIndex] = tempEndBlock
      BumpDownOtherIndexs(endIndex + 1, startIndex, tempEndBlockPartner)
    }
  }

}


const SwapPositions = (PositionCordsObj, id1, id2, customHeight = false) => {
  'worklet';
  
  //which block comes first in position
  let firstBlockId
  let secondBlockId
  let temp;
  let temp2;
  // sets temp variables by order
  if (PositionCordsObj[id1].y < PositionCordsObj[id2].y) {
    temp = PositionCordsObj[id1];
    temp2 = PositionCordsObj[id2];
    firstBlockId = id1
    secondBlockId = id2
  }
  else{
    temp = PositionCordsObj[id2];
    temp2 = PositionCordsObj[id1];
    firstBlockId = id2
    secondBlockId = id1
  }



 //this works if they are the same type 
  if (PositionCordsObj[id1].type == PositionCordsObj[id2].type) {
    temp.x = PositionCordsObj[secondBlockId].x;
    temp.y = PositionCordsObj[secondBlockId].y;
    
    temp2.x = PositionCordsObj[firstBlockId].x;
    temp2.y = PositionCordsObj[firstBlockId].y;

    PositionCordsObj[firstBlockId] = temp2
    PositionCordsObj[secondBlockId] = temp   
  }

  //this is from a regular full block to a default block
  if (PositionCordsObj[firstBlockId].type !== PositionCordsObj[secondBlockId].type) {
    let closestBlockPartnerId = null;
    let partnerdWith = null; //this is the block that is next to the other default block
    if (PositionCordsObj[firstBlockId].type == 'full') {
      partnerdWith = 'second'
      //this mean the second block is the default block and we have to check if that one is the left or the right block
      if(PositionCordsObj[secondBlockId].x >= DefaultBlockSize){
        closestBlockPartnerId = secondBlockId - 1;
      }else{
        closestBlockPartnerId = secondBlockId + 1;
      }
    }else{
      partnerdWith = 'first'
      //we have to check if the first block is the left or the right one
      if(PositionCordsObj[firstBlockId].x >= DefaultBlockSize){
        closestBlockPartnerId = firstBlockId - 1;
      }else{
        closestBlockPartnerId = firstBlockId + 1;
      }
    }
    //this is the actual swap
    const tempPartner = PositionCordsObj[closestBlockPartnerId];
    if(partnerdWith == 'first'){
      resortPositionsArr(PositionCordsObj, firstBlockId, secondBlockId, closestBlockPartnerId, partnerdWith)
      temp.y = PositionCordsObj[secondBlockId].y;
      tempPartner.y = PositionCordsObj[secondBlockId].y;
      temp2.y = PositionCordsObj[firstBlockId].y;
      //what block is on the left side
      temp2.x = closestBlockPartnerId < secondBlockId ? PositionCordsObj[closestBlockPartnerId].x : PositionCordsObj[secondBlockId].x
      
    }else{
      resortPositionsArr(PositionCordsObj, firstBlockId, secondBlockId, closestBlockPartnerId, partnerdWith)
      temp.y = PositionCordsObj[secondBlockId].y
      temp.x = 0
      temp2.y = PositionCordsObj[firstBlockId].y
      tempPartner.y = PositionCordsObj[firstBlockId].y
      PositionCordsObj[firstBlockId] = temp2
    }
    





  }


  //if blocks have a cutom height 
  if(customHeight){ // look at custom height if one is xl and one is default 
    const DifferenceInHeight = (temp.customBlockHeight || DefaultBlockSize) - (temp2.customBlockHeight || DefaultBlockSize)
    for (let i = firstBlockId + 1; i >= secondBlockId; i++){
      PositionCordsObj[i].y += DifferenceInHeight;
    }
  }

  return PositionCordsObj;
}

export const GetOrder = (x, y, PositionCordsObj, id) => {
  'worklet';
  try {
    console.log('GetOrder called with:', { x, y, id, PositionCordsObj });
    const closestBlockId = getClosestBlock(x, y, PositionCordsObj, id);
    console.log('Closest block:', closestBlockId);

    // If the closest block is the same as the current block, return the current position
    if (closestBlockId === id || closestBlockId == null) return PositionCordsObj
    const currBlock = PositionCordsObj[id];
    const closestBlock = PositionCordsObj[closestBlockId];

    SwapPositions(PositionCordsObj, id, closestBlockId, currBlock.customBlockHeight || closestBlock.customBlockHeight);


      return PositionCordsObj;
    




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