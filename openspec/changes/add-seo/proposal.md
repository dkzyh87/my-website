## Why

当前网站虽已完成页面结构，但缺少搜索引擎优化（SEO）和社交分享支持。搜索引擎无法获取页面描述，社交平台分享时无预览卡片（Open Graph）。站点上线前必须具备基础 SEO 元数据和爬虫索引规则，否则访问者只能通过直接链接发现网站。

## What Changes

- 完善 `index.html` 的 `<title>` 和 `<meta name="description">` 标签
- 添加 Open Graph 元标签（`og:title`, `og:description`, `og:image`, `og:url`, `og:type`）支持社交平台分享预览
- 添加 Twitter Card 元标签（`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`）
- 审查现有组件的 HTML 语义标签（确保 `<nav>`, `<main>`, `<section>`, `<article>`, `<h1>`-`<h3>` 层级正确）
- 新增 `public/robots.txt`，允许 Google 爬虫索引全部页面
- 添加 `<link rel="canonical">` 避免重复内容

## Capabilities

### New Capabilities
- `seo`: 搜索引擎优化基础套件——HTML meta 标签（title/description）、Open Graph 社交分享标签、Twitter Card 标签、robots.txt 爬虫规则、canonical URL、语义化 HTML 标签审查

### Modified Capabilities
（无——SEO 属于 HTML 文档头和静态文件层面的变更，不改动任何组件的行为规范）

## Impact

| 影响范围 | 说明 |
|----------|------|
| `index.html` | 修改 — 完善 `<title>`，新增 `<meta description>`、Open Graph、Twitter Card、canonical |
| `public/robots.txt` | 新建 — 允许 Googlebot 索引 |
| `src/App.tsx` | 审查 — 可能需要包裹 `<main>` 语义标签 |
| 现有组件 | 审查 — 确认语义标签使用正确，按需修正 |

## Out-of-Scope（严禁实现）

- 不做结构化数据（JSON-LD / Schema.org）
- 不做 sitemap.xml
- 不做 Google Analytics / 跟踪脚本
- 不做多语言 SEO（hreflang）
- 不做 favicon 优化
