## Why

当前 `#projects` 区域只有占位文字（"Projects coming soon..."），Hero Section 的 CTA 按钮和 Navbar 导航链接均已指向该锚点，但到达后看到的是空白占位。项目展示区是个人品牌站的核心内容——它展示作品、证明能力、提供 GitHub 链接供访问者深入了解。

## What Changes

- 新增 `ProjectSection` 组件，替换 `App.tsx` 中 `#projects` 的占位内容
- 卡片式网格布局：每张卡片包含项目截图（`<img loading="lazy">`）、项目名称、项目简介、GitHub 链接
- 鼠标悬浮微特效：卡片轻微上浮（`translate-y`）+ 阴影增强（`shadow-lg`），使用 `transition` 平滑过渡
- 数据驱动：项目数据通过组件内常量数组定义（`{ image, name, description, githubUrl }`），至少 4 个占位项目
- Hero Section 的 CTA 按钮（`href="#projects"`）已预配置指向该 Section——无需修改 HeroSection 代码

## Capabilities

### New Capabilities
- `project-section`: 项目展示卡片区，包含项目缩略图、名称、简介、GitHub 外链、鼠标悬浮微特效、响应式网格布局（桌面 2-3 列 / 移动 1 列）、支持亮/暗模式

### Modified Capabilities
（无——Hero Section 的 CTA `#projects` 和 Navbar 的"项目"链接均已在之前变更中预配置指向 `#projects`，本次仅替换占位内容，不改动任何现有行为规范）

## Impact

| 影响范围 | 说明 |
|----------|------|
| `src/components/ProjectSection.tsx` | 新建 — 项目展示组件 |
| `src/App.tsx` | 修改 — 将 `#projects` 占位 Section 替换为 `<ProjectSection />` |
| `src/assets/` | 新增 4 张项目截图占位图片（或使用占位图 URL） |
| 依赖 | 无新增依赖 |

## Out-of-Scope（严禁实现）

- 不做项目详情页
- 不做项目搜索功能
- 不做项目分类/筛选/标签
- 不做分页/无限滚动
- 不接入 GitHub API 动态拉取项目数据
