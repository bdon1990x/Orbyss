import axios from 'react-native-axios';

const a = axios.create({
  baseURL: 'http://10.0.2.2:5000',
  responseType: 'json',
});
export default a;
