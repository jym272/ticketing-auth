import { DataTypes, Sequelize } from 'sequelize';
import { User } from '@db/models';

export const init = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        field: 'email'
      },
      hashPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'hashPassword'
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: 'user'
    }
  );
};
