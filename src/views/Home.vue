<template>
    <div class="min-h-screen bg-yellow-400">
        <!-- 头部 - 粉色区域 -->
        <header class="bg-pink-400 border-4 border-black mx-2 md:mx-4 mt-4 rounded-lg relative">
            <!-- <div class="absolute top-2 right-2">
                <button class="bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 text-sm text-white transition-colors">中文</button>
            </div> -->
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

        <div class="max-w-7xl mx-auto px-2 md:px-4 py-6">
            <!-- 步骤1: 输入食材 -->
            <div class="mb-6">
                <div class="bg-pink-400 text-white px-4 py-2 rounded-t-lg border-2 border-black border-b-0 inline-block">
                    <span class="font-bold">1. 输入食材</span>
                </div>
                <div class="bg-white border-2 border-black rounded-lg rounded-tl-none p-4 md:p-8">
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

                        <!-- 快速选择食材 -->
                        <div class="mt-4">
                            <button
                                @click="toggleIngredientPicker"
                                class="flex items-center justify-between w-full p-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
                            >
                                <span class="flex items-center gap-2">
                                    <span class="text-base">🥬</span>
                                    <span class="font-medium">快速选择食材</span>
                                </span>
                                <span class="transform transition-transform duration-200 text-gray-400" :class="{ 'rotate-180': showIngredientPicker }">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </span>
                            </button>

                            <div v-if="showIngredientPicker" class="mt-2 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                <!-- 食材展示区域 -->
                                <div class="p-3 max-h-80 overflow-y-auto">
                                    <div class="space-y-4">
                                        <div v-for="category in ingredientCategories" :key="category.id">
                                            <!-- 分类标题 -->
                                            <div class="flex items-center gap-2 mb-2">
                                                <span class="text-sm">{{ category.icon }}</span>
                                                <span class="text-sm font-bold text-gray-700">{{ category.name }}</span>
                                                <div class="flex-1 h-px bg-gray-200"></div>
                                            </div>

                                            <!-- 食材按钮 -->
                                            <div class="flex flex-wrap gap-1.5">
                                                <button
                                                    v-for="item in category.items"
                                                    :key="item"
                                                    @click="quickAddIngredient(item)"
                                                    :disabled="ingredients.includes(item) || ingredients.length >= 10"
                                                    class="px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 hover:border-pink-400 hover:bg-pink-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 transition-all duration-200 hover:shadow-sm"
                                                    :class="{
                                                        'bg-yellow-100 border-yellow-400 text-yellow-800 shadow-sm': ingredients.includes(item),
                                                        'hover:scale-105': !ingredients.includes(item) && ingredients.length < 10
                                                    }"
                                                >
                                                    {{ item }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- 底部状态栏 -->
                                <div class="px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
                                    <span>点击食材快速添加到列表</span>
                                    <span class="font-medium">已选择 {{ ingredients.length }}/10</span>
                                </div>
                            </div>
                        </div>

                        <!-- 生成按钮 -->
                        <div class="text-center pt-4">
                            <button
                                @click="generateRecipes"
                                :disabled="ingredients.length === 0 || isLoading"
                                class="sm:w-auto w-full bg-dark-800 hover:bg-dark-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-bold text-lg border-2 border-black transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                            >
                                <span class="flex items-center gap-2 justify-center">
                                    <template v-if="isLoading">
                                        <div class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                        <span v-if="recipes.length === 0">生成中...</span>
                                        <span v-else>{{ loadingText }}</span>
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
                    <div class="bg-white border-2 border-black rounded-lg rounded-tl-none p-4 md:p-8 h-full">
                        <div v-if="customPrompt.trim()" class="text-center py-8 text-gray-500">
                            <p class="text-sm">已设置自定义要求，将忽略菜系选择</p>
                            <button @click="customPrompt = ''" class="text-blue-600 hover:text-blue-700 underline text-sm mt-2">清除自定义要求以选择菜系</button>
                        </div>
                        <div v-else>
                            <!-- 中华八大菜系 -->
                            <div class="mb-4">
                                <h5 class="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">🇨🇳 中华八大菜系</h5>
                                <div class="grid grid-cols-3 gap-2">
                                    <button
                                        v-for="cuisine in cuisines.slice(0, 8)"
                                        :key="cuisine.id"
                                        @click="selectCuisine(cuisine)"
                                        @mouseenter="showCuisineTooltip(cuisine, $event)"
                                        @mouseleave="hideCuisineTooltip"
                                        :class="[
                                            'p-2 rounded-lg border-2 border-black font-medium text-xs transition-all duration-200 relative text-center',
                                            selectedCuisines.includes(cuisine.id) ? 'bg-yellow-400 text-dark-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        ]"
                                    >
                                        {{ cuisine.name.replace('大师', '') }}
                                    </button>
                                </div>
                            </div>

                            <!-- 国际菜系 -->
                            <div>
                                <h5 class="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">🌍 国际菜系</h5>
                                <div class="grid grid-cols-3 gap-2">
                                    <button
                                        v-for="cuisine in cuisines.slice(8)"
                                        :key="cuisine.id"
                                        @click="selectCuisine(cuisine)"
                                        @mouseenter="showCuisineTooltip(cuisine, $event)"
                                        @mouseleave="hideCuisineTooltip"
                                        :class="[
                                            'p-2 rounded-lg border-2 border-black font-medium text-xs transition-all duration-200 relative flex items-center justify-center gap-1',
                                            selectedCuisines.includes(cuisine.id) ? 'bg-yellow-400 text-dark-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        ]"
                                    >
                                        <span>{{ cuisine.avatar }}</span>
                                        <span>{{ cuisine.name.replace('料理大师', '').replace('大师', '') }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 自定义提示 -->
                <div>
                    <div class="bg-blue-400 text-white px-4 py-2 rounded-t-lg border-2 border-black border-b-0 inline-block">
                        <span class="font-bold">3. 或自定义要求</span>
                    </div>
                    <div class="bg-white border-2 border-black rounded-lg rounded-tl-none p-4 md:p-8 h-full flex flex-col">
                        <!-- 快速预设选项 -->
                        <div class="mb-4">
                            <button
                                @click="togglePresetPicker"
                                class="flex items-center justify-between w-full p-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 mb-3"
                            >
                                <span class="flex items-center gap-2">
                                    <span class="text-base">⚡</span>
                                    <span class="font-medium">快速预设</span>
                                </span>
                                <span class="transform transition-transform duration-200 text-gray-400" :class="{ 'rotate-180': showPresetPicker }">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </span>
                            </button>

                            <div v-if="showPresetPicker" class="space-y-3 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                                <!-- 场景预设 -->
                                <div>
                                    <h6 class="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">🎯 场景需求</h6>
                                    <div class="flex flex-wrap gap-1.5">
                                        <button
                                            v-for="preset in scenePresets"
                                            :key="preset.id"
                                            @click="applyPreset(preset.prompt)"
                                            class="px-3 py-1.5 text-xs font-medium rounded-full border border-blue-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:scale-105 hover:shadow-sm"
                                        >
                                            {{ preset.name }}
                                        </button>
                                    </div>
                                </div>

                                <!-- 口味偏好 -->
                                <div>
                                    <h6 class="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">👅 口味偏好</h6>
                                    <div class="flex flex-wrap gap-1.5">
                                        <button
                                            v-for="preset in tastePresets"
                                            :key="preset.id"
                                            @click="applyPreset(preset.prompt)"
                                            class="px-3 py-1.5 text-xs font-medium rounded-full border border-green-300 hover:border-green-400 hover:bg-green-50 hover:text-green-700 transition-all duration-200 hover:scale-105 hover:shadow-sm"
                                        >
                                            {{ preset.name }}
                                        </button>
                                    </div>
                                </div>

                                <!-- 健康需求 -->
                                <div>
                                    <h6 class="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">💚 健康需求</h6>
                                    <div class="flex flex-wrap gap-1.5">
                                        <button
                                            v-for="preset in healthPresets"
                                            :key="preset.id"
                                            @click="applyPreset(preset.prompt)"
                                            class="px-3 py-1.5 text-xs font-medium rounded-full border border-purple-300 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-sm"
                                        >
                                            {{ preset.name }}
                                        </button>
                                    </div>
                                </div>

                                <!-- 烹饪方式 -->
                                <div>
                                    <h6 class="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">🔥 烹饪方式</h6>
                                    <div class="flex flex-wrap gap-1.5">
                                        <button
                                            v-for="preset in cookingPresets"
                                            :key="preset.id"
                                            @click="applyPreset(preset.prompt)"
                                            class="px-3 py-1.5 text-xs font-medium rounded-full border border-orange-300 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700 transition-all duration-200 hover:scale-105 hover:shadow-sm"
                                        >
                                            {{ preset.name }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 自定义输入区域 -->
                        <div class="flex-1">
                            <label class="block text-sm font-bold text-dark-800 mb-2">或自由描述：</label>
                            <textarea
                                v-model="customPrompt"
                                @input="limitCustomPrompt"
                                placeholder="例如：做一道清淡的汤，适合老人食用，不要太咸..."
                                class="w-full p-4 border-2 border-gray-300 rounded-lg text-base resize-none focus:outline-none focus:border-blue-400 h-32"
                                maxlength="200"
                            ></textarea>
                            <div v-if="customPrompt.trim()" class="mt-2 flex justify-between items-center">
                                <span class="text-xs text-green-600">✓ 已设置自定义要求</span>
                                <button @click="customPrompt = ''" class="text-xs text-red-600 hover:text-red-700 underline">清除</button>
                            </div>
                        </div>

                        <!-- 随机灵感 -->
                        <div class="mt-3 mb-3">
                            <button
                                @click="getRandomInspiration"
                                class="w-full py-2 px-3 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-medium rounded-lg border-2 border-black transition-all duration-200 transform hover:scale-105"
                            >
                                ✨ 随机灵感
                            </button>
                        </div>

                        <!-- 底部提示 -->
                        <div class="mt-4 pt-3 border-t border-gray-200 mb-4">
                            <div class="flex items-center justify-between text-xs text-gray-500">
                                <span>💡 提示：越具体越好！</span>
                                <span :class="{ 'text-red-500': customPrompt.length > 180 }">{{ customPrompt.length }}/200</span>
                            </div>
                            <p class="text-xs text-gray-400 mt-1">可以组合多个预设，或完全自定义描述</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 中间的OR -->
            <div class="text-center mb-6">
                <span class="bg-yellow-400 text-dark-800 px-4 py-2 rounded-full font-bold text-xl border-2 border-black"> OR </span>
            </div>

            <!-- 步骤4: 结果 -->
            <div ref="resultsSection">
                <div class="bg-dark-800 text-white px-4 py-2 rounded-t-lg border-2 border-black border-b-0 inline-block">
                    <span class="font-bold">4. 菜谱结果</span>
                </div>
                <div class="bg-white border-2 border-black rounded-lg rounded-tl-none p-2 md:p-8">
                    <!-- 加载状态 -->
                    <div v-if="isLoading && recipes.length === 0" class="text-center py-12">
                        <div class="w-16 h-16 border-4 border-gray-300 border-t-dark-800 rounded-full animate-spin mx-auto mb-4"></div>
                        <h3 class="text-xl font-bold text-dark-800 mb-2">大师正在创作中...</h3>
                        <p class="text-gray-600">{{ loadingText }}</p>
                    </div>

                    <!-- 流式加载状态 - 当已有菜谱但还在加载更多时 -->
                    <div v-else-if="isLoading && recipes.length > 0">
                        <!-- 已生成的菜谱 -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <div
                                v-for="(recipe, index) in recipes"
                                :key="recipe.id"
                                class="border-2 border-black rounded-lg overflow-hidden animate-fade-in-up"
                                :style="{ animationDelay: `${index * 0.2}s` }"
                            >
                                <RecipeCard :recipe="recipe" />
                            </div>
                        </div>

                        <!-- 继续加载提示 -->
                        <div class="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                            <div class="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
                            <p class="text-gray-600 font-medium">{{ loadingText }}</p>
                            <p class="text-sm text-gray-500 mt-1">更多精彩菜谱正在路上...</p>
                        </div>
                    </div>

                    <!-- 错误状态 -->
                    <div v-else-if="errorMessage" class="text-center py-12">
                        <div class="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span class="text-red-500 text-2xl">⚠️</span>
                        </div>
                        <h3 class="text-xl font-bold text-red-600 mb-2">生成失败</h3>
                        <p class="text-red-500 mb-4">{{ errorMessage }}</p>
                        <button
                            @click="generateRecipes"
                            :disabled="ingredients.length === 0"
                            class="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium border-2 border-black transition-all duration-200 disabled:cursor-not-allowed"
                        >
                            🔄 重新生成
                        </button>
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
                        <div
                            v-for="(recipe, index) in recipes"
                            :key="recipe.id"
                            class="border-2 border-black rounded-lg overflow-hidden animate-fade-in-up"
                            :style="{ animationDelay: `${index * 0.2}s` }"
                        >
                            <RecipeCard :recipe="recipe" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 菜系Tooltip -->
        <div
            v-if="hoveredCuisine && getHoveredCuisine()"
            class="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
            :style="{
                left: tooltipPosition.x + 'px',
                top: tooltipPosition.y + 'px'
            }"
        >
            <div class="bg-white border-2 border-black rounded-lg shadow-lg p-2 max-w-xs mb-2">
                <div class="flex items-center gap-2 mb-2">
                    <!-- <span class="text-lg">{{ getHoveredCuisine()?.avatar }}</span> -->
                    <h4 class="font-bold text-dark-800">{{ getHoveredCuisine()?.name }}</h4>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{ getHoveredCuisine()?.description }}</p>
                <div class="text-xs text-gray-500"><span class="font-medium">特色：</span>{{ getHoveredCuisine()?.specialty }}</div>
            </div>
            <!-- 小箭头 -->
            <div class="flex justify-center">
                <div class="w-3 h-3 bg-white border-r-2 border-b-2 border-black transform rotate-45"></div>
            </div>
        </div>

        <!-- 底部 -->
        <footer class="bg-white border-2 border-black mx-2 md:mx-4 mb-4 rounded-lg p-4 text-center">
            <p class="text-sm text-gray-600">
                © 2025 一饭封神 | <a href="https://github.com/liu-ziting/what-to-eat" target="_blank" class="text-retro-blue hover:underline">Powered by Liuziting</a>
            </p>
        </footer>
    </div>
</template>

<style scoped>
@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
    opacity: 0;
}
</style>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { cuisines } from '@/config/cuisines'
import { ingredientCategories } from '@/config/ingredients'
import RecipeCard from '@/components/RecipeCard.vue'
import { generateMultipleRecipes, generateCustomRecipe, generateMultipleRecipesStream } from '@/services/aiService'
import type { Recipe, CuisineType, NutritionAnalysis } from '@/types'

// 响应式数据
const ingredients = ref<string[]>([])
const currentIngredient = ref('')
const selectedCuisines = ref<string[]>([])
const customPrompt = ref('')
const recipes = ref<Recipe[]>([])
const isLoading = ref(false)
const loadingText = ref('大师正在挑选食材...')
const resultsSection = ref<HTMLElement | null>(null)
const errorMessage = ref('')
const showIngredientPicker = ref(false)
const showPresetPicker = ref(false)
const hoveredCuisine = ref<string | null>(null)
const tooltipPosition = ref({ x: 0, y: 0 })

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

// 预设选项数据
const scenePresets = [
    { id: 'family', name: '家庭聚餐', prompt: '适合全家人一起享用的家常菜，老少皆宜，营养均衡' },
    { id: 'romantic', name: '浪漫晚餐', prompt: '适合情侣约会的精致菜品，卖相精美，氛围浪漫' },
    { id: 'quick', name: '快手菜', prompt: '制作简单快速的菜品，15分钟内完成，适合忙碌时光' },
    { id: 'party', name: '聚会小食', prompt: '适合朋友聚会的下酒菜或小食，方便分享' },
    { id: 'breakfast', name: '营养早餐', prompt: '健康营养的早餐搭配，提供一天的活力' },
    { id: 'lunch', name: '工作午餐', prompt: '适合上班族的午餐，营养丰富且不油腻' }
]

const tastePresets = [
    { id: 'light', name: '清淡口味', prompt: '口味清淡，少油少盐，突出食材本味' },
    { id: 'spicy', name: '香辣过瘾', prompt: '香辣刺激，层次丰富，适合喜欢辣味的人' },
    { id: 'sweet', name: '微甜可口', prompt: '带有淡淡甜味，口感温和，老少皆宜' },
    { id: 'sour', name: '酸爽开胃', prompt: '酸味突出，开胃解腻，适合夏天享用' },
    { id: 'savory', name: '鲜香浓郁', prompt: '鲜味十足，香气浓郁，回味无穷' },
    { id: 'crispy', name: '酥脆爽口', prompt: '口感酥脆，层次分明，嚼劲十足' }
]

const healthPresets = [
    { id: 'lowfat', name: '低脂健康', prompt: '低脂肪制作，健康营养，适合减脂期间食用' },
    { id: 'highprotein', name: '高蛋白', prompt: '富含优质蛋白质，适合健身人群和成长期儿童' },
    { id: 'vegetarian', name: '素食主义', prompt: '纯素食制作，不含任何动物性食材，营养均衡' },
    { id: 'diabetic', name: '控糖友好', prompt: '低糖低GI，适合糖尿病患者或需要控制血糖的人群' },
    { id: 'elderly', name: '老人友好', prompt: '软烂易消化，营养丰富，适合老年人食用' },
    { id: 'children', name: '儿童喜爱', prompt: '造型可爱，营养全面，适合儿童的口味偏好' }
]

const cookingPresets = [
    { id: 'steam', name: '清蒸', prompt: '采用蒸制方法，保持食材原味和营养' },
    { id: 'stirfry', name: '爆炒', prompt: '大火爆炒，锁住食材鲜味，口感脆嫩' },
    { id: 'braise', name: '红烧', prompt: '红烧制作，色泽红亮，味道浓郁' },
    { id: 'soup', name: '煲汤', prompt: '制作成汤品，清香鲜美，营养丰富' },
    { id: 'cold', name: '凉拌', prompt: '凉拌制作，清爽开胃，适合夏季' },
    { id: 'grill', name: '烧烤', prompt: '烧烤方式制作，香气四溢，口感独特' }
]

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

// 快速添加食材
const quickAddIngredient = (ingredient: string) => {
    if (!ingredients.value.includes(ingredient) && ingredients.value.length < 10) {
        ingredients.value.push(ingredient)
    }
}

// 切换食材选择器显示
const toggleIngredientPicker = () => {
    showIngredientPicker.value = !showIngredientPicker.value
}

// 切换预设选择器显示
const togglePresetPicker = () => {
    showPresetPicker.value = !showPresetPicker.value
}

// 应用预设
const applyPreset = (presetPrompt: string) => {
    if (customPrompt.value.trim()) {
        // 如果已有内容，询问是否替换或追加
        const newContent = customPrompt.value.trim() + '，' + presetPrompt
        if (newContent.length <= 200) {
            customPrompt.value = newContent
        }
    } else {
        customPrompt.value = presetPrompt
    }
}

// 限制自定义提示词长度
const limitCustomPrompt = () => {
    if (customPrompt.value.length > 200) {
        customPrompt.value = customPrompt.value.substring(0, 200)
    }
}

// 随机灵感数据
const randomInspirations = [
    '制作一道有故事的菜，让人回味童年',
    '融合东西方口味，创新搭配',
    '用最简单的方法，做出最温暖的味道',
    '适合雨天享用的暖心料理',
    '颜值超高的网红打卡菜品',
    '妈妈味道的现代演绎',
    '适合深夜的治愈系美食',
    '带有节日氛围的特色菜',
    '健康养生的药膳料理',
    '适合野餐的便携美食',
    '有仪式感的精致小食',
    '适合看剧时享用的小零食',
    '能够暖胃暖心的汤品',
    '适合和朋友分享的下酒菜',
    '充满创意的摆盘艺术菜',
    '适合运动后补充能量的料理'
]

// 获取随机灵感
const getRandomInspiration = () => {
    const randomIndex = Math.floor(Math.random() * randomInspirations.length)
    const inspiration = randomInspirations[randomIndex]

    if (customPrompt.value.trim()) {
        const newContent = customPrompt.value.trim() + '，' + inspiration
        if (newContent.length <= 200) {
            customPrompt.value = newContent
        } else {
            customPrompt.value = inspiration
        }
    } else {
        customPrompt.value = inspiration
    }
}

// 显示菜系tooltip
const showCuisineTooltip = (cuisine: CuisineType, event: MouseEvent) => {
    hoveredCuisine.value = cuisine.id
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    tooltipPosition.value = {
        x: rect.left + rect.width / 2,
        y: rect.top - 10
    }
}

// 隐藏菜系tooltip
const hideCuisineTooltip = () => {
    hoveredCuisine.value = null
}

// 获取当前悬停的菜系信息
const getHoveredCuisine = () => {
    return cuisines.find(c => c.id === hoveredCuisine.value)
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

    // 重置状态
    isLoading.value = true
    recipes.value = [] // 清空之前的菜谱
    errorMessage.value = ''
    loadingText.value = '大师正在挑选食材...' // 重置加载文字

    // 清除之前的加载定时器
    if (loadingInterval) {
        clearInterval(loadingInterval)
        loadingInterval = null
    }

    // 滚动到结果区域
    if (resultsSection.value) {
        resultsSection.value.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }

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
                // 随机选择2个菜系
                const shuffled = [...cuisines].sort(() => 0.5 - Math.random())
                selectedCuisineObjects = shuffled.slice(0, 2)
            }

            // 使用流式生成菜谱，每完成一个就立即显示
            await generateMultipleRecipesStream(
                ingredients.value,
                selectedCuisineObjects,
                (recipe: Recipe, index: number, total: number) => {
                    // 每生成一个菜谱就立即添加到列表中
                    recipes.value.push(recipe)

                    // 更新加载文字，显示进度
                    loadingText.value = `已完成 ${recipes.value.length}/${total} 道菜谱...`

                    // 如果是最后一个菜谱，停止加载状态
                    if (recipes.value.length === total) {
                        isLoading.value = false
                        if (loadingInterval) {
                            clearInterval(loadingInterval)
                            loadingInterval = null
                        }
                    }
                },
                customPrompt.value.trim() || undefined
            )
        }
    } catch (error) {
        console.error('生成菜谱失败:', error)
        // 显示错误信息
        errorMessage.value = error instanceof Error ? error.message : 'AI生成菜谱失败，请稍后重试'
    } finally {
        // 确保加载状态被清除
        if (isLoading.value) {
            isLoading.value = false
        }
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
                // 随机选择2个菜系
                const shuffled = [...cuisines].sort(() => 0.5 - Math.random())
                cuisinesToUse = shuffled.slice(0, 2)
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
                        tips: ['根据个人喜好调整口味', '注意食材的新鲜度', '掌握好火候'],
                        nutritionAnalysis: generateMockNutrition(ingredients.value)
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
                        tips: ['火候要掌握好，避免炒糊', '调料要适量，突出食材本味', '炒制过程中要勤翻动'],
                        nutritionAnalysis: generateMockNutrition(ingredients.value)
                    }
                })
            }

            recipes.value = mockRecipes
            resolve(mockRecipes)
        }, 3000)
    })
}

// 生成模拟营养分析数据
const generateMockNutrition = (ingredients: string[]): NutritionAnalysis => {
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

onUnmounted(() => {
    if (loadingInterval) {
        clearInterval(loadingInterval)
    }
})
</script>
