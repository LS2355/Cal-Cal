// https://github.com/SHISME/react-native-draggable-grid/issues/84


import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';
import { DraggableGrid } from '../../components/draggable-gridls';

interface MyTestProps {

}

interface MyTestState {
  data:{key:string, name:string}[];
}

export function NutritionPage ({HandleDragStartOnGrid, HandleDragEndOnGrid}){
    const [BlockData, setBlockData] = useState({
      data:[
        {name:'1',key:'one', size:'full'},
        {name:'2',key:'two'},
        {name:'3',key:'three'},
        {name:'4',key:'four'},
        {name:'5',key:'five'},
        {name:'6',key:'six', size:'full'},
        {name:'7',key:'seven'},
        {name:'8',key:'eight'},
        {name:'9',key:'night'},
        {name:'0',key:'zero'},
        {name:'11',key:'1one'},
        {name:'12',key:'1two'},
        {name:'13',key:'1three'},
        {name:'14',key:'1four'},
        {name:'15',key:'1five'},
        {name:'16',key:'1six'},
        {name:'17',key:'1seven'},
        {name:'18',key:'1eight'},
        {name:'19',key:'1night'},
      ],
    })
    
  //content inside block
  function render_item(item:{name:string, key:string}) {
    console.log('render_item function: item', item)
    if (item.size == 'full'){return(
      <View
        style={styles.itemx2}
        key={item.key}
      >
        <Text style={styles.item_text}>{item.name}</Text>
      </View>)
    }
    else{
    return (
      <View
        style={styles.item}
        key={item.key}
      >
        <Text style={styles.item_text}>{item.name}</Text>
      </View>
    );}
  }



// make it so that when editing the screen i cant go over or under the content offset value or under
//also make it so that i cant swipe to a diffrent page when editing menu
    return (

      <ScrollView contentContainerStyle={styles.wrapper}>
        <DraggableGrid
          numColumns={2}
          renderItem={render_item}
          data={BlockData.data}
          onDragStart={HandleDragStartOnGrid}
          onDragRelease={(data) => {
            setBlockData({data});// need reset the props data sort after drag release
            HandleDragEndOnGrid()
          }}
          
        />
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  button:{
    width:150,
    height:100,
    backgroundColor:'blue',
  },
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




export default NutritionPage