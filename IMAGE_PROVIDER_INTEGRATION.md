# 菜品效果图模块 - 独立API配置集成文档

## 功能概述

已成功为菜品效果图模块增设独立的API配置项，实现了大模型供应商选择功能，支持以下两个供应商：

- **bigmodel** (智谱AI - 图片生成)
- **siliconflow** (SiliconFlow - 图片生成)

## 集成内容

### 1. API配置管理页面增强

#### 新增供应商配置
- **智谱AI - 图片生成** (`image-bigmodel`)
  - 支持模型：CogView-3-Flash、CogView-3
  - 基础URL：https://open.bigmodel.cn/api/paas/v4
  - 图标：🎨 粉色主题

- **SiliconFlow - 图片生成** (`image-siliconflow`)
  - 支持模型：Kwai-Kolors/Kolors（默认）、FLUX.1-Schnell、FLUX.1-Dev、SDXL-Base-1.0
  - 基础URL：https://api.siliconflow.cn/v1
  - 图标：🖼️ 靛蓝主题
  - 使用硅基流动官方生图API，默认模型为Kwai-Kolors/Kolors

#### 配置界面特性
- 独立的供应商卡片展示
- 动态模型选择下拉框（根据供应商显示对应模型）
- 配置状态实时预览
- 一键测试连接功能
- 导入/导出配置支持

### 2. 图片服务架构升级

#### 服务层优化
- **imageService.ts** 重构
  - 支持动态供应商选择
  - 通过apiConfigService优先获取专用配置
  - 增强配置有效性验证
  - 智能回退机制

#### 配置管理增强
- **apiConfigService.ts** 扩展
  - 新增图片供应商默认配置
  - 支持图片供应商连接测试
  - 完整的配置持久化

### 3. 用户体验改进

#### 配置引导
- 清晰的供应商选择指引
- 模型说明和推荐场景
- 配置状态可视化
- 错误提示和修复建议

#### 状态监控
- 实时配置状态显示
- 连接测试结果反馈
- 配置变更通知

## 使用方法

### 1. 访问配置页面
打开应用 → 设置 → API配置管理

### 2. 配置图片生成供应商
1. 选择"智谱AI - 图片生成"或"SiliconFlow - 图片生成"
2. 点击"配置"按钮
3. 填写API密钥
4. 选择适合的图片模型
5. 测试连接
6. 保存配置

### 3. 环境变量配置（可选）
在`.env`文件中添加：
```
# 图片生成供应商选择
VITE_IMAGE_PROVIDER=bigmodel  # 或 siliconflow

# SiliconFlow专用配置（如选择siliconflow）
VITE_SILICONFLOW_BASE_URL=https://api.siliconflow.cn/v1
VITE_SILICONFLOW_API_KEY=your_api_key_here
VITE_SILICONFLOW_IMAGE_MODEL=FLUX.1-Schnell
```

### 4. 验证配置
- 在菜品效果图功能中测试图片生成
- 检查控制台日志确认使用的供应商
- 查看配置页面状态指示器

## 技术实现

### 核心文件变更
- `src/services/apiConfigService.ts` - 添加图片供应商支持
- `src/components/APIConfigModal.vue` - 增强配置模态框
- `src/views/APISettings.vue` - 扩展API设置页面
- `src/services/imageService.ts` - 重构图片服务
- `src/types/apiConfig.ts` - 类型定义更新

### 配置优先级
1. API配置管理页面中的专用配置（最高优先级）
2. 环境变量配置（回退选项）
3. 默认配置（最后保障）

## 故障排除

### 常见问题
1. **连接失败**：检查API密钥和网络连接
2. **模型不支持**：确认选择的模型在供应商支持列表中
3. **配置不生效**：清除浏览器缓存或检查配置冲突

### 调试方法
- 使用浏览器开发者工具查看网络请求
- 检查控制台中的配置加载日志
- 使用API配置页面的测试功能

## 后续扩展

此架构支持轻松添加更多图片生成供应商，只需：
1. 在apiConfigService.ts中添加新供应商配置
2. 在APIConfigModal.vue中添加供应商信息
3. 在imageService.ts中添加供应商处理逻辑