import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

// eslint-disable-next-line no-use-before-define -- circular dependency allowed
export class Auth extends Model<InferAttributes<Auth>, InferCreationAttributes<Auth>> {
  declare id: CreationOptional<number>;
  declare hashPassword: string;
  declare email: string;
  declare token: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
