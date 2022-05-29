import AsyncStorage from '@react-native-async-storage/async-storage';
const getToken = async () => {
  try{
    const value = await AsyncStorage.getItem('token')
    return value
  
  } 
  catch(e)
  {console.log('no token retrieved');}

  
  }
  export default getToken;