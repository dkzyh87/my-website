# CLAUDE.md - OpenSpec工作流规则

## 核心纪律

1. **先读后做**：执行任何OpenSpec命令前，先读取：
   - openspec/config.yaml（项目约束）
   - openspec/specs/ 目录下相关域的规范（当前系统行为）
   - openspec/changes/ 当前活跃的变更（如果存在）

2. **不要猜测需求**：如果spec中没有明确定义某个行为，问我，不要自行补充。

3. **out-of-scope是红线**：proposal.md中标注为out-of-scope的功能，严禁实现。

## Apply阶段规则

1. 每完成一个tasks.md中的Phase，停下来。
2. 总结当前阶段的代码变更（改了什么文件、为什么这么改）。
3. 等待我review并确认后，再继续下一Phase。
4. 严禁一次性实现所有任务。

## 代码标准

- 所有组件使用TypeScript + 函数式组件
- 样式全部使用Tailwind CSS，禁止内联style
- 支持暗色模式（dark: 前缀）
- 所有图片使用lazy loading
- 组件文件名使用PascalCase
