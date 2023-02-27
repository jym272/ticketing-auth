import { Model } from 'sequelize';

export class Auth extends Model {
  public id!: number;
  public hashPassword!: string;
  public email!: string;
  public token: string | undefined;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
