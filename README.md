# 🍳 一饭封神

> 🚀 **Vibe Coding**  
> 通过 Kiro 编辑器，实现了从需求分析、架构设计到代码实现的全流程开发。
> [English](./README_EN.md) | 中文

基于 AI 的智能菜谱生成平台，支持中华八大菜系 + 国际料理，提供营养分析、酒水推荐、菜谱效果图生成等功能。

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-一饭封神-yellow?style=for-the-badge)](https://eat.lz-t.top/)
[![Vercel](https://img.shields.io/badge/🚀_Vercel-yffs.vercel.app-black?style=for-the-badge&logo=vercel)](https://yffs.vercel.app/)
[![Netlify](https://img.shields.io/badge/🌐_Netlify-whattoeatai.netlify.app-00C7B7?style=for-the-badge&logo=netlify)](https://whattoeatai.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-liu--ziting/what--to--eat-black?style=for-the-badge&logo=github)](https://github.com/liu-ziting/what-to-eat)

## 🚀 核心功能

-   **智能菜谱生成** - 基于食材和菜系偏好生成专业菜谱
-   **营养分析** - 详细营养成分分析和健康评分
-   **AI 效果图** - 一键生成精美菜品图片
-   **酒水搭配** - 专业侍酒师推荐
-   **酱汁设计** - 定制化调料配方
-   **收藏管理** - 保存和管理喜爱的菜谱
-   **料理占卜** - 趣味性饮食运势

## 🛠️ 技术栈

-   **前端框架：** Vue 3.4 + Composition API + TypeScript 5.3+
-   **样式方案：** Tailwind CSS 3.4+
-   **构建工具：** Vite 5.0+
-   **AI 服务：** 智谱 AI GLM-4 + 智谱 AI CogView-3-Flash
-   **部署平台：** Vercel + Netlify

## 🚀 快速开始

### 环境要求

-   Node.js 18+

### 本地开发

```bash
# 克隆项目
git clone https://github.com/liu-ziting/what-to-eat.git
cd what-to-eat

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，添加你的 AI API 密钥

# 启动开发服务器
npm run dev
```

### 构建部署

```bash
# 类型检查 + 构建
npm run build

# Netlify 构建
npm run build:netlify

# 预览构建结果
npm run preview
```

## 🚀 一键部署

### Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/liu-ziting/what-to-eat&env=VITE_TEXT_GENERATION_BASE_URL,VITE_TEXT_GENERATION_API_KEY,VITE_TEXT_GENERATION_MODEL,VITE_IMAGE_GENERATION_BASE_URL,VITE_IMAGE_GENERATION_API_KEY,VITE_IMAGE_GENERATION_MODEL&envDescription=AI%20API%20配置&envLink=https://github.com/liu-ziting/what-to-eat%23环境变量配置)

### Netlify 部署

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/liu-ziting/what-to-eat)

> 📖 详细部署指南请参考：[DEPLOYMENT.md](./DEPLOYMENT.md)

### 环境变量配置

```env
# 文本生成 API（智谱 AI）
VITE_ZHIPU_BASE_URL=https://open.bigmodel.cn/api/paas/v4/
VITE_ZHIPU_API_KEY=your_zhipu_api_key_here
VITE_ZHIPU_TEXT_MODEL=glm-4

# 图片生成 API（智谱 AI）
VITE_IMAGE_GENERATION_BASE_URL=https://open.bigmodel.cn/api/paas/v4/
VITE_IMAGE_GENERATION_API_KEY=your_image_api_key_here
VITE_IMAGE_GENERATION_MODEL=cogview-3-flash
```

## 📁 项目结构

```
src/
├── components/          # 通用组件
│   ├── ConfirmModal.vue      # 确认对话框
│   ├── CookingLoader.vue     # 烹饪加载动画
│   ├── FavoriteButton.vue    # 收藏按钮
│   ├── GlobalNavigation.vue  # 全局导航
│   ├── RecipeCard.vue        # 菜谱卡片
│   ├── NutritionAnalysis.vue # 营养分析
│   └── ...
├── config/              # 配置文件
│   ├── ai.ts                 # AI 模型配置
│   ├── cuisines.ts           # 菜系配置
│   ├── ingredients.ts        # 食材配置
│   └── ...
├── services/            # 服务层
│   ├── aiService.ts          # AI 接口服务
│   ├── favoriteService.ts    # 收藏服务
│   ├── imageService.ts       # 图片服务
│   └── ...
├── views/               # 页面组件
│   ├── Home.vue              # 首页
│   ├── Favorites.vue         # 收藏页
│   ├── SauceDesign.vue       # 酱汁设计
│   └── ...
├── types/               # TypeScript 类型定义
├── utils/               # 工具函数
└── router/              # 路由配置
```

## 🎯 开发指南

### 添加新菜系

1. 在 `src/config/cuisines.ts` 中添加菜系配置
2. 为菜系大师编写专业的 AI Prompt
3. 添加对应的图标和描述

### 扩展功能模块

1. 在 `src/views/` 中创建新页面组件
2. 在 `src/router/` 中添加路由配置
3. 在导航组件中添加入口

### AI 服务集成

-   文本生成：`src/services/aiService.ts`
-   图片生成：`src/services/imageService.ts`
-   支持多个 AI 服务商切换

## 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=liu-ziting/what-to-eat&type=Date)](https://www.star-history.com/#liu-ziting/what-to-eat&Date)

## 🙏 致谢

-   [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
-   [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
-   [智谱 AI](https://open.bigmodel.cn/) - 菜谱生成 API
-   [智谱 AI](https://open.bigmodel.cn/) - 图片生成 API
