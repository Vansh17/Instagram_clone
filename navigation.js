import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {  NavigationContainer }from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/NewPostScreen'
import LoginScreen from './screens/LoginScreen'
// import SignupForm from './components/signupScreen/SignupForm'
import SignupScreen from './screens/SignupScreen'
const Stack=createStackNavigator()

const screenOptions={
    headerShown:false,
}

//  export const SignedInStack = () => {
//   return (
//     <NavigationContainer>
//         <Stack.Navigator
//             initialRouteName='HomeScreen'
//             screenOptions={screenOptions}
//         >
//             <Stack.Screen
//                 name="HomeScreen" 
//                 component={HomeScreen}
//             />
//             <Stack.Screen
//                 name="NewPostScreen" 
//                 component={NewPostScreen}
//             />
            
//         </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export const SignedOutStack = () => {
//     return (
//       <NavigationContainer>
//           <Stack.Navigator
//               initialRouteName='LoginScreen'
//               screenOptions={screenOptions}
//           >
              
//               <Stack.Screen
//                   name="LoginScreen" 
//                   component={LoginScreen}
//               />
//               <Stack.Screen
//                   name="SignupScreen" 
//                   component={SignupScreen}
//               />
//           </Stack.Navigator>
//       </NavigationContainer>
//     )
//   }

// // export default SignedInStack
// *******************************************************
export const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='HomeScreen'
            screenOptions={screenOptions}
        >
            <Stack.Screen name='HomeScreen' component={HomeScreen}/>
            <Stack.Screen name='NewPostScreen' component={NewPostScreen}/>
           

        </Stack.Navigator>
    </NavigationContainer>
)


export const SignedOutStack=()=>(
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='LoginScreen'
            screenOptions={screenOptions}
        >
            <Stack.Screen name='LoginScreen' component={LoginScreen}/>
            <Stack.Screen name='SignupScreen' component={SignupScreen}/>

        </Stack.Navigator>
    </NavigationContainer>
)