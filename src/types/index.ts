// 菜系类型
export interface CuisineType {
    id: string
    name: string
    description: string
    avatar: string
    specialty: string
    prompt: string
}

// 食材类型
export interface Ingredient {
    id: string
    name: string
    category: string
}

// 菜谱类型
export interface Recipe {
    id: string
    name: string
    cuisine: string
    ingredients: string[]
    steps: RecipeStep[]
    cookingTime: number
    difficulty: 'easy' | 'medium' | 'hard'
    tips: string[]
}

// 制作步骤
export interface RecipeStep {
    step: number
    description: string
    time?: number
    temperature?: string
    image?: string
}

// AI响应类型
export interface AIResponse {
    success: boolean
    data: Recipe
    message?: string
}
