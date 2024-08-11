import path from 'path';
import { Sequelize } from 'sequelize';

// Criação da instância do Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '.sqlite'), // Ajuste do caminho para o banco de dados SQLite
});

export default sequelize;
