// 简单的AI接口测试脚本
const axios = require('axios');

const AI_CONFIG = {
    baseURL: 'https://open.bigmodel.cn/api/paas/v4/',
    apiKey: 'a835b9f6866d48ec956d341418df8a50.NuhlKYn58EkCb5iP',
    model: 'glm-4-flash-250414',
    temperature: 0.7,
    timeout: 30000
};

async function testAI() {
    try {
        console.log('🧪 开始测试智谱AI接口...');

        const response = await axios.post(`${AI_CONFIG.baseURL}/chat/completions`, {
            model: AI_CONFIG.model,
            messages: [
                {
                    role: 'system',
                    content: '你是一位专业的厨师，请根据用户提供的食材和菜系要求，生成详细的菜谱。请严格按照JSON格式返回，不要包含任何其他文字。'
                },
                {
                    role: 'user',
                    content: `你是一位川菜大师，精通四川菜系。川菜以麻辣鲜香、口味多变著称，有"一菜一格，百菜百味"的美誉。请根据用户提供的食材，设计一道地道的川菜，突出麻辣特色和层次丰富的口感。回答要包含菜名、详细制作步骤、调料配比和川菜技法。

用户提供的食材：土豆、肉丝

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
                }
            ],
            temperature: AI_CONFIG.temperature,
            max_tokens: 2000,
            stream: false
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`
            },
            timeout: AI_CONFIG.timeout
        });

        console.log('✅ AI接口调用成功！');
        console.log('📝 响应内容：');
        console.log(response.data.choices[0].message.content);

        // 尝试解析JSON
        try {
            const content = response.data.choices[0].message.content.trim();
            let cleanContent = content;
            if (cleanContent.startsWith('```json')) {
                cleanContent = cleanContent.replace(/```json\s*/, '').replace(/```\s*$/, '');
            } else if (cleanContent.startsWith('```')) {
                cleanContent = cleanContent.replace(/```\s*/, '').replace(/```\s*$/, '');
            }

            const recipe = JSON.parse(cleanContent);
            console.log('🍽️ 解析后的菜谱：');
            console.log(JSON.stringify(recipe, null, 2));
        } catch (parseError) {
            console.log('⚠️ JSON解析失败，但接口调用成功');
        }

    } catch (error) {
        console.error('❌ AI接口测试失败：');
        if (error.response) {
            console.error('状态码:', error.response.status);
            console.error('错误信息:', error.response.data);
        } else {
            console.error('错误详情:', error.message);
        }
    }
}

// 运行测试
testAI();