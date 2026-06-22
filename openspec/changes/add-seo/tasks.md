## 1. HTML Meta 标签

- [x] 1.1 完善 `index.html` 的 `<title>`（`"Your Name — Full-Stack Developer & Builder"`）和新增 `<meta name="description">`
- [x] 1.2 添加 Open Graph 标签（`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`）
- [x] 1.3 添加 Twitter Card 标签（`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`）
- [x] 1.4 添加 `<link rel="canonical">` 指向部署域名

## 2. robots.txt + 语义化审查

- [x] 2.1 创建 `public/robots.txt`，允许所有爬虫索引（`User-agent: *` / `Allow: /`）
- [x] 2.2 审查 `App.tsx`：将 `<>` Fragment 替换为 `<main>` 包裹现有内容
- [x] 2.3 审查现有组件语义标签（Navbar `<nav>` ✅, HeroSection `<section>` ✅, ProjectSection `<section>` + `<article>` ✅, `h1`→`h2`→`h3` 层级 ✅），记录审查结论

## 3. 验证

- [x] 3.1 运行 `npm run build`，确认 `dist/` 输出包含 robots.txt 和完善的 meta 标签
- [x] 3.2 检查构建输出的 `dist/index.html`：title、description、OG 标签、Twitter Card、canonical 全部存在
