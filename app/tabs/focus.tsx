import { View, Text, ScrollView, StyleSheet, Dimensions, Button, Vibration } from "react-native";
import { FocusPagePullDown } from "@/components/HandlePullDown";
import {focusPageStyling} from '../styles/styles'
import { SharedValue } from "react-native-reanimated";

export default function FocusPage ({tabDownHeight}: any) {
  console.log(tabDownHeight)
  const pullingDown = false
  const pullDistance = 0




/* 
next step is the adjustable grid

features 
we need a state to watch when edit mode is on or off 
we need to make a animations to show when the tiles can be dragged
look into how apple does there draggable tile feature
we need to be able to drag and drop the tiles into diffrenet positions 
i dont think i will actully be ablut to use a grid id just need to make it look like one in a flex box
it would need to be able to dynamicly adjust to the tile diffrent height sizes 

the width will only ever be half the screen or the full screen



*/

// drag and drop feature








  return (
    <ScrollView style={focusPageStyling.scrollView} onScrollEndDrag={(e)=>FocusPagePullDown(e, tabDownHeight)}>
      <View style={focusPageStyling.tileContainer}>
        <View style={focusPageStyling.tileSingleContainer}>
          <View style={focusPageStyling.tile}>
            <Text>single</Text>
          </View>
        </View>
        <View style={focusPageStyling.tileSingleContainer}>
          <View style={focusPageStyling.tile}>
            <Text>single 2</Text>
          </View>
        </View>
        <View style={focusPageStyling.tileDoubleContainer}>
          <View style={focusPageStyling.tile}>
            <Text>Long boi</Text>
          </View>
        </View>
        <View style={focusPageStyling.tileSingleContainer}>
          <View style={focusPageStyling.tile}>
            <Text>single</Text>
          </View>
        </View>
        <View style={focusPageStyling.tileSingleContainer}>
          <View style={focusPageStyling.tile}>
            <Text>single 2</Text>
          </View>
        </View>
                <View style={focusPageStyling.tileSingleContainer}>
          <View style={focusPageStyling.tile}>
            <Text>single</Text>
          </View>
        </View>
        <View style={focusPageStyling.tileSingleContainer}>
          <View style={focusPageStyling.tile}>
            <Text>single 2</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}