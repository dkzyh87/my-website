## Context

当前项目是 Vite + React + TypeScript 模板脚手架，`App.tsx` 中为默认 counter demo 页面。需要在空白基础上构建个人品牌站的首屏 Hero Section。项目已配置 Tailwind CSS v4，支持 `dark:` 变体（基于 `prefers-color-scheme` 媒体查询）。

## Goals / Non-Goals

**Goals:**
- 实现全屏 Hero Section，展示姓名、职业、一句话介绍
- Canvas 绘制的网络拓扑粒子背景（桌面 80 粒子 / 移动 40 粒子）
- 粒子颜色和 CSS 渐变背景自动跟随系统亮/暗主题
- CTA 按钮链接到 `#projects` 锚点
- 零外部依赖，手写 Canvas 粒子系统

**Non-Goals:**
- 不做滚动动画、入场动画、过渡动效
- 不做导航栏
- 不做手动主题切换按钮
- 不实现 `#projects` 锚点目标区域
- 不做鼠标交互（粒子排斥/吸引）

## Decisions

### 1. 组件拆分：HeroSection + ParticleCanvas

**选择**：`HeroSection` 负责布局和内容，`ParticleCanvas` 作为独立 Canvas 组件嵌入。

**理由**：关注点分离。ParticleCanvas 可被未来其他区域复用（如 Footer 背景），Canvas 生命周期（resize、RAF、visibility）封装在组件内部。

**替代方案**：单文件全部逻辑 → 拒绝，复用性为零，文件过长。

### 2. 粒子系统：手写 Canvas + requestAnimationFrame

**选择**：零依赖，~80 行 Canvas 粒子系统。

**理由**：粒子行为简单（移动 + 近邻连线），无需引入 tsparticles（50KB+）。完全控制主题切换时颜色更新路径。

### 3. 主题感知：CSS 自定义属性 + matchMedia 监听

**选择**：在 `index.css` 中定义 `--particle-color` 和 `--particle-line-color` CSS 变量，在 `:root` 和 `@media (prefers-color-scheme: dark)` 下分别设值。ParticleCanvas 通过 `getComputedStyle` 读取颜色，通过 `matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ...)` 监听变化。

**理由**：Tailwind v4 的 `dark:` 变体默认就是 `prefers-color-scheme` 媒体查询，与选择一致。CSS 变量是 Canvas 和 CSS 之间的桥接层。

### 4. 渐变背景：CSS 纯实现，不参与 Canvas

**选择**：渐变背景用 CSS `background: linear-gradient(...)`直接写在 HeroSection 的容器 div 上，Canvas 作为独立层叠加。

**理由**：CSS 渐变由 GPU 合成，不占用 Canvas 渲染预算。主题切换时 CSS 渐变自动跟随 `prefers-color-scheme`，无需 JS 干预。

### 5. 视口高度：使用 dvh 而非 vh

**选择**：`min-height: 100dvh`

**理由**：移动端浏览器地址栏折叠时 `100vh` 会导致底部被截断，`dvh` 动态跟随可用视口高度。

### 6. 粒子性能边界

| 场景 | 行为 |
|------|------|
| 桌面 (>768px) | 80 粒子 |
| 移动 (≤768px) | 40 粒子 |
| `prefers-reduced-motion: reduce` | 停止动画，粒子静止 |
| 标签页隐藏 (`visibilitychange`) | 暂停 RAF，恢复时继续 |
| Canvas resize | ResizeObserver + 防抖 100ms |
| Retina 屏 | Canvas 按 `devicePixelRatio` 缩放（上限 2x） |

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| Canvas 在低端移动设备上帧率不足 | 粒子数限制 40，连线距离阈值减半 |
| 主题切换时 Canvas 颜色更新有延迟（~1 帧） | 可接受——用户感知不到单帧延迟 |
| `dvh` 在旧浏览器不支持（Safari < 15.4） | 降级用 `100vh`，`@supports (min-height: 100dvh)` 渐进增强 |
| 用户内容（姓名/职业）尚未确定 | 使用占位文本，通过 props 传入，后续替换不涉及组件修改 |

## Open Questions

（无——所有技术决策已在探索阶段与用户确认完毕）
