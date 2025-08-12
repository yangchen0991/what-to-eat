import axios from 'axios'
import type { Recipe, CuisineType, NutritionAnalysis, WinePairing } from '@/types'

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

请按照以下JSON格式返回菜谱，包含营养分析和酒水搭配：
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
  },
  "winePairing": {
    "name": "推荐酒水名称",
    "type": "red_wine",
    "reason": "搭配理由说明",
    "servingTemperature": "16-18°C",
    "glassType": "波尔多杯",
    "alcoholContent": "13.5%",
    "flavor": "风味描述",
    "origin": "产地"
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
            nutritionAnalysis: recipeData.nutritionAnalysis || generateFallbackNutrition(ingredients),
            winePairing: recipeData.winePairing || generateFallbackWinePairing(cuisine, ingredients)
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

请按照以下JSON格式返回菜谱，包含营养分析和酒水搭配：
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
  },
  "winePairing": {
    "name": "推荐酒水名称",
    "type": "red_wine",
    "reason": "搭配理由说明",
    "servingTemperature": "16-18°C",
    "glassType": "波尔多杯",
    "alcoholContent": "13.5%",
    "flavor": "风味描述",
    "origin": "产地"
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
            nutritionAnalysis: recipeData.nutritionAnalysis || generateFallbackNutrition(ingredients),
            winePairing: recipeData.winePairing || generateFallbackWinePairing({ id: 'custom', name: '自定义' } as any, ingredients)
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

/**
 * 生成后备酒水搭配数据
 * @param cuisine 菜系信息
 * @param ingredients 食材列表
 * @returns WinePairing
 */
const generateFallbackWinePairing = (cuisine: CuisineType, ingredients: string[]): WinePairing => {
    const hasSpicy = ingredients.some(ing => ['辣椒', '花椒', '胡椒', '姜', '蒜', '洋葱'].some(spice => ing.includes(spice)))
    const hasMeat = ingredients.some(ing => ['肉', '鸡', '鱼', '虾', '蛋', '牛', '猪', '羊'].some(meat => ing.includes(meat)))
    const hasSeafood = ingredients.some(ing => ['鱼', '虾', '蟹', '贝', '海带', '紫菜'].some(seafood => ing.includes(seafood)))
    const isLight = ingredients.some(ing => ['菜', '瓜', '豆腐', '蛋'].some(light => ing.includes(light)))

    // 根据菜系推荐酒水
    const cuisineWineMap: Record<string, Partial<WinePairing>> = {
        川菜大师: {
            name: '德国雷司令',
            type: 'white_wine',
            reason: '雷司令的甜度和酸度能很好地平衡川菜的麻辣，清洁口腔',
            servingTemperature: '8-10°C',
            glassType: '雷司令杯',
            alcoholContent: '11-12%',
            flavor: '清新果香，微甜带酸',
            origin: '德国莱茵河谷'
        },
        粤菜大师: {
            name: '香槟',
            type: 'white_wine',
            reason: '香槟的气泡和酸度与粤菜的清淡鲜美完美搭配',
            servingTemperature: '6-8°C',
            glassType: '香槟杯',
            alcoholContent: '12%',
            flavor: '清爽气泡，柑橘香气',
            origin: '法国香槟区'
        },
        日式料理大师: {
            name: '清酒',
            type: 'sake',
            reason: '清酒的清淡甘甜与日式料理的鲜美本味相得益彰',
            servingTemperature: '10-15°C',
            glassType: '清酒杯',
            alcoholContent: '15-16%',
            flavor: '清香甘甜，口感顺滑',
            origin: '日本'
        },
        法式料理大师: {
            name: '勃艮第红酒',
            type: 'red_wine',
            reason: '勃艮第红酒的优雅单宁与法式料理的精致风味完美融合',
            servingTemperature: '16-18°C',
            glassType: '勃艮第杯',
            alcoholContent: '13-14%',
            flavor: '优雅果香，单宁柔顺',
            origin: '法国勃艮第'
        },
        意式料理大师: {
            name: '基安帝红酒',
            type: 'red_wine',
            reason: '基安帝的酸度和果香与意式料理的番茄和香草完美搭配',
            servingTemperature: '16-18°C',
            glassType: '波尔多杯',
            alcoholContent: '12-13%',
            flavor: '樱桃果香，酸度适中',
            origin: '意大利托斯卡纳'
        },
        印度料理大师: {
            name: '拉西酸奶饮',
            type: 'non_alcoholic',
            reason: '拉西的奶香和清凉感能很好地缓解印度香料的辛辣',
            servingTemperature: '4-6°C',
            glassType: '高脚杯',
            alcoholContent: '0%',
            flavor: '奶香浓郁，清凉甘甜',
            origin: '印度'
        }
    }

    // 获取菜系推荐，如果没有则根据食材特点推荐
    let winePairing = cuisineWineMap[cuisine.name] || {}

    // 如果没有菜系特定推荐，根据食材特点推荐
    if (!winePairing.name) {
        if (hasSpicy) {
            winePairing = {
                name: '德国雷司令',
                type: 'white_wine',
                reason: '甜白酒能很好地平衡辛辣食物，清洁口腔',
                servingTemperature: '8-10°C',
                glassType: '白酒杯',
                alcoholContent: '11-12%',
                flavor: '果香浓郁，微甜清新',
                origin: '德国'
            }
        } else if (hasSeafood) {
            winePairing = {
                name: '长相思白酒',
                type: 'white_wine',
                reason: '白酒的酸度和矿物质感与海鲜的鲜味完美搭配',
                servingTemperature: '8-10°C',
                glassType: '白酒杯',
                alcoholContent: '12-13%',
                flavor: '清新草本，柑橘香气',
                origin: '新西兰'
            }
        } else if (hasMeat && !isLight) {
            winePairing = {
                name: '赤霞珠红酒',
                type: 'red_wine',
                reason: '红酒的单宁与肉类的蛋白质结合，提升整体风味',
                servingTemperature: '16-18°C',
                glassType: '波尔多杯',
                alcoholContent: '13-14%',
                flavor: '浓郁果香，单宁丰富',
                origin: '法国波尔多'
            }
        } else {
            winePairing = {
                name: '绿茶',
                type: 'tea',
                reason: '绿茶的清香淡雅与清淡菜品相得益彰，有助消化',
                servingTemperature: '70-80°C',
                glassType: '茶杯',
                alcoholContent: '0%',
                flavor: '清香淡雅，回甘甜美',
                origin: '中国'
            }
        }
    }

    return {
        name: winePairing.name || '绿茶',
        type: winePairing.type || 'tea',
        reason: winePairing.reason || '经典搭配，有助消化',
        servingTemperature: winePairing.servingTemperature || '常温',
        glassType: winePairing.glassType,
        alcoholContent: winePairing.alcoholContent,
        flavor: winePairing.flavor || '清香怡人',
        origin: winePairing.origin
    }
}

// 导出配置更新函数，供外部使用
export { AI_CONFIG }
