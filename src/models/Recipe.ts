import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/index'; // Assumindo que você tenha um modelo Author já definido

interface RecipeAttributes {
  id?: number;
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

class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public time!: number;
  public difficulty!: string;
  public category!: string;
  public calories!: number;
  public imgUrl!: string;
  // public authorId!: number;
}

Recipe.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // authorId: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: 'Authors', // Nome da tabela de autores
  //     key: 'id',
  //   },
  //   allowNull: false,
  //   onUpdate: 'CASCADE',
  //   onDelete: 'SET NULL',
  // },
}, {
  sequelize,
  modelName: 'Recipe',
});

export default Recipe