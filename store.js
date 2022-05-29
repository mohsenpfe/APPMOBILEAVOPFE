import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig ={
  key: 'root',
 storage:AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const initialState = {};

const middleWare = [thunk];


 export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools( applyMiddleware(...middleWare),
 
  ));
export const persistor = persistStore(store);
