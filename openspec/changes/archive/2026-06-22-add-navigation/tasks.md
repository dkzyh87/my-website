## 1. 基础设施：CSS 平滑滚动 + 锚点准备

- [x] 1.1 在 `index.css` 的 `html` 选择器添加 `scroll-behavior: smooth`（全局平滑滚动）
- [x] 1.2 为 `HeroSection.tsx` 的 `<section>` 元素添加 `id="home"`，作为导航栏"首页"链接的目标锚点
- [x] 1.3 在 `App.tsx` 中添加 `<section id="projects">` 和 `<section id="contact">` 占位容器（仅空 `<section>` 带 id 和占位高度，不做完整内容）

## 2. Navbar 组件

- [x] 2.1 创建 `src/components/Navbar.tsx`，实现固定定位 + 毛玻璃背景（`backdrop-blur-md bg-white/70 dark:bg-gray-900/70`）、z-50 层级
- [x] 2.2 实现左侧品牌名 + 右侧导航链接布局（首页 `#home`、项目 `#projects`、联系我 `#contact`），品牌名可配置（props 带默认值）
- [x] 2.3 实现响应式适配：移动端（≤768px）品牌名和链接字号缩小到 `text-sm`，间距缩小到 `gap-4`，超窄屏（≤360px）进一步缩小到 `text-xs`、`gap-2`、`px-3`
- [x] 2.4 实现键盘可访问性：导航链接为 `<a>` 元素获得原生 Tab 聚焦，添加 `focus:ring-2` 可见聚焦环

## 3. 集成与验证

- [x] 3.1 在 `App.tsx` 中引入 Navbar，置于 HeroSection 之上
- [x] 3.2 运行 `npm run build`（`tsc -b && vite build`），确认 TypeScript 类型检查和构建均通过
- [x] 3.3 运行 `npm run dev`，验证亮/暗模式下 Navbar 毛玻璃效果、桌面/移动端响应式表现、点击链接平滑滚动、Tab 键导航焦点环
