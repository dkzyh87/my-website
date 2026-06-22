## Why

个人品牌站目前只有 Vite 模板页面，缺少真正展示个人身份的首屏区域。Hero Section 是访问者进入网站后看到的第一内容，需要在 3 秒内传达"我是谁、我做什么"，同时用科技粒子背景建立视觉辨识度。

## What Changes

- 新增 `HeroSection` 组件，占据全屏高度（`100dvh`），居中展示姓名、职业、一句话介绍
- 新增 `ParticleCanvas` 组件，Canvas 粒子层叠加在 CSS 渐变背景之上，形成网络拓扑视觉
- Hero 区域包含一个 CTA 按钮，链接到 `#projects` 锚点
- 替换 `App.tsx` 中的 Vite 模板内容为 HeroSection
- 粒子颜色和渐变背景色通过 `prefers-color-scheme` 媒体查询跟随系统亮/暗主题

## Capabilities

### New Capabilities
- `hero-section`: 全屏 Hero 区域，包含个人信息展示、CTA 按钮、粒子背景，支持亮/暗模式自适应

### Modified Capabilities
<!-- 当前 openspec/specs/ 为空，无现有规范需要修改 -->
（无）

## Impact

| 影响范围 | 说明 |
|----------|------|
| `src/App.tsx` | 替换模板内容，引入 HeroSection |
| `src/components/HeroSection.tsx` | 新建 — Hero 主组件 |
| `src/components/ParticleCanvas.tsx` | 新建 — Canvas 粒子层 |
| `src/index.css` | 新增亮/暗主题 CSS 变量（渐变背景色、粒子颜色） |
| `index.html` | 标题改为个人品牌站名称 |
| 依赖 | 无新增依赖，手写 Canvas 零依赖 |

## Out-of-Scope（严禁实现）

- 不做页面滚动动画 / 入场动画 / 过渡动效
- 不做导航栏（Navbar）
- 不做后端 API
- 不做手动主题切换按钮（仅跟随系统 `prefers-color-scheme`）
- 不做 `#projects` 锚点目标区域（仅预留链接）
