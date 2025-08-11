<template>
    <div class="recipe-card">
        <!-- 菜谱头部 -->
        <div class="flex items-start justify-between mb-6">
            <div>
                <h3 class="text-3xl font-bold text-neutral-800 mb-3">{{ recipe.name }}</h3>
                <div class="flex items-center gap-6 text-base text-neutral-600">
                    <span class="flex items-center gap-2 bg-accent-100 px-3 py-1 rounded-full"> 👨‍🍳 {{ recipe.cuisine }} </span>
                    <span class="flex items-center gap-2"> ⏱️ {{ recipe.cookingTime }}分钟 </span>
                    <span class="flex items-center gap-2"> 📊 {{ difficultyText }} </span>
                </div>
            </div>
            <div class="text-right">
                <div class="text-4xl mb-2">🍽️</div>
            </div>
        </div>

        <!-- 食材列表 -->
        <div class="mb-6">
            <h4 class="text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">🥬 所需食材</h4>
            <div class="flex flex-wrap gap-3">
                <span
                    v-for="ingredient in recipe.ingredients"
                    :key="ingredient"
                    class="bg-accent-100 text-accent-800 px-4 py-2 rounded-full text-base font-medium border border-accent-200"
                >
                    {{ ingredient }}
                </span>
            </div>
        </div>

        <!-- 制作步骤 -->
        <div class="mb-6">
            <h4 class="text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">📝 制作步骤</h4>
            <div class="space-y-4">
                <div v-for="step in recipe.steps" :key="step.step" class="flex gap-4 p-5 bg-gradient-to-r from-neutral-50 to-primary-50 rounded-xl border border-neutral-200">
                    <div
                        class="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full flex items-center justify-center font-bold text-base shadow-md"
                    >
                        {{ step.step }}
                    </div>
                    <div class="flex-1">
                        <p class="text-neutral-800 mb-2 text-base leading-relaxed">{{ step.description }}</p>
                        <div v-if="step.time || step.temperature" class="flex gap-4 text-sm text-neutral-600">
                            <span v-if="step.time" class="flex items-center gap-1 bg-white px-2 py-1 rounded-md"> ⏱️ {{ step.time }}分钟 </span>
                            <span v-if="step.temperature" class="flex items-center gap-1 bg-white px-2 py-1 rounded-md"> 🌡️ {{ step.temperature }} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 烹饪技巧 -->
        <div v-if="recipe.tips && recipe.tips.length > 0">
            <h4 class="text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">💡 烹饪技巧</h4>
            <div class="bg-gradient-to-r from-accent-50 to-primary-50 border-l-4 border-accent-400 p-5 rounded-r-xl">
                <ul class="space-y-3">
                    <li v-for="tip in recipe.tips" :key="tip" class="flex items-start gap-3 text-neutral-700">
                        <span class="text-accent-500 mt-1 text-lg">•</span>
                        <span class="text-base leading-relaxed">{{ tip }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Recipe } from '@/types'

interface Props {
    recipe: Recipe
}

const props = defineProps<Props>()

const difficultyText = computed(() => {
    const difficultyMap = {
        easy: '简单',
        medium: '中等',
        hard: '困难'
    }
    return difficultyMap[props.recipe.difficulty] || '中等'
})
</script>

<style scoped>
.recipe-card {
    @apply transition-all duration-300;
}

.recipe-card:hover {
    @apply transform scale-[1.02];
}
</style>
