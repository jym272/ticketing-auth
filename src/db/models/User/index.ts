import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

// eslint-disable-next-line no-use-before-define -- circular dependency allowed
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare hashPassword: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
