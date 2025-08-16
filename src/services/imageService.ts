import type { Recipe } from '@/types'

const API_KEY = import.meta.env.VITE_IMAGE_BIGMODEL_API_KEY
const API_URL = 'https://open.bigmodel.cn/api/paas/v4/images/generations'

export interface GeneratedImage {
    url: string
    id: string
}

export const generateRecipeImage = async (recipe: Recipe): Promise<GeneratedImage> => {
    // 构建图片生成的提示词
    const prompt = buildImagePrompt(recipe)

    const sizeToUse = { width: 1024, height: 1024 }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'cogview-3-flash',
                prompt: prompt,
                size: `${sizeToUse.width}x${sizeToUse.height}`,
                n: 1,
                style: 'vivid',
                quality: 'hd'
            })
        })

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`)
        }

        const data = await response.json()

        if (data.data && data.data.length > 0) {
            return {
                url: data.data[0].url,
                id: `${recipe.id}-${Date.now()}`
            }
        } else {
            throw new Error('API返回数据格式错误')
        }
    } catch (error) {
        console.error('生成图片失败:', error)
        throw error
    }
}

const buildImagePrompt = (recipe: Recipe): string => {
    // 根据菜谱信息构建详细的图片生成提示词
    const ingredients = recipe.ingredients.join('、')
    const cuisineStyle = recipe.cuisine.replace('大师', '').replace('菜', '')

    return `一道精美的${cuisineStyle}菜肴：${recipe.name}，主要食材包括${ingredients}。菜品摆盘精致，色彩丰富，光线柔和，专业美食摄影风格，高清画质，餐厅级别的视觉效果。背景简洁，突出菜品本身的美感。`
}
