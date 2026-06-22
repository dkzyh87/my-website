## 1. 基础准备

- [x] 1.1 准备 4 张项目占位截图（SVG 格式，深色科技风统一设计），放入 `src/assets/`（如 `project-1.svg` ~ `project-4.svg`）
- [x] 1.2 清理 `App.tsx` 中 `#projects` 占位 Section，替换为 `<ProjectSection />` 引入（Section 容器和 `id="projects"` 由 ProjectSection 组件自身提供）

## 2. ProjectSection 组件

- [x] 2.1 创建 `src/components/ProjectSection.tsx`，定义 `Project` 接口（`image`, `name`, `description`, `githubUrl`）和 `PROJECTS` 常量数组（至少 4 项），外层渲染 `<section id="projects">` 容器
- [x] 2.2 实现响应式 Grid 布局（`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`），Section 标题使用 `h2`（如 "My Projects"）
- [x] 2.3 实现项目卡片：图片（`<img loading="lazy">` + `aspect-video object-cover`）、项目名称（`h3`）、项目简介（`p`）、GitHub 链接（`<a target="_blank" rel="noopener noreferrer">`）
- [x] 2.4 实现悬浮微特效：卡片 `hover:-translate-y-1 hover:shadow-lg transition-all duration-300`，搭配 `rounded-lg border` 基础样式
- [x] 2.5 实现暗色模式：卡片 `bg-white dark:bg-gray-800`、名称 `text-gray-900 dark:text-gray-100`、简介 `text-gray-600 dark:text-gray-400`、边框 `border-gray-200 dark:border-gray-700`、GitHub 链接 `text-blue-600 dark:text-blue-400`
- [x] 2.6 实现 GitHub 链接边界处理：`githubUrl` 为空时隐藏链接（条件渲染），不为空时正常展示

## 3. 验证

- [x] 3.1 运行 `npm run build`（`tsc -b && vite build`），确认 TypeScript 类型检查和构建均通过
- [x] 3.2 运行 `npm run dev`，验证桌面（3 列）/中等屏幕（2 列）/移动端（1 列）网格、鼠标悬浮特效、亮/暗模式切换、GitHub 外链新标签页打开、HeroSection CTA 按钮跳转到 ProjectSection
