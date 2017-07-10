/**
 * EnvEnum module.
 * @module enums/EnvEnum
 */

import projectConfig from 'project-config';

import Enum from 'enum-utils/Enum';

const EnvEnum = Enum({
  DEVELOPMENT: projectConfig.env === 'development',
  TEST: projectConfig.env === 'test',
  PRODUCTION: projectConfig.env === 'production'
});

export default EnvEnum;
