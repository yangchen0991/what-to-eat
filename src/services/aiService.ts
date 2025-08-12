import axios from 'axios'
import type { Recipe, CuisineType, NutritionAnalysis } from '@/types'

// AI服务配置 - 智谱AI
const AI_CONFIG = {
    // baseURL: 'https://open.bigmodel.cn/api/paas/v4/',
    // apiKey: 'a835b9f6866d48ec956d341418df8a50.NuhlKYn58EkCb5iP',
    // model: 'glm-4-flash-250414',
    // temperature: 0.7,
    // timeout: 30000
    baseURL: 'https://api.deepseek.com/v1/',
    apiKey: 'sk-78d4fed678fa4a5ebc5f7beac54b1a78',
    model: 'deepseek-chat',
    temperature: 0.7,
    timeout: 300000
}

// 创建axios实例
const aiClient = axios.create({
    baseURL: AI_CONFIG.baseURL,
    timeout: AI_CONFIG.timeout,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AI_CONFIG.apiKey}`
    }
})

/**
 * 调用AI接口生成菜谱
 * @param ingredients 食材列表
 * @param cuisine 菜系信息
 * @param customPrompt 自定义提示词（可选）
 * @returns Promise<Recipe>
 */
export const generateRecipe = async (ingredients: string[], cuisine: CuisineType, customPrompt?: string): Promise<Recipe> => {
    try {
        // 构建提示词
        let prompt = `${cuisine.prompt}

用户提供的食材：${ingredients.join('、')}`

        // 如果有自定义要求，添加到提示词中
        if (customPrompt) {
            prompt += `

用户的特殊要求：${customPrompt}`
        }

        prompt += `

请按照以下JSON格式返回菜谱，包含营养分析：
{
  "name": "菜品名称",
  "ingredients": ["食材1", "食材2"],
  "steps": [
    {
      "step": 1,
      "description": "步骤描述",
      "time": 5,
      "temperature": "中火"
    }
  ],
  "cookingTime": 30,
  "difficulty": "medium",
  "tips": ["技巧1", "技巧2"],
  "nutritionAnalysis": {
    "nutrition": {
      "calories": 350,
      "protein": 25,
      "carbs": 45,
      "fat": 12,
      "fiber": 8,
      "sodium": 800,
      "sugar": 6,
      "vitaminC": 30,
      "calcium": 150,
      "iron": 3
    },
    "healthScore": 8,
    "balanceAdvice": ["建议搭配蔬菜沙拉增加维生素", "可适量减少盐分"],
    "dietaryTags": ["高蛋白", "低脂"],
    "servingSize": "1人份"
  }
}`

        // 调用智谱AI接口
        const response = await aiClient.post('/chat/completions', {
            model: AI_CONFIG.model,
            messages: [
                {
                    role: 'system',
                    content: '你是一位专业的厨师，请根据用户提供的食材和菜系要求，生成详细的菜谱。请严格按照JSON格式返回，不要包含任何其他文字。'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: AI_CONFIG.temperature,
            stream: false
        })

        // 解析AI响应
        const aiResponse = response.data.choices[0].message.content

        // 清理响应内容，提取JSON部分
        let cleanResponse = aiResponse.trim()
        if (cleanResponse.startsWith('```json')) {
            cleanResponse = cleanResponse.replace(/```json\s*/, '').replace(/```\s*$/, '')
        } else if (cleanResponse.startsWith('```')) {
            cleanResponse = cleanResponse.replace(/```\s*/, '').replace(/```\s*$/, '')
        }

        const recipeData = JSON.parse(cleanResponse)

        // 构建完整的Recipe对象
        const recipe: Recipe = {
            id: `recipe-${cuisine.id}-${Date.now()}`,
            name: recipeData.name || `${cuisine.name}推荐菜品`,
            cuisine: cuisine.name,
            ingredients: recipeData.ingredients || ingredients,
            steps: recipeData.steps || [
                { step: 1, description: '准备所有食材', time: 5 },
                { step: 2, description: '按照传统做法烹饪', time: 20 }
            ],
            cookingTime: recipeData.cookingTime || 25,
            difficulty: recipeData.difficulty || 'medium',
            tips: recipeData.tips || ['注意火候控制', '调味要适中'],
            nutritionAnalysis: recipeData.nutritionAnalysis || generateFallbackNutrition(ingredients)
        }

        return recipe
    } catch (error) {
        console.error(`生成${cuisine.name}菜谱失败:`, error)

        // 抛出错误，让上层处理
        throw new Error(`AI生成${cuisine.name}菜谱失败，请稍后重试`)
    }
}

/**
 * 批量生成多个菜系的菜谱
 * @param ingredients 食材列表
 * @param cuisines 菜系列表
 * @param customPrompt 自定义提示词（可选）
 * @returns Promise<Recipe[]>
 */
export const generateMultipleRecipes = async (ingredients: string[], cuisines: CuisineType[], customPrompt?: string): Promise<Recipe[]> => {
    try {
        // 并发调用多个AI接口
        const promises = cuisines.map(cuisine => generateRecipe(ingredients, cuisine, customPrompt))

        const recipes = await Promise.all(promises)
        return recipes
    } catch (error) {
        console.error('批量生成菜谱失败:', error)
        throw new Error('批量生成菜谱失败')
    }
}

/**
 * 更新AI配置
 * @param config 新的配置
 */
export const updateAIConfig = (config: Partial<typeof AI_CONFIG>) => {
    Object.assign(AI_CONFIG, config)

    // 更新axios实例配置
    aiClient.defaults.baseURL = AI_CONFIG.baseURL
    aiClient.defaults.headers['Authorization'] = `Bearer ${AI_CONFIG.apiKey}`
}

/**
 * 使用自定义提示词生成菜谱
 * @param ingredients 食材列表
 * @param customPrompt 自定义提示词
 * @returns Promise<Recipe>
 */
export const generateCustomRecipe = async (ingredients: string[], customPrompt: string): Promise<Recipe> => {
    try {
        // 构建自定义提示词
        const prompt = `你是一位专业的厨师，请根据用户提供的食材和特殊要求，生成详细的菜谱。请严格按照JSON格式返回，不要包含任何其他文字。

用户提供的食材：${ingredients.join('、')}

用户的特殊要求：${customPrompt}

请按照以下JSON格式返回菜谱，包含营养分析：
{
  "name": "菜品名称",
  "ingredients": ["食材1", "食材2"],
  "steps": [
    {
      "step": 1,
      "description": "步骤描述",
      "time": 5,
      "temperature": "中火"
    }
  ],
  "cookingTime": 30,
  "difficulty": "medium",
  "tips": ["技巧1", "技巧2"],
  "nutritionAnalysis": {
    "nutrition": {
      "calories": 350,
      "protein": 25,
      "carbs": 45,
      "fat": 12,
      "fiber": 8,
      "sodium": 800,
      "sugar": 6,
      "vitaminC": 30,
      "calcium": 150,
      "iron": 3
    },
    "healthScore": 8,
    "balanceAdvice": ["建议搭配蔬菜沙拉增加维生素", "可适量减少盐分"],
    "dietaryTags": ["高蛋白", "低脂"],
    "servingSize": "1人份"
  }
}`

        // 调用智谱AI接口
        const response = await aiClient.post('/chat/completions', {
            model: AI_CONFIG.model,
            messages: [
                {
                    role: 'system',
                    content: '你是一位专业的厨师，请根据用户提供的食材和特殊要求，生成详细的菜谱。请严格按照JSON格式返回，不要包含任何其他文字。'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: AI_CONFIG.temperature,
            max_tokens: 2000,
            stream: false
        })

        // 解析AI响应
        const aiResponse = response.data.choices[0].message.content

        // 清理响应内容，提取JSON部分
        let cleanResponse = aiResponse.trim()
        if (cleanResponse.startsWith('```json')) {
            cleanResponse = cleanResponse.replace(/```json\s*/, '').replace(/```\s*$/, '')
        } else if (cleanResponse.startsWith('```')) {
            cleanResponse = cleanResponse.replace(/```\s*/, '').replace(/```\s*$/, '')
        }

        const recipeData = JSON.parse(cleanResponse)

        // 构建完整的Recipe对象
        const recipe: Recipe = {
            id: `recipe-custom-${Date.now()}`,
            name: recipeData.name || '自定义菜品',
            cuisine: '自定义',
            ingredients: recipeData.ingredients || ingredients,
            steps: recipeData.steps || [
                { step: 1, description: '准备所有食材', time: 5 },
                { step: 2, description: '按照要求烹饪', time: 20 }
            ],
            cookingTime: recipeData.cookingTime || 25,
            difficulty: recipeData.difficulty || 'medium',
            tips: recipeData.tips || ['根据个人口味调整', '注意火候控制'],
            nutritionAnalysis: recipeData.nutritionAnalysis || generateFallbackNutrition(ingredients)
        }

        return recipe
    } catch (error) {
        console.error('生成自定义菜谱失败:', error)

        // 抛出错误，让上层处理
        throw new Error('AI生成自定义菜谱失败，请稍后重试')
    }
}

/**
 * 生成后备营养分析数据
 * @param ingredients 食材列表
 * @returns NutritionAnalysis
 */
const generateFallbackNutrition = (ingredients: string[]): NutritionAnalysis => {
    // 基于食材数量和类型估算营养成分
    const baseCalories = ingredients.length * 50 + Math.floor(Math.random() * 100) + 200
    const hasVegetables = ingredients.some(ing => ['菜', '瓜', '豆', '萝卜', '白菜', '菠菜', '西红柿', '黄瓜', '茄子', '土豆'].some(veg => ing.includes(veg)))
    const hasMeat = ingredients.some(ing => ['肉', '鸡', '鱼', '虾', '蛋', '牛', '猪', '羊'].some(meat => ing.includes(meat)))
    const hasGrains = ingredients.some(ing => ['米', '面', '粉', '饭', '面条', '馒头'].some(grain => ing.includes(grain)))

    // 生成饮食标签
    const dietaryTags: string[] = []
    if (hasVegetables && !hasMeat) dietaryTags.push('素食')
    if (hasMeat) dietaryTags.push('高蛋白')
    if (hasVegetables) dietaryTags.push('富含维生素')
    if (!hasGrains) dietaryTags.push('低碳水')
    if (baseCalories < 300) dietaryTags.push('低卡路里')

    // 生成营养建议
    const balanceAdvice: string[] = []
    if (!hasVegetables) balanceAdvice.push('建议搭配新鲜蔬菜增加维生素和膳食纤维')
    if (!hasMeat && !ingredients.some(ing => ['豆', '蛋', '奶'].some(protein => ing.includes(protein)))) {
        balanceAdvice.push('建议增加蛋白质来源，如豆类或蛋类')
    }
    if (hasGrains && hasMeat) balanceAdvice.push('营养搭配均衡，适合日常食用')
    if (ingredients.length > 5) balanceAdvice.push('食材丰富，营养全面')

    return {
        nutrition: {
            calories: baseCalories,
            protein: hasMeat ? 20 + Math.floor(Math.random() * 15) : 8 + Math.floor(Math.random() * 8),
            carbs: hasGrains ? 35 + Math.floor(Math.random() * 20) : 15 + Math.floor(Math.random() * 10),
            fat: hasMeat ? 12 + Math.floor(Math.random() * 8) : 5 + Math.floor(Math.random() * 5),
            fiber: hasVegetables ? 6 + Math.floor(Math.random() * 4) : 2 + Math.floor(Math.random() * 2),
            sodium: 600 + Math.floor(Math.random() * 400),
            sugar: 3 + Math.floor(Math.random() * 5),
            vitaminC: hasVegetables ? 20 + Math.floor(Math.random() * 30) : undefined,
            calcium: hasMeat || ingredients.some(ing => ['奶', '豆'].some(ca => ing.includes(ca))) ? 100 + Math.floor(Math.random() * 100) : undefined,
            iron: hasMeat ? 2 + Math.floor(Math.random() * 3) : undefined
        },
        healthScore: Math.floor(Math.random() * 3) + (hasVegetables ? 6 : 4) + (hasMeat ? 1 : 0),
        balanceAdvice: balanceAdvice.length > 0 ? balanceAdvice : ['营养搭配合理，可以放心享用'],
        dietaryTags: dietaryTags.length > 0 ? dietaryTags : ['家常菜'],
        servingSize: '1人份'
    }
}

// 导出配置更新函数，供外部使用
export { AI_CONFIG }
