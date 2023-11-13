import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import FormikPostUploader from './FormikPostUploader'
// import { TouchableOpacity } from 'react-native-web'

const AddNewPost = ({navigation}) => (
    <View style={styles.container}>
        <Header navigation={navigation}/>
        <FormikPostUploader navigation={navigation}/>
    </View>
)
  
    


const Header=({navigation})=>(
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image 
            style={{width:20,height:20}}
            source={require('C:/Users/vansh/Desktop/Vansh notes/react/Insta_clone/ig_clone/assests/back.png')}/>
        </TouchableOpacity>
        
      <Text style={styles.headerText}>NEW POST</Text>
      <Text></Text>
    </View>
  
)

const styles=StyleSheet.create({
    container:{
        marginHorizontal:10,
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:'10%',
    },
    headerText:{
        color:'#fff',
        fontWeight:'700',
        fontSize:15,
        marginRight:25,
    },
})

export default AddNewPost