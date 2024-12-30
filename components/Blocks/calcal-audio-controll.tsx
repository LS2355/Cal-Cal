import { View, Text } from "react-native"
import BlockXL from "./BlockTypes/BlockXL"
import { blocksStyles } from "@/app/styles/blockStyles"

export default {
  BlockName: 'calcal-audio-controll',
  BlockType: 'full',
  //if BlockType == full set the height
  BlockHeight: 200,
  BlockData: calcalAudioControll
}

function calcalAudioControll() {
  return(
      <View style={{...blocksStyles.defualtBlockChild}}>
        <Text style={{color: 'white'}}>audio-controll</Text>
      </View>
  )
}


// import { View, Text } from "react-native"
// import BlockXL from "./BlockTypes/BlockXL"
// export default function (props) {
//   const{x,y} = props
//   return(
//     <BlockXL key={'calcal-audio-controll'} style={{top:y, left:x}}>
//       <View style={{justifyContent: 'center'}}>
//         <Text style={{color: 'white'}}>audio-controll</Text>
//       </View>
//     </BlockXL>
//   )
// }

