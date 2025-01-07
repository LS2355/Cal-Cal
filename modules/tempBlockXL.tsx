import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MARGIN, SIZE, XLBlockWidth} from './utils';
import { DefaultBlockSize } from './utils';

const XLBox = ({count}) => {
  const backgroundColor = count % 2 === 0 ? '#6e48eb' : '#c0a946';
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
};

export default XLBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 4,
    width: XLBlockWidth - (MARGIN * 2),
    height: DefaultBlockSize - MARGIN,
    margin: MARGIN,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#cde9e4',
  },
});



