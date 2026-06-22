## ADDED Requirements

### Requirement: 项目卡片展示

系统 SHALL 在 `#projects` 区域以卡片网格形式展示至少 4 个项目。

#### Scenario: 桌面端网格布局
- **GIVEN** 用户打开网站
- **WHEN** 视口宽度大于等于 1024px
- **THEN** 项目卡片以 3 列网格排列
- **AND** 每张卡片包含项目截图（`<img>`）、项目名称（`h3`）、项目简介（`p`）、GitHub 链接（`<a>`）

#### Scenario: 中等屏幕布局
- **GIVEN** 用户打开网站
- **WHEN** 视口宽度在 768px 到 1023px 之间
- **THEN** 项目卡片以 2 列网格排列

#### Scenario: 移动端堆叠布局
- **GIVEN** 用户在移动设备上打开网站
- **WHEN** 视口宽度小于 768px
- **THEN** 项目卡片以 1 列堆叠排列
- **AND** 卡片宽度占满容器，内边距适配窄屏
- **AND** 卡片内容不产生横向溢出

#### Scenario: 最少展示数量
- **GIVEN** 页面已渲染
- **WHEN** 用户查看项目区域
- **THEN** 至少显示 4 张项目卡片

### Requirement: 鼠标悬浮微特效

系统 SHALL 在鼠标悬浮于项目卡片上时展示微交互特效。

#### Scenario: 鼠标悬浮卡片
- **GIVEN** 用户在桌面端查看项目区域
- **WHEN** 用户将鼠标移动到任意项目卡片上方
- **THEN** 卡片轻微上浮（垂直位移约 4px）
- **AND** 卡片阴影增强，产生抬升感
- **AND** 动画过渡平滑（约 300ms）
- **AND** 鼠标移出后卡片恢复原位

#### Scenario: 触摸设备无悬浮效果
- **GIVEN** 用户在触摸设备上查看项目区域
- **WHEN** 用户触摸项目卡片
- **THEN** 卡片不展示悬浮动画（触摸设备无 hover 状态）

### Requirement: GitHub 外链

系统 SHALL 为每个项目卡片提供指向 GitHub 仓库的外部链接。

#### Scenario: 点击 GitHub 链接
- **GIVEN** 项目卡片已渲染
- **WHEN** 用户点击 GitHub 链接
- **THEN** 在新标签页中打开对应的 GitHub 仓库页面
- **AND** 使用 `rel="noopener noreferrer"` 防止安全风险

#### Scenario: GitHub 链接不可用
- **GIVEN** 某个项目的 `githubUrl` 为空或无效
- **WHEN** 项目卡片渲染
- **THEN** GitHub 链接不显示或显示为禁用状态
- **AND** 卡片其他内容正常展示

### Requirement: 图片延迟加载

系统 SHALL 对项目截图使用延迟加载以优化首屏性能。

#### Scenario: 图片延迟加载
- **GIVEN** 项目区域在首屏以下
- **WHEN** 页面初次加载
- **THEN** 项目截图不立即加载（使用 `loading="lazy"`）
- **AND** 仅当用户滚动到项目区域时才发起图片请求

### Requirement: 亮/暗主题自适应

系统 SHALL 使项目卡片颜色自动跟随系统亮/暗主题设置。

#### Scenario: 暗色主题
- **GIVEN** 系统 `prefers-color-scheme` 为 `dark`
- **WHEN** 项目区域渲染
- **THEN** 卡片背景使用深色（`dark:bg-gray-800`）
- **AND** 卡片文字使用浅色（`dark:text-gray-100`）
- **AND** 卡片边框使用深色边框（`dark:border-gray-700`）

#### Scenario: 亮色主题
- **GIVEN** 系统 `prefers-color-scheme` 为 `light`
- **WHEN** 项目区域渲染
- **THEN** 卡片背景使用白色（`bg-white`）
- **AND** 卡片文字使用深色（`text-gray-900`）
- **AND** 卡片边框使用浅色边框（`border-gray-200`）
