import { View, Text,StyleSheet ,Image} from 'react-native'
import React from 'react'
import SignupForm from '../components/signupScreen/SignupForm'

const INSTAGRAM_LOGO='https://1000logos.net/wp-content/uploads/2017/02/Instagram-app-logo.jpg'

const SignupScreen = ({navigation}) => {
  return (
    <View style={styles.conatiner}>
        <View style={styles.logoContainer}>
            <Image source={{uri: INSTAGRAM_LOGO,height:100,width:100}}/>
            <SignupForm navigation={navigation} />
        </View>
    </View>
  )
}

const styles=StyleSheet.create({
    conatiner:{
        flex:1,
        backgroundColor:'white',
        paddingTop:50,
        paddingHorizontal:12,
    },
    logoContainer:{
        alignItems:'center',
        marginTop:60,
    },
})

export default SignupScreen