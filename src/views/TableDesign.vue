<template>
    <div class="min-h-screen bg-yellow-400 px-2 md:px-4 py-6">
        <!-- 头部 - 粉色区域 -->
        <header class="bg-pink-400 border-4 border-black max-w-7xl mx-auto px-2 rounded-lg relative">
            <!-- 桌面端导航 -->
            <div class="hidden md:block absolute top-4 right-4">
                <div class="flex gap-3">
                    <router-link
                        to="/"
                        class="bg-white hover:bg-gray-100 text-dark-800 px-4 py-2 rounded-lg font-bold border-2 border-black transition-all duration-200 transform hover:scale-105 text-sm"
                    >
                        ← 回到一饭封神
                    </router-link>
                </div>
            </div>
            <div class="text-center py-8">
                <h1 class="text-5xl font-black text-yellow-300 mb-2 tracking-wider md:text-[5rem] font-['PingFangLiuAngLeTianTi']">一桌菜设计师</h1>
                <p class="text-white text-lg font-medium text-[12px] md:text-[1.5rem]">AI MASTER CHEF TABLE DESIGNER!</p>
            </div>
        </header>

        <!-- 移动端导航 -->
        <div class="md:hidden max-w-7xl mx-auto mt-4">
            <div class="flex justify-center">
                <router-link
                    to="/"
                    class="bg-white hover:bg-gray-100 text-dark-800 px-6 py-2 rounded-lg font-bold border-2 border-black transition-all duration-200 text-sm shadow-lg"
                >
                    ← 回到一饭封神
                </router-link>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 mt-2">
            <!-- 步骤1: 配置菜品数量 -->
            <div class="mb-6 mt-4">
                <div class="bg-pink-400 text-white px-4 py-2 rounded-t-lg border-2 border-black border-b-0 inline-block">
                    <span class="font-bold">1. 配置菜品数量</span>
                </div>
                <div class="bg-white border-2 border-black rounded-lg rounded-tl-none p-4 md:p-6 h-full">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span class="text-white text-2xl">🍽️</span>
                        </div>
                        <h2 class="text-xl font-bold text-dark-800 mb-2">选择菜品数量</h2>
                        <p class="text-gray-600 text-sm">根据用餐人数和场合选择合适的菜品数量</p>
                    </div>

                    <!-- 预设数量按钮 -->
                    <div class="flex justify-center gap-2 flex-wrap mb-4">
                        <button
                            v-for="count in [2, 4, 6, 8]"
                            :key="count"
                            @click="config.dishCount = count"
                            :class="[
                                'px-4 py-2 rounded-lg font-bold border-2 border-black transition-all duration-200 transform hover:scale-105 text-sm',
                                config.dishCount === count ? 'bg-yellow-400 text-dark-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            ]"
                        >
                            {{ count }}道菜
                        </button>
                    </div>

                    <!-- 自定义数量输入 -->
                    <div class="max-w-xs mx-auto">
                        <div class="text-center mb-3">
                            <span class="text-sm text-gray-600">或自定义数量</span>
                        </div>
                        <div class="flex justify-center">
                            <div class="relative">
                                <input
                                    v-model.number="config.dishCount"
                                    @input="validateDishCount"
                                    type="number"
                                    min="1"
                                    max="20"
                                    class="w-20 px-3 py-2 text-center border-2 border-black rounded-lg font-bold text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                                <span class="absolute -right-10 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 whitespace-nowrap">道菜</span>
                            </div>
                        </div>
                        <div class="text-center mt-2">
                            <span class="text-xs text-gray-500">建议1-20道菜</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 步骤2: 指定菜品 -->
            <div class="mb-6 mt-4">
                <div class="bg-orange-400 text-white px-4 py-2 rounded-t-lg border-2 border-black border-b-0 inline-block">
                    <span class="font-bold">2. 指定菜品（可选）</span>
                </div>
                <div class="bg-white border-2 border-black rounded-lg rounded-tl-none p-4 md:p-6 h-full">
                    <!-- 右侧：指定菜品 -->
                    <div>
                        <div class="text-center mb-6">
                            <div class="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <span class="text-white text-2xl">🥘</span>
                            </div>
                            <h2 class="text-xl font-bold text-dark-800 mb-2">指定想要的菜品</h2>
                            <p class="text-gray-600 text-sm">可以指定一些您特别想要的菜品，AI会优先考虑</p>
                        </div>

                        <!-- 已添加的自定义菜品 -->
                        <div v-if="config.customDishes.length > 0" class="mb-4">
                            <div class="flex flex-wrap gap-2 justify-center">
                                <div
                                    v-for="dish in config.customDishes"
                                    :key="dish"
                                    class="inline-flex items-center gap-2 bg-yellow-400 text-dark-800 px-3 py-2 rounded-full text-sm font-medium border-2 border-black"
                                >
                                    {{ dish }}
                                    <button @click="removeCustomDish(dish)" class="hover:bg-yellow-500 rounded-full p-1 transition-colors">
                                        <span class="text-xs">✕</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- 菜品输入框 -->
                        <div class="max-w-md mx-auto">
                            <div class="relative">
                                <input
                                    v-model="currentCustomDish"
                                    @keyup.enter="addCustomDish"
                                    placeholder="输入菜品名称，按回车添加..."
                                    class="w-full p-3 border-2 border-black rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                                <button
                                    @click="addCustomDish"
                                    :disabled="!currentCustomDish.trim() || config.customDishes.length >= 10"
                                    class="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-pink-400 hover:bg-pink-500 disabled:bg-gray-300 text-white rounded text-xs font-bold transition-colors disabled:cursor-not-allowed"
                                >
                                    添加
                                </button>
                            </div>
                            <div class="flex justify-between items-center mt-2 text-xs text-gray-500">
                                <span>💡 例如：红烧肉、清蒸鱼、麻婆豆腐</span>
                                <span>{{ config.customDishes.length }}/10</span>
                            </div>
                        </div>

                        <!-- 提示信息 -->
                        <div class="mt-4 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                            <p class="text-sm text-blue-700 text-center">
                                <span class="font-medium">提示：</span>
                                指定的菜品会优先出现在菜单中，剩余菜品由AI根据您的口味和风格偏好自动搭配
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 步骤2和3: 左右布局 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- 步骤2: 选择口味和风格 -->
            <div>
                <div class="bg-green-400 text-white px-4 py-2 rounded-t-lg border-2 border-black border-b-0 inline-block">
                    <span class="font-bold">3. 选择口味和风格</span>
                </div>
                <div class="bg-white border-2 border-black rounded-lg rounded-tl-none p-4 md:p-6 h-full">
                    <!-- 口味偏好 -->
                    <div class="mb-6">
                        <h5 class="text-sm font-bold text-gray-700 mb-3 flex items-center gap-1">👅 口味偏好</h5>
                        <div class="grid grid-cols-2 gap-2">
                            <button
                                v-for="taste in tasteOptions"
                                :key="taste.id"
                                @click="toggleTaste(taste.id)"
                                :class="[
                                    'p-2 rounded-lg border-2 border-black font-medium text-xs transition-all duration-200 flex items-center justify-center gap-1',
                                    config.tastes.includes(taste.id) ? 'bg-yellow-400 text-dark-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                ]"
                            >
                                <span>{{ taste.icon }}</span>
                                <span>{{ taste.name }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- 菜系风格 -->
                    <div class="mb-6">
                        <h5 class="text-sm font-bold text-gray-700 mb-3 flex items-center gap-1">🌍 菜系风格</h5>
                        <div class="grid grid-cols-2 gap-2">
                            <button
                                v-for="style in cuisineStyles"
                                :key="style.id"
                                @click="config.cuisineStyle = style.id"
                                :class="[
                                    'p-2 rounded-lg border-2 border-black font-medium text-xs transition-all duration-200 flex items-center justify-center gap-1',
                                    config.cuisineStyle === style.id ? 'bg-yellow-400 text-dark-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                ]"
                            >
                                <span>{{ style.icon }}</span>
                                <span>{{ style.name }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- 用餐场景 -->
                    <div>
                        <h5 class="text-sm font-bold text-gray-700 mb-3 flex items-center gap-1">🎭 用餐场景</h5>
                        <div class="grid grid-cols-2 gap-2">
                            <button
                                v-for="scene in diningScenes"
                                :key="scene.id"
                                @click="config.diningScene = scene.id"
                                :class="[
                                    'p-2 rounded-lg border-2 border-black font-medium text-xs transition-all duration-200 flex items-center justify-center gap-1',
                                    config.diningScene === scene.id ? 'bg-yellow-400 text-dark-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                ]"
                            >
                                <span>{{ scene.icon }}</span>
                                <span>{{ scene.name }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 步骤3: 营养搭配和特殊要求 -->
            <div class="max-sm:mt-10">
                <div class="bg-orange-400 text-white px-4 py-2 rounded-t-lg border-2 border-black border-b-0 inline-block">
                    <span class="font-bold">4. 营养搭配和特殊要求</span>
                </div>
                <div class="bg-white border-2 border-black rounded-lg rounded-tl-none p-4 md:p-6 h-full">
                    <!-- 营养搭配 -->
                    <div class="mb-6">
                        <h5 class="text-sm font-bold text-gray-700 mb-3 flex items-center gap-1">⚖️ 营养搭配</h5>
                        <div class="grid grid-cols-2 gap-2">
                            <button
                                v-for="nutrition in nutritionOptions"
                                :key="nutrition.id"
                                @click="config.nutritionFocus = nutrition.id"
                                :class="[
                                    'p-2 rounded-lg border-2 border-black font-medium text-xs transition-all duration-200 flex items-center justify-center gap-1',
                                    config.nutritionFocus === nutrition.id ? 'bg-yellow-400 text-dark-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                ]"
                            >
                                <span>{{ nutrition.icon }}</span>
                                <span>{{ nutrition.name }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- 特殊要求 -->
                    <div class="flex-1">
                        <h5 class="text-sm font-bold text-gray-700 mb-3 flex items-center gap-1">💭 特殊要求</h5>
                        <textarea
                            v-model="config.customRequirement"
                            placeholder="例如：不要太油腻，适合老人小孩，有一道汤..."
                            class="w-full p-3 border-2 border-black rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
                            rows="4"
                            maxlength="200"
                        ></textarea>
                        <div class="text-xs text-gray-500 mt-1 text-right">{{ config.customRequirement.length }}/200</div>
                    </div>

                    <!-- 当前配置预览 -->
                    <div class="bg-gray-50 rounded-lg p-3 mt-4">
                        <h6 class="font-bold text-sm text-gray-700 mb-2 flex items-center gap-2">
                            <span>📋</span>
                            <span>当前配置</span>
                        </h6>
                        <div class="text-xs text-gray-600 space-y-1">
                            <div>菜品数量：{{ config.dishCount }}道菜</div>
                            <div v-if="config.customDishes.length > 0">指定菜品：{{ config.customDishes.join('、') }}</div>
                            <div v-if="config.tastes.length > 0">口味：{{ config.tastes.map(t => tasteOptions.find(opt => opt.id === t)?.name).join('、') }}</div>
                            <div>风格：{{ cuisineStyles.find(s => s.id === config.cuisineStyle)?.name }}</div>
                            <div>场景：{{ diningScenes.find(s => s.id === config.diningScene)?.name }}</div>
                            <div>营养：{{ nutritionOptions.find(n => n.id === config.nutritionFocus)?.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 步骤4: 生成一桌菜 -->
        <div class="mb-6 mt-16">
            <div class="bg-dark-800 text-white px-4 py-2 rounded-t-lg border-2 border-black border-b-0 inline-block">
                <span class="font-bold">5. 生成一桌菜</span>
            </div>
            <div class="bg-white border-2 border-black rounded-lg rounded-tl-none p-4 md:p-6">
                <!-- 生成按钮区域 -->
                <div v-if="!isGenerating && generatedDishes.length === 0" class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span class="text-white text-2xl">👨‍🍳</span>
                    </div>
                    <h2 class="text-xl font-bold text-dark-800 mb-2">准备生成一桌菜</h2>
                    <p class="text-gray-600 mb-6 text-sm">AI大师已准备就绪，点击按钮开始设计您的专属菜单</p>

                    <div class="space-y-3">
                        <button
                            @click="generateTableMenuAction"
                            :disabled="isGenerating"
                            class="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-400 text-white px-6 py-3 rounded-lg font-bold text-base md:text-lg border-2 border-black transition-all duration-300 transform disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                        >
                            <span class="flex items-center gap-2 justify-center">
                                <span class="text-xl">✨</span>
                                <span>生成一桌菜</span>
                            </span>
                        </button>
                    </div>
                </div>

                <!-- 生成中状态 -->
                <div v-if="isGenerating" class="text-center py-8">
                    <div class="animate-spin w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">{{ generatingText }}</h3>
                    <p class="text-gray-600">AI大师正在为您精心搭配...</p>
                </div>

                <!-- 生成结果 -->
                <div v-if="!isGenerating && generatedDishes.length > 0">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <span>🎉</span>
                            <span>您的专属一桌菜</span>
                        </h3>
                        <button
                            @click="resetConfig"
                            class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-bold border-2 border-black transition-all duration-200 text-sm"
                        >
                            🔄 重新配置
                        </button>
                    </div>

                    <!-- 菜品列表 -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div v-for="(dish, index) in generatedDishes" :key="index" class="border-2 border-black rounded-lg p-4 bg-white hover:bg-yellow-50 transition-colors">
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="font-bold text-gray-800 text-lg">{{ dish.name }}</h4>
                                <span class="text-xs bg-pink-400 text-white px-2 py-1 rounded-full font-medium">{{ dish.category }}</span>
                            </div>
                            <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ dish.description }}</p>
                            <div class="flex justify-between items-center">
                                <div class="flex gap-1 flex-wrap">
                                    <span v-for="tag in dish.tags" :key="tag" class="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded font-medium">
                                        {{ tag }}
                                    </span>
                                </div>
                                <button
                                    @click="generateDishRecipeAction(dish, index)"
                                    :disabled="dish.isGeneratingRecipe"
                                    class="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg text-sm font-bold border-2 border-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span v-if="dish.isGeneratingRecipe" class="flex items-center gap-1">
                                        <div class="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>生成中</span>
                                    </span>
                                    <span v-else-if="dish.recipe">📖 查看菜谱</span>
                                    <span v-else>📝 生成菜谱</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 菜谱弹窗 -->
    <Teleport to="body">
        <div v-if="selectedRecipe" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4 modal-overlay" @click="closeRecipeModal">
            <div
                class="bg-white rounded-2xl border-2 border-black shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden modal-content transform transition-all duration-300"
                @click.stop
            >
                <!-- 弹窗头部 -->
                <div class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <span class="text-2xl">📖</span>
                        <h3 class="text-xl font-bold">{{ selectedRecipe.name }}</h3>
                    </div>
                    <button
                        @click="closeRecipeModal"
                        class="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    >
                        <span class="text-white text-lg font-bold">✕</span>
                    </button>
                </div>

                <!-- 弹窗内容 -->
                <div class="max-h-[calc(90vh-80px)] overflow-y-auto scrollbar-hide">
                    <div class="">
                        <RecipeCard :recipe="selectedRecipe" />
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, Teleport, onMounted, onUnmounted } from 'vue'
import type { Recipe } from '@/types'
import RecipeCard from '@/components/RecipeCard.vue'
import { generateTableMenu, generateDishRecipe, testAIConnection } from '@/services/aiService'

// 配置选项
interface TableConfig {
    dishCount: number
    tastes: string[]
    cuisineStyle: string
    diningScene: string
    nutritionFocus: string
    customRequirement: string
    customDishes: string[]
}

// 菜品信息
interface DishInfo {
    name: string
    description: string
    category: string
    tags: string[]
    recipe?: Recipe
    isGeneratingRecipe?: boolean
}

// 状态管理
const isGenerating = ref(false)
const generatingText = ref('正在生成菜单...')
const generatedDishes = ref<DishInfo[]>([])
const selectedRecipe = ref<Recipe | null>(null)

// 配置
const config = reactive<TableConfig>({
    dishCount: 6,
    tastes: [],
    cuisineStyle: 'mixed',
    diningScene: 'family',
    nutritionFocus: 'balanced',
    customRequirement: '',
    customDishes: []
})

// 自定义菜品输入
const currentCustomDish = ref('')

// 配置选项数据
const tasteOptions = [
    { id: 'spicy', name: '麻辣', icon: '🌶️' },
    { id: 'sweet', name: '甜味', icon: '🍯' },
    { id: 'sour', name: '酸味', icon: '🍋' },
    { id: 'salty', name: '咸鲜', icon: '🧂' },
    { id: 'light', name: '清淡', icon: '🌿' },
    { id: 'rich', name: '浓郁', icon: '🍖' }
]

const cuisineStyles = [
    { id: 'mixed', name: '混合菜系', icon: '🌍' },
    { id: 'chinese', name: '中式为主', icon: '🥢' },
    { id: 'western', name: '西式为主', icon: '🍽️' },
    { id: 'japanese', name: '日式为主', icon: '🍱' }
]

const diningScenes = [
    { id: 'family', name: '家庭聚餐', icon: '👨‍👩‍👧‍👦' },
    { id: 'friends', name: '朋友聚会', icon: '🎉' },
    { id: 'romantic', name: '浪漫晚餐', icon: '💕' },
    { id: 'business', name: '商务宴请', icon: '💼' },
    { id: 'festival', name: '节日庆祝', icon: '🎊' },
    { id: 'casual', name: '日常用餐', icon: '🍚' }
]

const nutritionOptions = [
    { id: 'balanced', name: '营养均衡', icon: '⚖️' },
    { id: 'protein', name: '高蛋白', icon: '💪' },
    { id: 'vegetarian', name: '素食为主', icon: '🥬' },
    { id: 'low_fat', name: '低脂健康', icon: '🏃‍♀️' },
    { id: 'comfort', name: '滋补养生', icon: '🍲' }
]

// 切换口味选择
const toggleTaste = (tasteId: string) => {
    const index = config.tastes.indexOf(tasteId)
    if (index > -1) {
        config.tastes.splice(index, 1)
    } else {
        config.tastes.push(tasteId)
    }
}

// 增加菜品数量
const increaseDishCount = () => {
    if (config.dishCount < 20) {
        config.dishCount++
    }
}

// 减少菜品数量
const decreaseDishCount = () => {
    if (config.dishCount > 1) {
        config.dishCount--
    }
}

// 验证菜品数量输入
const validateDishCount = (event: Event) => {
    const target = event.target as HTMLInputElement
    let value = parseInt(target.value)

    if (isNaN(value) || value < 1) {
        config.dishCount = 1
    } else if (value > 20) {
        config.dishCount = 20
    } else {
        config.dishCount = value
    }
}

// 添加自定义菜品
const addCustomDish = () => {
    const dish = currentCustomDish.value.trim()
    if (dish && !config.customDishes.includes(dish) && config.customDishes.length < 10) {
        config.customDishes.push(dish)
        currentCustomDish.value = ''
    }
}

// 移除自定义菜品
const removeCustomDish = (dish: string) => {
    const index = config.customDishes.indexOf(dish)
    if (index > -1) {
        config.customDishes.splice(index, 1)
    }
}

// 测试AI连接
const testConnection = async () => {
    try {
        const isConnected = await testAIConnection()
        if (isConnected) {
            alert('AI连接测试成功！')
        } else {
            alert('AI连接测试失败，请检查配置')
        }
    } catch (error) {
        alert('AI连接测试失败：' + error)
    }
}

// 生成一桌菜
const generateTableMenuAction = async () => {
    isGenerating.value = true
    generatingText.value = '正在生成菜单...'

    try {
        // 调用AI服务生成菜单
        const aiDishes = await generateTableMenu(config)

        // 转换为本地格式
        const dishes: DishInfo[] = aiDishes.map(dish => ({
            name: dish.name,
            description: dish.description,
            category: dish.category,
            tags: dish.tags,
            isGeneratingRecipe: false
        }))

        generatedDishes.value = dishes
    } catch (error) {
        console.error('生成菜单失败:', error)
        // 显示错误提示
        alert('AI生成菜单失败，请检查网络连接或稍后重试')
    } finally {
        isGenerating.value = false
    }
}

// 生成单个菜品的菜谱
const generateDishRecipeAction = async (dish: DishInfo, index: number) => {
    if (dish.recipe) {
        selectedRecipe.value = dish.recipe
        return
    }

    dish.isGeneratingRecipe = true

    try {
        // 调用AI服务生成菜谱
        const recipe = await generateDishRecipe(dish.name, dish.description, dish.category)

        dish.recipe = recipe
        selectedRecipe.value = recipe
    } catch (error) {
        console.error('生成菜谱失败:', error)
        // 显示错误提示
        alert(`生成${dish.name}菜谱失败，请稍后重试`)
    } finally {
        dish.isGeneratingRecipe = false
    }
}

// 关闭菜谱弹窗
const closeRecipeModal = () => {
    selectedRecipe.value = null
}

// 测试弹窗功能
const testModal = () => {
    // 创建一个测试菜谱
    const testRecipe: Recipe = {
        id: 'test-recipe',
        name: '测试菜谱 - 红烧肉',
        cuisine: '中式',
        ingredients: ['五花肉 500g', '生抽 2勺', '老抽 1勺', '冰糖 30g', '料酒 1勺', '葱段 适量', '姜片 适量'],
        steps: [
            { step: 1, description: '五花肉切块，冷水下锅焯水去腥', time: 5 },
            { step: 2, description: '热锅下油，放入冰糖炒糖色', time: 3 },
            { step: 3, description: '下入肉块翻炒上色', time: 5 },
            { step: 4, description: '加入生抽、老抽、料酒调色调味', time: 2 },
            { step: 5, description: '加入开水没过肉块，大火烧开转小火炖煮', time: 45 }
        ],
        cookingTime: 60,
        difficulty: 'medium',
        tips: ['糖色要炒到微微冒烟', '炖煮时要小火慢炖', '最后大火收汁']
    }

    selectedRecipe.value = testRecipe
}

// 键盘事件处理
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && selectedRecipe.value) {
        closeRecipeModal()
    }
}

// 组件挂载时添加键盘事件监听
onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

// 组件卸载时移除键盘事件监听
onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
})

// 重置配置
const resetConfig = () => {
    generatedDishes.value = []
    selectedRecipe.value = null
    config.dishCount = 6
    config.tastes = []
    config.cuisineStyle = 'mixed'
    config.diningScene = 'family'
    config.nutritionFocus = 'balanced'
    config.customRequirement = ''
    config.customDishes = []
    currentCustomDish.value = ''
}
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* 弹窗动画 */
.modal-overlay {
    animation: fadeIn 0.3s ease-out;
}

.modal-content {
    animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* 确保弹窗在最顶层 */
.modal-overlay {
    backdrop-filter: blur(4px);
}

/* 隐藏滚动条但保持滚动功能 */
.scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
}
</style>
