//rework this to fit my usecase

import React, {useRef, useState} from "react";
import {View} from "react-native";
import {useSharedValue} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import FocusPage from "./tabs/focus";
import NutritionPage from "./tabs/nutrition";
import PullDownTab from "@/modules/pullDownTab";

import { indexPageStyling } from "./styles/styles";
import WorkoutPage from "./tabs/workout";
import NutritionPageTest from "./tabs/nutrition-test";
import NewGridTest from "@/components/working grid/NewGridTest";





export default function index () {
  //toggle for being able to swipe to diffrent pages
  const PagerViewRef = useRef(null)
  const insets = useSafeAreaInsets();
  const tabDownHeight = useSharedValue(0)
  const [scrollIsEnabled, setScrollIsEnabled]= useState(true)


  function HandleDragStartOnGrid () {setScrollIsEnabled(false)}
  function HandleDragEndOnGrid () {setScrollIsEnabled(true)}

  return (  
    <View style={{...indexPageStyling.appContainer}}>
      <PullDownTab tabDownHeight={tabDownHeight}/>
      <PagerView 
      ref={PagerViewRef}
      style={{...indexPageStyling.pagerView, marginTop: insets.top}} 
      initialPage={1} 
      scrollEnabled={scrollIsEnabled}
      
      >
        <View key={0}>      
          <WorkoutPage insets={insets}/>  
        </View>
        <View key={1}>
          <FocusPage tabDownHeight={tabDownHeight}/>
        </View>
        <View key={2}>
          {/* <NewGridTest /> */}
          {/* <NutritionPageTest /> */}
          <NutritionPage />
          {/*HandleDragStartOnGrid={HandleDragStartOnGrid}*/}
          {/*HandleDragEndOnGrid={HandleDragEndOnGrid}*/}
          
        </View>
      </PagerView>
    </View>

  )
};
