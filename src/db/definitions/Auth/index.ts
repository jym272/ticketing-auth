import { DataTypes, Sequelize } from 'sequelize';
import { Auth } from '@db/models';

export const init = (sequelize: Sequelize) => {
  Auth.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'email',
        unique: true
      },
      hashPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'hashPassword'
      },
      token: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        field: 'token'
      }
    },
    {
      sequelize,
      tableName: 'auth'
    }
  );
};
