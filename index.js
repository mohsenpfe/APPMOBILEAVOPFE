import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import {store,persistor} from './store';
import React from 'react';
import {View,ActivityIndicator,StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'
const Main =()=>{
    const renderLoading = () => (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    return(
     
        <Provider store={store}>
        <PersistGate loading={renderLoading} persistor={persistor}>
        <App/>
        </PersistGate>
       </Provider>
  
       )
   
}
registerRootComponent(Main);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });