## ADDED Requirements

### Requirement: HTML Meta 标签

系统 SHALL 在 `<head>` 中提供完整的 SEO 和社交分享元标签。

#### Scenario: 搜索引擎抓取
- **GIVEN** 搜索引擎爬虫访问网站
- **WHEN** 读取页面 `<head>`
- **THEN** `<title>` 包含姓名和职业关键词（长度 ≤ 60 字符）
- **AND** `<meta name="description">` 包含网站描述（长度 ≤ 160 字符）
- **AND** `<link rel="canonical">` 指向部署域名

#### Scenario: 社交平台分享（Open Graph）
- **GIVEN** 用户在社交平台分享网站链接
- **WHEN** 平台抓取 Open Graph 标签
- **THEN** `og:title` 存在且与页面标题一致
- **AND** `og:description` 存在
- **AND** `og:image` 指向有效的预览图片
- **AND** `og:url` 指向 canonical URL
- **AND** `og:type` 为 `website`

#### Scenario: Twitter 分享
- **GIVEN** 用户在 Twitter 分享网站链接
- **WHEN** Twitter 抓取卡片标签
- **THEN** `twitter:card` 为 `summary_large_image`
- **AND** `twitter:title` 和 `twitter:description` 存在
- **AND** `twitter:image` 指向有效的预览图片

### Requirement: robots.txt 爬虫规则

系统 SHALL 提供 `robots.txt` 文件允许搜索引擎索引。

#### Scenario: 爬虫读取 robots.txt
- **GIVEN** 网站已部署
- **WHEN** Googlebot 请求 `/robots.txt`
- **THEN** 返回 `Allow: /` 允许索引全部页面
- **AND** User-agent 为 `*`（所有爬虫）

### Requirement: 语义化 HTML 标签

系统 SHALL 使用正确的语义化 HTML 标签构建页面结构。

#### Scenario: 页面语义结构
- **GIVEN** 页面已渲染
- **WHEN** 检查 HTML 标签层级
- **THEN** 导航栏使用 `<nav>` 标签
- **AND** 主内容区包裹在 `<main>` 标签内
- **AND** 各功能区域使用 `<section>` 标签
- **AND** 项目卡片使用 `<article>` 标签
- **AND** 标题层级为 `<h1>` → `<h2>` → `<h3>`，不跳级
