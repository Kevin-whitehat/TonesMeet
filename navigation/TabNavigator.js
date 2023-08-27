import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from '../components/Icons';
import Colors from '../constants/Colors';


import * as Animatable from 'react-native-animatable';
import Feed from '../screens/Feed';
import UserScreen from '../screens/UserScreen';
import CreatePost from '../screens/CreatePost';
import NotificationScreen from '../screens/NotificationScreen';


const TabArr = [
  { route: 'Feed', label: 'Home', type: Icons.Feather, icon: 'home', component: Feed},
  { route: 'CreatePost', label: 'CreatePost', type: Icons.Feather, icon: 'plus-square', component: CreatePost},
  { route: 'NotificationScreen', label: 'Interested', type: Icons.Feather, icon: 'user-check', component: NotificationScreen},
  // { route: 'Search', label: 'Search', type: Icons.Feather, icon: 'search', component: ColorScreen },
  {route: 'UserScreen',label:'Chat',type:Icons.Feather, icon:'message-circle',component:UserScreen},
  // { route: 'Like', label: 'Like', type: Icons.Feather, icon: 'heart', component: ColorScreen },
  // { route: 'Account', label: 'Account', type: Icons.FontAwesome, icon: 'user-circle-o', component: ColorScreen },
];


const Tab = createBottomTabNavigator();


const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }


const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }


const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);


  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])


  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? Colors.white : Colors.darkGray} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}


export default function AnimTab1() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4D4D4D',
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.black,
  }
})









// import React from 'react';
// import { StyleSheet } from "react-native";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { RFValue } from "react-native-responsive-fontsize";

// import Feed from "../screens/Feed";
// import CreatePost from "../screens/CreatePost";

// const Tab = createMaterialBottomTabNavigator();

// const BottomTabNavigator = () => {
//     return (
//         <Tab.Navigator
            
//             barStyle={styles.bottomTabStyle}
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, color, size }) => {
//                     let iconName;
//                     if (route.name === "Feed") {
//                         iconName = focused ? "home" : "home-outline";
//                     } else if (route.name === "CreatePost") {
//                         iconName = focused ? "add-circle" : "add-circle-outline";
//                     }
//                     return (
//                         <Ionicons
//                             name={iconName}
//                             size={RFValue(25)}
//                             color={color}
//                             style={styles.icons}
//                         />
//                     );
//                 }
//             })}
//             activeColor={"#7236e5"}
//             inactiveColor={"gray"}
//         >
//             <Tab.Screen name="Feed" component={Feed} />
//             <Tab.Screen name="CreatePost" component={CreatePost} />
//         </Tab.Navigator>
//     );
// }

// const styles = StyleSheet.create({
//     bottomTabStyle: {
//         backgroundColor: "#7eede6",
//         height: "7%",
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//         overflow: "hidden",
//         position: "absolute"
//     },
//     icons: {
//         width: RFValue(30),
//         height: RFValue(30)
//     }
// });

// export default BottomTabNavigator