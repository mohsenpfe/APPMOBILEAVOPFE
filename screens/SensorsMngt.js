import React,{useState,useEffect} from 'react';
import { Text, View,StyleSheet,TouchableOpacity,StatusBar,FlatList,SafeAreaView,Alert}  from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {getSensors} from '../redux/actions/sensoraction';
import {deleteSensor} from '../redux/actions/sensoraction'






export default function SensorsMngt({navigation}) {
  const [Color,setColor]=useState(true);
  const checkverbration=(val)=>{
    if(val>40 && val<90)
    return setColor(true)
    else
    return setColor(false)
  }

const [reload,setReaload]=useState(false)
  const renderItem = ({ item }) => (
    <Item title={item.sensor_name}
          vir={item.virbration}
          temp={item.temperature}
          elecmag={item.electromagnetic}
    />
  );
  const sensors = useSelector(state => state.sensor);
console.log(sensors)
 const user= useSelector(state => state.auth.user.email);

  const dispatch = useDispatch();

  const Item = ({ title,vir,temp, elecmag}) => (
    <View style={styles.item}>
      <Text style={styles.title}>Sensor {title}</Text>
      <View style={{ borderWidth:1,
        borderColor:'#009387',
        borderRadius:10,
         margin:5}}>
      
      <Text style={{color:(vir>20 && vir<50)?'green':'red'}}>• virbration: {vir} dB</Text>
      <Text style={{color:(temp=>40 && temp<=90)?'green':'red'}}>• temperature: {temp} °C</Text>
      <Text style={{color:(elecmag=>2.5 && elecmag<=4)?'green':'red'}}>• electromagnetic field: {elecmag} µT</Text>
      </View>
      <TouchableOpacity style={styles.deletebutton} onPress = {()=>hundeldelete({title})} 
      >
       <Text style={{color:'red'}}>x</Text>
      </TouchableOpacity>
    </View>
  );
const hundeldelete=({title})=>
  Alert.alert(
    "Delete Alert",
    `Are you sure you want to delete your sensor ${title}`,
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "OK", onPress: () => {
        
        dispatch(deleteSensor({title}))
        setReaload(true)
      
      } }
    ]
  );

 

  useEffect(() => {
    dispatch(getSensors({user}))
    setReaload(false)
  }, [user,reload])

   const  DATA=sensors.sensors;


return(
  <Animatable.View style={styles.container}
  animation='slideInLeft'
  >
  <SafeAreaView >
  <FlatList
    data={DATA}
    renderItem={renderItem}
    keyExtractor={item => item._id}
  />
</SafeAreaView>
</Animatable.View>
)
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems:'center',
  
  },
  item: {
 
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:20,
    width:280,
    height:170,
    borderColor:'#009387',
    borderWidth:3
   
  },
  title: {
    color:'black',
    fontSize: 20,
    textAlign:'center',
    borderWidth:1,
    borderColor:'#009387',
    borderRadius:10,
  },
  virbration:{
   textAlign:'left',
   fontSize: 15,
   color:'black',
  },
  deletebutton:{
    backgroundColor:'#009387',
    borderWidth:1,
    color:'#CD5C5C',
    borderRadius:10,
   justifyContent:'center',
   alignItems:'center',
   width:40,
   margin:10


  },
  red:{
    textAlign:'left',
    fontSize: 15,
    color:'red'
  },
  green:{
    textAlign:'left',
    fontSize: 15,
    color:'green'
  }
});