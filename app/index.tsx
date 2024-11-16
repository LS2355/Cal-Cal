//rework this to fit my usecase

import React, { useCallback, useRef } from "react";
import { Text, View, FlatList,} from "react-native";
import Animated, {useAnimatedScrollHandler, useDerivedValue, useSharedValue} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ItemHeight, ScreenHeight } from "./constants";
import { data } from "./data";
import { Item } from "./tabs/item";
import PagerView from "react-native-pager-view";
import FocusPage from "./tabs/focus";
import NutritionPage from "./tabs/nutrition";
import PullDownTab from "@/modules/pullDownTab";

import { indexPageStyling } from "./styles/styles";

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const keyExtractor = (item: any) => item.name;
const getItemLayout = (_: any, index: number) => (
  { length: ItemHeight, offset: ItemHeight * index, index }
)



export default function index () {
  const insets = useSafeAreaInsets();
  const ref = useRef<FlatList>(null);
  const scrollOffset = useSharedValue(0);
  const maxScrollOffset = useDerivedValue(() =>
    (((insets.top + insets.bottom + data.length * (ItemHeight) + 100) - ScreenHeight)),
    [insets.top, insets.bottom]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });
  const tabDownHeight = useSharedValue(0)

  // function expandPullDownTab () {
  //   tabDownHeight.value = withSpring(tabDownHeight.value + 50)
  //   console.log('expand')
  // }


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
    <View style={{...indexPageStyling.appContainer}}>
      <PullDownTab tabDownHeight={tabDownHeight}/>
      <PagerView style={{...indexPageStyling.pagerView, marginTop: insets.top}} initialPage={1} onPageScroll={(e)=>{console.log('scrolled')}}>
        <View key={0}>      
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
        </View>
        <View key={1}>
          <FocusPage tabDownHeight={tabDownHeight}/>
        </View>
        <View key={2}><NutritionPage/></View>
      </PagerView>
    </View>

  )
};
