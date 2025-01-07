import { View, Text } from "react-native"
import BlockXL from "./BlockTypes/BlockXL"
import { blocksStyles } from "@/app/styles/blockStyles"

export default {
  BlockName: 'calcal-calories-consumed',
  BlockType: 'full',
  BlockData: calcalCaloriesConsumed
}

function calcalCaloriesConsumed() {
  return(
      <View >
        <Text style={{color: 'white'}}>Calories Consumed</Text>
      </View>
  )
}


// import { View, Text } from "react-native"
// import BlockXL from "./BlockTypes/BlockXL"
// export default function (props) {
//   const{x,y} = props
//   return(
//     <BlockXL key={'calcal-calories-consumed'} style={{top:y, left:x}}>
//       <View style={{justifyContent: 'center'}}>
//         <Text style={{color: 'white'}}>Calories Consumed</Text>
//       </View>
//     </BlockXL>
//   )
// }

