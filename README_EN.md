# 🍳 YiFan FengShen (One Meal to Godhood)

> 🚀 **Vibe Coding**  
> Through the Kiro editor, the full process development from requirements analysis, architecture design to code implementation is realized.
> English | [中文](./README.md)

An AI-powered intelligent recipe generation platform supporting Chinese Eight Great Cuisines + International Cuisine, providing nutritional analysis, wine pairing, recipe image generation, and comprehensive cooking guidance.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-YiFan_FengShen-yellow?style=for-the-badge)](https://eat.lz-t.top/)
[![Vercel](https://img.shields.io/badge/🚀_Vercel-yffs.vercel.app-black?style=for-the-badge&logo=vercel)](https://yffs.vercel.app/)
[![Netlify](https://img.shields.io/badge/🌐_Netlify-whattoeatai.netlify.app-00C7B7?style=for-the-badge&logo=netlify)](https://whattoeatai.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-liu--ziting/what--to--eat-black?style=for-the-badge&logo=github)](https://github.com/liu-ziting/what-to-eat)

## 🚀 Core Features

-   **Smart Recipe Generation** - Generate professional recipes based on ingredients and cuisine preferences
-   **Nutritional Analysis** - Detailed nutritional breakdown and health scoring
-   **AI Food Images** - One-click generation of beautiful dish images
-   **Wine Pairing** - Professional sommelier recommendations
-   **Sauce Designer** - Customized seasoning formulas
-   **Favorites Management** - Save and manage favorite recipes
-   **Culinary Fortune** - Fun food fortune telling

## 🛠️ Tech Stack

-   **Frontend Framework:** Vue 3.4 + Composition API + TypeScript 5.3+
-   **Styling:** Tailwind CSS 3.4+
-   **Build Tool:** Vite 5.0+
-   **AI Services:** GLM-4 (Zhipu AI) + CogView-3-Flash (Zhipu AI)
-   **Deployment:** Vercel + Netlify

## 🚀 Quick Start

### Requirements

-   Node.js 18+

### Local Development

```bash
# Clone the project
git clone https://github.com/liu-ziting/what-to-eat.git
cd what-to-eat

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env file and add your AI API keys

# Start development server
npm run dev
```

### Build & Deploy

```bash
# Type check + build
npm run build

# Netlify build
npm run build:netlify

# Preview build
npm run preview
```

## 🚀 One-Click Deploy

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/liu-ziting/what-to-eat&env=VITE_TEXT_GENERATION_BASE_URL,VITE_TEXT_GENERATION_API_KEY,VITE_TEXT_GENERATION_MODEL,VITE_IMAGE_GENERATION_BASE_URL,VITE_IMAGE_GENERATION_API_KEY,VITE_IMAGE_GENERATION_MODEL&envDescription=AI%20API%20Configuration&envLink=https://github.com/liu-ziting/what-to-eat%23environment-variables)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/liu-ziting/what-to-eat)

> 📖 For detailed deployment guide, see: [DEPLOYMENT.md](./DEPLOYMENT.md)

### Environment Variables

```env
# Text Generation API (Zhipu AI)
VITE_ZHIPU_BASE_URL=https://open.bigmodel.cn/api/paas/v4/
VITE_ZHIPU_API_KEY=your_zhipu_api_key_here
VITE_ZHIPU_TEXT_MODEL=glm-4

# Image Generation API (Zhipu AI)
VITE_IMAGE_GENERATION_BASE_URL=https://open.bigmodel.cn/api/paas/v4/
VITE_IMAGE_GENERATION_API_KEY=your_image_api_key_here
VITE_IMAGE_GENERATION_MODEL=cogview-3-flash
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ConfirmModal.vue      # Confirmation dialog
│   ├── CookingLoader.vue     # Cooking animation loader
│   ├── FavoriteButton.vue    # Favorite button
│   ├── GlobalNavigation.vue  # Global navigation
│   ├── RecipeCard.vue        # Recipe card
│   ├── NutritionAnalysis.vue # Nutrition analysis
│   └── ...
├── config/              # Configuration files
│   ├── ai.ts                 # AI model configuration
│   ├── cuisines.ts           # Cuisine configuration
│   ├── ingredients.ts        # Ingredients configuration
│   └── ...
├── services/            # Service layer
│   ├── aiService.ts          # AI API service
│   ├── favoriteService.ts    # Favorites service
│   ├── imageService.ts       # Image service
│   └── ...
├── views/               # Page components
│   ├── Home.vue              # Home page
│   ├── Favorites.vue         # Favorites page
│   ├── SauceDesign.vue       # Sauce designer
│   └── ...
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── router/              # Router configuration
```

## 🎯 Development Guide

### Adding New Cuisines

1. Add cuisine configuration in `src/config/cuisines.ts`
2. Write professional AI prompts for cuisine masters
3. Add corresponding icons and descriptions

### Extending Functionality

1. Create new page components in `src/views/`
2. Add route configuration in `src/router/`
3. Add navigation entry in navigation component

### AI Service Integration

-   Text Generation: `src/services/aiService.ts`
-   Image Generation: `src/services/imageService.ts`
-   Support for multiple AI service providers

## 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=liu-ziting/what-to-eat&type=Date)](https://www.star-history.com/#liu-ziting/what-to-eat&Date)

## 🙏 Acknowledgments

-   [Vue.js](https://vuejs.org/) - Progressive JavaScript framework
-   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
-   [Zhipu AI](https://open.bigmodel.cn/) - Recipe generation API
-   [Zhipu AI](https://open.bigmodel.cn/) - Image generation API
