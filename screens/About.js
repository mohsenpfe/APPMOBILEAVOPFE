import React from 'react'
import{View,StyleSheet,Text,Linking} from 'react-native';


     
export default function About({navigation}) {
    return (
        
        <View style={styles.container}>
        <Text style={styles.titel}>END OF STUDIES PROJECT TO PREDECT THE FAILURE OF YOUR INDUSTRIAL DEVICES  </Text>
        <Text style={styles.description}> Project Description:
        Built a friendly U.I cross platform App to predict a failure in the industrial
        devices with React Native and Node JS along with MongoDB and Express
        in the Back End side, deployed on HEROKU, Authentication with JWT
        .State Management with Redux and Redux-Persist and it support many
        features like real time push notification that work when the APP is closed or in
        Background to notify the user if any change happen or any predicted
        failure in their devices.
        </Text>
       <View style={styles.footer}>
       <Text style={{color:'black'}} >Let's connect on
       <Text  style={{color:'blue',textDecorationLine:'underline'}} onPress={() => Linking.openURL('https://www.linkedin.com/in/mohamed-ben-youssef-06619470/')}> Linkedin </Text></Text>
       

       <Text styles={styles.copyright }>MOHAMED BEN YOUSSEF </Text>
       <Text styles={styles.copyright}>Copy Right Top Tech 2021©</Text>
       
      
       </View>
        
      </View>
    )
}

const styles=StyleSheet.create({
  container:{
     flex:1,
     padding:5,
     alignItems: 'center',
     justifyContent:'center'
    
   

     
  },

  titel:{
   flex:0.2,
    borderWidth:1,
    borderColor:'#009387',
    borderRadius:10,
   fontSize:20,
   textAlign:'center', 
   margin:10
  
},
description:{
  flex:0.6,
  borderWidth:1,
  borderColor:'#009387',
  borderRadius:10,
fontSize:20,
textAlign:'center', 
justifyContent:'center',
margin:10

},

copyright:{

marginRight:100

},


footer:{
  flex:0.1,


  
}

})