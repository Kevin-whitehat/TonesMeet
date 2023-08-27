import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/Profile';
import Customize from '../screens/Customize'
import StackNavigator from './StackNavigator';
import Logout from '../screens/Logout';

import CustomDrawer from './CustomerDrawer';


const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator  drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: '#1c0f24',
      drawerActiveTintColor: "white",
      drawerInactiveTintColor: "black",
      drawerLabelStyle: {
        fontSize: 17,
      },}}>
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Customize}
        options={{
          headerShown: false,
        }}
      />
     
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{ unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  );
};


export default DrawerNavigator;
  



// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Profile from '../screens/Profile';
// import StackNavigator from './StackNavigator';
// import Logout from '../screens/Logout';
// import Settings from '../screens/Settings';

// const Drawer = createDrawerNavigator();

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator screenOptions={{ headerShown: false }}>
//       <Drawer.Screen
//         name="Home"
//         component={StackNavigator}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Drawer.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           headerShown: false,
//         }}
//       />
     
//       <Drawer.Screen
//         name="Logout"
//         component={Logout}
//         options={{ unmountOnBlur: true }}
//       />
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigator;
