export function generateBlockPositions ({blockElements, defaultBlockWidth, blockPosition, setPositionIsReady }:{
  blockElements: any;
  defaultBlockWidth: number;
  blockPosition: React.MutableRefObject<BlockPostionCords[]>;
  setPositionIsReady: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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