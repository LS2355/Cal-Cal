//this will just be how the user set up the ui/ and our default settings

//block
let userInputBlockBGColor = false
let userInputBlockTextColor = false
let userInputBlockPadding = false
let userInputBlockBorderWidth = false
let userInputBlockBorderRadius = false
let userInputBlockBorderColor = false
let userInput = false

//grid
let userInputGridGap = false
let userInputGridBGcolor = 'black'
// let userInput = false
// let userInput = false
// let userInput = false
// let userInput = false
// let userInput = false
// let userInput = false
// let userInput = false



//grid options
const GridGap = 8 //how much gap do you want between each block
const GridBackgroundColor = 'black' 

const ConfigBlock = {
  BGColor : userInputBlockBGColor || 'grey',
  TextColor : userInputBlockTextColor || 'white',
  Padding : userInputBlockPadding || 9,
  BorderWidth: userInputBlockBorderWidth || 0,
  BorderRadius: userInputBlockBorderRadius || 16,
  BorderColor: userInputBlockBorderColor || false
}

const ConfigGrid = {
  GridGap : userInputGridGap || 8,
  GridBGColor: userInputGridBGcolor || 'black'
}








export {
  ConfigBlock,
  ConfigGrid
}