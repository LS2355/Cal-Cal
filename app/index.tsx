//rework this to fit my usecase

import React, { useCallback, useRef } from "react";
import { ListRenderItem, Text, View, FlatList, StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ItemHeight, ScreenHeight } from "./constants";
import { data } from "./data";
import { Item } from "./tabs/item";
import { TItem } from "./types/types";
import PagerView from "react-native-pager-view";


const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList<TItem>);
console.log('animatedFlatlist',AnimatedFlatlist)
const keyExtractor = (item: TItem) => item.name;
const getItemLayout = (_: any, index: number) => (
  { length: ItemHeight, offset: ItemHeight * index, index }
)

export default function index () {
  const ref = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);
  const maxScrollOffset = useDerivedValue(() =>
    (((insets.top + insets.bottom + data.length * (ItemHeight) + 100) - ScreenHeight)),
    [insets.top, insets.bottom]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });





  const renderItem: ListRenderItem<TItem> = useCallback(({ item, index }) => {
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
    
    <PagerView style={styles.pagerView} initialPage={1} onPageScroll={(e)=>{console.log('scrolled')}}>
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
      <View key={1}><Text>Page 2</Text></View>
      <View key={2}><Text>Page 3</Text></View>
    </PagerView>

  )
};


const styles = StyleSheet.create({
  safeAreaView:{
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pagerView: {
    flex: 1,
    backgroundColor: '#fffdde',
    alignSelf: "stretch"
  },
})


















// import { useEffect, useRef } from 'react';
// import { Animated, StyleSheet, View, ScrollView } from 'react-native';

// export default function App() {
//   const progress = useRef(new Animated.Value(0.5)).current; // useSharedValue(0)
//   const scale = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     // withTiming, withSpring

//     // withRepeat
//     Animated.loop(
//       Animated.parallel([
//         Animated.sequence([
//           Animated.spring(progress, { toValue: 1, useNativeDriver: true }),
//           Animated.spring(progress, { toValue: 0.5, useNativeDriver: true }),
//         ]),
//         Animated.sequence([
//           Animated.spring(scale, { toValue: 2, useNativeDriver: true }),
//           Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
//         ]),
//       ]),
//       { iterations: 3 }
//     ).start();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//       <Animated.View
//         style={[
//           styles.square,
//           {
//             borderRadius: /* progress.value * SIZE / 2 */ progress.interpolate({
//               inputRange: [0.5, 1],
//               outputRange: [SIZE / 4, SIZE / 2],
//             }),
//             // borderRadius: Animated.multiply(progress, SIZE / 2),
//             opacity: progress,
//             transform: [
//               { scale },
//               {
//                 rotate: /* progress.value * 2 * Math.PI */ `45deg`,
//               },
//               // {
//               //   rotate: Animated.multiply(progress, 2 * Math.PI),
//               // },
//             ],
//           },
//         ]}
//       /></ScrollView>
//     </View>
//   );
// }

// const SIZE = 100.0;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   square: {
//     width: SIZE,
//     height: SIZE,
//     backgroundColor: 'rgba(0,0,256,0.5)',
//   },
//   scroll: {
//     flex:1,
//     backgroundColor: 'purple'
//   }
// });

