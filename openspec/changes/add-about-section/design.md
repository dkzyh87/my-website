## Context

当前页面流程：HeroSection → ProjectSection → Contact 占位区。需在 ProjectSection 和 Contact 之间插入"关于我"区域。技术栈 React 19 + Tailwind CSS v4，图片须 lazy loading。

## Goals / Non-Goals

**Goals:**
- 左侧个人照片 + 右侧 3 段简介文字，桌面端双栏并排
- 底部品牌标签"欧韵音乐"
- 移动端上下堆叠，照片缩小
- 亮/暗模式自适应
- 照片 `loading="lazy"`

**Non-Goals:**
- 不做联系表单
- 不做技能标签/进度条
- 不做时间线/经历展示
- 不做社交媒体图标

## Decisions

### 1. 布局：CSS Flexbox 双栏

**选择**：`flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12`。

**理由**：双栏布局用 Flexbox 更简单。照片和文字不是等宽列——照片约 1/3 宽，文字约 2/3 宽，Flexbox 自然适配。

**替代方案**：CSS Grid `grid-cols-2` → 拒绝，Grid 适合等宽列，双栏不等宽用 Flex 更直观。

### 2. 照片样式：圆角方形 + `object-cover`

**选择**：`rounded-2xl w-48 h-48 md:w-64 md:h-64 object-cover shadow-lg`。

**理由**：圆角方形比圆形更现代、更符合科技风格。`object-cover` 保证照片比例不被拉伸。固定尺寸在移动端缩放到 `w-48`。

### 3. 品牌标签：Badge 样式

**选择**：`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium`。

**理由**：渐变背景使标签醒目，"欧韵音乐"作为个人品牌标识以 Badge 形式呈现，视觉层次高于正文。

### 4. 简介文字：3 段 `<p>` + props 可配置

**选择**：简介通过 3 段文字的 props 传入（`bio1`, `bio2`, `bio3`），提供默认占位文字。

**理由**：文字内容最终由用户确认，props 传入便于后续替换。占位文字让页面即时可看。

### 5. 照片：静态占位图 + lazy loading

**选择**：`src/assets/about-photo.png` 作为单张占位图，`<img loading="lazy">`。

**理由**：真实照片由用户后续替换。lazy loading 避免影响首屏 Hero Section 的 LCP。

### 6. 暗色模式：Tailwind `dark:` 变体

**选择**：文字 `text-gray-700 dark:text-gray-300`，背景 `bg-white dark:bg-gray-900`。与现有组件一致。

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| 占位图不真实，用户可能觉得不专业 | 使用项目 logo 或抽象 SVG 作为占位，标注"Replace with your photo" |
| 移动端照片和文字堆叠后高度过长 | 照片缩小到 `w-48`，文字行宽限制 `max-w-prose` |

## Open Questions

（无——需求明确，技术方案直接）
