import { Recipe } from "./Recipe";
import { User } from "./User";


Recipe.belongsTo(User, { foreignKey: 'authorId' });

User.hasMany(Recipe, { as: 'recipes'});

export { Recipe, User };

