import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { RFValue } from 'react-native-responsive-fontsize';
import GenericCard from './GenericCard';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';
import JammingCard from './JammingCard';
import UploadCard from './UploadCard';
import BandCard from './BandCard';
import db from '../config';

let posts = require('./temp_posts.json');

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  renderItem = ({ item }) => {
    if (item.postType == 'createBand') {
      return <BandCard post={item} navigation={this.props.navigation} />;
    } else if (item.postType == 'generic') {
      return <GenericCard post={item} navigation={this.props.navigation} />;
    } else if (item.postType == 'newUpload') {
      return <UploadCard post={item} navigation={this.props.navigation} />;
    } else {
      return <JammingCard post={item} navigation={this.props.navigation} />;
    }
  };

  fetchPosts = () => {
    db.collection('posts').onSnapshot((snapshot) => {
      var allPosts = [];

      snapshot.docs.map((doc) => {
        var post = doc.data();
        console.log("Posts Data"+doc.data());
        post['postDocId'] = doc.id;
        allPosts.push(post);
      });
      this.setState({ posts: allPosts });
    });
  };

  componentDidMount() {
    this.fetchPosts();
  }
  emptylist=()=>{
    return(
      <View style = {{alignSelf:'center',justifyContent:'center'}}>
      <Text style={{color:'white',fontSize:24,fontWeight:'bold',textAlign:'center'}}>Sorry no posts right now</Text>
      </View>
    )
  }
  openDrawer = () => {
  
    this.props.navigation.openDrawer();
   };
  keyExtractor = (item, index) => index.toString();
  render() {  
    return (          
      <ImageBackground
        style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%' }}
        source={require('../assets/eee.png')}
        >    
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.container}>
            
         
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/snack-icon.png')}
                style={styles.iconImage}></Image>
            </View>
          </View>
        

          <View style={styles.cardContainer}>  
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.posts}
              renderItem={this.renderItem}  
              style={{marginBottom:30,borderRadius:30}} 
              ListEmptyComponent={()=>this.emptylist()}  
            />
          </View>    
          </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#111111aa'
  },
  cardContainer: {
    flex: 0.9,    
    marginBottom:50, 
    borderRadius:30,   
    margin:10 
  },
  appTitle: {
    flex: 0.07,

    backgroundColor: '#4D4D4Dbb',
  },
  appIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    marginTop: 5,
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  likeButton: {
    marginTop: 20,
    marginBottom: 40,
    width: RFValue(200),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#7236e5',
    borderRadius: RFValue(30),
  },

  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  back: {
    width: 100,
    height: 30,
    marginTop: 10,
    marginLeft:10
  },
});
