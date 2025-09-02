<template>
    <div class="fixed bottom-6 right-6 z-50">
        <!-- 主按钮 -->
        <div
            @click="toggleModal"
            class="group relative bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 hover:from-orange-500 hover:via-red-500 hover:to-pink-600 text-white rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-1 border-2 border-white/20 backdrop-blur-sm"
        >
            <!-- 光晕效果 -->
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-300/30 to-pink-400/30 blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>

            <!-- 按钮内容 -->
            <div class="relative flex items-center gap-3 px-4 py-3 md:px-5 md:py-4">
                <!-- 咖啡图标容器 -->
                <div class="relative">
                    <div class="text-2xl md:text-3xl filter drop-shadow-lg">☕</div>
                    <!-- 蒸汽效果 -->
                    <div class="absolute -top-1 left-1/2 transform -translate-x-1/2">
                        <div class="w-1 h-2 bg-white/40 rounded-full animate-pulse"></div>
                    </div>
                    <div class="absolute -top-2 left-1/2 transform -translate-x-1/2 translate-x-1">
                        <div class="w-0.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-150"></div>
                    </div>
                    <div class="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-x-1">
                        <div class="w-0.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-300"></div>
                    </div>
                </div>

                <!-- 文字 -->
                <div class="hidden md:block">
                    <div class="font-bold text-sm tracking-wide">投喂</div>
                    <div class="text-xs opacity-90 -mt-0.5">支持开发</div>
                </div>

                <!-- 爱心装饰 -->
                <div class="absolute -top-1 -right-1 text-xs animate-pulse">❤️</div>
            </div>

            <!-- 涟漪效果 -->
            <div class="absolute inset-0 rounded-2xl overflow-hidden">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"
                ></div>
            </div>
        </div>

        <!-- 提示气泡 -->
        <div
            v-if="!showModal"
            class="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
        >
            点击支持开发者 ✨
            <div class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>

        <!-- 弹窗 -->
        <div v-if="showModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" @click="closeModal">
            <div
                @click.stop
                class="bg-white rounded-3xl p-8 max-w-md mx-4 border-4 border-[#0A0910] shadow-2xl transform transition-all duration-500 relative overflow-hidden"
                :class="showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
            >
                <!-- 背景装饰 -->
                <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-red-400 to-pink-500"></div>

                <div class="text-center relative">
                    <!-- 标题区域 -->
                    <div class="mb-6">
                        <div class="text-5xl mb-3 animate-bounce">☕</div>
                        <h3 class="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">支持开发者</h3>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            🤖 AI需要成本，您的每一份支持<br />
                            都让项目走得更远 ❤️
                        </p>
                    </div>

                    <!-- 二维码区域 -->
                    <div class="bg-gradient-to-br from-orange-50 to-red-50 border-3 border-orange-200 rounded-2xl p-6 mb-6 relative">
                        <div class="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">微信支付</div>
                        <img src="/wx.jpg" alt="微信收款码" class="w-48 h-48 mx-auto border-4 border-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300" />
                        <p class="text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                            <span>扫码支持开发者</span>
                            <span class="animate-pulse">✨</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)

const toggleModal = () => {
    showModal.value = !showModal.value
}

const closeModal = () => {
    showModal.value = false
}

const shareProject = () => {
    if (navigator.share) {
        navigator.share({
            title: '一饭封神 - AI厨艺大师指导平台',
            text: '发现这个超棒的AI美食平台，让每一餐都能达到封神级别！',
            url: window.location.href
        })
    } else {
        // 复制链接到剪贴板
        navigator.clipboard.writeText(window.location.href)
        alert('链接已复制到剪贴板！')
    }
    closeModal()
}
</script>
