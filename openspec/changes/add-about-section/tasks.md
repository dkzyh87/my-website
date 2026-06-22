## 1. 基础准备

- [x] 1.1 准备个人照片占位图（SVG 深色科技风头像），放入 `src/assets/about-photo.svg`
- [x] 1.2 在 `App.tsx` 中引入 `AboutSection`（骨架），插入在 `<ProjectSection />` 和 Contact 占位 `<section>` 之间

## 2. AboutSection 组件

- [x] 2.1 创建 `src/components/AboutSection.tsx`，定义 Props 接口（`photo`, `bio1`, `bio2`, `bio3`，全部可选带默认占位值），渲染 `<section>` 容器
- [x] 2.2 实现桌面双栏布局：`flex flex-col md:flex-row gap-8 md:gap-12`，左列照片 `w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover shadow-lg`，右列文字 `flex-1`
- [x] 2.3 实现品牌标签"欧韵音乐"：`rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-4 py-1.5 inline-block`
- [x] 2.4 实现暗色模式：Section 背景 `bg-white dark:bg-gray-900`，文字 `text-gray-700 dark:text-gray-300`，标题 `text-gray-900 dark:text-gray-100`

## 3. 验证

- [x] 3.1 运行 `npm run build`（`tsc -b && vite build`），确认 TypeScript 类型检查和构建通过
- [x] 3.2 运行 `npm run dev`，验证桌面双栏/移动堆叠布局、照片 lazy loading、亮/暗模式、品牌标签样式
