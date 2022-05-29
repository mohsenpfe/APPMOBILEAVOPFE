import AsyncStorage from '@react-native-async-storage/async-storage';
const setToken = async (token) => {
    try {
      await AsyncStorage.setItem('token',token )
    } catch(e) {
     console.log('erreur setting a token');
    }
}
export default setToken;
