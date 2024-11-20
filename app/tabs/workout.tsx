import { View, Text, FlatList } from "react-native";
import { data } from "../data";
import { ItemHeight, ScreenHeight } from "../constants";
import React, { useCallback, useRef, useState} from "react";
import Animated, {useAnimatedScrollHandler, useDerivedValue, useSharedValue} from "react-native-reanimated";
import { Item } from "../tabs/item";




const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const keyExtractor = (item: any) => item.name;
const getItemLayout = (_: any, index: number) => (
  { length: ItemHeight, offset: ItemHeight * index, index }
)

export default function WorkoutPage ({insets}) {
  const scrollOffset = useSharedValue(0);
  const ref = useRef<FlatList>(null);
  const maxScrollOffset = useDerivedValue(() =>
    (((insets.top + insets.bottom + data.length * (ItemHeight) + 100) - ScreenHeight)),
    [insets.top, insets.bottom]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });






  const renderItem = useCallback(({ item, index }: any) => {
    return (
      <Item
        numItems={data.length}
        maxScrollOffset={maxScrollOffset}
        scrollOffset={scrollOffset}
        item={item}
        index={index}
      />
    );
  }, []);



  return (
    <AnimatedFlatlist
    onScroll={onScroll}
    scrollEventThrottle={16}
    contentContainerStyle={[
      {
        paddingBottom: insets.bottom,
        paddingTop: insets.top + 20,
        paddingHorizontal: 16,
      }
    ]}
    ref={ref}
    initialNumToRender={Math.round(ScreenHeight / 40)}
    getItemLayout={getItemLayout}
    data={data}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    />
  );
}