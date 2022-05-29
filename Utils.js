import axios from 'axios';
export const API=axios.create({
    baseURL: 'http://192.168.245.238:5000/api/'
})
