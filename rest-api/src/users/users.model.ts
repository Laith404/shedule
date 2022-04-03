import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
  login: string;
  password: string;
}

@Table({tableName: 'sh-users'})
export class User extends Model<User, UserCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: Number;

  @Column({type: DataType.STRING, allowNull: false})
  login: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}

