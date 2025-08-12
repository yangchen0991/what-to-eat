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
    nutritionAnalysis?: NutritionAnalysis // 营养分析
}

// 制作步骤
export interface RecipeStep {
    step: number
    description: string
    time?: number
    temperature?: string
    image?: string
}

// 营养信息
export interface NutritionInfo {
    calories: number // 卡路里
    protein: number // 蛋白质 (g)
    carbs: number // 碳水化合物 (g)
    fat: number // 脂肪 (g)
    fiber: number // 膳食纤维 (g)
    sodium: number // 钠 (mg)
    sugar: number // 糖 (g)
    vitaminC?: number // 维生素C (mg)
    calcium?: number // 钙 (mg)
    iron?: number // 铁 (mg)
}

// 营养分析
export interface NutritionAnalysis {
    nutrition: NutritionInfo
    healthScore: number // 健康评分 (1-10)
    balanceAdvice: string[] // 营养均衡建议
    dietaryTags: string[] // 饮食标签，如"低脂"、"高蛋白"等
    servingSize: string // 建议份量
}

// AI响应类型
export interface AIResponse {
    success: boolean
    data: Recipe
    message?: string
}
