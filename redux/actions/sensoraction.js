
import {returnErrors} from './erroraction';
import {tokenConfig} from './authaction';
import {
ADDSENSOR_SECCESS,
DISPLAYSENSORS_SECCESS,
DELETESENSOR_SECCESS,
SENSORSLOADING,
UPDATESENSORS_SECCESS
} from './types';
import { API } from '../../Utils';

export const getSensors = ({user}) => (dispatch,getState) => {
    dispatch(setSensorsLoading());
   API
      .get(`sensors/updatedsensor/${user}`,tokenConfig(getState))
      .then(res =>
        dispatch({
          type: DISPLAYSENSORS_SECCESS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };
  export const addSensor = (sensor) => (dispatch,getState) => {
    console.log(sensor)
    API
      .post('sensors/newSensor',sensor, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: ADDSENSOR_SECCESS,
          payload: res.data
        })
      )
      .catch(err =>
     {   console.log({err})
        dispatch(returnErrors(err.response.data, err.response.status))}
      );
  };
  export const deleteSensor = ({title}) =>  (dispatch, getState) => {
  API
      .delete(`sensors/delete/${title}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: DELETESENSOR_SECCESS,
          payload: sensor
        })
      )
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };
  
export const setSensorsLoading = () => {
  return {
    type: SENSORSLOADING
  };
};
