import { Image, StyleSheet, Platform, Text } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}> Hello</ThemedText>
    </ThemedView>
  )

}

const styles = StyleSheet.create({ // this is the style sheet
  container:{
    marginTop: 50,
  },
  text:{
    color: 'white'
  }
});
