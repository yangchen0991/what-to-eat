# 智谱AI迁移完成指南

## ✅ 迁移状态：完成

### 🎯 迁移概述
已将项目中所有零一万物（Lingyiwanwu）相关配置和API调用统一替换为智谱AI（ZhipuAI）实现。

### 🔧 已完成的修改

#### 1. 环境变量配置
- **移除**：所有 `VITE_TEXT_GENERATION_*` 环境变量
- **新增**：
  - `VITE_ZHIPU_BASE_URL=https://open.bigmodel.cn/api/paas/v4/`
  - `VITE_ZHIPU_API_KEY=your_api_key_here`
  - `VITE_ZHIPU_TEXT_MODEL=glm-4`
  - `VITE_ZHIPU_IMAGE_MODEL=cogview-3-flash`
  - `VITE_ZHIPU_TEMPERATURE=0.7`
  - `VITE_ZHIPU_TIMEOUT=300000`

#### 2. 配置文件更新
- `.env` 和 `.env.example`：统一使用智谱AI配置
- 新增 `src/config/zhipuConfig.ts`：智谱AI统一配置文件

#### 3. 服务层重构
- **aiService.ts**：
  - 移除 `aiClient` → 替换为 `zhipuClient`
  - 移除 `AI_CONFIG` → 替换为 `ZHIPU_CONFIG`
  - 所有API端点指向智谱AI
- **imageService.ts**：保持不变（已使用智谱AI）

#### 4. 模型升级
- **文本生成**：`yi-lightning` → `glm-4`
- **图片生成**：保持 `cogview-3-flash`（智谱AI）

### 🚀 使用方法

#### 1. 获取智谱AI API密钥
访问 [智谱AI开放平台](https://open.bigmodel.cn/) 注册并获取API密钥。

#### 2. 配置环境变量
```bash
# 编辑 .env 文件
VITE_ZHIPU_API_KEY=your_real_api_key_here
```

#### 3. 验证配置
```bash
# 重启开发服务器
npm run dev

# 测试功能
- 生成菜谱
- 生成图片
- 营养分析
```

### 📊 模型对比

| 功能 | 旧配置 | 新配置 | 优势 |
|------|--------|--------|------|
| 文本生成 | 零一万物 yi-lightning | 智谱AI glm-4 | 中文优化更好 |
| 图片生成 | 智谱AI cogview-3-flash | 智谱AI cogview-3-flash | 保持一致 |
| API端点 | https://api.lingyiwanwu.com/v1/ | https://open.bigmodel.cn/api/paas/v4/ | 统一平台 |

### 🔍 验证检查

#### 已验证的文件
- ✅ `.env` - 环境变量配置
- ✅ `.env.example` - 模板文件
- ✅ `src/services/aiService.ts` - AI服务实现
- ✅ `src/services/imageService.ts` - 图片服务
- ✅ `src/config/zhipuConfig.ts` - 新增配置文件

#### 搜索验证
```bash
# 确认无零一万物残留
grep -r "lingyiwanwu" src/ || echo "无残留"
grep -r "yi-lightning" src/ || echo "无残留"
grep -r "VITE_TEXT_GENERATION" src/ || echo "无残留"
```

### 🚨 注意事项

1. **API密钥**：确保使用有效的智谱AI API密钥
2. **模型选择**：可根据需要选择不同的glm-4变体
3. **费用**：注意智谱AI的计费标准
4. **兼容性**：所有现有功能保持不变

### 📞 支持

如有问题，请参考：
- 智谱AI官方文档：https://open.bigmodel.cn/
- 项目Issues：https://github.com/liu-ziting/what-to-eat/issues