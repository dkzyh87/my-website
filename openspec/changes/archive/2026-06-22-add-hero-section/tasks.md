## 1. 基础设施：CSS 变量 + HTML 标题

- [x] 1.1 在 `index.css` 中添加亮/暗主题 CSS 自定义属性（`--particle-color`、`--particle-line-color`、渐变背景色），在 `:root` 和 `@media (prefers-color-scheme: dark)` 下分别设值
- [x] 1.2 将 `index.html` 的 `<title>` 从 "my-website" 改为 "Personal Website"

## 2. ParticleCanvas 组件

- [x] 2.1 创建 `src/components/ParticleCanvas.tsx`，初始化 Canvas 元素、设置 DPR 缩放（上限 2x）、绑定 ResizeObserver（防抖 100ms）
- [x] 2.2 实现粒子数据结构（`{x, y, vx, vy, radius}`）和动画循环：位置更新、边界反弹、近邻粒子连线绘制
- [x] 2.3 桌面端使用 80 粒子，移动端（≤768px）使用 40 粒子，通过 ResizeObserver 触发密度切换
- [x] 2.4 通过 `getComputedStyle` 读取 CSS 变量设置粒子/连线颜色，监听 `matchMedia('(prefers-color-scheme: dark)')` 的 change 事件实现运行时主题切换
- [x] 2.5 实现性能守护：`prefers-reduced-motion` 时跳过动画只渲染静止帧，`visibilitychange` 时暂停/恢复动画循环

## 3. HeroSection 组件

- [x] 3.1 创建 `src/components/HeroSection.tsx`，全屏布局（`min-h-dvh`，`@supports` 降级 `100vh`），CSS 渐变背景，居中内容区
- [x] 3.2 内容区渲染姓名（`h1`）、职业（`p`）、一句话介绍（`p`），文本通过 props 传入，设置占位默认值
- [x] 3.3 渲染 CTA 按钮（`<a href="#projects">查看项目</a>`），Tailwind 样式、focus ring 可见
- [x] 3.4 集成 ParticleCanvas 作为背景层（`aria-hidden="true"`，`absolute inset-0 z-0`），内容层 `z-10`

## 4. 集成与清理

- [x] 4.1 替换 `src/App.tsx` 中的 Vite 模板内容为 `<HeroSection />`
- [x] 4.2 移除不再使用的文件：`src/App.css`、`src/assets/react.svg`、`src/assets/vite.svg`
- [x] 4.3 运行 `npm run dev`，分别验证亮色/暗色模式下的 Hero 渲染效果，确认无控制台错误
- [x] 4.4 运行 `npm run build`（`tsc -b && vite build`），确认 TypeScript 类型检查和构建均通过
