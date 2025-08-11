// AI配置文件
export interface AIConfig {
    baseURL: string
    apiKey: string
    model: string
    timeout: number
    maxTokens: number
    temperature: number
}

// 默认配置 - 智谱AI
export const defaultAIConfig: AIConfig = {
    baseURL: 'https://open.bigmodel.cn/api/paas/v4/', // 智谱AI接口地址
    apiKey: 'a835b9f6866d48ec956d341418df8a50.NuhlKYn58EkCb5iP', // API密钥
    model: 'glm-4-flash-250414', // 智谱AI模型
    timeout: 30000, // 30秒超时
    maxTokens: 2000, // 最大token数
    temperature: 0.7 // 创造性参数
}

// 支持的AI服务提供商
export const AI_PROVIDERS = {
    ZHIPU: {
        name: '智谱AI',
        baseURL: 'https://open.bigmodel.cn/api/paas/v4/',
        models: ['glm-4-flash-250414', 'glm-4', 'glm-3-turbo']
    },
    OPENAI: {
        name: 'OpenAI',
        baseURL: 'https://api.openai.com/v1',
        models: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo']
    },
    AZURE: {
        name: 'Azure OpenAI',
        baseURL: '', // 需要填入Azure端点
        models: ['gpt-35-turbo', 'gpt-4']
    },
    ANTHROPIC: {
        name: 'Anthropic Claude',
        baseURL: 'https://api.anthropic.com/v1',
        models: ['claude-3-sonnet', 'claude-3-opus']
    },
    CUSTOM: {
        name: '自定义接口',
        baseURL: '', // 自定义端点
        models: ['custom-model']
    }
}

// 菜系提示词模板
export const CUISINE_PROMPTS = {
    system: '你是一位专业的厨师，请根据用户提供的食材和菜系要求，生成详细的菜谱。',
    responseFormat: `请按照以下JSON格式返回菜谱：
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
}
