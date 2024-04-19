import axios from 'axios';
import { appConfig } from '../data/appConfig';

export const apiInstance = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: 50000,
});
