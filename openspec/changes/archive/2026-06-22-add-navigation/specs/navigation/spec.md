## ADDED Requirements

### Requirement: 导航栏固定展示

系统 SHALL 在页面顶部渲染一个固定导航栏，包含品牌标识和导航链接。

#### Scenario: 桌面端正常展示
- **GIVEN** 用户打开网站
- **WHEN** 视口宽度大于 768px
- **THEN** 导航栏固定在视口顶部（`position: fixed`）
- **AND** 左侧显示品牌名（默认为 "Your Name"）
- **AND** 右侧显示三个导航链接：首页、项目、联系我
- **AND** 导航栏有毛玻璃模糊背景效果（`backdrop-blur`）
- **AND** 导航栏高度适中（约 56-64px），不占用过多垂直空间

#### Scenario: 移动端正常展示
- **GIVEN** 用户在移动设备上打开网站
- **WHEN** 视口宽度小于等于 768px
- **THEN** 导航栏固定在视口顶部
- **AND** 品牌名和导航链接字号缩小
- **AND** 所有 3 个链接保持单行排列（不做折叠菜单）
- **AND** 链接间距缩小，不产生横向溢出

#### Scenario: 超窄视口（≤ 360px）
- **GIVEN** 视口宽度小于等于 360px
- **WHEN** 导航栏渲染
- **THEN** 导航链接字号进一步缩小到 `text-xs`
- **AND** 内边距最小为 12px
- **AND** 所有内容完整可见，不裁剪

### Requirement: 平滑滚动导航

系统 SHALL 在用户点击导航链接时平滑滚动到对应页面区域。

#### Scenario: 点击导航链接跳转到目标 Section
- **GIVEN** 导航栏已渲染，目标 Section 存在于页面中
- **WHEN** 用户点击导航链接（如"项目"）
- **THEN** 页面平滑滚动到对应 Section（`id="projects"`）
- **AND** 目标 Section 顶部与视口顶部对齐（或被 Navbar 遮挡时在 Navbar 下方可见）

#### Scenario: 目标 Section 不存在
- **GIVEN** 页面中不存在导航链接指向的目标 Section（如 `#contact`）
- **WHEN** 用户点击该链接
- **THEN** 浏览器行为降级——跳转到页面顶部（默认 `#` 行为）

#### Scenario: 重复点击同一链接
- **GIVEN** 用户已在"首页"位置
- **WHEN** 用户再次点击"首页"导航链接
- **THEN** 页面平滑滚动回顶部（正常锚点行为）

### Requirement: 毛玻璃背景效果

系统 SHALL 为导航栏提供毛玻璃背景模糊效果，滚动时视觉上与页面内容自然融合。

#### Scenario: 亮色模式下的毛玻璃
- **GIVEN** 系统 `prefers-color-scheme` 为 `light`
- **WHEN** 页面内容在导航栏下方滚动
- **THEN** 导航栏背景为白色半透明（约 70% 不透明度）
- **AND** 透过导航栏可看到下方内容的模糊轮廓（`backdrop-blur`）

#### Scenario: 暗色模式下的毛玻璃
- **GIVEN** 系统 `prefers-color-scheme` 为 `dark`
- **WHEN** 页面内容在导航栏下方滚动
- **THEN** 导航栏背景为深色半透明（约 70% 不透明度）
- **AND** 透过导航栏可看到下方内容的模糊轮廓（`backdrop-blur`）

#### Scenario: 旧浏览器降级
- **GIVEN** 浏览器不支持 `backdrop-filter` CSS 属性
- **WHEN** 导航栏渲染
- **THEN** 导航栏使用不透明背景色替代（亮色白色，暗色深灰）
- **AND** 导航栏功能不受影响，仍可正常点击导航

### Requirement: 键盘可访问性

系统 SHALL 确保导航栏的所有交互元素可通过键盘访问。

#### Scenario: Tab 键导航
- **GIVEN** 导航栏已渲染
- **WHEN** 用户使用 Tab 键在导航链接间切换
- **THEN** 每个链接在获得焦点时显示可见的聚焦环（focus ring）
- **AND** Tab 键按从左到右（品牌名→首页→项目→联系我）的顺序遍历

#### Scenario: Enter 键激活链接
- **GIVEN** 导航链接获得焦点
- **WHEN** 用户按下 Enter 键
- **THEN** 触发与该链接点击相同的平滑滚动行为

### Requirement: 亮/暗主题自适应

系统 SHALL 使导航栏颜色自动跟随系统亮/暗主题设置。

#### Scenario: 暗色主题
- **GIVEN** 系统 `prefers-color-scheme` 为 `dark`
- **WHEN** 导航栏渲染
- **THEN** 导航栏背景使用暗色半透明（`dark:bg-gray-900/70`）
- **AND** 文字颜色使用浅色（`dark:text-gray-100`）
- **AND** 导航链接使用浅色文字（`dark:text-gray-300`）

#### Scenario: 亮色主题
- **GIVEN** 系统 `prefers-color-scheme` 为 `light`
- **WHEN** 导航栏渲染
- **THEN** 导航栏背景使用白色半透明（`bg-white/70`）
- **AND** 文字颜色使用深色（`text-gray-900`）

#### Scenario: 运行时主题切换
- **GIVEN** 导航栏已在亮色模式下渲染
- **WHEN** 用户将系统主题切换为暗色
- **THEN** 导航栏背景和文字颜色立即切换（CSS 媒体查询自动响应）
