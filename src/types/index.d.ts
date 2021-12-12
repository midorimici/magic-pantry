type Ingredient = {
  name: string
  quantity: string
  date: string
  description: string
}

type Ingredients = Record<string, Ingredient>

type IngredientResponse = {
  id: number
  amount: number
  unit: string
  unitLong: string
  unitShort: string
  aisle: string
  name: string
  original: string
  originalString: string
  originalName: string
  metaInformation: string[]
  meta: string[]
  image: string
}

type Recipe = {
  id: number
  title: string
  image: string
  imageType: string
  usedIngredientCount: number
  missedIngredientCount: number
  missedIngredients: IngredientResponse[]
  usedIngredients: IngredientResponse[]
  unusedIngredients: IngredientResponse[]
  likes: number
}

type RecipeDetail = {
  id: number
  title: string
  image: string
  sourceUrl: string
  spoonacularSourceUrl: string
  summary: string
}
