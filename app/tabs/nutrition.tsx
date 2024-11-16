



import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { DraggableGrid } from 'react-native-draggable-grid';

// interface MyTestProps {

// }

// interface MyTestState {
//   data:{key:string, name:string}[];
// }

// export default class NutritionPage extends React.Component<MyTestProps, MyTestState>{

//   constructor(props:MyTestProps) {
//     super(props);
//     this.state = {
//       data:[
//         {name:'1',key:'one'},
//         {name:'2',key:'two'},
//         {name:'3',key:'three'},
//         {name:'4',key:'four'},
//         {name:'5',key:'five'},
//         {name:'6',key:'six'},
//         {name:'7',key:'seven'},
//         {name:'8',key:'eight'},
//         {name:'9',key:'night'},
//         {name:'0',key:'zero'},
//       ],
//     };
//   }

//   public render_item(item:{name:string, key:string}) {
//     return (
//       <View
//         style={styles.item}
//         key={item.key}
//       >
//         <Text style={styles.item_text}>{item.name}</Text>
//       </View>
//     );
//   }

//   render() {
//     return (
//       <View style={styles.wrapper}>
//         <DraggableGrid
//           numColumns={4}
//           renderItem={this.render_item}
//           data={this.state.data}
//           onDragRelease={(data) => {
//             this.setState({data});// need reset the props data sort after drag release
//           }}
//         />
//       </View>
//     );
//   }
// }








interface MyTestProps {}
interface MyTestState {
  data: {key: string, name: string}[];
}

const NutritionPage = (props) => {
  const [data, setData] = useState<any>([

    {name:'1',key:'one'},
    {name:'2',key:'two'},
    {name:'3',key:'three'},
    {name:'4',key:'four'},
    {name:'5',key:'five'},
    {name:'6',key:'six'},
    {name:'7',key:'seven'},
    {name:'8',key:'eight'},
    {name:'9',key:'night'},
    {name:'0',key:'zero'},
  ])
  function RenderItem (item:{name:string, key:string}) {
    return(
    <View style={styles.item} key={item.key}>
      <Text style={styles.item_text}>{item.name}</Text>
    </View>      
    )
  }
  return (
    <View style={styles.wrapper}>
      <DraggableGrid
      numColumns={4}
      renderItem={RenderItem}
      data={data}
      onDragging={(data)=>setData({data})}/>
    </View>
  )
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
    height:'100%',
    justifyContent:'center',
  },
  item:{
    width:100,
    height:100,
    borderRadius:8,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
  },
  item_text:{
    fontSize:40,
    color:'#FFFFFF',
  },
});








// repo baseing the grid off of: https://github.com/SHISME/react-native-draggable-grid















// import { Text, View, Animated, PanResponder, StyleSheet} from "react-native";
// import {useState} from 'react'
// import {DraggableGrid} from 'react-native-draggable-grid'

// interface MyTestProps {}
// interface MyTestState {
//   data: {key: string, name: string}[];
// }

// export default function NutritionPage () {
//   const [data, setData] = useState<any>([
//     {name:'1',key:'one'},
//     {name:'2',key:'two'},
//     {name:'3',key:'three'},
//     {name:'4',key:'four'},
//     {name:'5',key:'five'},
//     {name:'6',key:'six'},
//     {name:'7',key:'seven'},
//     {name:'8',key:'eight'},
//     {name:'9',key:'night'},
//     {name:'0',key:'zero'},
//   ])
//   function RenderItem (item:{name:string, key:string}) {
//     return(
//     <View style={styles.item} key={item.key}>
//       <Text style={styles.item_text}>{item.name}</Text>
//     </View>      
//     )
//   }
//   return (
//     <View style={styles.wrapper}>
//       <DraggableGrid
//       numColumns={4}
//       renderItem={RenderItem}
//       data={data}
//       onDragging={(madata)=>setData({madata})}/>
//     </View>
//   )
// }




// const styles = StyleSheet.create({
//   button:{
//     width:150,
//     height:100,
//     backgroundColor:'blue',
//   },
//   wrapper:{
//     paddingTop:100,
//     width:'100%',
//     height:'100%',
//     justifyContent:'center',
//   },
//   item:{
//     width:100,
//     height:100,
//     borderRadius:8,
//     backgroundColor:'red',
//     justifyContent:'center',
//     alignItems:'center',
//   },
//   item_text:{
//     fontSize:40,
//     color:'#FFFFFF',
//   },
// });




//drag and drop test

// const DraggableComponent = () =>{
//   const [pan, setPan] = useState(new Animated.ValueXY());

// const PanResponda = PanResponder.create({
//   onStartShouldSetPanResponder: () => true,
//   onPanResponderGrant: () => {
//     pan.setOffset({
//       x: pan.x._value,
//       y: pan.y._value
//     });
//     pan.setValue({x: 0, y: 0})
//   },
//   onPanResponderMove: Animated.event(
//     [null, {dx: pan.x, dy: pan.y}],
//     {useNativeDriver: false}
//   ),
//   onPanResponderRelease: ()=>pan.flattenOffset

// })
// return(
//   <Animated.View style={[pan.getLayout(), styles.draggable]} {...PanResponda.panHandlers}>
//   </Animated.View>
// )
// }


// export default function NutritionPage () {
//   return (
//     <View style={styles.container}>
//       {/* Other components */}
//       <DraggableComponent />
//       {/* Other components */}
//     </View>
//   );
 
// }



// const styles = {

//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   draggable: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'blue',
//   },
// };


export default NutritionPage