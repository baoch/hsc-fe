import axios from 'axios';
import { API } from '../../constants';
// import { store } from '../../../configureStore';
//
// import { revokeAuthAction } from '../../../containers/Auth/actions';

export const getAuth = () => {
  const sessionString = localStorage.getItem('session');
  let auth;
  if (sessionString) {
    const session = JSON.parse(sessionString);
    auth = `${session.nation}|${session.user}|${session.token}`;
  }
  return auth;
};

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: API.BASEURL,
  crossdomain: true,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    'Content-Type': 'application/json',
  },
});

const uploadFile = axios.create({
  baseURL: API.BASEURL,
  crossdomain: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * Request Wrapper with default success/error actions
 */
const request = (options) => {
  const onSuccess = (response) => options.raw ? response : response.data;
  const onError = (error) => {
    console.error('Request Failed:', error.config);
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        // window.location.href = '/login';
      } else {
        // Request was made but server responded with something
        // other than 2xx
        // console.error('Status:', error.response.status);
        // console.error('Data:', error.response.data);
        // console.error('Headers:', error.response.headers);
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      // console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };
  if (options.type === 'uploadFile') {
    return uploadFile(options)
      .then(onSuccess)
      .catch(onError);
  }
  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
