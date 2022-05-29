import AsyncStorage from '@react-native-async-storage/async-storage';
const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token')
    } catch(e) {
     console.log('removing error');
    }
  }
  export default removeToken;
