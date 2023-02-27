import { Sequelize } from 'sequelize';
import { createNamespace } from 'cls-hooked';
import { initDefinitions } from '@db/definitions';
import { config } from '@utils/sequelize';
const namespace = createNamespace('transaction-namespace');
Sequelize.useCLS(namespace);

let sequelizeInstance: Sequelize | null = null;
//silly comment
export const getSequelizeClient = () => {
  if (sequelizeInstance) {
    return sequelizeInstance;
  }
  sequelizeInstance = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'postgres',
    // eslint-disable-next-line no-console
    logging: process.env.CI ? false : console.log,
    port: Number(config.db.port),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  return sequelizeInstance;
};

export const createSequelize = () => getSequelizeClient();

export const initializeSequelize = async (sequelize: Sequelize) => {
  await sequelize.authenticate();
  initDefinitions(sequelize);
  await sequelize.sync();
};

export const closeSequelizeClient = (sequelize: Sequelize) => sequelize.close();
