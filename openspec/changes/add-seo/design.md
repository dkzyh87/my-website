## Context

当前 `index.html` 仅有基本 viewport meta 和 `"Personal Website"` 标题。社交平台分享时无 Open Graph 标签，搜索引擎无 description 可抓取，无 robots.txt 爬虫规则。站点部署在 GitHub Pages。

## Goals / Non-Goals

**Goals:**
- 设置有意义的 `<title>` 和 `<meta description>`
- 添加 Open Graph 标签（`og:title`, `og:description`, `og:image`, `og:url`, `og:type`）
- 添加 Twitter Card 标签
- 审查并修正 HTML 语义标签
- 创建 `robots.txt` 允许 Googlebot

**Non-Goals:**
- 不做 JSON-LD 结构化数据
- 不做 sitemap.xml
- 不做 Google Analytics
- 不做 favicon

## Decisions

### 1. SEO 标题：`<title>`

**选择**：`"Your Name — Full-Stack Developer & Builder"`

**理由**：包含姓名 + 职业关键词，长度约 55 字符（Google 展示上限 ~60 字符）。与 HeroSection 的默认值一致。

### 2. Meta Description

**选择**：`<meta name="description" content="Personal website of Your Name, a full-stack developer building elegant solutions to complex problems. Explore projects and get in touch." />`

**理由**：150-160 字符的最佳长度，包含关键词（full-stack developer, projects），吸引点击。

### 3. Open Graph 标签

**选择**：6 个标准 OG 标签。

```html
<meta property="og:title" content="Your Name — Full-Stack Developer" />
<meta property="og:description" content="..." />
<meta property="og:image" content="<base>/og-image.png" />
<meta property="og:url" content="<canonical-url>" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Your Name Portfolio" />
```

**理由**：Facebook/LinkedIn/Discord 等平台的最小 OG 集合。`og:image` 建议 1200x630px。

### 4. Twitter Card

**选择**：`summary_large_image` 卡片类型。

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

**理由**：大图卡片比小图卡片点击率高 2-3 倍。Twitter 优先使用自有标签，缺失时回退到 OG 标签。

### 5. robots.txt

**选择**：`public/robots.txt`，内容：

```
User-agent: *
Allow: /
Sitemap: <base>/sitemap.xml
```

**理由**：Vite 将 `public/` 下的文件原样复制到构建输出。`Sitemap` 行可预留——当前无 sitemap，但不会导致爬虫报错。

### 6. 语义化 HTML 审查

**检查清单**：

| 元素 | 当前状态 | 修正 |
|------|---------|------|
| `<title>` | "Personal Website" | 改为带关键词的标题 |
| `<meta description>` | 无 | 新增 |
| `<nav>` | Navbar 使用 `<nav>` ✅ | — |
| `<main>` | App.tsx 最外层为 `<>` Fragment | 包裹 `<main>` |
| `<section>` | HeroSection, ProjectSection 均使用 `<section>` ✅ | — |
| `<article>` | ProjectSection 卡片使用 `<article>` ✅ | — |
| `<h1>` | HeroSection 姓名为 `<h1>` ✅ | — |
| `<h2>` | ProjectSection "My Projects" 为 `<h2>` ✅ | AboutSection 标题也应为 `<h2>` |
| `<h3>` | ProjectSection 卡片名称为 `<h3>` ✅ | — |
| `<a>` 语义 | Navbar 和 CTA 使用 `<a>` ✅ | — |

### 7. canonical URL

**选择**：`<link rel="canonical" href="<deployed-url>" />`

**理由**：GitHub Pages 可能有 `username.github.io` 和自定义域名两个版本，canonical 防止重复内容被搜索引擎降权。

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| `og:image` 图片不存在时社交分享卡片无图 | 提供一张静态 OG 图片（可复用 project 占位图风格） |
| robots.txt 中 sitemap 指向不存在的文件 | 爬虫遇到 404 时静默忽略，不影响索引 |

## Open Questions

（无）
