import React , { useState } from 'react';
import{Alert,Text, View,StyleSheet ,TouchableOpacity,Modal,TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deleteAccount} from '../redux/actions/authaction';
import {addSensor} from '../redux/actions/sensoraction';

export default function Setting({navigation}) {


  const [modalVisible, setModalVisible] = useState(false);
  const disptach= useDispatch();
  const email = useSelector(state => state.auth.user?.email);
  const user = useSelector(state => state.auth.user?.email);

  const [sensor_name,setSensor]=useState('');
  const removeAccountAlert = () =>
     Alert.alert(
    "Delete Alert",
    `Are you sure you want delete your account ${email}`,
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "OK", onPress: () => {disptach(deleteAccount({email}))} }
    ]
  );
  const hundelSubmit=()=>{
  if(!sensor_name)
  {
    Alert.alert("Sensor name is required");
  }
    setModalVisible(!modalVisible);

    disptach(addSensor({user,sensor_name}));
    setSensor('');

  }
   

    return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
     
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{fontSize:25}}>Add New Sensor </Text>
             
             <View style={{flexDirection:'row'}}>
        
             <TextInput 
             placeholder="  Sensor Name:"
             autoCapitalize='none'
             value={sensor_name}
             style={{borderWidth:1,borderColor:'#009387',width:200,height:50,alignItems:'center',borderRadius:10, margin:30,justifyContent:'center'}}
             onChangeText={setSensor}
             /> 
             </View>
              <TouchableOpacity onPress={hundelSubmit}
      style={[styles.signIn,
          { 
          borderBottomColor:'#009387',
           borderWidth:1,
       
      }]}
      >

      <Text style={[styles.textSign,{
          color:'#009387'
      }]} > Add New sensor </Text>
      </TouchableOpacity>
            </View>
          </View>
        </Modal>
       
      </View>
   
      <TouchableOpacity  onPress={() => setModalVisible(true)}
      style={[styles.signIn,
          { 
          borderBottomColor:'#009387',
           borderWidth:1,
           marginTop:100
      }]}>

      <Text style={[styles.textSign,{
        color:'#009387'
    }]} > Add New Sensor </Text>
      </TouchableOpacity>
     

      <TouchableOpacity onPress={removeAccountAlert} 
      style={[styles.signIn,
          { 
          borderBottomColor:'#009387',
           borderWidth:1,
           marginTop:100
      }]}
      >

      <Text style={[styles.textSign,{
          color:'red'
      }]} > Delete Your Account </Text>
      </TouchableOpacity>
    </View>
    )}
    const styles = StyleSheet.create({

      signIn: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  centeredView: {
 
    justifyContent: "center",
    alignItems: "center",
 
 
  },
  modalView: {
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    width:320,
    height:320,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    
  },

})