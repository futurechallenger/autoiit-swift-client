import { Platform } from 'react-native';
import { SERVER_HOST_URL } from '@env';

// TODO: for production const SERVER_URL = SERVER_HOST_URL;
const SERVER_URL = "http://localhost:5051"; // TODO: for dev

console.log(`>>>SERVER_URL:${SERVER_URL}`);

const REQUEST_COUNT = 10;
const TOKEN_KEY = '_token';
export { SERVER_URL, REQUEST_COUNT, TOKEN_KEY };
