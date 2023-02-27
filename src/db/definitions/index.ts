import { Sequelize } from 'sequelize';

import * as auth from '@db/definitions/Auth';

const appLabels = [auth];

export const initDefinitions = (sequelize: Sequelize) => {
  for (const label of appLabels) {
    label.init(sequelize);
  }
};
