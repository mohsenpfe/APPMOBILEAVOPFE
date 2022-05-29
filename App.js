import  React,{useEffect,useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import About from './screens/About';
import {useDispatch,useSelector,Provider} from 'react-redux';
import ViewScreen from './screens/ViewScreen';
import {createStackNavigator} from '@react-navigation/stack';
import CustomDrawer from './screens/CustomDrawer';
import RootStackScreen from './screens/RootStackScreen';
import {loadUser} from './redux/actions/authaction';
import Icon from '@expo/vector-icons/Ionicons';
import { clearErrors } from './redux/actions/erroraction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Setting from './screens/Setting';
import SensorMgnt from './screens/SensorsMngt';
import {getSensors} from './redux/actions/sensoraction';
import axios from 'axios';
import {schedulePushNotification} from './screens/ViewScreen';

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import {API} from './Utils'
const ViewStack =createStackNavigator();
const AboutStack= createStackNavigator();
const SettingStack = createStackNavigator();
const SensorMgntStack = createStackNavigator();
const Drawer = createDrawerNavigator();



const TASK_NAME = "BACKGROUND_TASK"
BackgroundFetch.setMinimumIntervalAsync(10);
TaskManager.defineTask(TASK_NAME, () => {
  try {
    // fetch data here...
   
    const response =  API.get(`sensors/updatedsensor/${user}`);
  
 setData (response.data)

 data.map(s=>{
  if(s.virbration<20 || s.virbration>50 || s.temperature<40 || s.temperature>90 || s.electromagnetic<2.5 || s.electromagnetic>4)
  {
    const sensor_name = s.sensor_name
    schedulePushNotification({sensor_name})
 console.log(sensor_name)
  }
})
    return BackgroundFetch.Result.NewData
  
  } catch (err) {
    return BackgroundFetch.Result.Failed
  }
})


const ViewStackScreen=({navigation})=>(

  <ViewStack.Navigator screenOptions={{
    headerStyle:{
     backgroundColor:'#009387'
    },
    headerTintColor:'#fff',
    headerTitleStyle:{
      fontWeight:'bold',
    
    }
  }}>
    <ViewStack.Screen name='View' component={ViewScreen} options={{
      title:'View',
      
      headerLeft:()=>(
        <Icon.Button name="menu" size ={25} backgroundColor='#009387'
        onPress={()=>navigation.openDrawer()}> </Icon.Button>
      )
    }}/>
  
  
  </ViewStack.Navigator>
  );

  const SensorMgntStackScreen=({navigation})=>(

    <SensorMgntStack.Navigator screenOptions={{
      headerStyle:{
       backgroundColor:'#009387'
      },
      headerTintColor:'#fff',
      headerTitleStyle:{
        fontWeight:'bold',
      
      }
    }}>
      <SensorMgntStack.Screen name='Sensors_Mgmt' component={SensorMgnt} options={{
        title:'Sensors Management',
        
        headerLeft:()=>(
          <Icon.Button name="menu" size ={25} backgroundColor='#009387'
          onPress={()=>navigation.openDrawer()}> </Icon.Button>
        )
      }}/>
    
    
    </SensorMgntStack.Navigator>
  

);

const SettingStackScreen=({navigation})=>(

  <SettingStack.Navigator screenOptions={{
    headerStyle:{
     backgroundColor:'#009387'
    },
    headerTintColor:'#fff',
    headerTitleStyle:{
      fontWeight:'bold',
    
    }
  }}>
    <SettingStack.Screen name='Setting' component={Setting} options={{
      title:'Setting',
      
      headerLeft:()=>(
        <Icon.Button name="menu" size ={25} backgroundColor='#009387'
        onPress={()=>navigation.openDrawer()}> </Icon.Button>
      )
    }}/>
  
  
  </SettingStack.Navigator>
  

);

const AboutStackScreen=({navigation})=>(
  <AboutStack.Navigator screenOptions={{
    headerStyle:{
     backgroundColor:'#009387'
    },
    headerTintColor:'#fff',
    headerTitleStyle:{
      fontWeight:'bold'
    }
  }}>
    <AboutStack.Screen name='About' component={About} options={{
      headerLeft:()=>(
        <Icon.Button name="menu" size ={25} backgroundColor='#009387'
        onPress={()=>navigation.openDrawer()}> </Icon.Button>
      )
    
    }}/>
  
  
  </AboutStack.Navigator>
  
);


export default function App({navigation}) {

  const [data,setData]=useState([]);
 const email=useSelector(state=>state.auth.user?.email);
 const user= useSelector(state => state.auth.user?.email) ;


  

const disptach= useDispatch();
const isAuthenticated = useSelector(state => state.auth.isAuthenticated);







useEffect(() => {

  disptach(loadUser()),
 
  registerTaskAsync();


  

  
}, []);

const registerTaskAsync = async () => {
  await BackgroundFetch.registerTaskAsync(TASK_NAME,{
    minimumInterval: 5});

};
 
  return (

    
    <NavigationContainer>
    {isAuthenticated  ?  (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props } />}>
    <Drawer.Screen
   name="Sensors_Mgmt"
   component={SensorMgntStackScreen}
   options={{}}/>
    <Drawer.Screen 
     name="About"
     component={AboutStackScreen}
     options={{}} 
   />
   <Drawer.Screen
   name="Setting"
   component={SettingStackScreen}
   options={{}}/>
   
  </Drawer.Navigator>)

      : <RootStackScreen/>}
     

    </NavigationContainer>
   
  );
  
}
