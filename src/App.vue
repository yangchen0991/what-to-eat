<template>
    <div id="app" class="min-h-screen">
        <router-view />
        <FloatingChefAssistant />
    </div>
</template>

<script setup>
// App组件
import FloatingChefAssistant from './components/FloatingChefAssistant.vue'
</script>
