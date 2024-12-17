import { View, Text } from "react-native"
import BlockXL from "./BlockTypes/BlockXL"
import { blocksStyles } from "@/app/styles/blockStyles"
export default function (props) {
  const{x,y} = props
  return(
    <BlockXL key={'calcal-audio-controll'} style={{top:y, left:x}}>
      <View style={{...blocksStyles.defualtBlockChild}}>
        <Text style={{color: 'white'}}>audio-controll</Text>
      </View>
    </BlockXL>
  )
}

