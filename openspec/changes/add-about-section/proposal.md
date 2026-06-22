## Why

当前网站只展示了项目和粒子特效，缺少"关于我"的个人介绍区域。访问者看到项目后自然会想了解作者是谁、背景如何。"关于我"区域是个人品牌站的三要素之一（首页 → 作品 → 关于），能建立信任感和个人辨识度。

## What Changes

- 新增 `AboutSection` 组件，插入在 ProjectSection 和 Contact 占位区之间
- 左侧：个人照片（`<img loading="lazy">`，圆角或圆形裁剪）
- 右侧：个人简介（3 段文字，语义化 `<p>`）
- 底部：品牌标签"欧韵音乐"（Tag/Badge 样式）
- 桌面端左右并排布局，移动端上下堆叠

## Capabilities

### New Capabilities
- `about-section`: "关于我"区域，包含个人照片、3 段简介文字、品牌标签"欧韵音乐"、响应式双栏布局（桌面左右 / 移动上下）、亮/暗模式自适应

### Modified Capabilities
（无——现有 Navbar、HeroSection、ProjectSection 的行为均不受影响。Navbar 的"联系我"链接仍指向 Contact 占位区）

## Impact

| 影响范围 | 说明 |
|----------|------|
| `src/components/AboutSection.tsx` | 新建 — "关于我"组件 |
| `src/assets/about-photo.png` | 新增 — 个人照片占位图 |
| `src/App.tsx` | 修改 — 在 ProjectSection 和 Contact 占位区之间插入 `<AboutSection />` |
| 依赖 | 无新增依赖 |

## Out-of-Scope（严禁实现）

- 不做联系我的表单
- 不做技能进度条/技能标签云
- 不做时间线/经历展示
- 不做社交媒体链接图标组
