import { ImageBackground, StyleSheet, Text, View,TouchableOpacity,SafeAreaView,Image,StatusBar } from 'react-native'
import  { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import React from 'react'
import firebase from 'firebase'
import db from '../config';
import { useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'; 
const ChatDetailScreen = () => {
    const [messagesList, setMessagesList] = useState([])
const route=useRoute();
  useEffect(() => {
    console.log("Email",route.params.data.email)
    console.log("Id",route.params.id)
    const subcriber=db.collection("chats").
    doc(route.params.id + route.params.data.email).collection('messages').orderBy("createdAt","desc");
    subcriber.onSnapshot(querysnapshot=>{
       
const allmessages=querysnapshot.docs.map(item=>{
   // console.log("Snapshot",item.data)
   console.log("Data from chats",item.data())
    return{...item.data(),createdAt:Date.parse(new Date()) };
 
});
console.log(allmessages)
setMessagesList(allmessages);
    });
//return()=>subcriber();


  }, [])


  const onSend = useCallback(async(messages = []) => {
    const msg=messages[0];
    const myMsg={
        ...msg,sendBy:route.params.id,
       // messageId:msg._id,
        sendTo:route.params.data.email,
        createdAt:Date.parse(msg.createdAt)
    }
    setMessagesList(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );
    db.collection("chats").doc('' + route.params.id + route.params.data.email).collection('messages').add(myMsg);
   db.collection("chats").doc('' + route.params.data.email + route.params.id).collection('messages').add(myMsg);


  }, [])
  return (
    <ImageBackground
    style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%' }}
    source={require('../assets/chatbackground.png')}
    >
      <SafeAreaView style={styles.droidSafeArea} />
      <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/snack-icon.png')}
                style={styles.iconImage}></Image>
            </View>
          </View>
      
     
    <View style={{flex:1}}>
      <GiftedChat
      messages={messagesList}
      onSend={messages => onSend(messages)}
      user={{
        _id:firebase.auth().currentUser.uid,
      }}
    />
    </View>
    </ImageBackground>
  )
}


export default ChatDetailScreen


const styles = StyleSheet.create({ appTitle: {
  

  backgroundColor: '#4D4D4D',
},
appIcon: {
  justifyContent: 'center',
  alignItems: 'center',
},iconImage: {
  marginTop: 5,
  width: 40,
  height: 40,
  resizeMode: 'contain',
  alignSelf: 'center',
},droidSafeArea: {
  marginTop:
    Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
},})
