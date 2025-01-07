import { View, Text } from "react-native"
import Block from "./BlockTypes/Block"
import { BlockPostionCords } from "../interfaces"
import { blocksStyles } from "@/app/styles/blockStyles"

export default {
    BlockName: 'calcal-calories-burned',
    BlockType: 'default', //only options are 'default' / 'full'
    BlockData: calcalCaloriesBurned
}

function calcalCaloriesBurned () {
  return (
      <View >
        <Text style={{color: 'white'}}>Calories Burned</Text>
      </View>
  )




}

// import { View, Text } from "react-native"
// import Block from "./BlockTypes/Block"
// import { BlockPostionCords } from "../interfaces"
// import { blocksStyles } from "@/app/styles/blockStyles"
// export default function (props: BlockPostionCords) {
//   const {x,y} = props
//   console.log(blocksStyles.defualtBlockChild)
//   return(
//     <Block key={'calcal-calories-burned'} style={{top:y, left:x}}>
//       <View style={{...blocksStyles.defualtBlockChild}}>
//         <Text style={{color: 'white'}}>Calories Burned</Text>
//       </View>
//     </Block>

//   )
  
// }

