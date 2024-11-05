import React from "react";
import { Text, View, Image, StyleSheet } from "react-native"
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"
import * as constants from "../constants"
import { TItem } from "../types/types";


//types
type Props = {
  item: TItem;
  index: number;
  scrollOffset: SharedValue<number>;
  maxScrollOffset: SharedValue<number>;
  numItems: number;
}


export const Item = ({ item, index, scrollOffset, maxScrollOffset, numItems }: Props) => {
  const animatedElasticStyles = useAnimatedStyle(() => ({ //animated style for the items
    transform: [{
      translateY: interpolate(
        scrollOffset.value,
        [-15, 0, maxScrollOffset.value, maxScrollOffset.value + 15],
        [index * 2, 0, 0, (index - numItems - 1) * 2],
        Extrapolation.EXTEND
      )
    }]
  }))

  return ( //this is the indevisual items
    <Animated.View
      key={item.name}
      style={[
        animatedElasticStyles,
        styles.wrapper,
        { height: constants.ItemHeight, backgroundColor: item.color }
      ]}>
      <View style={styles.container}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
    </Animated.View>
  )
}

// styling
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center"
  },
  container: {
    width: '100%', height: 80, flexDirection: "row", alignItems: "center"
  },
  name: { fontWeight: "600", fontSize: 17, marginBottom: 6 },
})