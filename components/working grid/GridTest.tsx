// import React,{createRef, useState} from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   Image,
//   Dimensions,
//   SafeAreaView
// } from 'react-native';
// import AnySizeDragSortableView from './AnySizeDragSortableView'

// const {width} = Dimensions.get('window')
// const headerViewHeight = 160
// const bottomViewHeight = 40

// const getW = (index, isWidth) => isWidth ? index % 3 === 0 ? (width - 40) : (width - 60) / 2 : 80;
// // const getW = (index, isWidth) => 120 + Math.floor((Math.random() - 0.5) * 100);
// // const getW = (index, isWidth) => 150;

// function GridT () {
//   const tempdata = ['1','2','3','4','5','6','7','8','9','10']
//   const [items, setItems] = useState({items})
//   const sortableViewRef = createRef()

//   function DeleteItem (item, index) {
//     const Myitems = [...items]
//     Myitems.splice(index, 1)
//     setItems(Myitems)
//   }

//   function renderItem (item, index, isMoved) {
//     const {movedKey} = i
//   }
  


import React, { useState, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Dimensions,
  SafeAreaView
} from 'react-native';
import AnySizeDragSortableView from './AnySizeDragSortableView';

const { width } = Dimensions.get('window');
const headerViewHeight = 160;
const bottomViewHeight = 40;

const getW = (index, isWidth) => isWidth ? index % 3 === 0 ? (width - 40) : (width - 60) / 2 : 80;

const GridT = () => {
  const sortableViewRef = useRef(null);

  const initialItems = Array.from({ length: 26 }, (_, i) => ({
    text: String.fromCharCode(65 + i),
    width: getW(i, true),
    height: getW(i, false)
  }));

  const [items, setItems] = useState(initialItems);
  const [movedKey, setMovedKey] = useState(null);

  const onDeleteItem = (item, index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const _renderItem = (item, index, isMoved) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          setMovedKey(item.text);
          sortableViewRef.current.startTouch(item, index);
        }}
        onPressOut={() => sortableViewRef.current.onPressOut()}
      >
        <View style={[styles.item_wrap, { opacity: (movedKey === item.text && !isMoved) ? 1 : 1 }]}>
          <View style={styles.item_clear_wrap}>
            <TouchableOpacity onPress={() => onDeleteItem(item, index)}>
              <Image source={require('./imgs/clear.png')} style={styles.item_clear} />
            </TouchableOpacity>
          </View>
          <View style={[styles.item, { width: item.width, height: item.height, backgroundColor: isMoved ? 'red' : '#f39c12' }]}>
            {isMoved ? (
              <View style={styles.item_icon_swipe}>
                <Image source={require('./imgs/animal1.png')} style={styles.item_icon} />
              </View>
            ) : null}
            <View style={styles.item_text_swipe}>
              <Text style={styles.item_text}>{item.text}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <AnySizeDragSortableView
      ref={sortableViewRef}
      dataSource={items}
      keyExtractor={(item) => item.text}
      renderItem={_renderItem}
      onDataChange={(data, callback) => {
        setItems(data);
        callback();
      }}
      headerViewHeight={headerViewHeight}
      movedWrapStyle={styles.item_moved}
      onDragEnd={() => setMovedKey(null)}
    />
  );
};

export default GridT;






















const styles = StyleSheet.create({
  item_wrap: {
    position: 'relative',
    paddingLeft: 20,
    paddingTop: 20
  },
  item: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f39c12',
    borderRadius: 4,
  },
  item_clear_wrap: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 20,
    height: 20,
    zIndex: 999
  },
  item_clear: {
    width: 20,
    height: 20
  },
  item_moved: {
    opacity: 0.95,
    borderRadius: 4,
  },
  item_icon_swipe: {
      width: 50,
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 50 * 0.5,
      justifyContent: 'center',
      alignItems: 'center',
  },
  item_icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  item_text_swipe: {
      backgroundColor: '#fff',
      width: 56,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
  },
  item_text: {
      color: '#444',
      fontSize: 20,
      fontWeight: 'bold',
  },
});