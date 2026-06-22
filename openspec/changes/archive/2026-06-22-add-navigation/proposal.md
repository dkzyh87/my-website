## Why

当前个人品牌站只有 Hero Section 单屏内容，访问者无法直观了解网站结构，也无法快速跳转到其他区域。导航栏是网站可用性的基础元素——它提供全局定位、页面内跳转和品牌标识，是后续添加 Projects / Contact 等内容区域的前提。

## What Changes

- 新增 `Navbar` 组件，固定在页面顶部，左侧展示品牌名（可配置），右侧放置导航链接（首页、项目、联系我）
- 导航栏使用 `position: fixed` + `backdrop-blur` 实现毛玻璃背景模糊效果
- 导航链接点击后通过 `scroll-behavior: smooth` 平滑滚动到对应 Section
- 为 Hero Section 容器添加 `id="home"` 以支持"首页"锚点
- 为页面预留 `#projects` 和 `#contact` 锚点目标区域（占位 Section，不做完整实现）
- 移动端（≤768px）导航链接文字缩小，保持单行排列

## Capabilities

### New Capabilities
- `navigation`: 固定顶部导航栏，包含品牌标识、导航链接（首页/项目/联系我）、毛玻璃背景模糊、平滑滚动导航、响应式适配（桌面/移动端）、键盘可访问性

### Modified Capabilities
（无——不对 hero-section 的行为规范做修改，HeroSection 的 CTA 按钮 `#projects` 链接与导航栏的"项目"链接指向同一目标但互不冲突）

## Impact

| 影响范围 | 说明 |
|----------|------|
| `src/components/Navbar.tsx` | 新建 — 导航栏组件 |
| `src/components/HeroSection.tsx` | 修改 — 为 `<section>` 添加 `id="home"` |
| `src/App.tsx` | 修改 — 引入 Navbar，添加 Projects/Contact 占位 Section |
| `src/index.css` | 修改 — 添加 `scroll-behavior: smooth` 全局平滑滚动 |
| 依赖 | 无新增依赖，使用 Tailwind `backdrop-blur` 和原生 `scrollIntoView` |

## Out-of-Scope（严禁实现）

- 不做搜索功能
- 不做多级下拉菜单
- 不做用户登录/注册
- 不实现 Projects 和 Contact 区域的完整内容（仅添加占位容器 + id）
- 不做移动端汉堡菜单（当前移动端保持导航链接单行展示）
- 不做滚动监听高亮当前 Section 的 active 状态
