import axios from 'axios'
import type { Recipe, CuisineType, AIResponse } from '@/types'

// AI服务配置 - 智谱AI
const AI_CONFIG = {
    baseURL: 'https://open.bigmodel.cn/api/paas/v4/',
    apiKey: 'a835b9f6866d48ec956d341418df8a50.NuhlKYn58EkCb5iP',
    model: 'glm-4-flash-250414',
    temperature: 0.7,
    timeout: 30000
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
 * @returns Promise<Recipe>
 */
export const generateRecipe = async (ingredients: string[], cuisine: CuisineType): Promise<Recipe> => {
    try {
        // 构建提示词
        const prompt = `${cuisine.prompt}

用户提供的食材：${ingredients.join('、')}

请按照以下JSON格式返回菜谱：
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
  "tips": ["技巧1", "技巧2"]
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
            tips: recipeData.tips || ['注意火候控制', '调味要适中']
        }

        return recipe
    } catch (error) {
        console.error(`生成${cuisine.name}菜谱失败:`, error)

        // 如果AI调用失败，返回一个基础的菜谱模板
        const fallbackRecipe: Recipe = {
            id: `recipe-${cuisine.id}-${Date.now()}`,
            name: `${cuisine.name}推荐：${ingredients.join('')}料理`,
            cuisine: cuisine.name,
            ingredients: ingredients,
            steps: [
                { step: 1, description: '准备所有食材，清洗干净', time: 5 },
                { step: 2, description: '热锅下油，爆香配料', time: 3 },
                { step: 3, description: '下主料翻炒至半熟', time: 8 },
                { step: 4, description: '调味炒制至熟透', time: 5 },
                { step: 5, description: '装盘即可享用', time: 1 }
            ],
            cookingTime: 22,
            difficulty: 'medium',
            tips: ['火候要掌握好，避免炒糊', '调料要适量，突出食材本味', '炒制过程中要勤翻动']
        }

        return fallbackRecipe
    }
}

/**
 * 批量生成多个菜系的菜谱
 * @param ingredients 食材列表
 * @param cuisines 菜系列表
 * @returns Promise<Recipe[]>
 */
export const generateMultipleRecipes = async (ingredients: string[], cuisines: CuisineType[]): Promise<Recipe[]> => {
    try {
        // 并发调用多个AI接口
        const promises = cuisines.map(cuisine => generateRecipe(ingredients, cuisine))

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

// 导出配置更新函数，供外部使用
export { AI_CONFIG }
