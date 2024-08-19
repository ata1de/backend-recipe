export class RecipeNotFound extends Error {
    constructor() {
      super('Recipe not found')
    }
  }