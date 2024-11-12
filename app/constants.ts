import Constants from "expo-constants";
import { Dimensions } from "react-native";

const StatusBarHeight = Constants.statusBarHeight
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("screen");
const ItemHeight = 80;

export {StatusBarHeight, ScreenHeight, ScreenWidth, ItemHeight}