import { Recipe } from "./Recipe";
import { User } from "./User";


Recipe.belongsTo(User, { foreignKey: 'authorId', as: 'user' });

User.hasMany(Recipe, {  foreignKey: 'authorId', as: 'recipes' });

export { Recipe, User };

