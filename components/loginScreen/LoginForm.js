import { View, Text,StyleSheet ,TextInput,Button,Pressable, Alert} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
// import { forHorizontalIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators'
// import { Pressable } from 'react-native/types'
// import { TextInput } from 'react-native-gesture-handler'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
// import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack'
import {firebase} from '../../firebase'
const LoginForm = ({navigation}) => {

    const LoginFormSchema=Yup.object().shape({
        email:Yup.string().email().required('An email is required'),
        password:Yup.string()
            .required()
            .min(8,'Your password must have 8 characters')
        
    })

    const onLogin = async(email,password)=>{
        try{
            await firebase.auth().signInWithEmailAndPassword(email,password)
            console.log("Successsful firebase",email,password)
        }catch(error){
            Alert.alert(
                'Hello there...',
                error.message + '\n\n.. What would like to do next..',
                [
                    {
                        text:'OK',
                        onPress:()=>console.log('OK'),
                        style:'cancel',
                    },
                    {text: 'Sign Up', onPress:()=>navigation.push('SignupScreen')}
                ]
                
                )
        }
    }


  return (
    <View style={styles.wrapper}>
        <Formik
        initialValues={{email: '', password:''}}
        
        onSubmit={values=>{
            onLogin(values.email,values.password)
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
    >
        
        {({handleChange, handleBlur,handleSubmit, values,isValid})=>
        (
            <>
        <View style={[
            styles.inputField,
            {
                borderColor:
                values.email.length<1 || Validator.validate(values.email)
                ? '#ccc'
                : 'red'
            }
            ]}>
            <TextInput
            placeholder='Phone number, username or email'
            placeholderTextColor='#444'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={true}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            />
            
        </View>

        <View style={[
            styles.inputField,
            {
                borderColor:
                1> values.password.length || values.password.length>=8
                ? '#ccc'
                : 'red'
            }
            ]}>
            <TextInput
            placeholder='Password'
            placeholderTextColor='#444'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            textContentType='password'
            autoFocus={true}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            />
           
        </View>
        <View style={{alignItems:'flex-end',marginBottom:30}}>
            <Text style={{color:'#6BB0F5'}}>
                Forgot Password?
            </Text>
        </View>
        <Pressable 
        titleSize={20} 
        onPress={handleSubmit}
        style={styles.button(isValid)}
        disabled={!isValid}
        >
            <Text style={styles.buttonText}>
                Login
            </Text>
        </Pressable>
        <View style={styles.signupContainer}>
            <Text>Don't have an account  </Text>
            <TouchableOpacity onPress={()=>navigation.push('SignupScreen')}>
                <Text style={{color:'#6BB0F5'}}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
        </>
        )}
        </Formik>
    </View>
  )
}

const styles=StyleSheet.create({
    wrapper:{
        marginTop:80,
    },
    inputField:{
        borderRadius:4,
        padding:6,
        backgroundColor:'#FAFAFA',
        marginBottom:10,
        borderWidth:1
    },
    button:isValid=>({
        backgroundColor:isValid?  '#0096F6': '#9ACAF7',
        justifyContent:'center',
        alignItems:'center',
        minHeight:42,
        borderRadius:4,
    }), 
    signupContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        marginTop:10
    },
    buttonText:{
        fontWeight:'600',
        color:'#fff',
        fontSize:20,
    },
})

export default LoginForm