import { combineReducers } from 'redux';
import errorReducer from './errorreducer';
import authReducer from './authreducer';
import sensorReducer from './sensorreducer'

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  sensor:sensorReducer
});
