import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';
import { DraggableGrid } from '../../components/draggable-gridls';
import DragGrid from '@/components/homemade-grid';

export function NutritionPageTest (){
    
    
    

// make it so that when editing the screen i cant go over or under the content offset value or under
// also make it so that i cant swipe to a diffrent page when editing menu
    return (

      <ScrollView contentContainerStyle={styles.wrapper}>
        <DragGrid></DragGrid>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  wrapper:{
    paddingTop:100,
    width:'100%',
    justifyContent:'center',
  },
  item:{
    width:200,
    height:200,
    borderRadius:8,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
  },
  itemx2:{
    width:400,
    height: 200,
    borderRadius: 8,
    backgroundColor: 'blue',
    opacity:.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item_text:{
    fontSize:40,
    color:'#FFFFFF',
  },
});




export default NutritionPageTest