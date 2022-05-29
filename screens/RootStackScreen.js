import React from 'react'
import SignIn from './SignIn';
import SignUp from './SignUp';
import SplashScreen from './SplashScreen';
import {createStackNavigator} from '@react-navigation/stack';
const RootStack=createStackNavigator();
export default function RootStackScreen({navigation}) {

  return (
    <RootStack.Navigator headerMode='none'>
    <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
    <RootStack.Screen name="SignIn" component={SignIn}/>
    <RootStack.Screen name="SignUp" component={SignUp}/>
    </RootStack.Navigator>
  
  );
}

  
