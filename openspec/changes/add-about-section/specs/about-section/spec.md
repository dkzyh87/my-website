## ADDED Requirements

### Requirement: 双栏布局展示

系统 SHALL 以"左照片 + 右文字"双栏布局展示"关于我"区域。

#### Scenario: 桌面端双栏布局
- **GIVEN** 用户在桌面端打开网站
- **WHEN** 视口宽度大于等于 768px
- **THEN** 照片在左侧，简介文字在右侧
- **AND** 照片为圆角方形，尺寸约 256x256px
- **AND** 文字区域包含 3 段简介段落

#### Scenario: 移动端堆叠布局
- **GIVEN** 用户在移动设备上打开网站
- **WHEN** 视口宽度小于 768px
- **THEN** 照片在上方，文字在下方，垂直堆叠
- **AND** 照片缩小至约 192x192px
- **AND** 内容居中对齐

### Requirement: 个人照片展示

系统 SHALL 展示一张个人照片，支持延迟加载。

#### Scenario: 照片渲染
- **GIVEN** "关于我"区域已渲染
- **WHEN** 用户查看页面
- **THEN** 个人照片可见
- **AND** 照片使用 `loading="lazy"` 延迟加载
- **AND** 照片有圆角（`rounded-2xl`）和阴影效果

### Requirement: 个人简介文字

系统 SHALL 展示 3 段个人简介文字。

#### Scenario: 简介文字渲染
- **GIVEN** "关于我"区域已渲染
- **WHEN** 用户查看页面
- **THEN** 显示 3 段简介文字（`<p>` 元素）
- **AND** 文字可通过 props 配置（`bio1`, `bio2`, `bio3`）
- **AND** 无 props 时显示占位文字

### Requirement: 品牌标签

系统 SHALL 在简介文字下方展示品牌标签"欧韵音乐"。

#### Scenario: 品牌标签渲染
- **GIVEN** "关于我"区域已渲染
- **WHEN** 用户查看页面
- **THEN** 在简介文字下方显示品牌标签"欧韵音乐"
- **AND** 标签使用渐变背景（蓝→紫），白色文字
- **AND** 标签为圆角 Badge 样式（`rounded-full`）

### Requirement: 亮/暗主题自适应

系统 SHALL 使"关于我"区域颜色自动跟随系统亮/暗主题设置。

#### Scenario: 暗色主题
- **GIVEN** 系统 `prefers-color-scheme` 为 `dark`
- **WHEN** "关于我"区域渲染
- **THEN** 区域背景使用深色（`dark:bg-gray-900`）
- **AND** 文字颜色使用浅色（`dark:text-gray-300`）

#### Scenario: 亮色主题
- **GIVEN** 系统 `prefers-color-scheme` 为 `light`
- **WHEN** "关于我"区域渲染
- **THEN** 区域背景使用白色（`bg-white`）
- **AND** 文字颜色使用深色（`text-gray-700`）
