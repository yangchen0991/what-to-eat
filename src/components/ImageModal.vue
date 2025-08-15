<template>
    <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" @click="$emit('close')">
        <div class="bg-white rounded-lg border-2 border-[#0A0910] max-w-4xl max-h-[90vh] overflow-hidden" @click.stop>
            <!-- 头部 -->
            <div class="bg-blue-500 text-white p-4 flex items-center justify-between">
                <div>
                    <h3 class="font-bold text-lg">{{ image.recipeName }}</h3>
                    <p class="text-blue-100 text-sm">{{ image.cuisine }} • {{ formatDate(image.generatedAt) }}</p>
                </div>
                <button @click="$emit('close')" class="text-white hover:text-gray-200 text-2xl">×</button>
            </div>

            <!-- 图片 -->
            <div class="relative">
                <img :src="image.url" :alt="image.recipeName" class="w-full max-h-[60vh] object-contain" />
            </div>

            <!-- 详情信息 -->
            <div class="p-4 max-h-48 overflow-y-auto">
                <!-- 食材 -->
                <div class="mb-4">
                    <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-1">🥬 食材</h4>
                    <div class="flex flex-wrap gap-1">
                        <span v-for="ingredient in image.ingredients" :key="ingredient" class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm border">
                            {{ ingredient }}
                        </span>
                    </div>
                </div>

                <!-- 生成提示词 -->
                <div v-if="image.prompt" class="mb-4">
                    <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-1">🎨 生成提示</h4>
                    <p class="text-gray-600 text-sm bg-gray-50 p-3 rounded border">
                        {{ image.prompt }}
                    </p>
                </div>
            </div>

            <!-- 操作按钮 -->
            <div class="bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-between">
                <div class="text-sm text-gray-500">生成于 {{ new Date(image.generatedAt).toLocaleString('zh-CN') }}</div>
                <div class="flex items-center gap-2">
                    <button
                        @click="$emit('download', image)"
                        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium border-2 border-[#0A0910] transition-all duration-200 hover:scale-105"
                    >
                        📥 下载
                    </button>
                    <button
                        @click="$emit('delete', image.id)"
                        class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium border-2 border-[#0A0910] transition-all duration-200 hover:scale-105"
                    >
                        🗑️ 删除
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GalleryImage } from '@/services/galleryService'

interface Props {
    image: GalleryImage
}

defineProps<Props>()

defineEmits<{
    close: []
    delete: [imageId: string]
    download: [image: GalleryImage]
}>()

// 格式化日期
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
        return '今天'
    } else if (diffDays === 1) {
        return '昨天'
    } else if (diffDays < 7) {
        return `${diffDays}天前`
    } else {
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }
}
</script>

<style scoped>
/* 确保弹窗在最顶层 */
.z-50 {
    z-index: 50;
}
</style>
