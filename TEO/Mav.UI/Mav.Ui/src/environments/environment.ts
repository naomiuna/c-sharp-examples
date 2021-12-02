import { base } from './environment.base';
import { extend } from 'lodash';

export const environment = extend(base, {
  production: false
});
