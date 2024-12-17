import { View, Text } from "react-native"
import Block from "./BlockTypes/Block"
import { blocksStyles } from "@/app/styles/blockStyles"
export default function (props) {
  const{x,y} = props
  return(
    <Block key={'calcal-macros'} style={{top:y, left:x}}>
      <View style={{...blocksStyles.defualtBlockChild}}>
        <Text style={{color: 'white'}}>Macros</Text>
      </View>
    </Block>
  )
}

