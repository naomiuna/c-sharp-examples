import { base } from './environment.base';
import { extend } from 'lodash';

export const environment = extend(base, {
  production: false,
  appBase: 'https://exo-dev.boxmodeltest.co.uk/',
  authorityBase: 'https://exo-auth-dev.boxmodeltest.co.uk/',
  apiBase: 'https://exo-api-dev.boxmodeltest.co.uk/',
  portalBase: 'http://teo.boxmodeltest.co.uk/'
});
