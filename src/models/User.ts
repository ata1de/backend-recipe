import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {} 

export interface UserInstance extends  Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export const User = sequelize.define<UserInstance,UserAttributes>('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})