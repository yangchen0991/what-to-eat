<template>
    <div class="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 p-4">
        <!-- 头部 -->
        <div class="max-w-4xl mx-auto mb-8">
            <div class="text-center mb-6">
                <h1 class="text-4xl font-bold text-orange-800 mb-2">{{ randomDice }} 今天吃什么</h1>
                <p class="text-orange-600">让AI为你推荐今日美食！</p>
            </div>
            <div class="text-center">
                <router-link to="/" class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-gray-700">
                    <span>←</span>
                    <span>返回首页</span>
                </router-link>
            </div>
        </div>

        <div class="max-w-4xl mx-auto space-y-6">
            <!-- 开始按钮 -->
            <div v-if="!isSelecting && selectedDishes.length === 0" class="text-center">
                <div class="bg-white rounded-2xl shadow-lg p-8">
                    <div class="text-6xl mb-4">🎲</div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">准备好了吗？</h2>
                    <p class="text-gray-600 mb-6">点击按钮，让AI为你随机选择今日美食</p>
                    <button
                        @click="startRandomSelection"
                        class="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg mb-4"
                    >
                        {{ randomDice }} 开始随机选择
                    </button>

                    <!-- 折叠配置选项 -->
                    <div class="mt-4">
                        <div
                            @click="showPreference = !showPreference"
                            class="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 mx-auto cursor-pointer"
                        >
                            <span>偏好设置</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 transition-transform"
                                :class="{ 'transform rotate-180': showPreference }"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        <div v-if="showPreference" class="bg-white rounded-xl p-4 mt-2 border border-gray-200">
                            <div class="grid grid-cols-2 gap-2 md:flex md:flex-row md:gap-4">
                                <button
                                    @click="preference = 'meat-heavy'"
                                    :class="preference === 'meat-heavy' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-800'"
                                    class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors md:flex-1"
                                >
                                    🥩 荤菜多
                                </button>
                                <button
                                    @click="preference = 'veg-heavy'"
                                    :class="preference === 'veg-heavy' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800'"
                                    class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors md:flex-1"
                                >
                                    🥬 素菜多
                                </button>
                                <button
                                    @click="preference = 'veg-only'"
                                    :class="preference === 'veg-only' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'"
                                    class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors md:flex-1"
                                >
                                    🌱 纯素
                                </button>
                                <button
                                    @click="preference = 'meat-only'"
                                    :class="preference === 'meat-only' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-800'"
                                    class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors md:flex-1"
                                >
                                    🍖 纯荤
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 选择过程 -->
            <div v-if="isSelecting" class="bg-white rounded-2xl shadow-lg p-6">
                <div class="text-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">{{ selectionStatus }}</h3>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500" :style="{ width: `${selectionProgress}%` }"></div>
                    </div>
                </div>

                <!-- 当前选择显示 -->
                <div v-if="currentSelection" class="text-center p-6 bg-gray-50 rounded-xl">
                    <div class="text-4xl mb-2">{{ currentSelection.type === 'dish' ? '🍽️' : currentSelection.avatar }}</div>
                    <div class="text-lg font-semibold text-gray-800">{{ currentSelection.name }}</div>
                    <div v-if="currentSelection.specialty" class="text-sm text-gray-600">{{ currentSelection.specialty }}</div>
                </div>
            </div>

            <!-- 选择结果 -->
            <div v-if="!isSelecting && selectedDishes.length > 0" class="bg-white rounded-2xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-6 text-center">🎉 今日推荐</h3>

                <div class="grid md:grid-cols-2 gap-6 mb-6">
                    <!-- 菜品 -->
                    <div class="bg-green-50 rounded-xl p-4">
                        <h4 class="font-semibold text-green-800 mb-3 flex items-center gap-2">
                            <span>🥗</span>
                            <span>推荐菜品 ({{ selectedDishes.length }}道)</span>
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="dish in selectedDishes" :key="dish" class="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                                {{ dish }}
                            </span>
                        </div>
                    </div>

                    <!-- 大师 -->
                    <div class="bg-purple-50 rounded-xl p-4">
                        <h4 class="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                            <span>👨‍🍳</span>
                            <span>推荐主厨</span>
                        </h4>
                        <div class="flex items-center gap-3">
                            <div class="text-3xl">{{ selectedMaster?.avatar }}</div>
                            <div>
                                <div class="font-semibold text-purple-800">{{ selectedMaster?.name }}</div>
                                <div class="text-sm text-purple-600">{{ selectedMaster?.specialty }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 操作按钮 -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        @click="generateRecipe"
                        :disabled="isGenerating"
                        class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <span v-if="isGenerating" class="flex items-center gap-2">
                            <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>{{ generatingText }}</span>
                        </span>
                        <span v-else class="flex items-center gap-2">
                            <span>✨</span>
                            <span>生成菜谱</span>
                        </span>
                    </button>

                    <button
                        @click="resetSelection"
                        :disabled="isGenerating"
                        class="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        🎲 重新选择
                    </button>
                </div>
            </div>

            <!-- 菜谱结果 -->
            <div v-if="recipe" class="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                    <span>📖</span>
                    <span>专属菜谱</span>
                </h3>
                <div class="border-2 border-[#333333] rounded-lg overflow-hidden">
                    <RecipeCard :recipe="recipe" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { cuisines } from '@/config/cuisines'
import { ingredientCategories } from '@/config/ingredients'
import type { Recipe, CuisineType } from '@/types'
import RecipeCard from '@/components/RecipeCard.vue'

// 状态管理
const isSelecting = ref(false)
const isGenerating = ref(false)
const selectedDishes = ref<string[]>([])
const selectedMaster = ref<CuisineType | null>(null)
const recipe = ref<Recipe | null>(null)
const preference = ref<string | null>(null)
const showPreference = ref(false)

// 选择过程状态
const selectionStatus = ref('')
const selectionProgress = ref(0)
const currentSelection = ref<any>(null)

// 文字轮播
const generatingText = ref('正在生成菜谱...')
const generatingTexts = ['正在生成菜谱...', '大师正在创作...', '调配独特配方...', '完善制作步骤...']

// 随机筛子表情
const diceEmojis = ['🎯']
const randomDice = ref('🎯')

// 所有菜品数据
const allDishes = ref<string[]>([])

// 初始化
onMounted(() => {
    allDishes.value = ingredientCategories.flatMap(category => category.items)
    randomDice.value = diceEmojis[Math.floor(Math.random() * diceEmojis.length)]
})

// 开始随机选择
const startRandomSelection = async () => {
    isSelecting.value = true
    selectedDishes.value = []
    selectedMaster.value = null
    recipe.value = null
    selectionProgress.value = 0

    // 第一阶段：选择菜品
    selectionStatus.value = '正在随机选择菜品...'
    await selectRandomDishes()

    // 第二阶段：选择大师
    selectionStatus.value = '正在匹配主厨大师...'
    await selectRandomMaster()

    // 完成
    selectionStatus.value = '选择完成！'
    selectionProgress.value = 100

    setTimeout(() => {
        isSelecting.value = false
    }, 1000)
}

// 随机选择菜品
const selectRandomDishes = async () => {
    const dishCount = Math.floor(Math.random() * 3) + 4 // 4-6个菜品
    let filteredDishes = [...allDishes.value]

    // 根据偏好过滤菜品
    if (preference.value) {
        const meatCategories = ['meat', 'seafood']
        const vegCategories = ['vegetables', 'mushrooms', 'beans']

        if (preference.value === 'meat-heavy') {
            filteredDishes = filteredDishes.filter(dish => ingredientCategories.some(cat => meatCategories.includes(cat.id) && cat.items.includes(dish)))
        } else if (preference.value === 'veg-heavy') {
            filteredDishes = filteredDishes.filter(dish => ingredientCategories.some(cat => vegCategories.includes(cat.id) && cat.items.includes(dish)))
        } else if (preference.value === 'meat-only') {
            filteredDishes = filteredDishes.filter(dish => ingredientCategories.some(cat => meatCategories.includes(cat.id) && cat.items.includes(dish)))
        } else if (preference.value === 'veg-only') {
            filteredDishes = filteredDishes.filter(dish => ingredientCategories.some(cat => vegCategories.includes(cat.id) && cat.items.includes(dish)))
        }
    }

    const shuffledDishes = filteredDishes.sort(() => 0.5 - Math.random())

    for (let i = 0; i < dishCount; i++) {
        // 模拟选择过程
        for (let j = 0; j < 5; j++) {
            const randomDish = shuffledDishes[Math.floor(Math.random() * shuffledDishes.length)]
            currentSelection.value = {
                type: 'dish',
                name: randomDish
            }
            selectionProgress.value = ((i * 5 + j) / (dishCount * 5)) * 50
            await new Promise(resolve => setTimeout(resolve, 50))
        }

        // 确定选择
        const finalDish = shuffledDishes[i]
        if (!selectedDishes.value.includes(finalDish)) {
            selectedDishes.value.push(finalDish)
        }
        currentSelection.value = {
            type: 'dish',
            name: finalDish
        }

        await new Promise(resolve => setTimeout(resolve, 300))
    }
}

// 随机选择大师
const selectRandomMaster = async () => {
    // 模拟选择过程
    for (let i = 0; i < 10; i++) {
        const randomMaster = cuisines[Math.floor(Math.random() * cuisines.length)]
        currentSelection.value = {
            type: 'master',
            name: randomMaster.name,
            avatar: randomMaster.avatar,
            specialty: randomMaster.specialty
        }
        selectionProgress.value = 50 + (i / 10) * 50
        await new Promise(resolve => setTimeout(resolve, 80))
    }

    // 确定选择
    const finalMaster = cuisines[Math.floor(Math.random() * cuisines.length)]
    selectedMaster.value = finalMaster
    currentSelection.value = {
        type: 'master',
        name: finalMaster.name,
        avatar: finalMaster.avatar,
        specialty: finalMaster.specialty
    }

    await new Promise(resolve => setTimeout(resolve, 500))
}

// 生成菜谱
const generateRecipe = async () => {
    if (!selectedMaster.value || selectedDishes.value.length === 0 || isGenerating.value) return

    isGenerating.value = true

    // 文字轮播
    let textIndex = 0
    const textInterval = setInterval(() => {
        generatingText.value = generatingTexts[textIndex]
        textIndex = (textIndex + 1) % generatingTexts.length
    }, 1000)

    try {
        // 模拟生成过程
        await new Promise(resolve => setTimeout(resolve, 4000))

        // 创建菜谱
        const dishNames = selectedDishes.value.slice(0, 3).join('、')
        const recipeName =
            selectedDishes.value.length > 3
                ? `${selectedMaster.value.name}特制${dishNames}等${selectedDishes.value.length}样组合`
                : `${selectedMaster.value.name}特制${dishNames}组合`

        const mockRecipe: Recipe = {
            id: `today-recipe-${Date.now()}`,
            name: recipeName,
            cuisine: selectedMaster.value.name,
            ingredients: [...selectedDishes.value, '盐', '生抽', '料酒', '葱', '姜', '蒜', '香油', '胡椒粉'],
            steps: [
                {
                    step: 1,
                    description: `将所有食材清洗干净：${selectedDishes.value.join('、')}分别处理，切成适当大小`,
                    time: 8
                },
                {
                    step: 2,
                    description: '热锅下油，先爆香葱姜蒜，制作底味',
                    time: 2,
                    temperature: '中火'
                },
                {
                    step: 3,
                    description: `按照食材特性分批下锅：先下${selectedDishes.value[0]}等较难熟的食材`,
                    time: 4,
                    temperature: '大火'
                },
                {
                    step: 4,
                    description: `再加入${selectedDishes.value.slice(1).join('、')}等食材，快速翻炒`,
                    time: 3,
                    temperature: '大火'
                },
                {
                    step: 5,
                    description: '调入生抽、料酒、盐等调料，炒匀入味',
                    time: 2
                },
                {
                    step: 6,
                    description: '最后淋香油，撒胡椒粉，装盘即可',
                    time: 1
                }
            ],
            cookingTime: 20,
            difficulty: selectedDishes.value.length > 5 ? 'medium' : 'easy',
            tips: [
                '多种食材搭配，营养更加均衡丰富',
                '不同食材的下锅时间要掌握好，避免有的过熟有的不熟',
                '调料用量要根据食材总量和个人口味调整',
                `${selectedMaster.value.specialty}的特色在于食材搭配的层次感`
            ]
        }

        recipe.value = mockRecipe
    } catch (error) {
        console.error('生成菜谱失败:', error)
    } finally {
        clearInterval(textInterval)
        isGenerating.value = false
    }
}

// 重置选择
const resetSelection = () => {
    selectedDishes.value = []
    selectedMaster.value = null
    recipe.value = null
    currentSelection.value = null
    selectionProgress.value = 0
}
</script>

<style scoped>
/* 基础动画 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* 应用动画 */
.animate-spin {
    animation: spin 1s linear infinite;
}

/* 卡片入场动画 */
.bg-white {
    animation: fadeIn 0.6s ease-out;
}

/* 按钮悬停效果 */
button {
    transition: all 0.3s ease;
}

button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

button:active:not(:disabled) {
    transform: translateY(0);
    background-color: transparent;
}

/* 偏好设置特殊样式 */
div.text-sm.text-gray-500:hover {
    background-color: transparent;
}

/* 标签悬停效果 */
.bg-green-200,
.bg-purple-50 {
    transition: all 0.3s ease;
}

.bg-green-200:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
}

/* 进度条动画 */
.bg-gradient-to-r {
    transition: width 0.5s ease-out;
}

/* 当前选择项的脉冲效果 */
.text-4xl {
    animation: pulse 2s ease-in-out infinite;
}

/* 响应式调整 */
@media (max-width: 640px) {
    .text-4xl {
        font-size: 2rem;
    }

    .text-6xl {
        font-size: 3rem;
    }

    .px-8 {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
}
</style>
