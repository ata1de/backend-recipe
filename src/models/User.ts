import { DataTypes, Optional } from "sequelize";
import { Model } from "sequelize-typescript";
import sequelize from '../database/index';

interface UserAttributes { 
    id?: number;
    name: string;
    email: string;
    password: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
  }
  
User.init({
name: {
    type: DataTypes.STRING,
    allowNull: false,
},
email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
},
password: {
    type: DataTypes.STRING,
    allowNull: false,
},
}, {
sequelize,
modelName: 'User',
});

export default User;