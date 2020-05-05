import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-24da5.firebaseio.com/',
});

export default instance;
