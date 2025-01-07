import {View, Text, StyleSheet} from 'react-native'
import {PanGestureHandler} from 'react-native-gesture-handler'
import Animated, {useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, useAnimatedReaction, withTiming} from 'react-native-reanimated'
import {MARGIN, getPosition, getOrder, GetOrder, DefaultBlockSize, XLBlockWidth, getPositionCordsObj} from './utils'
function Draggable ({children, positionCords, positionIndexArr, id, type, height, newDataArr}) {




//steps for tomarrow 
 //1. fix getPositions
 //2. fix getOrder
 //3. fix ZUseAnimatedReactions





  // const position = getPosition(positions.value[id])
  // console.log('position', position)
  const position = positionCords.value[id]
  console.log('id', id,'pos', position)

  const translateX = useSharedValue(position.x + MARGIN)
  const translateY = useSharedValue(position.y + MARGIN)

  const isGestureActive = useSharedValue(false)

  // useAnimatedReaction(()=> positionCords.value[id], newOrder => {
  //   console.log('wtfisit', newOrder)
  //   const newPositions = getPosition(newOrder);
  //   translateX.value = withTiming(newPositions.x);
  //   translateY.value = withTiming(newPositions.y);
  // } )

  useAnimatedReaction(()=> positionCords.value[id], newOrder =>{
    //look like i need to get its new resting positions
    translateX.value = withTiming(positionCords.value[id].x)
    translateY.value = withTiming(positionCords.value[id].y)

  })


  const panGesture = useAnimatedGestureHandler({
    onStart:(_, context)=>{
      context.startX = translateX.value;
      context.startY = translateY.value; 
      isGestureActive.value = true;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;

      // const oldOrder = positionCords.value[id]; //get current block position cords
      // const newOrder = getOrder(translateX.value, translateY.value) // get the new order
      const newOrder = GetOrder(translateX.value, translateY.value, positionCords.value, id, newDataArr)
      console.log('newOrder', newOrder)
      positionCords.value = newOrder
      // if (oldOrder !== newOrder){
      //   const idToSwap = positionCords.value.find(key => positionCords.value[key] === newOrder)
      //   console.log(idToSwap)
      //   if (idToSwap) {
      //     const newPositions = JSON.parse(JSON.stringify(positionCords.value))
      //     newPositions[id] = newOrder;
      //     newPositions[idToSwap] = oldOrder;
      //     positionCords.value = newPositions;
      //   }
      // }
    },
    onEnd: ()=> {
      const {x,y} = positionCords.value[id]
      translateX.value = withTiming(x)
      translateY.value = withTiming(y)
      console.log('there translate values', positionCords.value[id], positionCords.value[3])
    },
    onFinish:()=> {
      isGestureActive.value = false
    }
  })

  //styles
  const animatedStyle = useAnimatedStyle(()=>{
    const zIndex = isGestureActive.value ? 50: 1; 
    const scale = isGestureActive.value ? 1.1 : 1;
    const width = ((type == 'full' ? XLBlockWidth : DefaultBlockSize )- MARGIN) 
    height = ((height || DefaultBlockSize)-MARGIN)
    return {

      // margin: MARGIN * 2,

      width,
      height,
      zIndex,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale},
      ]
    }
  })

  return (
    <Animated.View style={[animatedStyle, styles.DraggableElWrapper]}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>
          {children}
        </Animated.View> 
      </PanGestureHandler>
    </Animated.View>
  )
}


export default Draggable


const styles = StyleSheet.create({
  DraggableElWrapper : {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'grey',
    padding: 8
  }
})