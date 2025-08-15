<template>
    <nav class="bg-white border-2 border-black max-w-7xl mx-auto rounded-lg mb-4 shadow-lg">
        <div class="px-4 py-3">
            <!-- 桌面端导航 -->
            <div class="hidden md:flex items-center justify-between">
                <!-- Logo区域 -->
                <router-link to="/" class="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
                    <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center border-2 border-black">
                        <span class="text-white text-xl font-bold">饭</span>
                    </div>
                    <div>
                        <div class="text-2xl font-black text-dark-800 tracking-wider">
                            {{ pageTitle }}
                        </div>
                        <div class="text-xs text-gray-600 font-medium">{{ pageSubtitle }}</div>
                    </div>
                </router-link>

                <!-- 导航菜单 -->
                <div class="flex items-center gap-3">
                    <router-link
                        to="/"
                        class="flex items-center gap-2 px-4 py-2 rounded-lg font-bold border-2 border-black transition-all duration-200 transform hover:scale-105 text-sm"
                        :class="$route.path === '/' ? 'bg-yellow-400 text-dark-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                    >
                        <span>🏠</span>
                        <span>主页</span>
                    </router-link>
                    <router-link
                        to="/today-eat"
                        class="flex items-center gap-2 px-4 py-2 rounded-lg font-bold border-2 border-black transition-all duration-200 transform hover:scale-105 text-sm"
                        :class="$route.path === '/today-eat' ? 'bg-orange-400 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'"
                    >
                        <span>🎲</span>
                        <span>今天吃什么？</span>
                    </router-link>
                    <router-link
                        to="/table-design"
                        class="flex items-center gap-2 px-4 py-2 rounded-lg font-bold border-2 border-black transition-all duration-200 transform hover:scale-105 text-sm"
                        :class="$route.path === '/table-design' ? 'bg-purple-400 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'"
                    >
                        <span>🍽️</span>
                        <span>一桌菜设计</span>
                    </router-link>
                    <router-link
                        to="/favorites"
                        class="flex items-center gap-2 px-4 py-2 rounded-lg font-bold border-2 border-black transition-all duration-200 transform hover:scale-105 text-sm"
                        :class="$route.path === '/favorites' ? 'bg-red-400 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'"
                    >
                        <span>❤️</span>
                        <span>我的收藏</span>
                    </router-link>
                    <router-link
                        to="/about"
                        class="flex items-center gap-2 px-4 py-2 rounded-lg font-bold border-2 border-black transition-all duration-200 transform hover:scale-105 text-sm"
                        :class="$route.path === '/about' ? 'bg-blue-400 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'"
                    >
                        <span>📖</span>
                        <span>简介</span>
                    </router-link>
                </div>
            </div>

            <!-- 移动端导航 -->
            <div class="md:hidden">
                <!-- 顶部Logo和菜单按钮 -->
                <div class="flex items-center justify-between mb-3">
                    <router-link to="/" class="flex items-center gap-2">
                        <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center border-2 border-black">
                            <span class="text-white text-lg font-bold">饭</span>
                        </div>
                        <div>
                            <div class="text-lg font-black text-dark-800 tracking-wider">
                                {{ pageTitle }}
                            </div>
                            <div class="text-xs text-gray-600 font-medium">{{ pageSubtitle }}</div>
                        </div>
                    </router-link>
                    <button @click="showMobileMenu = !showMobileMenu" class="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-black transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

                <!-- 移动端菜单 -->
                <div v-if="showMobileMenu" class="space-y-2 border-t-2 border-gray-200 pt-3">
                    <router-link
                        to="/"
                        @click="showMobileMenu = false"
                        class="flex items-center gap-2 w-full px-3 py-2 rounded-lg font-bold border-2 border-black transition-all duration-200 text-sm"
                        :class="$route.path === '/' ? 'bg-yellow-400 text-dark-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                    >
                        <span>🏠</span>
                        <span>主页</span>
                    </router-link>
                    <router-link
                        to="/today-eat"
                        @click="showMobileMenu = false"
                        class="flex items-center gap-2 w-full px-3 py-2 rounded-lg font-bold border-2 border-black transition-all duration-200 text-sm"
                        :class="$route.path === '/today-eat' ? 'bg-orange-400 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'"
                    >
                        <span>🎲</span>
                        <span>今天吃什么？</span>
                    </router-link>
                    <router-link
                        to="/table-design"
                        @click="showMobileMenu = false"
                        class="flex items-center gap-2 w-full px-3 py-2 rounded-lg font-bold border-2 border-black transition-all duration-200 text-sm"
                        :class="$route.path === '/table-design' ? 'bg-purple-400 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'"
                    >
                        <span>🍽️</span>
                        <span>一桌菜设计</span>
                    </router-link>
                    <router-link
                        to="/favorites"
                        @click="showMobileMenu = false"
                        class="flex items-center gap-2 w-full px-3 py-2 rounded-lg font-bold border-2 border-black transition-all duration-200 text-sm"
                        :class="$route.path === '/favorites' ? 'bg-red-400 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'"
                    >
                        <span>❤️</span>
                        <span>我的收藏</span>
                    </router-link>
                    <router-link
                        to="/about"
                        @click="showMobileMenu = false"
                        class="flex items-center gap-2 w-full px-3 py-2 rounded-lg font-bold border-2 border-black transition-all duration-200 text-sm"
                        :class="$route.path === '/about' ? 'bg-blue-400 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'"
                    >
                        <span>📖</span>
                        <span>简介</span>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const showMobileMenu = ref(false)
const route = useRoute()

// 根据当前路由显示不同的页面标题
const pageTitle = computed(() => {
    switch (route.path) {
        case '/':
            return '一饭封神'
        case '/today-eat':
            return '今天吃什么？'
        case '/table-design':
            return '一桌菜设计师'
        case '/favorites':
            return '我的收藏'
        case '/about':
            return '关于一饭封神'
        default:
            return '一饭封神'
    }
})

const pageSubtitle = computed(() => {
    switch (route.path) {
        case '/':
            return '灶间有AI，顿顿米其林！'
        case '/today-eat':
            return "盲盒美食：'绝了！' or '寄了！'"
        case '/table-design':
            return '让每顿饭，都有剧本！'
        case '/favorites':
            return '珍藏美味，随时回味！'
        case '/about':
            return '算法烹万物，一键即封神！'
        default:
            return 'LEGENDARY STATUS FROM A SINGLE MEAL!'
    }
})
</script>

<style scoped>
/* 确保导航链接的活跃状态样式 */
.router-link-active {
    /* 由于我们使用了动态class，这里不需要额外样式 */
}

/* 移动端菜单展开动画 */
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.space-y-2 {
    animation: slideDown 0.3s ease-out;
}
</style>
