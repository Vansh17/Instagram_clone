// import { View, Text,TextInput,StyleSheet,Pressable,TouchableOpacity } from 'react-native'
// import React from 'react'
// import { Form, Formik } from 'formik'
// import * as Yup from 'yup'
// import Validator from 'email-validator'

// const SignupForm = () => {
//     const SignupFormSchema=Yup.object.shape({
//         email:Yup.string().email().required('An email is required'),
//         username:Yup.string().required().min(2,'A username must have 2 characters'),
//         password:Yup.string()
//         .required()
//         .min(6,'Password must have 6 characters')
//     })

//     return (
//         <View style={styles.wrapper}>
//             <Formik
//             initialValues={{email: '',username:'', password:''}}
//             onSubmit={values=>{
//                 console.log(values)
//             }}
//             validationSchema={SignupFormSchema}
//             validateOnMount={true}
//         >
            
//             {({handleChange, handleBlur,handleSubmit, values,isValid})=>
//             (
//                 <>
//             <View style={[
//                 styles.inputField,
//                 {
//                     borderColor:
//                     values.email.length<1 || Validator.validate(values.email)
//                     ? '#ccc'
//                     : 'red'
//                 }
//                 ]}>
//                 <TextInput
//                 placeholder='Email'
//                 placeholderTextColor='#444'
//                 autoCapitalize='none'
//                 keyboardType='email-address'
//                 textContentType='emailAddress'
//                 autoFocus={true}
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//                 value={values.email}
//                 />
                
//             </View>
    

//             <View style={[
//                 styles.inputField,
//                 {
//                     borderColor:
//                     1> values.username.length || values.username.length>=8
//                     ? '#ccc'
//                     : 'red'
//                 }
//                 ]}>
//                 <TextInput
//                 placeholder='Username'
//                 placeholderTextColor='#444'
//                 autoCapitalize='none'
//                 textContentType='username'
//                 autoFocus={true}
//                 onChangeText={handleChange('username')}
//                 onBlur={handleBlur('username')}
//                 value={values.username}
//                 />
               
//             </View>


//             <View style={[
//                 styles.inputField,
//                 {
//                     borderColor:
//                     1> values.password.length || values.password.length>=8
//                     ? '#ccc'
//                     : 'red'
//                 }
//                 ]}>
//                 <TextInput
//                 placeholder='Password'
//                 placeholderTextColor='#444'
//                 autoCapitalize='none'
//                 autoCorrect={false}
//                 secureTextEntry={true}
//                 textContentType='password'
//                 autoFocus={true}
//                 onChangeText={handleChange('password')}
//                 onBlur={handleBlur('password')}
//                 value={values.password}
//                 />
               
//             </View>
//             <View style={{alignItems:'flex-end',marginBottom:30}}>
//                 <Text style={{color:'#6BB0F5'}}>
//                     Forgot Password?
//                 </Text>
//             </View>
//             <Pressable 
//             titleSize={20} 
//             onPress={handleSubmit}
//             style={styles.button(isValid)}
//             disabled={!isValid}
//             >
//                 <Text style={styles.buttonText}>
//                     SignUp
//                 </Text>
//             </Pressable>
//             <View style={styles.signupContainer}>
//                 <Text>Already have an account  </Text>
//                 <TouchableOpacity>
//                     <Text style={{color:'#6BB0F5'}}>
//                         Login
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//             </>
//             )}
//             </Formik>
//         </View>
//       )

// }


// const styles=StyleSheet.create({
//     wrapper:{
//         marginTop:80,
//     },
//     inputField:{
//         borderRadius:4,
//         padding:6,
//         backgroundColor:'#FAFAFA',
//         marginBottom:10,
//         borderWidth:1
//     },
//     button:isValid=>({
//         backgroundColor:isValid?  '#0096F6': '#9ACAF7',
//         justifyContent:'center',
//         alignItems:'center',
//         minHeight:42,
//         borderRadius:4,
//     }), 
//     signupContainer:{
//         flexDirection:'row',
//         width:'100%',
//         justifyContent:'center',
//         marginTop:10
//     },
//     buttonText:{
//         fontWeight:'600',
//         color:'#fff',
//         fontSize:20,
//     },
// })

// export default SignupForm

// ***********************************************************
import { View, Text,TextInput, Button, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import React,{useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import {firebase,db} from '../../firebase'

const SignupForm = ({navigation}) => {

    const SignupFormSchema=Yup.object().shape({
        email:Yup.string().email().required('An email is required'),
        username:Yup.string().required().min(2,'A username is required'),
        password:Yup.string()
        .required()
        .min(6,'Your password has to be atleast 8 characters')
    })

    const getRandomProfilePicture=async()=>{
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignup= async (email,password,username)=>{
        try{
           const authUser= await firebase.auth().createUserWithEmailAndPassword(email,password)
            console.log('Firebase sign up', email, password)
            db.collection('users')
            .doc(authUser.user.email)
            .set
            ({
                owner_uid:authUser.user.uid,
                username:username,
                email:authUser.user.email,
                profile_picture:await getRandomProfilePicture(),
            })
        }catch(error){
            Alert.alert(' Error!!!',error.message)
        }
       
    }

  return (
    <View style={styles.wrapper}>
        <Formik 
            initialValues={{email:'',username:'',password:''}}
            onSubmit={values=>{
                onSignup(values.email,values.password,values.username)
            }}
            validationSchema={SignupFormSchema}
            validateOnMount={true}
        >
            {({handleChange, handleBlur, handleSubmit, values, isValid})=>(
                                <>
                        <View style={[styles.inputField,
                        {
                            borderColor:
                            values.email.length<1 || Validator.validate(values.email)
                            ? '#ccc'
                            :'red'
                        }]}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Email'
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    textContentType='emailAddress'
                                    autoFocus={true}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                            />
            
                        </View>

                        <View style={[styles.inputField,
                        {
                            borderColor:
                            1>values.username.length || values.username.length>=6
                            ? '#ccc'
                            :'red'
                        }]}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Username'
                                    autoCapitalize='none'
                                    textContentType='username'
                                    autoFocus={true}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                            />
            
                        </View>
            
                        <View style={[styles.inputField,
                        {
                            borderColor:
                            1>values.password.length || values.password.length>=6
                            ? '#ccc'
                            : 'red'
                        }]}>
                            <TextInput
                                    placeholderTextColor='#444'
                                    placeholder='Password'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    textContentType='password'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                            />
            
                        </View>
                        <View  style={{alignItems:'flex-end', marginBottom:30}}>
                            <Text style={{color:'#6BB0F5'}}>Forgot Password?</Text>
                        </View>
                        
                        <TouchableOpacity  
                        style={styles.button(isValid)}
                        onPress={handleSubmit}
                        
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
            
                        <View style={styles.signupContainer}>
                            <Text>Already have an account? </Text>
                            <TouchableOpacity onPress={()=>navigation.goBack()}>
                                <Text style={{color:'#6BB0F5'}}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                        </>
            )}

        </Formik>
        
    </View>
  )
}

const styles=StyleSheet.create({
    inputField:{
        borderRadius:4,
        padding:10,
        backgroundColor:'#FAFAFA',
        marginBottom:10,
        borderWidth:1
    },
    wrapper:{
        marginTop:80
    },
    button: isValid=>({
        backgroundColor: isValid?'#0096F6':'#9ACAF7',
        alignItems:'center',
        justifyContent:'center',
        minHeight:42,
        borderRadius:4
    }),
    buttonText:{
        fontWeight:'600',
        color:'#fff',
        fontSize:20
    },
    signupContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        marginTop:50
    }
})
export default SignupForm