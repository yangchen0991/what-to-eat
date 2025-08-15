import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import TodayEat from './views/TodayEat.vue'
import TableDesign from './views/TableDesign.vue'
import Favorites from './views/Favorites.vue'
import './style.css'

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/today-eat', component: TodayEat },
    { path: '/table-design', component: TableDesign },
    { path: '/favorites', component: Favorites }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')
