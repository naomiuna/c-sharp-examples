import { base } from './environment.base';
import { extend } from 'lodash';

export const environment = extend(base, {
  production: true,
  appBase: 'https://www.teoonlinemodules.co.uk/',
  authorityBase: 'https://auth.teoonlinemodules.co.uk/',
  apiBase: 'https://api.teoonlinemodules.co.uk/',
  portalBase: 'https://www.teoportal.org/'
});
