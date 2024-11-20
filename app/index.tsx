//rework this to fit my usecase

import React, {useRef} from "react";
import {View} from "react-native";
import {useSharedValue} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import FocusPage from "./tabs/focus";
import NutritionPage from "./tabs/nutrition";
import PullDownTab from "@/modules/pullDownTab";

import { indexPageStyling } from "./styles/styles";
import WorkoutPage from "./tabs/workout";





export default function index () {
  //toggle for being able to swipe to diffrent pages
  const PagerViewRef = useRef(null)
  const insets = useSafeAreaInsets();
  const tabDownHeight = useSharedValue(0)


  function HandleDragStartOnGrid () {
    if (PagerViewRef.current) {PagerViewRef.current.setNativeProps({scrollEnabled:false});
    }
  }
  function HandleDragEndOnGrid () {
    if (PagerViewRef.current) {PagerViewRef.current.setNativeProps({scrollEnabled:true});
    }
  }




  return (  
    <View style={{...indexPageStyling.appContainer}}>
      <PullDownTab tabDownHeight={tabDownHeight}/>
      <PagerView 
      ref={PagerViewRef}
      style={{...indexPageStyling.pagerView, marginTop: insets.top}} 
      initialPage={1} 
      onPageScroll={(e)=>{console.log('scrolled')}}
      >
        <View key={0}>      
          <WorkoutPage insets={insets}/>  
        </View>
        <View key={1}>
          <FocusPage tabDownHeight={tabDownHeight}/>
        </View>
        <View key={2}>
          <NutritionPage 
          HandleDragStartOnGrid={HandleDragStartOnGrid}
          HandleDragEndOnGrid={HandleDragEndOnGrid}
          />
        </View>
      </PagerView>
    </View>

  )
};
