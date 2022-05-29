
import {ADDSENSOR_SECCESS,
DISPLAYSENSORS_SECCESS,
DELETESENSOR_SECCESS,
SENSORSLOADING,
UPDATESENSORS_SECCESS
} from '../actions/types';

const initialState = {
    sensors: [],
    loading: false
  };
export default function(state=initialState, action) {
    switch (action.type) {
      case DISPLAYSENSORS_SECCESS:
        return {
          ...state,
          sensors: action.payload,
          loading: false
        };
      case DELETESENSOR_SECCESS:
        return {
          ...state,
          sensors: state.sensors.filter(sensor => sensor.sensor_name !== action.payload)
        };
      case ADDSENSOR_SECCESS:
        return {
          ...state,
          sensors: [action.payload, ...state.sensors]
        };
      case SENSORSLOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }}