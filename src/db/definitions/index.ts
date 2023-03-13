import { Sequelize } from 'sequelize';

import * as auth from '@db/definitions/Auth';
import * as user from '@db/definitions/User';

const appLabels = [auth, user];

export const initDefinitions = (sequelize: Sequelize) => {
  for (const label of appLabels) {
    label.init(sequelize);
  }
};
