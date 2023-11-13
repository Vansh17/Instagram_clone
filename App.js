// import { View, Text } from "react-native";
import * as React from 'react'
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/NewPostScreen'
import SignedInStack from './navigation'
import AuthNavigation from './AuthNavigation'

export default function App() {
  return <AuthNavigation/>
}
