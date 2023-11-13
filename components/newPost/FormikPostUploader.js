import { View, Text,TextInput,Image } from 'react-native'
import React, { useState, useEffect} from 'react'
import * as Yup from 'yup'
import { Formik, formik } from 'formik'
import { Button, Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import { db, firebase } from '../../firebase'

const PLACEHOLDER_IMG='https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-default-placeholder.png'

const uploadPostSchema=Yup.object().shape({
    imageUrl:Yup.string().url().required('A URL is required'),
    caption:Yup.string().max(2200, 'Caption has reached the character limit')
})

const FormikPostUploader = ({navigation}) => {

    const [thumbnail,setThumbnailUrl]=useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser,setCurretnLoggedInUser]=useState(null)

    const getUsername=()=>{
        const user = firebase.auth().currentUser
        const unsubscribe = db
        .collection('users')
        .where('owner_uid','==',user.uid)
        .limit(1).
        onSnapshot(
            snapshot=>
            snapshot.docs.map(doc=>{
                setCurretnLoggedInUser({
                    username:doc.data().username,
                    profilePicture:doc.data().profile_picture,
                })
            })
        )
        return unsubscribe
    }

    useEffect(()=>{
        getUsername()
    },[])

    const uploadPosToFirebase=(imageUrl,caption)=>{
        const unsubscribe=db
        .collection('users')
        .doc(firebase.auth().currentUser.email)
        .collection('posts')
        .add({
            imageUrl:imageUrl,
            user:currentLoggedInUser.username,
            profile_picture:currentLoggedInUser.profilePicture,
            owner_uid:firebase.auth().currentUser.uid,
            owner_email:firebase.auth().currentUser.email,
            caption:caption,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            likes_by_users:[],
            comments:[],
        })
        .then(()=>navigation.goBack())
        return unsubscribe

    }

  return (
    <Formik
    initialValues={{caption:'',imageUrl:''}}
    onSubmit={(values)=>{
    //     console.log(values)
    // console.log('Your post was submitted successfully')
    // navigation.goBack()
    uploadPosToFirebase(values.imageUrl,values.caption)
}}
    validationSchema={uploadPostSchema}
    validateOnMount={true}
    >
        {({handleBlur, handleChange, handleSubmit, values,errors, isValid})=>(
        <>
        <View
          style={{
            margin:20,
            justifyContent:'space-between',
            flexDirection:'row'
        }}
        >
            <Image source={{uri: validUrl.isUri(thumbnail) ? thumbnail: PLACEHOLDER_IMG}}
            style={{width:100,height:100}}
            />
        <View style={{flex:1,marginLeft:12}}>
            <TextInput 
                style={{color:'white',fontSize:20}}
                placeholder='Write a caption'
                placeholderTextColor='gray'
                multiline={true}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
            />
        </View>
        
        
        </View>
        <Divider width={0.2} orientation='vertical'/>
        <TextInput 
        onChange={e=>setThumbnailUrl(e.nativeEvent.text)}
            style={{color:'white',fontSize:18}}
            placeholder='Enter Image URL'
            placeholderTextColor='gray'
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
        />
        {errors.imageUrl && (
            <Text style={{fontSize:12, color:'red'}}>
                {errors.imageUrl}
            </Text>
        )}
        <Button onPress={handleSubmit} title="Share" disabled={!isValid}/>
        </>
        )}
    </Formik>
  )
}

export default FormikPostUploader