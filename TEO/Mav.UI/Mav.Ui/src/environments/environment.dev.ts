import { base } from './environment.base';
import { extend } from 'lodash';

export const environment = extend(base, {
  production: false,
  appBase: 'http://localhost:44444/',
  authorityBase: 'https://localhost:44323/',
  apiBase: 'https://localhost:44303/',
  portalBase: 'http://localhost:5001/'
});
