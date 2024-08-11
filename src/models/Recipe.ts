import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/index'; // Assumindo que você tenha um modelo Author já definido

interface RecipeAttributes {
  id: number;
  title: string;
  description: string;
  time: number;
  difficulty: string;
  category: string;
  calories: number;
  imgUrl: string;
  // authorId: number;
}

export interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'id'> {}

export interface RecipeInstance extends Model<RecipeAttributes, RecipeCreationAttributes>, RecipeAttributes {}

const Recipe = sequelize.define<RecipeInstance, RecipeAttributes>('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // authorId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // }
})

export { Recipe };
