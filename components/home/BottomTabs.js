import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { Divider } from 'react-native-elements'
// import { TouchableOpacity } from 'react-native-web'

export const bottomTabIcons=[
    {
        name:'Home',
        active:'https://i.pinimg.com/564x/71/89/88/718988215800391b6050182a28ca6810.jpg',
        inactive:'https://i.pinimg.com/564x/71/89/88/718988215800391b6050182a28ca6810.jpg',

    },
    {
        name:'Search',
        active:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKrSMICwt4s4wmTqqw-lF_82hI01gf093fYtMxb5EFsN6_8a0NHkmaj7RPPoJ4GMsoJLI&usqp=CAU',
        inactive:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKrSMICwt4s4wmTqqw-lF_82hI01gf093fYtMxb5EFsN6_8a0NHkmaj7RPPoJ4GMsoJLI&usqp=CAU',

    },
    {
        name:'Reels',
        active:'https://ih1.redbubble.net/image.1566288444.4140/pp,840x830-pad,1000x1000,f8f8f8.jpg',
        inactive:'https://ih1.redbubble.net/image.1566288444.4140/pp,840x830-pad,1000x1000,f8f8f8.jpg',

    },
    {
        name:'Shop',
        active:'https://icon-library.com/images/white-shopping-cart-icon/white-shopping-cart-icon-8.jpg',
        inactive:'https://icon-library.com/images/white-shopping-cart-icon/white-shopping-cart-icon-8.jpg',

    },
    {
        name:'Profile',
        active:'https://www.bollywoodhungama.com/wp-content/uploads/2021/05/Kareena-Kapoor-Khan-shares-an-important-message-for-children-who%E2%80%99ve-lost-their-parents-due-to-Covid-19.jpg',
        inactive:'https://www.bollywoodhungama.com/wp-content/uploads/2021/05/Kareena-Kapoor-Khan-shares-an-important-message-for-children-who%E2%80%99ve-lost-their-parents-due-to-Covid-19.jpg',

    },


]

const BottomTabs = ({icons}) => {
    const [activeTabs,setActiveTabs]=useState('Home')
    const Icon=({icon})=>(
        <TouchableOpacity onPress={()=>setActiveTabs(icon.name)}>
            <Image source={{uri:activeTabs===icon.name ? icon.active: icon.inactive}}
             style={[styles.icon, 
             icon.name==='Profile' ? styles.profilePic(): null,
             activeTabs==="Profile" && icon.name===activeTabs
             ? styles.profilePic(activeTabs)
             :null
             ]}/>
        </TouchableOpacity>
    )

  return (
    <View style={styles.wrapper}>
        <Divider width={1} orientation='vertical'/>
        <View style={styles.container}>
            {icons.map((icon,index)=>(
        <Icon  key={index} icon={icon}/>
        ))}
    </View>
    </View>
    
  )
}

const styles=StyleSheet.create({
    wrapper:{
        position:'absolute',
        width:'100%',
        bottom:'0%',
        zIndex:999,
        backgroundColor:'#000'
    },
    icon:{
      width:30,
      height:30,  
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:50,
        paddingTop:10,
    },
    profilePic:(activeTabs='')=>({
        
        borderRadius:50,
        borderWidth:activeTabs==='Profile' ? 2 : 0,
        borderColor:'#fff'
    }),
})

export default BottomTabs