<template>
    <div class="min-h-screen bg-yellow-400">
        <!-- 头部 - 粉色区域 -->
        <header class="bg-pink-400 border-4 border-black mx-4 mt-4 rounded-lg relative">
            <div class="absolute top-2 right-2">
                <button class="bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 text-sm text-white transition-colors">中文</button>
            </div>
            <div class="text-center py-8">
                <h1 class="text-5xl font-black text-yellow-300 mb-2 tracking-wider">一饭封神</h1>
                <p class="text-white text-lg font-medium">UPLOAD YOUR INGREDIENTS | SPIT OUT RECIPES!</p>
            </div>
        </header>

        <!-- 使用量显示 -->
        <!-- <div class="mx-4 mt-4">
            <div class="bg-white border-2 border-black rounded-lg p-4 max-w-sm mx-auto">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="text-lg">⚡</span>
                        <span class="font-bold text-dark-800">DAILY USAGE</span>
                    </div>
                    <span class="font-bold text-xl">0/5</span>
                </div>
                <div class="mt-2 bg-gray-200 rounded-full h-2">
                    <div class="bg-dark-800 h-2 rounded-full" style="width: 0%"></div>
                </div>
            </div>
        </div> -->

        <div class="max-w-4xl mx-auto px-4 py-6">
            <!-- 步骤1: 输入食材 -->
            <div class="mb-6">
                <div class="bg-pink-400 text-white px-4 py-2 rounded-t-lg border-2 border-black border-b-0 inline-block">
                    <span class="font-bold">1. 输入食材</span>
                </div>
                <div class="bg-white border-2 border-black rounded-lg rounded-tl-none p-8">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span class="text-white text-2xl">🥬</span>
                        </div>
                        <h2 class="text-2xl font-bold text-dark-800 mb-2">添加食材</h2>
                        <p class="text-gray-600">输入你现有的食材，按回车添加</p>
                        <p class="text-xs text-gray-500 mt-1">支持蔬菜、肉类、调料等 (最多10种)</p>
                    </div>

                    <!-- 食材输入区域 -->
                    <div class="space-y-4">
                        <!-- 已添加的食材 -->
                        <div v-if="ingredients.length > 0" class="flex flex-wrap gap-2">
                            <div
                                v-for="ingredient in ingredients"
                                :key="ingredient"
                                class="inline-flex items-center gap-2 bg-yellow-400 text-dark-800 px-3 py-2 rounded-full text-sm font-medium border-2 border-black"
                            >
                                {{ ingredient }}
                                <button @click="removeIngredient(ingredient)" class="hover:bg-yellow-500 rounded-full p-1 transition-colors">
                                    <span class="text-xs">✕</span>
                                </button>
                            </div>
                        </div>

                        <!-- 输入框 -->
                        <div class="relative">
                            <input
                                v-model="currentIngredient"
                                @keyup.enter="addIngredient"
                                placeholder="输入食材名称，按回车添加..."
                                class="w-full p-4 border-2 border-black rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>

                        <!-- 生成按钮 -->
                        <div class="text-center pt-4">
                            <button
                                @click="generateRecipes"
                                :disabled="ingredients.length === 0 || isLoading"
                                class="bg-dark-800 hover:bg-dark-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-bold text-lg border-2 border-black transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                            >
                                <span class="flex items-center gap-2 justify-center">
                                    <template v-if="isLoading">
                                        <div class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                        生成中...
                                    </template>
                                    <template v-else> ✨ {{ customPrompt.trim() ? '按要求生成' : '交给大师' }} </template>
                                </span>
                            </button>
                            <p v-if="customPrompt.trim()" class="text-xs text-gray-600 mt-2">将根据您的自定义要求生成菜谱</p>
                            <p v-else-if="selectedCuisines.length > 0" class="text-xs text-gray-600 mt-2">将生成 {{ selectedCuisines.length }} 个菜系的菜谱</p>
                            <p v-else class="text-xs text-gray-600 mt-2">将随机选择菜系生成菜谱</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 步骤2和3: 选择风格 OR 自定义提示 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <!-- 选择菜系 -->
                <div>
                    <div class="bg-green-400 text-white px-4 py-2 rounded-t-lg border-2 border-black border-b-0 inline-block">
                        <span class="font-bold">2. 选择菜系</span>
                    </div>
                    <div class="bg-white border-2 border-black rounded-lg rounded-tl-none p-6">
                        <div v-if="customPrompt.trim()" class="text-center py-8 text-gray-500">
                            <p class="text-sm">已设置自定义要求，将忽略菜系选择</p>
                            <button @click="customPrompt = ''" class="text-blue-600 hover:text-blue-700 underline text-sm mt-2">清除自定义要求以选择菜系</button>
                        </div>
                        <div v-else class="grid grid-cols-2 gap-3">
                            <button
                                v-for="cuisine in cuisines.slice(0, 6)"
                                :key="cuisine.id"
                                @click="selectCuisine(cuisine)"
                                :class="[
                                    'p-3 rounded-lg border-2 border-black font-medium text-sm transition-all duration-200',
                                    selectedCuisines.includes(cuisine.id) ? 'bg-yellow-400 text-dark-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                ]"
                            >
                                {{ cuisine.name.replace('大师', '') }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 自定义提示 -->
                <div>
                    <div class="bg-blue-400 text-white px-4 py-2 rounded-t-lg border-2 border-black border-b-0 inline-block">
                        <span class="font-bold">3. 或自定义要求</span>
                    </div>
                    <div class="bg-white border-2 border-black rounded-lg rounded-tl-none p-6">
                        <div class="mb-3">
                            <label class="block text-sm font-bold text-dark-800 mb-2">描述你的需求：</label>
                            <textarea
                                v-model="customPrompt"
                                placeholder="例如：做一道清淡的汤，适合老人食用..."
                                class="w-full p-3 border-2 border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:border-blue-400"
                                rows="4"
                            ></textarea>
                            <div v-if="customPrompt.trim()" class="mt-2 flex justify-between items-center">
                                <span class="text-xs text-green-600">✓ 已设置自定义要求</span>
                                <button @click="customPrompt = ''" class="text-xs text-red-600 hover:text-red-700 underline">清除</button>
                            </div>
                        </div>
                        <p class="text-xs text-gray-500">越具体越好！</p>
                    </div>
                </div>
            </div>

            <!-- 中间的OR -->
            <div class="text-center mb-6">
                <span class="bg-yellow-400 text-dark-800 px-4 py-2 rounded-full font-bold text-xl border-2 border-black"> OR </span>
            </div>

            <!-- 步骤4: 结果 -->
            <div>
                <div class="bg-dark-800 text-white px-4 py-2 rounded-t-lg border-2 border-black border-b-0 inline-block">
                    <span class="font-bold">4. 菜谱结果</span>
                </div>
                <div class="bg-white border-2 border-black rounded-lg rounded-tl-none p-8">
                    <!-- 加载状态 -->
                    <div v-if="isLoading" class="text-center py-12">
                        <div class="w-16 h-16 border-4 border-gray-300 border-t-dark-800 rounded-full animate-spin mx-auto mb-4"></div>
                        <h3 class="text-xl font-bold text-dark-800 mb-2">大师正在创作中...</h3>
                        <p class="text-gray-600">{{ loadingText }}</p>
                    </div>

                    <!-- 空状态 -->
                    <div v-else-if="recipes.length === 0" class="text-center py-12">
                        <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span class="text-gray-400 text-2xl">⭐</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-400 mb-2">等待魔法发生...</h3>
                        <p class="text-gray-500">添加食材并选择菜系开始创作</p>
                    </div>

                    <!-- 菜谱结果 -->
                    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div v-for="recipe in recipes" :key="recipe.id" class="border-2 border-black rounded-lg overflow-hidden">
                            <RecipeCard :recipe="recipe" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部 -->
        <footer class="bg-white border-2 border-black mx-4 mb-4 rounded-lg p-4 text-center">
            <p class="text-sm text-gray-600">© 2025 一饭封神 | Made with ❤️ and 🤖</p>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { cuisines } from '@/config/cuisines'
import RecipeCard from '@/components/RecipeCard.vue'
import { generateMultipleRecipes, generateCustomRecipe } from '@/services/aiService'
import type { Recipe, CuisineType } from '@/types'

// 响应式数据
const ingredients = ref<string[]>([])
const currentIngredient = ref('')
const selectedCuisines = ref<string[]>([])
const customPrompt = ref('')
const recipes = ref<Recipe[]>([])
const isLoading = ref(false)
const loadingText = ref('大师正在挑选食材...')

// 加载文字轮播
const loadingTexts = [
    '大师正在挑选食材...',
    '大师正在起火热锅...',
    '大师正在爆香配料...',
    '大师正在调制秘制酱料...',
    '大师正在掌控火候...',
    '大师正在精心摆盘...',
    '美味佳肴即将出炉...'
]

let loadingInterval: NodeJS.Timeout | null = null

// 添加食材
const addIngredient = () => {
    const ingredient = currentIngredient.value.trim()
    if (ingredient && !ingredients.value.includes(ingredient) && ingredients.value.length < 10) {
        ingredients.value.push(ingredient)
        currentIngredient.value = ''
    }
}

// 移除食材
const removeIngredient = (ingredient: string) => {
    const index = ingredients.value.indexOf(ingredient)
    if (index > -1) {
        ingredients.value.splice(index, 1)
    }
}

// 选择菜系
const selectCuisine = (cuisine: CuisineType) => {
    const index = selectedCuisines.value.indexOf(cuisine.id)
    if (index > -1) {
        selectedCuisines.value.splice(index, 1)
    } else {
        selectedCuisines.value.push(cuisine.id)
    }
}

// 生成菜谱
const generateRecipes = async () => {
    if (ingredients.value.length === 0) {
        return
    }

    isLoading.value = true
    recipes.value = []

    // 开始加载文字轮播
    let textIndex = 0
    loadingInterval = setInterval(() => {
        loadingText.value = loadingTexts[textIndex]
        textIndex = (textIndex + 1) % loadingTexts.length
    }, 2000)

    try {
        // 检查是否有自定义提示词
        if (customPrompt.value.trim()) {
            // 使用自定义提示词生成菜谱
            const customRecipe = await generateCustomRecipe(ingredients.value, customPrompt.value.trim())
            recipes.value = [customRecipe]
        } else {
            // 使用菜系生成菜谱
            let selectedCuisineObjects = cuisines.filter(c => selectedCuisines.value.includes(c.id))

            if (selectedCuisineObjects.length === 0) {
                // 随机选择2-3个菜系
                const shuffled = [...cuisines].sort(() => 0.5 - Math.random())
                selectedCuisineObjects = shuffled.slice(0, Math.floor(Math.random() * 2) + 2)
            }

            // 调用AI服务生成菜谱
            const generatedRecipes = await generateMultipleRecipes(ingredients.value, selectedCuisineObjects, customPrompt.value.trim() || undefined)

            recipes.value = generatedRecipes
        }
    } catch (error) {
        console.error('生成菜谱失败:', error)
        // 如果AI调用失败，使用模拟数据作为后备
        await simulateAICall()
    } finally {
        isLoading.value = false
        if (loadingInterval) {
            clearInterval(loadingInterval)
            loadingInterval = null
        }
    }
}

// 模拟AI调用（后续替换为真实接口）
const simulateAICall = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            // 获取要使用的菜系
            let cuisinesToUse = cuisines.filter(c => selectedCuisines.value.includes(c.id))
            if (cuisinesToUse.length === 0) {
                // 随机选择2-3个菜系
                const shuffled = [...cuisines].sort(() => 0.5 - Math.random())
                cuisinesToUse = shuffled.slice(0, Math.floor(Math.random() * 2) + 2)
            }

            // 检查是否有自定义提示词
            let mockRecipes: Recipe[] = []

            if (customPrompt.value.trim()) {
                // 生成自定义菜谱
                mockRecipes = [
                    {
                        id: `recipe-custom-${Date.now()}`,
                        name: `自定义：${ingredients.value.join('')}料理`,
                        cuisine: '自定义',
                        ingredients: ingredients.value,
                        steps: [
                            { step: 1, description: '准备所有食材，清洗干净', time: 5 },
                            { step: 2, description: '根据要求进行烹饪处理', time: 10 },
                            { step: 3, description: '调味并完成最后的制作', time: 8 },
                            { step: 4, description: '装盘即可享用', time: 2 }
                        ],
                        cookingTime: 25,
                        difficulty: 'medium',
                        tips: ['根据个人喜好调整口味', '注意食材的新鲜度', '掌握好火候']
                    }
                ]
            } else {
                // 生成菜系菜谱
                mockRecipes = cuisinesToUse.map((cuisine, index) => {
                    return {
                        id: `recipe-${cuisine.id}-${Date.now()}-${index}`,
                        name: `${cuisine.name}推荐：${ingredients.value.join('')}料理`,
                        cuisine: cuisine.name,
                        ingredients: ingredients.value,
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
                })
            }

            recipes.value = mockRecipes
            resolve(mockRecipes)
        }, 3000)
    })
}

onUnmounted(() => {
    if (loadingInterval) {
        clearInterval(loadingInterval)
    }
})
</script>
