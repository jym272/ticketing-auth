import { Sequelize } from 'sequelize';

import * as user from '@db/definitions/User';

const appLabels = [user];

export const initDefinitions = (sequelize: Sequelize) => {
  for (const label of appLabels) {
    label.init(sequelize);
  }
};
