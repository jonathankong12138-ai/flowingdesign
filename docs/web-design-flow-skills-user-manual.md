# Web Design 流程 Skills 使用手册

状态：使用手册  
适用范围：Codex Web Design 全流程  
Skill 根目录：`~/.codex/skills/`  
最后更新：2026-06-29

## 1. 总览

当前 Web Design 流程按阶段分为：

```txt
需求 / prototype
  -> 设计 / design
  -> 开发 / build
  -> 测试 / check
  -> 复盘 / retro
```

其中 `build` 阶段在普通代码开发之外，还包含一条专门的 Figma / 设计图网页开发链路：

```txt
figma-web-build
  -> figma-web-design-analysis
  -> figma-web-repo-analysis
  -> figma-web-implementation-map
  -> figma-web-code-implementation
  -> figma-web-interaction-states
  -> figma-web-visual-alignment
  -> figma-web-browser-verification
  -> figma-web-quality-finish
```

## 2. Skill 盘点

### 2.1 主流程 skills

| 阶段 | Skill | 路径 | 主要产物 |
|---|---|---|---|
| 需求 | `prototype` | `/Users/kk/.codex/skills/prototype` | 可运行、可评审的交互原型 |
| 设计 | `web-design` | `/Users/kk/.codex/skills/web-design` | 设计阶段交付指导 / build entry notes |
| 设计审查 | `web-design-handoff-review` | `/Users/kk/.codex/skills/web-design-handoff-review` | `Design Handoff Checklist` |
| 开发 | `build` | `/Users/kk/.codex/skills/build` | 工作代码 |
| Figma 开发总控 | `figma-web-build` | `/Users/kk/.codex/skills/figma-web-build` | Figma 到网页开发调度和阶段闸门 |
| 测试 | `check` | `/Users/kk/.codex/skills/check` | `Adjustment Checklist` |
| 复盘 | `retro` | `/Users/kk/.codex/skills/retro` | `Skill Upgrade Guide` |

### 2.2 Figma / 设计图开发环节 skills

| 顺序 | Skill | 路径 | 主要职责 |
|---|---|---|---|
| 1 | `figma-web-design-analysis` | `/Users/kk/.codex/skills/figma-web-design-analysis` | 把 Figma / 截图读成可开发结构 |
| 2 | `figma-web-repo-analysis` | `/Users/kk/.codex/skills/figma-web-repo-analysis` | 扫描代码库技术栈、路由、组件、样式、命令 |
| 3 | `figma-web-implementation-map` | `/Users/kk/.codex/skills/figma-web-implementation-map` | 把设计对象映射到代码实现策略 |
| 4 | `figma-web-code-implementation` | `/Users/kk/.codex/skills/figma-web-code-implementation` | 写路由、布局、组件、样式、内容和资源 |
| 5 | `figma-web-interaction-states` | `/Users/kk/.codex/skills/figma-web-interaction-states` | 补 hover、focus、loading、error、modal、tabs 等状态 |
| 6 | `figma-web-visual-alignment` | `/Users/kk/.codex/skills/figma-web-visual-alignment` | 对齐浏览器里的视觉还原 |
| 7 | `figma-web-browser-verification` | `/Users/kk/.codex/skills/figma-web-browser-verification` | 浏览器截图、console、DOM、交互和响应式验证 |
| 8 | `figma-web-quality-finish` | `/Users/kk/.codex/skills/figma-web-quality-finish` | lint、typecheck、build、test、a11y、性能和清理 |

### 2.3 辅助 / 专项 skills

| Skill | 路径 | 何时使用 |
|---|---|---|
| `prd-to-reviewable-prototype` | `/Users/kk/.codex/skills/prd-to-reviewable-prototype` | PRD 很粗，需要生成可评审低保真 prototype |
| `responsive-page-adapter` | `/Users/kk/.codex/skills/responsive-page-adapter` | 专门处理响应式适配、mobile/tablet 问题、断点回归 |
| `frontend-visual-qa-coach` | `/Users/kk/.codex/skills/frontend-visual-qa-coach` | 对已渲染页面做视觉 QA，并输出给开发 Codex 的修复提示 |
| `task-retro-upgrader` | `/Users/kk/.codex/skills/task-retro-upgrader` | 任务完成后，把经验整理成某个 skill 的升级 brief |

## 3. 标准使用流程

### 3.1 从想法到可开发原型

使用：

```txt
prototype
```

适合输入：

```txt
我要做一个会员中心
这里有一个粗略 PRD，帮我变成可交互原型
根据这个用户故事做一个低保真流程
```

输出：

```txt
可运行 prototype
页面清单
主要路径
分支路径
状态和行为说明
内嵌评论或验收提示
```

使用要点：

```txt
prototype 是需求阶段唯一产物。
不要额外输出独立 PRD、测试计划或路线图。
行为要尽量放进交互原型，而不是只写成说明文字。
```

如果输入是粗 PRD，并且需要可分享的评审工具，优先使用：

```txt
prd-to-reviewable-prototype
```

## 4. 设计阶段使用手册

### 4.1 准备设计交付

使用：

```txt
web-design
```

适合输入：

```txt
设计师要提交这个页面，应该准备什么？
帮我整理这个 Figma 的开发交付说明
这个设计稿能不能进入开发？
```

`web-design` 会判断当前任务属于：

```txt
设计准备
设计交付整理
设计稿审查
进入 build 前的闸门判断
```

设计师推荐提交格式：

```md
# Design Handoff Submission

## Design Source
- Figma URL:
- File / page:
- Frames for build:
- Screenshot fallback:

## Scope
- In scope:
- Out of scope:
- Target route / page if known:

## Prototype / Requirement Context
- Prototype link:
- User path:
- Business rules:

## Breakpoints
- Desktop:
- Tablet:
- Mobile:
- Responsive notes:

## States
- Default:
- Hover / focus / active:
- Loading:
- Empty:
- Error:
- Disabled:
- Modal / drawer / popover:

## Content / Data
- Final copy:
- Placeholder copy:
- Example data:
- CMS / API notes:

## Tokens
- Color notes:
- Typography notes:
- Spacing notes:
- Radius / shadow / border notes:
- Design system mapping:

## Assets
- Images:
- Icons:
- Logos:
- Fonts:
- Video:
- Export notes:

## Interactions
- Click / navigation:
- Form behavior:
- Validation:
- Motion:
- Scroll / carousel / tabs:

## Developer-Allowed Assumptions
- 

## Open Questions
- 
```

### 4.2 审查设计稿是否 ready for build

使用：

```txt
web-design-handoff-review
```

适合输入：

```txt
检查这个 Figma 是否 ready for build
帮我看这个设计交付物缺什么
这个 frame 能不能交给开发？
```

输出固定为：

```txt
Design Handoff Checklist
```

审查结果只有三类：

```txt
Ready for build: Yes
Ready for build: Conditional
Ready for build: No
```

`Conditional` 的含义：

```txt
可以进入 build，但必须带上 Developer-Allowed Assumptions。
```

阻塞 build 的典型问题：

```txt
没有明确 frame / 页面范围
只有静态视觉，没有核心交互说明
关键资产不可导出且无替代方案
desktop / mobile 差异无法推导
核心表单、购买、提交、弹窗流程缺状态
设计稿和 prototype 意图冲突
```

### 4.3 设计师收到审查结果后怎么改

设计师不要只回复“已修改”，应按 checklist ID 回复：

```md
# Handoff Fix Response

## Fixed Items

### DHR-001
Status: Fixed | Accepted Assumption | Won't Fix
Change:
Verification:
Owner:

## Remaining Questions
- 
```

当所有 `Blocker` 解决后，设计稿可以重新进入 `web-design-handoff-review`。

## 5. 开发阶段使用手册

### 5.1 普通开发

使用：

```txt
build
```

适合输入：

```txt
已经有 prototype，需要实现代码
根据 check 的 Adjustment Checklist 修复
按已有产品意图更新页面
```

输出：

```txt
工作代码
必要测试
验证命令结果
简短交付说明
```

使用要点：

```txt
build 的唯一交付物是代码。
不要输出单独实施计划或审计报告。
先读原型和代码库约定，再改代码。
```

### 5.2 根据 Figma / 设计图开发网页

使用：

```txt
figma-web-build
```

适合输入：

```txt
根据 Figma 实现页面
把这个截图还原成网页
根据 desktop + mobile 设计稿开发响应式页面
根据视觉 QA 修复和 Figma 不一致的问题
```

推荐前置条件：

```txt
设计稿已通过 web-design-handoff-review
或至少有明确 Design Handoff Submission
```

执行模式：

```txt
轻量模式：
design-analysis -> repo-analysis -> code-implementation -> browser-verification -> quality-finish

标准模式：
design-analysis -> repo-analysis -> implementation-map -> code-implementation -> interaction-states -> visual-alignment -> browser-verification -> quality-finish

严格模式：
标准模式 + 多断点截图 + DOM 测量 + 更严格 a11y / performance 检查
```

### 5.3 Figma 开发链路每个 skill 怎么用

#### `figma-web-design-analysis`

用来把设计源转成开发信息。

输出结构：

```txt
Design Source:
Frames / Breakpoints:
States:
Page Structure:
Content:
Design Tokens:
Assets:
Interactions:
Unknowns:
```

#### `figma-web-repo-analysis`

用来在写代码前理解项目。

输出结构：

```txt
Stack:
Package Manager:
Route / Page Entry:
Reusable Components:
Styling System:
Asset Rules:
Verification Commands:
Implementation Constraints:
```

#### `figma-web-implementation-map`

用来把设计对象映射到代码策略。

输出结构：

```txt
Route Mapping:
Component Mapping:
Token Mapping:
Asset Mapping:
Responsive Strategy:
Implementation Slices:
Assumptions:
```

#### `figma-web-code-implementation`

用来实际写代码。

关注：

```txt
route / layout / section / component
token / style / asset
内容和 mock data
现有数据、store、API 状态
```

#### `figma-web-interaction-states`

用来补齐静态设计稿之外的真实网页状态。

关注：

```txt
hover / focus / active / disabled
loading / empty / error / success
modal / drawer / popover / toast
tabs / carousel / stepper
form validation
motion + reduced-motion fallback
```

#### `figma-web-visual-alignment`

用来修浏览器里的视觉还原。

适合：

```txt
spacing 不一致
typography 不一致
media crop 不一致
mobile 和 desktop 断点回归
overflow / overlap
section height / control density 问题
```

#### `figma-web-browser-verification`

用来真实浏览器验证。

可选脚本：

```bash
node ~/.codex/skills/figma-web-browser-verification/scripts/capture-viewports.mjs http://localhost:5173 ./tmp/figma-web-shots
```

输出包括：

```txt
Local URL:
Screenshots:
Console / Runtime:
Interaction Checks:
Responsive Checks:
Issues Fixed or Remaining:
```

#### `figma-web-quality-finish`

用来开发阶段收尾。

关注：

```txt
lint
typecheck
build
test
a11y basics
performance risk
cleanup
final summary
```

## 6. 测试阶段使用手册

使用：

```txt
check
```

适合输入：

```txt
代码已经实现，需要验收
页面已改完，帮我看哪里还不符合 prototype / design
做一轮视觉 QA / responsive QA
```

输出固定为：

```txt
Adjustment Checklist
```

不要让 `check` 直接修代码，除非用户明确切换到 `build`。

Checklist 每一项应包含：

```txt
Evidence
State Coverage
Regression Risk
Expected
Actual
Developer Instruction
Verification
```

## 7. 复盘阶段使用手册

### 7.1 流程复盘

使用：

```txt
retro
```

适合输入：

```txt
这次 prototype/build/check 里哪里应该沉淀成 skill 规则？
根据这次返工，升级相关 skill
把失败经验整理成可贴进 SKILL.md 的指南
```

输出固定为：

```txt
Skill Upgrade Guide
```

它应该明确：

```txt
Target Skill
Observed Failure
Evidence
Root Cause
Instruction Change
Trigger Change
Anti-Pattern To Prevent
Acceptance Example
```

### 7.2 单任务 skill 维护 brief

使用：

```txt
task-retro-upgrader
```

适合：

```txt
任务已完成，要整理可交给另一个 Codex 的 skill 升级 brief
想提炼一次任务里的长期经验
不想立刻改 skill，只想得到升级建议
```

区别：

```txt
retro 更贴近 Web Design 主流程。
task-retro-upgrader 更像通用 skill 维护交接工具。
```

## 8. 辅助专项使用手册

### 8.1 响应式专项

使用：

```txt
responsive-page-adapter
```

适合：

```txt
desktop 到 mobile 适配
mobile overflow / overlap / clipped text
tablet 断点问题
响应式 Figma / screenshot adaptation
carousel / tabs / internal scroll 响应式问题
mobile-only DOM 漂移
```

核心原则：

```txt
先同源，再重排，最后美化。
```

也就是说：

```txt
先保证 mobile/tablet/desktop 使用同一内容和状态契约；
再做布局重排；
最后做 spacing、typography、视觉 polish。
```

### 8.2 视觉 QA 教练

使用：

```txt
frontend-visual-qa-coach
```

适合：

```txt
页面已实现，需要第二轮视觉 QA
需要基于截图输出修复 prompt 给开发 Codex
需要把反复出现的视觉问题沉淀成开发 skill 升级规则
```

它默认不直接修页面，而是输出：

```txt
视觉 QA findings
给开发 Codex 的修复 prompt
skill logic upgrades
下一轮验证 checklist
```

## 9. 常见场景怎么选 skill

| 场景 | 首选 skill | 下一步 |
|---|---|---|
| 只有一个产品想法 | `prototype` | 生成可评审原型 |
| 有粗 PRD，需要可分享评审原型 | `prd-to-reviewable-prototype` | 生成 `prototype-review/` |
| 设计师要准备交付 | `web-design` | 输出提交格式和交付要求 |
| 判断设计稿是否能开发 | `web-design-handoff-review` | 输出 `Design Handoff Checklist` |
| 设计稿通过审查，要开始写代码 | `figma-web-build` 或 `build` | 根据是否有 Figma / 截图选择 |
| 根据 Figma 实现页面 | `figma-web-build` | 进入 8 环节开发链路 |
| 普通原型到代码 | `build` | 直接实现 |
| 修 check 发现的问题 | `build` | 按 `Adjustment Checklist` 修复 |
| 专门修 mobile/tablet | `responsive-page-adapter` | 响应式专项修复 |
| 页面已实现，要独立验收 | `check` | 输出 `Adjustment Checklist` |
| 做视觉二审并生成修复 prompt | `frontend-visual-qa-coach` | 交给 build 继续修 |
| 一轮结束，需要沉淀规则 | `retro` | 输出 `Skill Upgrade Guide` |
| 想给某个 skill 维护者一份升级 brief | `task-retro-upgrader` | 输出 scoped upgrade brief |

## 10. 推荐端到端流程

### 10.1 标准新页面

```txt
prototype
  -> web-design
  -> web-design-handoff-review
  -> figma-web-build
  -> check
  -> build
  -> check
  -> retro
```

说明：

```txt
第一次 check 如果发现问题，回到 build 修复；
修完再 check；
完成后 retro 判断是否需要升级 skill。
```

### 10.2 没有 Figma，只有需求

```txt
prototype
  -> web-design
  -> build
  -> check
  -> retro
```

说明：

```txt
没有 Figma 时，build 以 prototype 为主要意图源。
```

### 10.3 已有 Figma，要开发

```txt
web-design-handoff-review
  -> figma-web-build
  -> check
  -> build
  -> check
  -> retro
```

说明：

```txt
如果 handoff review 是 No，先回到设计修稿；
如果是 Conditional，把 Developer-Allowed Assumptions 带进 figma-web-build。
```

### 10.4 已有页面，只修视觉和响应式

```txt
frontend-visual-qa-coach
  -> build 或 responsive-page-adapter
  -> check
```

说明：

```txt
如果问题主要是响应式结构、断点、mobile DOM，用 responsive-page-adapter；
如果是整体视觉 QA 和修复 prompt，用 frontend-visual-qa-coach。
```

## 11. 阶段交付物对照

| 阶段 | 固定或推荐交付物 | 不能替代 |
|---|---|---|
| `prototype` | runnable prototype | 不能替代 design handoff |
| `web-design` | handoff guidance / build entry notes | 不能替代代码实现 |
| `web-design-handoff-review` | `Design Handoff Checklist` | 不能替代 `check` |
| `build` | working code | 不能替代 `check` checklist |
| `figma-web-build` | working code + browser evidence | 不能替代独立验收 |
| `check` | `Adjustment Checklist` | 不能直接变成实现 |
| `retro` | `Skill Upgrade Guide` | 不能变成泛泛总结 |

## 12. 使用约定

1. 先让上游产物足够清楚，再进入下游。
2. `prototype` 管产品意图，`web-design` 管设计交付，`build` 管代码，`check` 管验收，`retro` 管流程升级。
3. 设计稿不完整时，不要让 `build` 猜；先用 `web-design-handoff-review` 输出设计侧修复项。
4. Figma / 截图开发优先走 `figma-web-build`，普通原型实现走 `build`。
5. 开发阶段可以自检，但不要替代 `check`。
6. 视觉和响应式问题必须尽量用截图、viewport、DOM、console、验证命令做证据。
7. 复盘时只升级有证据的失败点，不要往大 skill 里泛泛加规则。

## 13. 快速索引

```txt
需求到原型：prototype / prd-to-reviewable-prototype
设计交付：web-design
设计稿审查：web-design-handoff-review
普通开发：build
Figma 开发：figma-web-build
Figma 子环节：figma-web-*
响应式专项：responsive-page-adapter
视觉 QA：frontend-visual-qa-coach
测试验收：check
复盘升级：retro / task-retro-upgrader
```
