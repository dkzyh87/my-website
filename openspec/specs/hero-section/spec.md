# Hero Section

## Purpose

The Hero Section is the first screen visitors see when landing on the personal brand website. It conveys identity (name, role, tagline) within 3 seconds, provides a CTA to the projects section, and establishes visual identity through a tech-themed particle background that adapts to system light/dark mode.

## Requirements

### Requirement: Hero Section 全屏展示

系统 SHALL 渲染一个全屏高度的 Hero 区域，居中展示用户的姓名、职业和一句话介绍。

#### Scenario: 桌面端正常展示
- **GIVEN** 用户打开网站
- **WHEN** 视口宽度大于 768px
- **THEN** Hero Section 占据 100dvh 高度
- **AND** 姓名、职业、介绍文字垂直居中排列
- **AND** 文字层级为：姓名为 h1、职业为 p、介绍为 p

#### Scenario: 移动端正常展示
- **GIVEN** 用户在移动设备上打开网站
- **WHEN** 视口宽度小于等于 768px
- **THEN** Hero Section 占据 100dvh 高度
- **AND** 文字水平居中，内边距适配窄屏
- **AND** 字体大小按比例缩小，不出现横向溢出

#### Scenario: 超窄视口（≤ 360px）
- **GIVEN** 视口宽度小于等于 360px
- **WHEN** Hero Section 渲染
- **THEN** 所有文字内容仍完整可见，不裁剪
- **AND** 最小内边距为 16px

### Requirement: CTA 按钮

系统 SHALL 在 Hero Section 中提供一个 CTA 按钮，链接到项目展示区域。

#### Scenario: CTA 按钮渲染
- **GIVEN** Hero Section 已渲染
- **WHEN** 用户查看页面
- **THEN** CTA 按钮显示在介绍文字下方
- **AND** 按钮文字为"查看项目"
- **AND** 按钮为 `<a>` 元素，`href` 属性为 `#projects`

#### Scenario: CTA 按钮键盘可访问
- **GIVEN** CTA 按钮已渲染
- **WHEN** 用户使用 Tab 键导航
- **THEN** 按钮获得焦点，显示可见的聚焦环（focus ring）

#### Scenario: 目标锚点不存在
- **GIVEN** 页面中不存在 `id="projects"` 的元素
- **WHEN** 用户点击 CTA 按钮
- **THEN** 浏览器行为降级为跳转到页面顶部（浏览器默认 `#` 行为）

### Requirement: 粒子背景

系统 SHALL 在 Hero Section 背景中渲染一个基于 Canvas 的网络拓扑粒子层。

#### Scenario: 桌面端粒子密度
- **GIVEN** 视口宽度大于 768px
- **WHEN** ParticleCanvas 初始化
- **THEN** Canvas 中渲染 80 个粒子
- **AND** 粒子间距离小于阈值的对之间绘制连线
- **AND** 粒子以恒定速度运动，碰到边界反弹

#### Scenario: 移动端粒子密度
- **GIVEN** 视口宽度小于等于 768px
- **WHEN** ParticleCanvas 初始化
- **THEN** Canvas 中渲染 40 个粒子

#### Scenario: 用户开启了"减少动画"系统设置
- **GIVEN** 系统设置了 `prefers-reduced-motion: reduce`
- **WHEN** ParticleCanvas 初始化
- **THEN** 粒子渲染为静止状态，不执行动画帧循环
- **AND** Canvas 仍然渲染初始帧（粒子 + 连线）

#### Scenario: 标签页切换到后台
- **GIVEN** 粒子动画正在运行
- **WHEN** 用户切换到其他浏览器标签页（触发 `visibilitychange`）
- **THEN** 动画暂停（取消 requestAnimationFrame）
- **AND** 当用户切回标签页时动画恢复

#### Scenario: 浏览器窗口大小变化
- **GIVEN** ParticleCanvas 已渲染
- **WHEN** 浏览器窗口大小改变
- **THEN** Canvas 尺寸在防抖 100ms 后更新为新尺寸
- **AND** Canvas 按 devicePixelRatio 缩放（上限 2x）

### Requirement: 亮/暗主题自适应

系统 SHALL 使 Hero Section 的渐变背景和粒子颜色自动跟随系统亮/暗主题。

#### Scenario: 系统为暗色主题
- **GIVEN** 系统 `prefers-color-scheme` 为 `dark`
- **WHEN** Hero Section 渲染
- **THEN** CSS 渐变背景使用暗色调（深蓝→紫→黑）
- **AND** 粒子颜色为亮色（白色/浅色）
- **AND** 文字颜色使用浅色（Tailwind `dark:text-gray-100`）

#### Scenario: 系统为亮色主题
- **GIVEN** 系统 `prefers-color-scheme` 为 `light`
- **WHEN** Hero Section 渲染
- **THEN** CSS 渐变背景使用亮色调（浅蓝→青→白）
- **AND** 粒子颜色为深色
- **AND** 文字颜色使用深色

#### Scenario: 运行时主题切换
- **GIVEN** Hero Section 已在亮色模式下渲染
- **WHEN** 用户将系统主题切换为暗色
- **THEN** 渐变背景立即切换（CSS 媒体查询自动响应）
- **AND** 粒子颜色在下一动画帧更新为新主题颜色
