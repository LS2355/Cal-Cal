import { View, Text } from "react-native"
import Block from "./BlockTypes/Block"
import { blocksStyles } from "@/app/styles/blockStyles"
export default {
  BlockName: 'calcal-macros',
  BlockType: 'default',
  BlockData: calcalMacros
}

function calcalMacros() {
  return(
      <View >
        <Text style={{color: 'white'}}>Macros</Text>
      </View>
  )
}


// import { View, Text } from "react-native"
// import Block from "./BlockTypes/Block"
// export default function (props) {
//   const{x,y} = props
//   return(
//     <Block key={'calcal-macros'} style={{top:y, left:x}}>
//       <View style={{justifyContent: 'center'}}>
//         <Text style={{color: 'white'}}>Macros</Text>
//       </View>
//     </Block>
//   )
// }

