<template>
    <div class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-200">
        <!-- 头部 -->
        <header class="bg-white/90 backdrop-blur-sm shadow-lg border-b border-primary-200">
            <div class="max-w-4xl mx-auto px-4 py-8">
                <div class="text-center">
                    <h1 class="text-5xl font-bold text-neutral-800 mb-3">🍳 一饭封神</h1>
                    <p class="text-neutral-600 text-xl font-medium">AI厨艺大师为您量身定制美味佳肴</p>
                </div>
            </div>
        </header>

        <main class="max-w-4xl mx-auto px-4 py-8">
            <!-- 主要输入区域 -->
            <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-8 pulse-glow">
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold text-neutral-800 mb-3">🥬 告诉我你有什么食材</h2>
                    <p class="text-neutral-600 text-lg">输入你现有的食材，让AI大师为你创造美味</p>
                </div>

                <div class="space-y-6">
                    <!-- 食材输入框 -->
                    <div class="relative">
                        <div
                            class="flex flex-wrap gap-3 min-h-[80px] p-6 border-3 border-dashed border-accent-300 rounded-2xl bg-gradient-to-r from-accent-50 to-primary-50 hover:border-accent-400 transition-all duration-300"
                        >
                            <div
                                v-for="ingredient in ingredients"
                                :key="ingredient"
                                class="inline-flex items-center gap-2 bg-accent-500 text-white px-4 py-2 rounded-full text-base font-medium shadow-md hover:bg-accent-600 transition-colors"
                            >
                                {{ ingredient }}
                                <button @click="removeIngredient(ingredient)" class="hover:bg-accent-700 rounded-full p-1 transition-colors">
                                    <span class="text-sm">✕</span>
                                </button>
                            </div>
                            <input
                                v-model="currentIngredient"
                                @keyup.enter="addIngredient"
                                placeholder="输入食材名称，按回车添加..."
                                class="flex-1 min-w-[250px] bg-transparent outline-none text-neutral-800 placeholder-neutral-500 text-lg font-medium"
                            />
                        </div>
                    </div>

                    <!-- 添加按钮 -->
                    <div class="text-center">
                        <button
                            @click="addIngredient"
                            :disabled="!currentIngredient.trim()"
                            class="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                        >
                            ➕ 添加食材
                        </button>
                    </div>
                </div>
            </div>

            <!-- 厨艺大师选择区域 - 弱化设计 -->
            <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-6 mb-8">
                <details class="group">
                    <summary class="cursor-pointer text-center p-4 hover:bg-neutral-50 rounded-xl transition-colors">
                        <h3 class="text-lg font-medium text-neutral-700 inline-flex items-center gap-2">
                            👨‍🍳 选择厨艺大师
                            <span class="text-sm text-neutral-500">(可选，默认随机选择)</span>
                            <span class="group-open:rotate-180 transition-transform duration-300">▼</span>
                        </h3>
                    </summary>

                    <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div
                            v-for="cuisine in cuisines"
                            :key="cuisine.id"
                            @click="selectCuisine(cuisine)"
                            :class="[
                                'cursor-pointer p-3 rounded-lg border transition-all duration-200 hover:scale-102',
                                selectedCuisines.includes(cuisine.id)
                                    ? 'border-accent-400 bg-accent-100 shadow-md'
                                    : 'border-neutral-200 bg-white hover:border-accent-300 hover:shadow-sm'
                            ]"
                        >
                            <div class="text-center">
                                <div class="text-2xl mb-1">{{ cuisine.avatar }}</div>
                                <h4 class="font-medium text-neutral-800 text-sm">{{ cuisine.name }}</h4>
                                <p class="text-xs text-neutral-500 mt-1">{{ cuisine.specialty }}</p>
                            </div>
                        </div>
                    </div>
                </details>
            </div>

            <!-- 生成按钮 -->
            <div class="text-center mb-8">
                <button
                    @click="generateRecipes"
                    :disabled="ingredients.length === 0 || isLoading"
                    class="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-16 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                    <span v-if="!isLoading" class="flex items-center gap-3"> ✨ 开始创作美味佳肴 </span>
                </button>
            </div>

            <!-- 加载动效 -->
            <div v-if="isLoading" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <CookingLoader />
            </div>

            <!-- 菜谱展示区域 -->
            <div v-if="recipes.length > 0" class="space-y-8">
                <h2 class="text-4xl font-bold text-neutral-800 text-center mb-8">🍽️ 大师们的杰作</h2>

                <div v-for="recipe in recipes" :key="recipe.id" class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-accent-200">
                    <RecipeCard :recipe="recipe" />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { cuisines } from '@/config/cuisines'
import RecipeCard from '@/components/RecipeCard.vue'
import CookingLoader from '@/components/CookingLoader.vue'
import { generateMultipleRecipes } from '@/services/aiService'
import type { Recipe, CuisineType } from '@/types'

// 响应式数据
const ingredients = ref<string[]>([])
const currentIngredient = ref('')
const selectedCuisines = ref<string[]>([])
const recipes = ref<Recipe[]>([])
const isLoading = ref(false)

// 添加食材
const addIngredient = () => {
    const ingredient = currentIngredient.value.trim()
    if (ingredient && !ingredients.value.includes(ingredient)) {
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

    try {
        // 如果没有选择菜系，随机选择2-3个
        let selectedCuisineObjects = cuisines.filter(c => selectedCuisines.value.includes(c.id))

        if (selectedCuisineObjects.length === 0) {
            // 随机选择2-3个菜系
            const shuffled = [...cuisines].sort(() => 0.5 - Math.random())
            selectedCuisineObjects = shuffled.slice(0, Math.floor(Math.random() * 2) + 2)
        }

        // 调用AI服务生成菜谱
        const generatedRecipes = await generateMultipleRecipes(ingredients.value, selectedCuisineObjects)

        recipes.value = generatedRecipes
    } catch (error) {
        console.error('生成菜谱失败:', error)
        // 如果AI调用失败，使用模拟数据作为后备
        await simulateAICall()
    } finally {
        isLoading.value = false
    }
}

// 模拟AI调用（后续替换为真实接口）
const simulateAICall = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            // 模拟生成菜谱数据
            const mockRecipes: Recipe[] = selectedCuisines.value.map((cuisineId, index) => {
                const cuisine = cuisines.find(c => c.id === cuisineId)
                return {
                    id: `recipe-${cuisineId}-${Date.now()}`,
                    name: `${cuisine?.name}推荐：${ingredients.value.join('')}炒制`,
                    cuisine: cuisine?.name || '',
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

            recipes.value = mockRecipes
            resolve(mockRecipes)
        }, 2000)
    })
}
</script>
