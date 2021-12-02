import { base } from './environment.base';
import { extend } from 'lodash';

export const environment = extend(base, {
  production: false,
  appBase: 'https://exo-uat.boxmodelstaging.co.uk/',
  authorityBase: 'https://exo-auth-uat.boxmodelstaging.co.uk/',
  apiBase: 'https://exo-api-uat.boxmodelstaging.co.uk/'
});
