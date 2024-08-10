import Recipe from "./Recipe";
import User from "./User";


User.hasMany(Recipe, {
    sourceKey: 'id',
    foreignKey: 'userID',
    as: 'recipes', // Nome do campo de relação
  });

Recipe.belongsTo(User, { foreignKey: 'authorId' }); // Estabelece a relação


export {
  Recipe,
  User
};
