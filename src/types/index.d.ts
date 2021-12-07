type Ingredient = {
  name: string
  quantity: string
  date: string
  description: string
}

type Ingredients = Record<string, Ingredient>
