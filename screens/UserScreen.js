import { StyleSheet, Text, View,FlatList,ScrollView,TouchableOpacity ,ActivityIndicator,Image,ImageBackground,SafeAreaView,StatusBar} from 'react-native'
import React ,{useEffect,useState}from 'react'
import firebase from 'firebase';
import db from '../config';
import { TextInput } from 'react-native-gesture-handler';
import filter from 'lodash.filter';
export default function ChatScreen({ navigation }) {
  const id=firebase.auth().currentUser.email;
    const [userC,setUserC]=useState([])
    const [isLoading, setIsLoading]=useState(false)
    const[fullData,setFullData]=useState([])
    const[searchQuery,setSearchQuery]=useState("")
    const[error,setError]=useState(null)


   // let id=firebase.auth().currentUser.uid;
   useEffect(()=>{
    setIsLoading(true)
    getUsers();
  },[])


   


   if(isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size={'large'} color='#5500dc'></ActivityIndicator>
      </View>
    )
   }


    const getUsers= async()=>{
               await db.collection('users')
               .where('email', '!=', id)
               .onSnapshot((snapshot) => {
                var allU = [];
                 snapshot.docs.map((doc) => {
                 
                   var user = doc.data();
                   console.log(user)
                   allU.push(user)
                 
                 });
             
                setFullData(allU)
                setUserC(allU)
                setIsLoading(false)
               });
             }
             const emptylist=()=>{
                return(
                  <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',}}>
              <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}} > No tasks at the moment</Text>
              </View>
                )
              }


              const handleSearch=(query)=>{
                setSearchQuery(query)
               // const formattedQuery=query.toLowerCase();
               const formattedQuery=query;
                const filteredData=filter(fullData,(user)=>{
                  return contains (user,formattedQuery)
                });
                console.log("Filterd data", filteredData)
                setUserC(filteredData)
               }


               const contains=({name,email},query)=>{
if(email.includes(query)||name.includes(query)){
  console.log("Email there", email.includes(query))
  return true;
}
else{
  return false;
}
               }


              const renderItem = ({item}) => {
                return(
                  <TouchableOpacity style={{backgroundColor:'#242424',width:'90%',alignSelf:'center',borderRadius:20,flex:1}} onPress={()=>{
                    navigation.navigate('ChatDetailScreen',{data:item,id:id})
                  }}>
                    <View style = {{
                      backgroundColor:'#656565',borderRadius:10,padding:10,width:'100%',marginTop:10}}>
                        <ScrollView>
                        <Text style = {{
                            fontSize : 15,
                            marginLeft : 5
                        }}>Name : {item.name}</Text>
                        <Text style = {{
                            fontSize : 15,
                            marginLeft : 5
                        }}>Email : {item.email}</Text>
                        
                       
                         
                       
                        </ScrollView>
                    </View>
                </TouchableOpacity>
                )
              }
  return (
    
    <ImageBackground
    style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%' }}
    source={require('../assets/chatbackground.png')}
    >
    <SafeAreaView style={styles.droidSafeArea} />
      <View style={{flex:1}}>
      <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/snack-icon.png')}
                style={styles.iconImage}></Image>
            </View>
          </View>
      
      <Text>ChatScreen</Text>


      <TextInput
      placeholder='Search'
      placeholderTextColor={'white'}
      clearButtonMode='always'
      autoCapitalize='none'
      autoCorrect={false}
      value={searchQuery}
      onChangeText={(query)=>handleSearch(query)}
      style={{paddingHorizontal:20,paddingVertical:10,borderRadius:10,borderWidth:1,margin:20,
      borderColor:'white',color:'white',}}>


      </TextInput>
      <FlatList
                         ListEmptyComponent={emptylist}
                         scrollEnabled = {true}
                        data = {userC}
                        renderItem={renderItem}
                        keyExtractor={(item, index)=>index.toString()}
                        style={{
                          marginBottom:20,
                         // marginTop:30
                        }}
                          />
           </View>              
    </ImageBackground>
    
  )
}




const styles = StyleSheet.create({appTitle: {
  

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
