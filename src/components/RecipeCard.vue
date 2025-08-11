<template>
    <div class="recipe-card bg-white">
        <!-- 菜谱头部 -->
        <div class="bg-pink-400 text-white p-4 border-b-2 border-black">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <h3 class="text-lg font-bold mb-1 line-clamp-2">{{ recipe.name }}</h3>
                    <div class="flex items-center gap-3 text-sm">
                        <span class="bg-white/20 px-2 py-1 rounded text-xs"> 👨‍🍳 {{ recipe.cuisine }} </span>
                        <span>⏱️ {{ recipe.cookingTime }}分钟</span>
                        <span>📊 {{ difficultyText }}</span>
                    </div>
                </div>
                <div class="text-2xl ml-2">🍽️</div>
            </div>
        </div>

        <div class="p-4">
            <!-- 食材列表 -->
            <div class="mb-4">
                <h4 class="text-sm font-bold text-dark-800 mb-2 flex items-center gap-1">🥬 所需食材</h4>
                <div class="flex flex-wrap gap-1">
                    <span v-for="ingredient in recipe.ingredients" :key="ingredient" class="bg-yellow-400 text-dark-800 px-2 py-1 rounded text-xs font-medium border border-black">
                        {{ ingredient }}
                    </span>
                </div>
            </div>

            <!-- 制作步骤预览 -->
            <div class="mb-4">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="text-sm font-bold text-dark-800 flex items-center gap-1">📝 制作步骤</h4>
                    <button @click="toggleExpanded" class="bg-gray-100 hover:bg-gray-200 text-dark-800 text-xs px-2 py-1 rounded border border-black transition-colors">
                        {{ isExpanded ? '收起' : '展开' }}
                    </button>
                </div>

                <!-- 简化步骤预览 -->
                <div v-if="!isExpanded" class="space-y-2">
                    <div v-for="step in recipe.steps.slice(0, 3)" :key="step.step" class="flex gap-2 p-2 bg-gray-50 rounded border border-gray-200">
                        <div class="flex-shrink-0 w-5 h-5 bg-dark-800 text-white rounded flex items-center justify-center font-bold text-xs">
                            {{ step.step }}
                        </div>
                        <p class="text-dark-700 text-xs line-clamp-2">{{ step.description }}</p>
                    </div>
                    <div v-if="recipe.steps.length > 3" class="text-center py-1">
                        <span class="text-gray-500 text-xs">还有 {{ recipe.steps.length - 3 }} 个步骤...</span>
                    </div>
                </div>

                <!-- 完整步骤 -->
                <div v-else class="space-y-2">
                    <div v-for="step in recipe.steps" :key="step.step" class="flex gap-3 p-3 bg-gray-50 rounded border border-gray-200">
                        <div class="flex-shrink-0 w-6 h-6 bg-dark-800 text-white rounded flex items-center justify-center font-bold text-xs">
                            {{ step.step }}
                        </div>
                        <div class="flex-1">
                            <p class="text-dark-800 mb-1 text-sm">{{ step.description }}</p>
                            <div v-if="step.time || step.temperature" class="flex gap-2 text-xs text-gray-600">
                                <span v-if="step.time" class="bg-white px-2 py-1 rounded border"> ⏱️ {{ step.time }}分钟 </span>
                                <span v-if="step.temperature" class="bg-white px-2 py-1 rounded border"> 🌡️ {{ step.temperature }} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 烹饪技巧 -->
            <div v-if="recipe.tips && recipe.tips.length > 0 && isExpanded">
                <h4 class="text-sm font-bold text-dark-800 mb-2 flex items-center gap-1">💡 烹饪技巧</h4>
                <div class="bg-yellow-100 border-l-4 border-yellow-400 p-3 rounded-r">
                    <ul class="space-y-1">
                        <li v-for="tip in recipe.tips" :key="tip" class="flex items-start gap-2 text-dark-700">
                            <span class="text-yellow-600 mt-1 text-xs">•</span>
                            <span class="text-xs">{{ tip }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Recipe } from '@/types'

interface Props {
    recipe: Recipe
}

const props = defineProps<Props>()
const isExpanded = ref(false)

const difficultyText = computed(() => {
    const difficultyMap = {
        easy: '简单',
        medium: '中等',
        hard: '困难'
    }
    return difficultyMap[props.recipe.difficulty] || '中等'
})

const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.recipe-card {
    @apply transition-all duration-300 h-full;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
