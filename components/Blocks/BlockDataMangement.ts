import AsyncStorage from "@react-native-async-storage/async-storage"


//blocks that will be enabled when app is first opened
const defaultBlockData: any = [
	'calcal-calories-consumed',
	'calcal-calories-burned',
	'calcal-macros',
  'calcal-audio-controll'
]




export async function updateEquippedBlockData (newData: any) {
  try {
    await AsyncStorage.setItem('BlockData', newData)
  } catch(err) {
    console.error('error updating blockData', err)
  }
}

export async function getEquippedBlockData () {
  try{
    const EquippedBlockData = await AsyncStorage.getItem('BlockData')
		console.log('ebd', EquippedBlockData)
		if (EquippedBlockData != null) return EquippedBlockData
		return defaultBlockData
  }catch(err){
		console.error('error:',err,' unable to get blockData')
	}
}

export function resetEquippedBlockData() {
  AsyncStorage.setItem('BlockData', defaultBlockData)
}

