# 🍳 一饭封神

> 🚀 **Vibe Coding**
> 通过 Kiro 编辑器，实现了从需求分析、架构设计到代码实现的全流程开发。

一个基于 AI 的智能菜谱生成平台，支持中华八大菜系 + 国际料理，提供营养分析、酒水推荐、菜谱效果图生成等全方位烹饪指导。

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-一饭封神-yellow?style=for-the-badge)](https://eat.lz-t.top/)
[![GitHub](https://img.shields.io/badge/GitHub-liu--ziting/what--to--eat-black?style=for-the-badge&logo=github)](https://github.com/liu-ziting/what-to-eat)

## ✨ 核心功能

### 🥬 智能食材管理

-   支持任意食材组合（最多 10 种）
-   快速选择器 + 手动输入双模式
-   一键添加/删除食材标签

### 👨‍🍳 多元化料理大师

**中华八大菜系：**

-   🦐 苏菜 - 江南精致，刀工精细
-   🐟 鲁菜 - 齐鲁豪放，火候精准
-   🌶️ 川菜 - 巴蜀麻辣，变化多端
-   🦆 粤菜 - 岭南鲜美，原汁原味
-   🐠 浙菜 - 江南清雅，鲜嫩爽滑
-   🔥 湘菜 - 湖湘火辣，口味厚重
-   🦀 闽菜 - 八闽海鲜，汤鲜味美
-   🐷 徽菜 - 徽州醇香，重油重色

**国际料理：**

-   🍣 日式料理 - 和食美学，季节本味
-   🥢 韩式料理 - 发酵智慧，营养均衡
-   🍝 意式料理 - 地中海阳光，简约精致
-   🥖 法式料理 - 高卢优雅，酱汁丰富
-   🍛 印度料理 - 香料王国，层次复杂
-   🌶️ 泰式料理 - 酸甜平衡，香草丰富
-   🌮 墨西哥料理 - 阿兹特克传承，辣椒文化

### 🎨 双模式生成

-   **菜系模式：** 选择 1-15 个菜系，每个大师创作独特菜谱
-   **自定义模式：** 输入个性化需求（如"清淡汤品，适合老人，少盐低脂"）
-   **智能随机：** 不选择时自动随机选择菜系

### 🥗 营养分析系统

-   详细营养成分表（卡路里、蛋白质、碳水、脂肪等）
-   1-10 分健康评分系统
-   自动标注饮食特点（高蛋白、低脂、素食等）
-   个性化营养建议和改进方案
-   科学的建议食用份量

### 📸 AI 效果图生成

-   一键生成精美菜品效果图
-   基于菜谱内容智能绘制
-   高质量视觉呈现

### 🍷 酒水搭配推荐

-   专业侍酒师推荐
-   基于菜品特色的完美搭配
-   详细的搭配理由和饮用建议

### 🍽️ 今天吃什么？

-   每日智能推荐菜谱
-   根据季节和时令食材推荐
-   支持个性化偏好设置
-   一键生成今日菜单

### 🎨 一桌菜设计

-   智能搭配完整一桌菜
-   包含主菜、配菜、汤品和甜点
-   营养均衡搭配
-   支持多人份量调整

### 🌶️ 酱汁设计器

-   **口味定制：** 精确调整辣度、甜度、咸度和酸度
-   **场景适配：** 为拌面、蘸菜、炒菜、烧烤、火锅等场景推荐最佳酱汁
-   **食材利用：** 根据现有食材智能生成酱汁配方
-   **分类浏览：** 探索辣味、蒜香、甜味、复合调味等多种酱料类型
-   **模板推荐：** 提供经典酱料模板，快速生成美味酱汁

### 🔮 料理占卜师

-   **今日运势：** 根据星座和生肖推荐今日幸运料理
-   **心情料理：** 基于当前心情状态推荐适合的菜品
-   **神秘预测：** 提供趣味的饮食运势解读
-   **个性化体验：** 结合个人偏好生成独特的占卜结果

### ❤️ 收藏功能

-   **一键收藏：** 快速保存喜爱的菜谱
-   **笔记功能：** 添加个人烹饪笔记和改进建议
-   **分类管理：** 按菜系筛选和搜索收藏的菜谱
-   **数据统计：** 查看收藏总数、菜系种类和最近收藏

### 🖼️ 封神图鉴

-   **图片展示：** 浏览 AI 生成的精美菜品图片
-   **搜索筛选：** 按菜谱名称、菜系或食材搜索图片
-   **下载功能：** 一键保存高清菜品图片
-   **排序功能：** 按生成时间或菜名排序

## 🚀 技术栈

-   **前端框架：** Vue 3.4 + Composition API
-   **开发语言：** TypeScript 5.3+
-   **样式方案：** Tailwind CSS 3.4+
-   **构建工具：** Vite 5.0+
-   **AI 服务：** 零一万物 Yi-Lightning（菜谱生成） + 智谱 AI CogView-3-Flash（图片生成）
-   **备选方案：** DeepSeek Chat API（菜谱生成）
-   **部署平台：** Netlify 自动化部署

## 🎯 快速开始

### 环境要求

-   Node.js 18+
-   现代浏览器支持

### 本地运行

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

访问 http://localhost:5173

### 环境变量配置

```env
# 菜谱生成模型配置（文本生成）- 零一万物（默认）
VITE_TEXT_GENERATION_BASE_URL=https://api.lingyiwanwu.com/v1/
VITE_TEXT_GENERATION_API_KEY=your_text_api_key_here
VITE_TEXT_GENERATION_MODEL=yi-lightning
VITE_TEXT_GENERATION_TEMPERATURE=0.7
VITE_TEXT_GENERATION_TIMEOUT=300000

# 菜谱生成模型配置（文本生成）- Deepseek（备选）
# VITE_TEXT_GENERATION_BASE_URL=https://api.deepseek.com/v1/
# VITE_TEXT_GENERATION_API_KEY=your_deepseek_api_key_here
# VITE_TEXT_GENERATION_MODEL=deepseek-chat
# VITE_TEXT_GENERATION_TEMPERATURE=0.7
# VITE_TEXT_GENERATION_TIMEOUT=300000

# 图片生成模型配置
VITE_IMAGE_GENERATION_BASE_URL=https://open.bigmodel.cn/api/paas/v4/
VITE_IMAGE_GENERATION_API_KEY=your_image_api_key_here
VITE_IMAGE_GENERATION_MODEL=cogview-3-flash
```

## 📖 使用指南

### 基础流程

1. **添加食材** - 输入你现有的食材（支持快速选择）
2. **选择菜系** - 选择喜欢的菜系大师，或输入自定义要求
3. **交给大师** - 点击生成按钮，AI 开始创作
4. **查看结果** - 浏览专业菜谱，展开查看详细步骤

### 高级功能

-   **营养分析** - 点击获取详细营养信息和健康建议
-   **酒水搭配** - 获取专业的酒水搭配推荐
-   **效果图生成** - 一键生成精美的菜品效果图
-   **酱汁设计** - 定制专属口味的酱料配方
-   **料理占卜** - 探索趣味的饮食运势
-   **收藏管理** - 保存和管理喜爱的菜谱
-   **图鉴浏览** - 欣赏和下载 AI 生成的菜品图片

## 🎨 设计特色

### 视觉设计

-   **配色方案：** 明亮黄色主题 + 多彩步骤标签
-   **设计语言：** 扁平化 + 2px 黑色边框
-   **交互动效：** 悬停动画 + 展开收起过渡

### 用户体验

-   **响应式布局：** 完美适配手机/平板/桌面
-   **分步引导：** 4 步完成菜谱生成
-   **智能提示：** 实时显示当前配置状态
-   **折叠设计：** 自定义要求默认折叠，界面更简洁

## 📦 项目结构

```
src/
├── components/
│   ├── ConfirmModal.vue
│   ├── CookingLoader.vue
│   ├── FavoriteButton.vue
│   ├── FortuneCard.vue
│   ├── GlobalFooter.vue
│   ├── GlobalNavigation.vue
│   ├── ImageModal.vue
│   ├── NotesModal.vue
│   ├── NutritionAnalysis.vue
│   ├── RecipeCard.vue
│   ├── RecipeModal.vue
│   ├── SauceRecipe.vue
│   └── WinePairing.vue
├── config/
│   ├── ai.ts
│   ├── cuisines.ts
│   ├── fortune.ts
│   ├── ingredients.ts
│   └── sauces.ts
├── services/
│   ├── aiService.ts
│   ├── favoriteService.ts
│   ├── galleryService.ts
│   └── imageService.ts
├── types/
│   └── index.ts
├── utils/
│   └── sauceHelpers.ts
├── views/
│   ├── About.vue
│   ├── Favorites.vue
│   ├── FortuneCooking.vue
│   ├── Gallery.vue
│   ├── Home.vue
│   ├── HowToCook.vue
│   ├── SauceDesign.vue
│   ├── TableDesign.vue
│   └── TodayEat.vue
└── App.vue
```

## 🌟 核心亮点

### AI Prompt 工程

-   每个菜系大师都有独特的专业提示词
-   国际菜系强制中文输出，确保用户理解
-   自定义模式支持复杂需求理解

### 用户体验优化

-   菜系选择支持 3 列网格布局
-   步骤 2 和 3 在 PC 端采用左右布局
-   自定义要求默认折叠，减少界面复杂度
-   移除菜系悬浮弹窗，界面更简洁

### 功能完整性

-   完整的营养分析系统
-   专业的酒水搭配推荐
-   全方位的菜谱展示（食材、步骤、技巧、营养）
-   创新的酱汁设计和料理占卜功能
-   实用的收藏和图鉴系统

## 🙏 致谢

-   [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
-   [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
-   [DeepSeek](https://www.deepseek.com/) - 菜谱生成 API 服务支持
-   [智谱 AI](https://open.bigmodel.cn/) - 菜品图片生成 API 服务支持

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=liu-ziting/what-to-eat&type=Date)](https://www.star-history.com/#liu-ziting/what-to-eat&Date)

**🍽️ 让 AI 厨艺大师为你的食材注入灵魂，创造属于你的美味传奇！**

_一饭封神 - 不只是菜谱，更是烹饪的艺术与科学_ ✨
