import { View, Text ,Image, StyleSheet, TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import { Divider } from 'react-native-elements'
// import { TouchableOpacity } from 'react-native-web'
import { firebase , db } from '../../firebase'
const postFooterIcons=[
    {
        name:"Like",
        imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2OH5BjgoZJ8vNoJhYxcj0W_DC3Xpgrjly6r46mTs5syE_3Few96VI-D2N2272el6LW4k&usqp=CAU%27',
        likedImageUrl:'https://media.istockphoto.com/id/1212547307/vector/abstract-heart-symbol-on-black-backdrop.jpg?s=612x612&w=0&k=20&c=woKG1cDtmstz2cAgSP8kH8tE4ATydZSHKilN4PyQwGg=',
    },
    {
        name:"Comment",
        imageUrl:
        'https://png.pngtree.com/png-vector/20191010/ourmid/pngtree-comment-icon-isolated-on-background-png-image_1813431.jpg',
    },
    {
        name:"Share",
        imageUrl:
        'https://png.pngtree.com/png-vector/20190329/ourmid/pngtree-vector-paper-plane-icon-png-image_889384.jpg',
    },
    {
        name:"Save",
        imageUrl:
        'https://external-preview.redd.it/Qm9GCyp5it3imxX30J_fsR5YH9lQPOzR8wN8D7bPCPs.jpg?auto=webp&s=753e6d497df3775daf74cd0b12631d1c834770ff',
    },
]

const Post = ({post}) => {

    const handleLike=post=>{
        const currentLikeStatus=!post.likes_by_users.includes(
            firebase.auth().currentUser.email
        )

        db.collection('users')
        .doc(post.owner_email)
        .collection('posts')
        .doc(post.id)
        .update({
            likes_by_users:currentLikeStatus
            ? firebase.firestore.FieldValue.arrayUnion(
                firebase.auth().currentUser.email
            )
            : firebase.firestore.FieldValue.arrayRemove(
                firebase.auth().currentUser.email
            ),
        })
        .then(()=>{
            console.log('document successfuly updated')
        })
        .catch(error =>{
            console.error('Error updating the document: ', error)
        })
    }

  return (
    <View style={{marginBottom:30}}>
        <Divider width={1} orientation='vertical'/>
        <PostHeader post={post}/>
        <PostImage post={post}/>
        <View style={{marginHorizontal:15, marginTop:10}}>
            <PostFooter post={post} handleLike={handleLike}/>
            <Likes post={post}/>
            <Caption post={post}/>
            <CommentSection post={post} />
            <Comments post={post} />
        </View>
        
    </View>
  )
}

const PostHeader=({post})=>(
    <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:5,
        alignItems:'center',
        }}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image source={{uri: post.profile_picture}} style={styles.story}/>
            <Text style={{color:'white',marginLeft:5, fontWeight:'700'}}>{post.user}</Text>
        </View>
        <Text style={{color:'white',fontWeight:'900'}}>...</Text>
    </View>
)

const PostImage=({post})=>(
    <View style={{
        width:"100%",
        height:450,
    }}>
        <Image 
        source={{uri: post.imageUrl}} 
        style={{height:'100%', resizeMode:"cover"}} />
    </View>
    
)

const PostFooter=({handleLike,post})=>(
    <View style={{flexDirection:'row' }}>
        <View style={styles.leftFooterIcons}>
            <TouchableOpacity onPress={()=>handleLike(post)}>
                <Image
                style={styles.footerIcons}
                source={{uri:post.likes_by_users.includes(firebase.auth().currentUser.email)
                ? postFooterIcons[0].likedImageUrl
                : postFooterIcons[0].imageUrl
            }}
                />
            </TouchableOpacity>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl}/>
            <Icon imgStyle={[styles.footerIcon,styles.shareIcon]} imgUrl={postFooterIcons[2].imageUrl}/>
        </View>
        <View style={{flex:1,alignItems:'flex-end'}}>
            <Icon imgStyle={styles.footerIcon_save} imgUrl={postFooterIcons[3].imageUrl}/>
        </View>
    </View>
    
)

const Icon=({imgStyle,imgUrl})=>(
    <TouchableOpacity>
        <Image  style={imgStyle} source={{uri:imgUrl}}/>
    </TouchableOpacity>
)

const Likes=({post})=>(
    <View style={{flexDirection:'row',marginTop:4}}>
        <Text style={{color:"white",fontWeight:600}}>
            {post.likes_by_users.length.toLocaleString('en')} likes
        </Text>
    </View>
    
)

const Caption=({post})=>
(
    <View style={{marginTop:5}}>
        <Text style={{color:'white'}}>
            <Text style={{fontWeight:'600'}}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
    
)

const CommentSection=({post})=>(
    <View style={{marginTop:5,height:20,marginBottom:-43}}>
        {!!post.comments.length &&(
            <Text style={{color:"grey"}}>
            View {post.comments.length>1 ? 'all': ''} {post.comments.length}{" "}
            {post.comments.length>1 ? 'comments': 'comment'}
        </Text>
        )}
        {/* <Text>{firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.comments[0])}</Text> */}
        <Text style={{color:'white'}}>{post.comments[0]}</Text>
        <Text style={{color:'white'}}>{post.comments[1]}</Text>

    </View>
    
)

const Comments=({post})=>(
    <>
        {post.comments.map((comment,index)=>(
            <View key={index} style={{flexDirection:'row', marginTop:5}}>
                <Text style={{ color:'white'}}>
                    <Text style={{fontWeight:'600'}}>
                    {comment.user}
                    </Text>
                    {" "}{comment.comment}
                </Text>
            </View>
        ))}
    </>
)

const styles=StyleSheet.create({
    story:{
        width:35,
        height:35,
        borderRadius:50,
        marginLeft:6,
        borderWidth:1.6,
        borderColor:'#ff8501'
    },
    footerIcon:{
        width:35,
        height:35,
        marginRight:25,
    },
    footerIcons:{
        width:25,
        height:25,
        marginRight:25,
        marginTop:5,
    },
    footerIcon_save:{
        width:45,
        height:45,
    },
    leftFooterIcons:{
      flexDirection:'row',
      width:'32%',
      justifyContent:'space-between',
    },
    shareIcon:{
        transform:[{rotate:'370deg'}],
        marginTop:-3,
    },
})
export default Post