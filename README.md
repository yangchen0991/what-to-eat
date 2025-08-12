# 一饭封神 🍳

> **UPLOAD YOUR INGREDIENTS | SPIT OUT RECIPES!**

一个基于 AI 的智能菜谱生成平台，采用现代扁平化设计风格，让不同菜系的厨艺大师为您的食材创造美味传奇。支持营养分析、效果图生成等全方位烹饪指导。

## ✨ 功能特色

### 🥬 智能食材识别

-   支持任意食材组合输入
-   最多可添加 10 种食材
-   一键添加/删除食材标签
-   智能食材搭配建议

### 👨‍🍳 八大菜系大师

支持中华传统八大菜系的专业厨艺大师：

-   **苏菜大师** - 江南水乡的精致美味，清淡鲜美，刀工精细
-   **鲁菜大师** - 齐鲁大地的豪放风味，咸鲜为主，火候精准
-   **川菜大师** - 巴蜀之地的麻辣传奇，麻辣鲜香，变化多端
-   **粤菜大师** - 岭南文化的鲜美诠释，清淡鲜美，原汁原味
-   **浙菜大师** - 江南水乡的清雅之味，清香淡雅，鲜嫩爽滑
-   **湘菜大师** - 湖湘文化的辣味人生，香辣浓郁，口味厚重
-   **闽菜大师** - 八闽大地的海鲜盛宴，鲜香清淡，汤鲜味美
-   **徽菜大师** - 徽州文化的朴实醇香，重油重色，醇厚朴实

### 🎨 双模式生成

-   **菜系模式**: 选择 1-8 个菜系，每个大师创作独特菜谱
-   **自定义模式**: 输入个性化需求，AI 智能理解并生成
-   **智能随机**: 不选择时自动随机选择 2 个菜系

### 🥗 营养分析功能 ⭐ NEW

-   **营养成分**: 详细的卡路里、蛋白质、碳水化合物等数据
-   **健康评分**: 1-10 分的营养健康评分系统
-   **饮食标签**: 自动识别"高蛋白"、"低脂"、"素食"等特点
-   **营养建议**: 个性化的营养均衡建议
-   **份量指导**: 科学的建议食用份量

### 🖼️ AI 效果图生成

-   一键生成精美菜品效果图
-   基于菜谱内容智能绘制
-   高质量视觉呈现
-   支持图片保存和分享

### 📱 现代化界面

-   采用鲜明的黄色系配色方案
-   扁平化设计风格，简洁直观
-   响应式布局，完美适配各种设备
-   分步骤引导，用户体验友好
-   卡片式菜谱展示，信息层次清晰

## 🚀 技术栈

### 前端技术

-   **框架**: Vue 3.4+ (Composition API)
-   **语言**: TypeScript 5.3+
-   **样式**: Tailwind CSS 3.4+
-   **构建**: Vite 5.0+
-   **路由**: Vue Router 4.2+
-   **工具**: @vueuse/core 10.7+

### AI 服务

-   **主要**: DeepSeek Chat API
-   **备用**: 智谱 AI GLM-4-Flash
-   **图像**: AI 图像生成服务
-   **营养**: 智能营养分析算法

### 开发工具

-   **类型检查**: vue-tsc
-   **代码质量**: ESLint + Prettier
-   **包管理**: npm/yarn
-   **部署**: Netlify 自动化部署

## 📦 项目结构

```
src/
├── components/              # 组件目录
│   ├── RecipeCard.vue      # 菜谱卡片组件
│   ├── NutritionAnalysis.vue # 营养分析组件 ⭐ NEW
│   └── CookingLoader.vue   # 加载动画组件
├── config/                 # 配置文件
│   └── cuisines.ts         # 八大菜系配置
├── services/               # 服务层
│   ├── aiService.ts        # AI菜谱生成服务
│   └── imageService.ts     # AI图像生成服务
├── types/                  # 类型定义
│   └── index.ts           # 通用类型（含营养分析类型）
├── views/                  # 页面组件
│   └── Home.vue           # 主页面
├── App.vue                # 根组件
├── main.ts               # 入口文件
└── style.css             # 全局样式
```

## 🛠️ 快速开始

### 环境要求

-   Node.js 18+
-   npm 或 yarn
-   现代浏览器支持

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 类型检查

```bash
npm run type-check
```

### 预览构建结果

```bash
npm run preview
```

## 🤖 AI 配置

### 文本生成服务配置

项目使用 DeepSeek API 进行菜谱生成和营养分析：

```typescript
const AI_CONFIG = {
    baseURL: 'https://api.deepseek.com/v1/',
    apiKey: import.meta.env.VITE_TEXT_GENERATION_API_KEY, // 从环境变量读取
    model: 'deepseek-chat',
    temperature: 0.7,
    timeout: 300000
}
```

### 图像生成服务配置

项目使用独立的图像生成 API：

```typescript
const IMAGE_CONFIG = {
    apiKey: import.meta.env.VITE_IMAGE_GENERATION_API_KEY // 从环境变量读取
}
```

### 环境变量配置

创建 `.env` 文件（基于 `.env.example` 模板）：

```env
# Text Generation Service Configuration
VITE_TEXT_GENERATION_API_KEY=your_deepseek_api_key_here

# Image Generation Service Configuration
VITE_IMAGE_GENERATION_API_KEY=your_image_api_key_here
```

## 🎯 使用指南

### 基础使用流程

1. **输入食材** - 在输入框中添加您现有的食材（最多 10 种）
2. **选择方式** - 选择菜系大师或输入自定义要求
3. **生成菜谱** - 点击"交给大师"或"按要求生成"
4. **查看结果** - 浏览 AI 大师为您定制的菜谱
5. **营养分析** - 展开查看详细营养信息和建议 ⭐ NEW
6. **生成效果图** - 点击生成按钮获取菜品效果图

### 菜系选择模式

-   可选择一个或多个菜系（最多 8 个）
-   每个菜系都有独特的烹饪风格和专业提示词
-   不选择时自动随机选择 2 个菜系
-   支持菜系组合创新

### 自定义要求模式

-   输入具体的烹饪需求和偏好
-   支持复杂需求：口味、营养、人群、场合等
-   示例："做一道清淡的汤，适合老人食用，少盐低脂"
-   AI 智能理解并生成个性化菜谱

### 营养分析功能 ⭐ NEW

-   **营养成分表**: 卡路里、蛋白质、碳水、脂肪、纤维等
-   **健康评分**: 基于营养均衡的 1-10 分评分
-   **饮食标签**: 自动标注菜品特点（高蛋白、低脂、素食等）
-   **营养建议**: 个性化的搭配和改进建议
-   **份量指导**: 科学的建议食用份量

## 🎨 设计特色

### 配色方案

-   **主背景**: 明亮黄色 (#fbbf24) - 温暖食欲感
-   **头部区域**: 粉色 (#f472b6) - 活力品牌色
-   **步骤标签**: 多彩分类（粉色、绿色、蓝色、黑色）
-   **卡片区域**: 白色背景配 2px 黑色边框
-   **营养区域**: 绿色系 - 健康自然感 ⭐ NEW

### 交互设计

-   扁平化按钮和卡片设计
-   2px 黑色边框设计语言
-   悬停和点击动画效果
-   清晰的视觉层次和信息架构
-   展开/收起式详情查看

### 响应式设计

-   **移动端**: 单列布局，触摸友好的按钮尺寸
-   **平板端**: 双列菜谱展示，合理利用空间
-   **桌面端**: 多列布局，充分利用大屏幕空间

## 🔧 部署配置

### Netlify 自动部署

项目已配置 Netlify 自动部署：

```toml
[build]
  command = "npm install && npx vite build --config vite.config.prod.ts"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 手动部署

```bash
# 构建项目
npm run build

# 部署 dist 目录到您的服务器
# 支持静态托管服务：Netlify、Vercel、GitHub Pages 等
```

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🚧 开发计划

### 已完成 ✅

-   [x] 八大菜系 AI 大师系统
-   [x] 智能食材输入和管理
-   [x] 双模式菜谱生成（菜系/自定义）
-   [x] 营养分析功能 ⭐ NEW
-   [x] AI 效果图生成
-   [x] 响应式现代化界面
-   [x] 随机菜系选择优化

### 开发中 🚧

-   [ ] 菜谱收藏和历史记录
-   [ ] 用户偏好学习系统
-   [ ] 社交分享功能

### 计划中 📋

-   [ ] 语音输入食材
-   [ ] 购物清单自动生成
-   [ ] 多语言支持（英文、日文）
-   [ ] 用户账户系统
-   [ ] 菜谱评分和评论
-   [ ] 食材营养数据库
-   [ ] 个性化推荐算法
-   [ ] 移动端 APP 版本

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

### 技术支持

-   [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
-   [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
-   [Vite](https://vitejs.dev/) - 下一代前端构建工具
-   [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集

### AI 服务

-   [DeepSeek](https://www.deepseek.com/) - 提供强大的对话 AI 能力
-   [智谱 AI](https://open.bigmodel.cn/) - 备用 AI 服务支持

### 设计灵感

-   中华传统八大菜系文化
-   现代扁平化设计理念
-   用户体验最佳实践

---

**让 AI 厨艺大师为您的食材注入灵魂，创造属于您的美味传奇！** 🍽️✨

_一饭封神 - 不只是菜谱，更是烹饪的艺术与科学_ 🎨🔬
