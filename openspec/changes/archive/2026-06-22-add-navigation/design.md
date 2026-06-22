## Context

当前项目为单页个人品牌站，仅 Hero Section 一屏内容。技术栈：React 19 + TypeScript + Tailwind CSS v4，粒子背景为 Canvas 实现。需添加固定顶部导航栏以支持多 Section 页面结构。导航栏需与现有 Hero Section（粒子层 z-0，内容层 z-10）正确叠加。

## Goals / Non-Goals

**Goals:**
- 固定顶部导航栏，左侧品牌名，右侧导航链接
- `backdrop-blur` 毛玻璃背景，内容滚动时导航栏半透明模糊
- 点击导航链接平滑滚动到对应 Section
- 亮/暗模式自动跟随 `prefers-color-scheme`
- 移动端导航链接缩小字号，保持单行（不做汉堡菜单）
- 键盘 Tab 导航可访问

**Non-Goals:**
- 不做移动端汉堡菜单/折叠菜单
- 不做搜索
- 不做多级下拉
- 不实现 Projects/Contact 区域的完整内容
- 不做滚动监听 active 状态高亮

## Decisions

### 1. 组件结构：单一 Navbar 组件

**选择**：`Navbar.tsx` 单文件组件，不拆子组件。

**理由**：导航栏逻辑简单（渲染链接列表 + 固定定位），拆分为 Brand + NavLinks 会增加不必要的文件和 prop drilling。如果未来导航栏变复杂可随时拆分。

**替代方案**：拆分为 `NavbarBrand` + `NavbarLinks` → 拒绝，当前规模不需要。

### 2. 固定定位 + z-index 管理层级

**选择**：`fixed top-0 inset-x-0 z-50`，高于粒子层（z-0）和 Hero 内容层（z-10）。

**理由**：Navbar 需要始终在视口最顶层。现有 z-index 分配：ParticleCanvas z-0，Hero 内容 z-10，Navbar z-50 留足间隙。

### 3. 毛玻璃效果：Tailwind backdrop-blur

**选择**：`backdrop-blur-md bg-white/70 dark:bg-gray-900/70`。

**理由**：`backdrop-filter: blur()` 是 CSS 标准属性，Tailwind 内置支持，零 JS 开销。`/70` 透明度使背景不完全遮挡，保留页面色彩透过感。暗色模式下用深色半透明。

### 4. 平滑滚动：CSS scroll-behavior

**选择**：在 `html` 元素上设置 `scroll-behavior: smooth`，导航链接使用标准 `<a href="#section-id">`。

**理由**：浏览器原生支持，无需 JS 事件处理，无需 `scrollIntoView({ behavior: 'smooth' })`。兼容所有现代浏览器。点击 `<a href="#home">` 时浏览器自动平滑滚动到 `<section id="home">`。

**替代方案**：JS `scrollIntoView` → 拒绝，更重且需要 onClick handler，与 `<a>` 语义不一致。

### 5. 导航链接数据驱动

**选择**：导航链接通过组件内常量数组定义，`{ label, href }` 结构，`map` 渲染。

**理由**：链接数量少（3 个），内联常量为最简单方案。未来如需外部配置可改为 props。

### 6. 暗色模式跟随

**选择**：使用 Tailwind `dark:` 变体（基于 `prefers-color-scheme` 媒体查询），与现有 Hero Section 一致。

**理由**：项目统一使用 `prefers-color-scheme`，无需 JS 主题切换逻辑。

### 7. 响应式策略

| 断点 | 行为 |
|------|------|
| 桌面 (>768px) | 导航链接 `text-base`，间距 `gap-8` |
| 移动 (≤768px) | 导航链接 `text-sm`，间距 `gap-4`，品牌名 `text-sm` |

不使用汉堡菜单（out-of-scope），移动端保持单行。

### 8. 实现调整：自定义 `.nav-glass` 类

在实现阶段，将 Decision 3 中的 Tailwind inline 类（`backdrop-blur-md bg-white/70 dark:bg-gray-900/70`）重构为自定义 CSS 类 `.nav-glass`。原因：

- `@supports (backdrop-filter)` 包装需要同时处理亮/暗两种模式，Tailwind inline 无法表达嵌套的 `@supports` + `@media` 组合
- 自定义类实现了完整的四层降级：base opaque → dark opaque → @supports frosted → @supports + dark frosted，符合 spec "旧浏览器降级" scenario

视觉结果与 Decision 3 等价（12px blur + 70% 透明度）。

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| 移动端 3 个链接 + 品牌名在 320px 宽度下可能拥挤 | 缩小字号到 `text-xs`，减小间距到 `gap-2`，品牌名截断或用缩写 |
| `backdrop-blur` 在旧浏览器不支持 | 降级为不透明背景 `bg-white dark:bg-gray-900`（无 `/70`），`@supports` 检测 |
| Navbar 遮挡 Hero Section 顶部内容 | Hero 内容已居中，遮挡不影响可读性；如果后续添加顶部对齐内容需加 `pt-16` |
| `scroll-behavior: smooth` 在 Safari < 15.4 不支持 | 无伤大雅，降级为瞬跳——功能不丢失 |

## Open Questions

（无——所有技术决策基于现有项目模式，无需额外澄清）
