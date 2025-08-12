# 一饭封神 🍳

> **UPLOAD YOUR INGREDIENTS | SPIT OUT RECIPES!**

一个基于 AI 的智能菜谱生成平台，采用现代扁平化设计风格，让不同菜系的厨艺大师为您的食材创造美味传奇。

## ✨ 功能特色

### 🥬 智能食材识别

-   支持任意食材组合输入
-   最多可添加 10 种食材
-   一键添加/删除食材标签

### 👨‍🍳 多菜系大师

支持 8 大传统菜系的专业厨艺大师：

-   **苏菜** - 清淡鲜美，刀工精细
-   **鲁菜** - 咸鲜为主，火候精准
-   **川菜** - 麻辣鲜香，变化多端
-   **粤菜** - 清淡鲜美，原汁原味
-   **浙菜** - 清香淡雅，鲜嫩爽滑
-   **湘菜** - 香辣浓郁，口味厚重
-   **闽菜** - 鲜香清淡，汤鲜味美
-   **徽菜** - 重油重色，醇厚朴实

### 🎨 自定义要求

-   支持个性化烹饪需求
-   智能理解用户特殊要求
-   如：清淡汤品、减肥餐、儿童营养餐等

### 📱 现代化界面

-   采用鲜明的黄色系配色方案
-   扁平化设计风格，简洁直观
-   响应式布局，完美适配各种设备
-   分步骤引导，用户体验友好

## 🚀 技术栈

-   **前端框架**: Vue 3 + TypeScript
-   **样式框架**: Tailwind CSS
-   **构建工具**: Vite
-   **路由管理**: Vue Router
-   **HTTP 客户端**: Axios
-   **AI 服务**: 智谱 AI GLM-4-Flash

## 📦 项目结构

```
src/
├── components/          # 组件目录
│   ├── RecipeCard.vue  # 菜谱卡片组件
│   └── CookingLoader.vue # 加载动画组件
├── config/             # 配置文件
│   ├── cuisines.ts     # 菜系配置
│   └── ai.ts          # AI配置
├── services/           # 服务层
│   └── aiService.ts    # AI接口服务
├── types/              # 类型定义
│   └── index.ts        # 通用类型
├── views/              # 页面组件
│   └── Home.vue        # 主页面
├── App.vue             # 根组件
├── main.ts             # 入口文件
└── style.css           # 全局样式
```

## 🛠️ 快速开始

### 环境要求

-   Node.js 18+
-   npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 类型检查

```bash
npm run type-check
```

## 🤖 AI 配置

项目已集成智谱 AI 接口，开箱即用：

```typescript
const AI_CONFIG = {
    baseURL: 'https://open.bigmodel.cn/api/paas/v4/',
    apiKey: 'your_api_key_here',
    model: 'glm-4-flash-250414',
    temperature: 0.7,
    timeout: 30000
}
```

### 自定义 AI 服务

如需更换其他 AI 服务，请修改 `src/services/aiService.ts` 中的配置。

## 🎯 使用指南

### 基础使用流程

1. **输入食材** - 在输入框中添加您现有的食材
2. **选择方式** - 选择菜系大师或输入自定义要求
3. **生成菜谱** - 点击"交给大师"或"按要求生成"
4. **查看结果** - 浏览 AI 大师为您定制的菜谱

### 菜系选择模式

-   可选择一个或多个菜系
-   每个菜系都有独特的烹饪风格和技法
-   支持随机选择菜系

### 自定义要求模式

-   输入具体的烹饪需求
-   如："做一道清淡的汤，适合老人食用"
-   AI 会根据要求生成个性化菜谱

## 🎨 设计特色

### 配色方案

-   **主背景**: 明亮黄色 (#fbbf24)
-   **头部区域**: 粉色 (#f472b6)
-   **步骤标签**: 多彩分类（粉色、绿色、蓝色、黑色）
-   **卡片区域**: 白色背景配黑色边框

### 交互设计

-   扁平化按钮和卡片
-   2px 黑色边框设计语言
-   悬停和点击动画效果
-   清晰的视觉层次

## 📱 响应式设计

-   **移动端**: 单列布局，触摸友好
-   **平板端**: 双列菜谱展示
-   **桌面端**: 多列布局，充分利用屏幕空间

## 🔧 部署

### Netlify 部署

项目已配置 Netlify 自动部署：

```toml
[build]
  command = "npm install && npx vite build --config vite.config.prod.ts"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

### 手动部署

```bash
npm run build
# 将 dist 目录部署到您的服务器
```

## 🚧 开发计划

-   [ ] 添加菜谱收藏功能
-   [ ] 支持菜谱分享到社交媒体
-   [ ] 添加营养成分分析
-   [ ] 支持语音输入食材
-   [ ] 添加购物清单生成
-   [ ] 多语言支持
-   [ ] 用户账户系统
-   [ ] 菜谱评分和评论

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目！

### 开发规范

-   使用 TypeScript 进行类型安全开发
-   遵循 Vue 3 Composition API 最佳实践
-   使用 Tailwind CSS 进行样式开发
-   保持代码简洁和可读性

## 📄 许可证

MIT License

## 🙏 致谢

-   [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
-   [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
-   [智谱 AI](https://open.bigmodel.cn/) - 提供强大的 AI 能力
-   [Vite](https://vitejs.dev/) - 下一代前端构建工具

---

**让 AI 厨艺大师为您的食材注入灵魂，创造属于您的美味传奇！** 🍽️✨
