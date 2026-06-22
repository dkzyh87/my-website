## Context

当前 `#projects` 区域为占位文字 placeholder，Hero Section 的 CTA（`href="#projects"`）和 Navbar（"项目"链接）均已指向该锚点。需要替换为实际的项目卡片展示。技术栈：React 19 + TypeScript + Tailwind CSS v4，图片须 lazy loading。

## Goals / Non-Goals

**Goals:**
- 卡片式项目展示，网格布局（桌面 2 列 → 大屏 3 列，移动 1 列）
- 每张卡片：截图（`<img loading="lazy">`）、名称、简介、GitHub 外链
- 鼠标悬浮微特效（卡片上浮 + 阴影增强，transition 平滑过渡）
- 至少 4 个占位项目数据
- 亮/暗模式自适应用 Tailwind `dark:` 变体
- 替换 App.tsx 中现有 `#projects` 占位 Section

**Non-Goals:**
- 不做项目详情页
- 不做项目搜索/筛选/标签
- 不做分页/无限滚动
- 不接入 GitHub API

## Decisions

### 1. 组件结构：单一 ProjectSection 组件

**选择**：`ProjectSection.tsx` 单文件，包含卡片子组件（内联或独立导出均可）。

**理由**：项目展示逻辑简单——渲染网格 + 卡片列表。如果未来卡片复杂度增加可拆分为 `ProjectCard`。

### 2. 布局：CSS Grid 自适应列

**选择**：`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`。

**理由**：CSS Grid 天然响应式，无需手动计算宽度。3 列适配大屏（≥1024px），2 列适配中等屏幕（≥768px），1 列移动端堆叠。

**替代方案**：Flexbox wrap → 拒绝，Grid 列数控制更精确且项目卡片等宽。

### 3. 悬浮特效：translate + shadow transition

**选择**：`hover:-translate-y-1 hover:shadow-lg transition-all duration-300`。

**理由**：纯 CSS 实现，零 JS 开销。`translate-y` 微动效约 4px 上浮，搭配 `shadow-lg` 抬升感，`duration-300` 保证平滑。

### 4. 项目数据：静态常量数组

**选择**：组件内 `PROJECTS` 常量数组，类型 `{ image: string; name: string; description: string; githubUrl: string }`。

**理由**：当前无后端，数据量小（4+ 项），内联常量为最简方案。未来可迁移到 CMS 或 Markdown 文件。

### 5. 图片策略：本地占位图 + lazy loading

**选择**：4 张占位图放置于 `src/assets/`（如 `project-1.png` 等），`<img loading="lazy">` 遵循项目 lazy loading 规范。图片使用 `aspect-video` 保持卡片头部比例一致。

**理由**：纯静态站点无法动态生成截图，使用占位图。`loading="lazy"` 避免首屏加载 4 张图片影响性能。

**替代方案**：外部 URL 图片 → 拒绝，依赖外部服务，离线不可用。CSS 渐变占位 → 可作为降级方案，但真实图片占位更直观。

### 6. 暗色模式：Tailwind dark: 变体

**选择**：卡片背景 `bg-white dark:bg-gray-800`，文字 `text-gray-900 dark:text-gray-100`，边框 `border border-gray-200 dark:border-gray-700`。与现有组件一致。

### 7. GitHub 外链：新标签页打开

**选择**：`<a href={githubUrl} target="_blank" rel="noopener noreferrer">`。

**理由**：外链打开新标签页是 Web 惯例，`noopener noreferrer` 防止安全风险。

### 8. Section 锚点保持不变

**选择**：`ProjectSection` 渲染外层 `<section id="projects">`，保持与 HeroSection CTA 和 Navbar 的锚点兼容。

**理由**：HeroSection CTA 和 Navbar 均已指向 `#projects`，本次仅替换 Section 内部内容，不改变 `id`，无需修改任何其他组件。

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| 占位图无实际项目内容，访问者可能认为空洞 | 项目名称和描述使用真实项目信息，占位图用统一设计风格的技术示意图片 |
| 4 张图片增加首屏以下带宽消耗 | `loading="lazy"` 延迟加载，仅在卡片接近视口时发起请求 |
| 悬浮效果在触摸设备上无意义 | 使用 `@media (hover: hover)` 仅在支持 hover 的设备上启用（Tailwind `hover:` 已内置此行为） |
| 项目数据硬编码，后续修改需改代码 | 当前可接受——数据量小，后续可迁移到配置文件或 CMS |

## Open Questions

（无——所有技术决策基于现有项目模式，项目数据使用占位内容）
