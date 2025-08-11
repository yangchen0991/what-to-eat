<template>
    <div class="recipe-card p-6">
        <!-- 菜谱头部 -->
        <div class="mb-5">
            <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                    <h3 class="text-2xl font-bold text-neutral-800 mb-3 line-clamp-2">{{ recipe.name }}</h3>
                    <div class="flex items-center gap-3 text-sm text-neutral-600 flex-wrap">
                        <span class="flex items-center gap-1 bg-accent-100 px-3 py-1 rounded-full text-sm"> 👨‍🍳 {{ recipe.cuisine }} </span>
                        <span class="flex items-center gap-1"> ⏱️ {{ recipe.cookingTime }}分钟 </span>
                        <span class="flex items-center gap-1"> 📊 {{ difficultyText }} </span>
                    </div>
                </div>
                <div class="text-4xl ml-3">🍽️</div>
            </div>
        </div>

        <!-- 食材列表 -->
        <div class="mb-5">
            <h4 class="text-lg font-semibold text-neutral-800 mb-3 flex items-center gap-2">🥬 所需食材</h4>
            <div class="flex flex-wrap gap-2">
                <span v-for="ingredient in recipe.ingredients" :key="ingredient" class="bg-accent-100 text-accent-800 px-3 py-2 rounded-full text-sm font-medium">
                    {{ ingredient }}
                </span>
            </div>
        </div>

        <!-- 制作步骤预览 -->
        <div class="mb-5">
            <div class="flex items-center justify-between mb-3">
                <h4 class="text-lg font-semibold text-neutral-800 flex items-center gap-2">📝 制作步骤</h4>
                <button
                    @click="toggleExpanded"
                    class="text-accent-600 hover:text-accent-700 text-sm font-medium transition-colors px-3 py-1 rounded-full bg-accent-50 hover:bg-accent-100"
                >
                    {{ isExpanded ? '收起' : '展开' }}
                </button>
            </div>

            <!-- 简化步骤预览 -->
            <div v-if="!isExpanded" class="space-y-3">
                <div v-for="step in recipe.steps.slice(0, 3)" :key="step.step" class="flex gap-3 p-3 bg-neutral-50 rounded-lg">
                    <div class="flex-shrink-0 w-7 h-7 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {{ step.step }}
                    </div>
                    <p class="text-neutral-700 text-sm line-clamp-2 leading-relaxed">{{ step.description }}</p>
                </div>
                <div v-if="recipe.steps.length > 3" class="text-center py-2">
                    <span class="text-neutral-500 text-sm">还有 {{ recipe.steps.length - 3 }} 个步骤...</span>
                </div>
            </div>

            <!-- 完整步骤 -->
            <div v-else class="space-y-3">
                <div v-for="step in recipe.steps" :key="step.step" class="flex gap-3 p-3 bg-gradient-to-r from-neutral-50 to-primary-50 rounded-lg border border-neutral-200">
                    <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {{ step.step }}
                    </div>
                    <div class="flex-1">
                        <p class="text-neutral-800 mb-1 text-sm leading-relaxed">{{ step.description }}</p>
                        <div v-if="step.time || step.temperature" class="flex gap-2 text-xs text-neutral-600">
                            <span v-if="step.time" class="flex items-center gap-1 bg-white px-2 py-1 rounded"> ⏱️ {{ step.time }}分钟 </span>
                            <span v-if="step.temperature" class="flex items-center gap-1 bg-white px-2 py-1 rounded"> 🌡️ {{ step.temperature }} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 烹饪技巧 -->
        <div v-if="recipe.tips && recipe.tips.length > 0 && isExpanded">
            <h4 class="text-lg font-semibold text-neutral-800 mb-3 flex items-center gap-2">💡 烹饪技巧</h4>
            <div class="bg-gradient-to-r from-accent-50 to-primary-50 border-l-4 border-accent-400 p-4 rounded-r-xl">
                <ul class="space-y-2">
                    <li v-for="tip in recipe.tips" :key="tip" class="flex items-start gap-3 text-neutral-700">
                        <span class="text-accent-500 mt-1 text-base">•</span>
                        <span class="text-sm leading-relaxed">{{ tip }}</span>
                    </li>
                </ul>
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
