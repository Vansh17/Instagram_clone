import React from "react"
import {View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
// import { TouchableOpacity } from "react-native/types"

import { firebase } from '../../firebase'
const handleSignOut=async()=>{
    try{
        await firebase.auth().signOut()
        console.log('Signed out successfuly')
    }catch(error){
        console.log(error)
    }
}
const Header=({navigation})=>{
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSignOut}>
                <Image style={styles.logo} source={require('../../assests/insta_logo.png')}/>
            </TouchableOpacity>

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={()=>navigation.push('NewPostScreen')}>
                    <Image
                    source={require('../../assests/plus.png')}
                    style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                    source={require('../../assests/like_button.png')}
                    style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>11</Text>
                    </View>
                    <Image
                    source={require('../../assests/dm-btn.png')}
                    style={styles.icon}
                    />
                </TouchableOpacity>
                

            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginHorizontal:20,
    },
    iconContainer:{
        // paddingTop:-55,
        flexDirection:'row',
    },
    logo:{
        paddingTop:'115%',
        width:100,
        height:50,
        resizeMode:'contain',
    },
    icon:{
        width:30,
        height:30,
        marginLeft:10,
        resizeMode:'contain',
    },
    unreadBadge:{
        backgroundColor:'#FF3250',
        position:'absolute',
        left:20,
        bottom:18,
        width:25,
        height:18,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
        zIndex:100,
    },
    unreadBadgeText:{
        color:'white',
        fontWeight:'600',
        // paddingBottom:7,
    },
})
export default Header