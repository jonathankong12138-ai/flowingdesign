# Web Design 设计阶段与设计稿交付审查 Skill 方案

状态：MVP 已落地  
适用范围：Codex Web Design 流程中的设计阶段  
关联文档：[设计开发流程 Skill 制作方案](./design-development-flow-skill-making-plan.md)、[Figma 设计图网页开发 Skill 体系方案](./figma-web-build-skill-scheme.md)  
最后更新：2026-06-29

## 1. 背景

当前 Web Design 流程已经具备：

```txt
需求 / prototype
  -> 开发 / build
  -> 测试 / check
  -> 复盘 / retro
```

但在真实工作中，`prototype` 和 `build` 之间通常还存在一个设计交付环节：

```txt
需求 / prototype
  -> 设计 / design
  -> 开发 / build
  -> 测试 / check
  -> 复盘 / retro
```

这个设计环节不是“做得好不好看”的审美评审，而是确认设计稿是否已经成为开发可消费的输入物。

如果没有设计稿交付闸门，开发阶段会被迫补齐大量本应由设计稿说明的内容：

```txt
页面范围不清楚
desktop / mobile 缺一端
组件状态缺失
表单校验和错误状态缺失
图片、icon、字体不可导出
token 和项目设计系统冲突
交互路径没有说明
内容和示例数据不完整
```

这些问题不应该在 `build` 阶段靠开发猜测解决。因此，本方案增加一个设计阶段，并在其中加入设计稿交付审查 skill：

```txt
web-design-handoff-review
检查设计稿输出物是否满足开发输入物要求。
```

## 2. 目标与非目标

### 2.1 目标

1. 在 `prototype` 和 `build` 之间增加清晰的 `design` 阶段。
2. 定义设计稿交付物必须满足的开发输入标准。
3. 设计一个可落地的 `web-design-handoff-review` skill。
4. 给设计师一套明确的使用方式、提交格式和修改指引。
5. 让 `figma-web-build` 能稳定消费通过审查的设计稿。
6. 让未达标设计稿回到设计阶段修正，而不是进入开发阶段返工。

### 2.2 非目标

1. 不用该 skill 判断设计稿审美水平。
2. 不替代产品评审、品牌评审或用户体验评审。
3. 不替代 `build` 的设计稿分析和代码实现。
4. 不替代 `check` 对已开发页面的独立验收。
5. 不要求设计师一次性提供所有极端状态，但必须明确哪些状态缺失、哪些可由开发合理假设。
6. 不在第一版拆出大量微 skill。

## 3. 流程位置

### 3.1 新流程

```txt
prototype
  -> design
      -> web-design
      -> web-design-handoff-review
  -> build
      -> figma-web-build
  -> check
  -> retro
```

### 3.2 各阶段职责

| 阶段 | 输入 | 输出 | 关键问题 |
|---|---|---|---|
| `prototype` | 需求、用户故事、业务规则 | 可交互原型和产品意图 | 要做什么 |
| `design` | prototype、品牌和设计系统 | 可开发设计稿 | 设计稿能不能交给开发 |
| `build` | 通过审查的设计稿和代码库 | 工作代码 | 如何实现 |
| `check` | 工作代码和设计 / 原型基准 | Adjustment Checklist | 实现是否符合意图 |
| `retro` | 失败证据和反馈 | skill 升级建议 | 下次如何少踩坑 |

### 3.3 设计阶段闸门

设计阶段只有一个核心判断：

```txt
设计稿是否已经满足开发输入物要求？
```

结果分三类：

```txt
Ready for build: Yes
  可以进入 build。

Ready for build: Conditional
  可以进入 build，但必须带上明确的开发可假设项。

Ready for build: No
  不能进入 build，需要设计师补齐阻塞项。
```

## 4. 设计输出物与开发输入物

### 4.1 设计输出物

设计师提交的是设计输出物，通常包括：

```txt
Figma 文件 / frame / page
设计截图或导出图
页面和状态清单
设计系统 token
组件变体
图片、icon、字体、视频等资产
交互说明
内容和示例数据
设计假设和未决问题
```

### 4.2 开发输入物

开发需要的是可执行输入物，至少包括：

```txt
明确范围：要开发哪些页面、区块、状态
明确断点：desktop、mobile，以及中间断点规则
明确结构：页面层级、重复模块、组件关系
明确状态：默认、hover、focus、active、disabled、loading、empty、error
明确内容：文案、字段、示例数据、空状态文案
明确 token：颜色、字号、行高、间距、圆角、边框、阴影
明确资产：图片、icon、logo、字体、视频的来源和导出方式
明确交互：点击、跳转、展开、关闭、提交、校验、动效
明确假设：哪些缺失项允许开发推导
```

### 4.3 设计稿达标的定义

一个设计稿达标，不是说它覆盖了所有可能情况，而是说：

```txt
开发可以不靠猜测地开始实现；
缺失信息已经被明确记录；
缺失项不会改变核心产品行为；
开发可假设项已经被设计或产品认可。
```

## 5. Skill 体系设计

### 5.1 第一版 skill 清单

第一版只建议创建两个 skill：

```txt
web-design
web-design-handoff-review
```

`web-design` 是设计阶段总控。

`web-design-handoff-review` 是核心审查 skill。

第一版不建议立即拆成：

```txt
web-design-breakpoint-review
web-design-state-review
web-design-token-review
web-design-asset-review
web-design-interaction-review
```

这些先作为 `web-design-handoff-review` 内部 checklist。等真实任务出现高频失败点后，再升级为独立子 skill。

### 5.2 推荐目录结构

```txt
~/.codex/skills/
  web-design/
    SKILL.md
    references/
      design-stage-gates.md
      designer-submission-guide.md

  web-design-handoff-review/
    SKILL.md
    references/
      handoff-checklist-template.md
      developer-input-requirements.md
      designer-fix-guide.md
      designer-q-and-a.md
```

### 5.3 `web-design` 职责

`web-design` 是设计阶段入口 skill。

它负责：

```txt
识别当前任务是否处于设计阶段
判断是否需要创建、整理或审查设计稿
指导设计师准备可开发交付物
调用或遵循 web-design-handoff-review
判断是否可以进入 build
```

它不负责：

```txt
写代码
替代设计师完成全部视觉设计
输出 check 阶段的 Adjustment Checklist
```

### 5.4 `web-design-handoff-review` 职责

`web-design-handoff-review` 只负责审查设计稿是否满足开发输入要求。

它回答：

```txt
这个设计稿能不能交给 build？
如果不能，缺什么？
缺失项应该由设计师补，还是可由开发合理假设？
```

它不回答：

```txt
这个设计美不美？
这个设计是否商业上最优？
这个页面代码应该怎么写？
实现后是否完全还原？
```

## 6. `web-design-handoff-review` Skill 设计

### 6.1 触发场景

当用户提出以下请求时触发：

```txt
检查这个设计稿能不能开发
审查 Figma 是否 ready for build
帮我看设计交付物缺什么
设计师提交了页面，判断是否能交给开发
检查这个 frame 是否满足开发输入要求
根据这个 checklist 看设计稿哪里不完整
```

### 6.2 输入

```txt
Figma 链接、frame、node、page
设计截图或导出图片
设计师提交说明
prototype 或需求说明
设计系统或品牌规范
目标代码库约束
```

### 6.3 输出

唯一正式输出是：

```txt
Design Handoff Checklist
```

建议格式：

```md
# Design Handoff Checklist

## Summary
Ready for build: Yes | Conditional | No
Reason: [一句话说明]

## Blocking Items

### DHR-001: [问题标题]
Severity: Blocker | High | Medium | Low
Area: Scope | Breakpoint | Structure | Component | State | Content | Token | Asset | Interaction | Accessibility | Constraint
Evidence: [Figma frame / screenshot / node / observed gap]
Expected for Build: [开发需要什么]
Actual: [当前设计稿缺什么]
Designer Instruction: [设计师应该怎么补]
Developer Assumption Allowed: Yes | No
Verification: [补完后如何确认]

## Developer-Allowed Assumptions
- [可由开发合理推导的事项]

## Designer Follow-Up
- [设计师下一步需要补的事项]

## Build Entry Notes
- [若可进入 build，传给 build 的范围、假设和风险]
```

### 6.4 严重级别

| 级别 | 含义 | 是否阻塞 build |
|---|---|---|
| Blocker | 缺失会导致开发无法开始或方向可能错误 | 是 |
| High | 会造成明显返工、交互错误或响应式错误 | 通常是 |
| Medium | 开发可继续，但需要明确假设或后续补充 | 否，需记录 |
| Low | 轻微不完整，不影响开发主路径 | 否 |

### 6.5 审查维度

| 维度 | 核心问题 | 阻塞示例 |
|---|---|---|
| Scope | 要开发什么是否明确 | 只有一个截图，没有说明页面范围 |
| Breakpoint | 响应式输入是否足够 | 只有 desktop，mobile 规则也无法推导 |
| Structure | 页面结构能否拆解 | 视觉层级混乱，区块边界不清 |
| Component | 组件和变体是否清楚 | card、tab、modal 变体缺失 |
| State | 状态是否完整 | 表单没有错误、加载、成功状态 |
| Content | 文案和数据是否可实现 | 列表没有示例数据或字段定义 |
| Token | 视觉规则是否可读取 | 颜色、字号、间距无法稳定提取 |
| Asset | 资产是否可获取 | 图片不可导出且无替代说明 |
| Interaction | 交互是否明确 | 点击按钮后去哪里不清楚 |
| Accessibility | 基础可访问性是否能推导 | icon-only button 无名称语义 |
| Constraint | 代码或业务约束是否被考虑 | 设计依赖代码库不支持的组件行为 |

### 6.6 审查流程

```txt
1. 确认设计源和提交范围。
2. 对照 prototype 检查页面和用户路径是否一致。
3. 清点 desktop / tablet / mobile / state frames。
4. 拆页面结构和重复组件。
5. 检查组件变体和真实网页状态。
6. 检查内容、数据、字段和文案。
7. 检查 token、资产和导出条件。
8. 检查交互、动效和边界状态。
9. 判断缺失项是否阻塞 build。
10. 输出 Design Handoff Checklist。
```

### 6.7 进入 build 的条件

最低条件：

```txt
1. 有明确设计源和开发范围。
2. 至少有主断点设计，缺失断点有明确推导规则。
3. 页面结构和主要组件可拆解。
4. 核心内容、资产和交互路径不缺失。
5. 关键状态已提供，或明确允许开发按常见网页行为推导。
6. 设计稿与 prototype 没有未解释的冲突。
7. 所有开发可假设项已记录。
```

不能进入 build 的典型情况：

```txt
没有明确 frame / 页面范围
只有静态视觉，没有核心交互说明
关键资产不可导出且无替代方案
desktop / mobile 差异无法推导
核心表单、购买、提交、弹窗流程缺状态
设计稿和 prototype 意图冲突
组件状态缺失会改变用户行为
```

## 7. 设计师如何使用

### 7.1 设计前

设计师开始设计前，应先拿到：

```txt
prototype 或需求说明
页面范围
目标用户路径
关键业务规则
目标代码库或设计系统约束
本轮交付 deadline 和范围边界
```

如果这些输入缺失，设计师应先补问题，而不是直接产出高保真画面。

### 7.2 设计中

设计师应按“开发可消费”的方式组织设计稿。

推荐 Figma 页面结构：

```txt
00 Cover / Handoff
01 Prototype Context
02 Ready for Build
03 Desktop
04 Mobile
05 States
06 Components
07 Assets
08 Archive
```

推荐 frame 命名：

```txt
[Ready] Home / Desktop / 1440
[Ready] Home / Mobile / 390
[State] Home / Search / Empty
[State] Home / Form / Error
[State] Product / Cart Drawer / Open
[Component] Product Card / Default
[Component] Product Card / Hover
```

设计师应避免：

```txt
Frame 叫“页面 1”“新版最终最终”
desktop 和 mobile 混在一起但不命名
把弹窗、hover、error 状态藏在画布角落
只给视觉稿，不说明交互
图片只贴 bitmap，但没有原始资产或导出标记
```

### 7.3 提交前自查

提交前，设计师至少自查：

```txt
我是否说明了本轮开发范围？
desktop 和 mobile 是否都有，或缺失端是否有推导规则？
核心页面状态是否齐全？
按钮、表单、弹窗、tab、carousel 是否有交互说明？
图片、icon、字体是否可导出？
文案和示例数据是否完整？
设计稿中哪些地方需要开发假设？
```

### 7.4 提交方式

推荐提交一段结构化说明，而不是只丢一个 Figma 链接。

模板：

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

### 7.5 审查后修改方式

设计师收到 `Design Handoff Checklist` 后，不应只回复“已修改”。建议按 checklist ID 修改并回复：

```md
## Handoff Fix Response

### DHR-001
Status: Fixed
Change: Added mobile frame `[Ready] Home / Mobile / 390`.
Verification: Frame is linked in the handoff page.

### DHR-002
Status: Fixed
Change: Added error and loading states for the newsletter form.
Verification: See `[State] Home / Newsletter / Error` and `[State] Home / Newsletter / Loading`.

### DHR-003
Status: Accepted Assumption
Decision: Developer may use existing project button hover style.
Owner: Design
```

## 8. 设计稿如何修改才能符合要求

### 8.1 范围不清楚

问题：

```txt
开发不知道要做哪个页面、哪个版本、哪些 frame。
```

修改方式：

```txt
在 Figma 增加 Handoff page。
列出 Ready for build 的 frame。
把废弃版本放到 Archive。
明确 in scope / out of scope。
```

### 8.2 缺少移动端或响应式规则

问题：

```txt
只有 desktop，开发无法判断 mobile 的重排、隐藏、折叠、顺序。
```

修改方式：

```txt
补 mobile frame。
如果不补 tablet，写明 tablet 继承 desktop 还是 mobile。
标注区块顺序、列数变化、图片裁切、导航折叠方式。
```

### 8.3 组件状态缺失

问题：

```txt
按钮、输入框、tab、弹窗只有默认态。
```

修改方式：

```txt
补 default、hover、focus、active、disabled、selected。
表单补 loading、success、error。
弹窗补 open、close、empty、overflow。
如果采用项目默认状态，明确写“使用现有组件默认状态”。
```

### 8.4 内容和数据不完整

问题：

```txt
卡片、列表、表格只有假文字，字段含义不明。
```

修改方式：

```txt
补最终文案或占位规则。
给列表最少 3 条示例数据。
说明字段来源、最大长度、空值表现。
标注哪些内容来自 CMS / API / 静态配置。
```

### 8.5 token 难以映射

问题：

```txt
颜色、字号、间距看起来随意，和现有设计系统不一致。
```

修改方式：

```txt
使用设计系统变量。
标注新增 token 的原因。
把 raw value 和 token name 对齐。
避免相邻模块出现 23px、25px、27px 这类无规则间距。
```

### 8.6 资产不可开发

问题：

```txt
图片不可导出，icon 是截图，字体缺失授权。
```

修改方式：

```txt
把需要导出的图层标记 export。
icon 使用 vector 或组件。
图片说明比例、裁切、焦点和移动端裁切方式。
字体说明名称、来源、授权和 fallback。
```

### 8.7 交互不明确

问题：

```txt
点击按钮之后发生什么不清楚。
```

修改方式：

```txt
给每个核心操作标注结果。
说明跳转目标、打开弹窗、提交成功、提交失败、校验规则。
动效只标注必要信息：方向、时长、触发、结束状态、reduced-motion fallback。
```

### 8.8 设计与 prototype 冲突

问题：

```txt
prototype 里有某个步骤，设计稿删掉了；或设计稿新增了 prototype 没有的流程。
```

修改方式：

```txt
在 Handoff page 说明差异。
标注产品或设计决策来源。
如果未确认，列为 open question，不进入 build。
```

## 9. 设计师 Q&A

### Q1：我只提交 Figma 链接可以吗？

不推荐。Figma 链接只是设计源，不是完整交付说明。

至少应同时提交：

```txt
要开发的 frame
本轮范围
断点说明
状态说明
资产说明
开发可假设项
```

### Q2：我必须画 desktop、tablet、mobile 三套吗？

不一定。

最低建议：

```txt
desktop + mobile
```

tablet 可以用规则说明：

```txt
768-1023 采用两列布局
导航沿用 mobile drawer
图片比例沿用 desktop，但容器宽度自适应
```

如果 tablet 体验有明显差异，就需要补 tablet frame。

### Q3：每个 hover / focus 都要画出来吗？

不一定。

如果使用现有代码组件或设计系统默认状态，可以写：

```txt
Buttons use existing project default hover/focus/disabled styles.
```

但自定义控件、关键 CTA、表单、tab、carousel、modal 等，必须明确状态。

### Q4：loading、empty、error 状态一定要设计吗？

如果用户会遇到，就必须说明。

可以有三种处理：

```txt
画出状态
引用现有组件默认状态
明确允许开发按项目通用模式实现
```

不能完全不提。

### Q5：文案还没最终确认怎么办？

可以提交，但要标注：

```txt
哪些是 final copy
哪些是 placeholder
最长字符预期
是否会多语言
```

如果文案长度会影响布局，必须提供最大长度或边界示例。

### Q6：图片还没最终素材怎么办？

可以提交占位图，但要说明：

```txt
目标比例
焦点位置
裁切规则
最终素材负责人
是否允许开发使用占位图
```

如果图片是核心视觉且影响布局，缺失最终素材通常是 High 或 Blocker。

### Q7：设计稿里的颜色和现有系统不同，可以直接提交吗？

可以，但必须说明：

```txt
这是新增 token
这是一次性局部值
这是设计系统升级
```

否则开发应优先映射到现有 token，可能导致视觉和设计稿不同。

### Q8：我需要在 Figma 里写很多注释吗？

只写开发必须知道的内容。

好注释：

```txt
Mobile: cards become 1 column, image ratio 4:3.
Submit error: keep input value and show inline error.
Use existing ProductCard component, add compact variant.
```

差注释：

```txt
这里要高级一点。
注意氛围感。
这个地方开发自己看着办。
```

### Q9：设计稿通过审查后还能改吗？

可以，但要重新审查变更范围。

小改：

```txt
文案、局部间距、图片替换
```

通常只需增量审查。

大改：

```txt
页面结构、核心交互、组件状态、响应式规则
```

需要重新跑 `web-design-handoff-review`。

### Q10：如果审查结果是 Conditional，可以进入开发吗？

可以，但必须满足：

```txt
所有 Blocker 已解决
剩余问题都有 Developer-Allowed Assumptions
假设不会改变核心产品行为
build 阶段能明确消费这些假设
```

### Q11：设计师如何知道自己已经符合要求？

提交前看这 5 个问题：

```txt
开发知道做哪些页面吗？
开发知道每个断点怎么布局吗？
开发知道每个核心控件有什么状态吗？
开发拿得到所有资产吗？
开发知道点击之后发生什么吗？
```

五个都能回答，通常就接近 ready。

### Q12：开发能不能自己补状态？

能，但只能补“项目已有默认模式”或“常见网页行为”。

例如：

```txt
按钮 hover 用项目默认样式
输入框 focus 用现有表单组件样式
空列表用项目通用 EmptyState
```

不能由开发擅自补：

```txt
结账失败逻辑
权限状态
关键弹窗内容
移动端导航结构
复杂动效规则
```

## 10. 交付模板

### 10.1 设计师提交模板

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

### 10.2 审查输出模板

```md
# Design Handoff Checklist

## Summary
Ready for build: Yes | Conditional | No
Reason:

## Blocking Items

### DHR-001:
Severity:
Area:
Evidence:
Expected for Build:
Actual:
Designer Instruction:
Developer Assumption Allowed:
Verification:

## Developer-Allowed Assumptions
- 

## Designer Follow-Up
- 

## Build Entry Notes
- 
```

### 10.3 设计师修复回复模板

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

## 11. 与现有 skills 的关系

### 11.1 与 `prototype`

`prototype` 负责产品意图，设计阶段不应重写需求。

如果设计稿和 prototype 冲突，`web-design-handoff-review` 应标出：

```txt
Prototype Conflict
```

并要求产品或设计确认。

### 11.2 与 `figma-web-build`

`figma-web-build` 消费通过审查的设计稿。

`web-design-handoff-review` 应给 build 提供：

```txt
可开发 frame
开发范围
允许假设
风险项
需要优先关注的状态 / 资产 / 响应式规则
```

### 11.3 与 `check`

`check` 检查代码实现结果。

`web-design-handoff-review` 检查设计交付物。

两者不互相替代。

### 11.4 与 `retro`

如果开发或测试阶段发现问题来自设计交付缺失，`retro` 应回流到：

```txt
web-design-handoff-review
```

例如：

```txt
开发阶段发现 mobile 没有图片裁切规则
  -> 升级 designer-fix-guide 或拆 web-design-asset-review

check 阶段发现表单错误状态缺失
  -> 升级 handoff checklist 的 State 维度
```

## 12. 风险与缓解

| 风险 | 表现 | 缓解 |
|---|---|---|
| 审查变成审美评审 | 输出“设计不够好看” | 严格限制为开发输入完整性 |
| checklist 过重 | 小改也要求完整提交 | 区分轻量、标准、严格模式 |
| 设计师负担过大 | 为每个状态画大量 frame | 允许引用设计系统默认状态 |
| build 仍然猜测 | Conditional 没写清假设 | 强制输出 Developer-Allowed Assumptions |
| 与 check 重叠 | 设计审查开始检查代码 | 明确 design 阶段只看设计稿 |
| 微 skill 过早膨胀 | 一次创建十几个审查 skill | 第一版只保留总控 + handoff review |
| Figma 无权限 | agent 无法读取设计源 | 允许截图 fallback，但标记缺失信息 |
| 设计系统不一致 | token 映射混乱 | 要求设计师说明新增 token 或使用现有 token |

## 13. 落地路线图

### Phase 0：方案确认

产物：

```txt
本文档
```

目标：

```txt
确认 design 阶段位置、handoff review 职责、设计师提交格式。
```

### Phase 1：创建 MVP skills

产物：

```txt
web-design
web-design-handoff-review
```

references：

```txt
design-stage-gates.md
designer-submission-guide.md
handoff-checklist-template.md
developer-input-requirements.md
designer-fix-guide.md
designer-q-and-a.md
```

目标：

```txt
能对真实设计稿输出 Design Handoff Checklist。
```

### Phase 2：真实任务试运行

场景：

```txt
1. 只有 desktop 设计稿，判断是否可进入 build。
2. desktop + mobile 设计稿，检查状态和资产是否完整。
3. 表单页面，检查 loading / error / success。
4. 电商详情页，检查图片裁切、variant、库存、购物车状态。
5. Figma 无法访问，只能用截图和设计师说明审查。
```

目标：

```txt
识别 checklist 是否过重、过轻或缺关键项。
```

### Phase 3：拆出高频子 skill

候选：

```txt
web-design-breakpoint-review
web-design-state-review
web-design-asset-review
web-design-token-review
web-design-interaction-review
```

升级条件：

```txt
同类问题出现 3 次以上
造成开发返工
输入输出稳定
可以独立验证
需要更详细 reference 或脚本
```

## 14. 推荐决策

推荐采用：

```txt
prototype
  -> design
      -> web-design
      -> web-design-handoff-review
  -> build
      -> figma-web-build
  -> check
  -> retro
```

第一版只落地：

```txt
web-design
web-design-handoff-review
```

原因：

1. 它补齐了 `prototype` 和 `build` 之间最关键的缺口。
2. 它让设计师知道如何提交、如何修改、如何判断 ready。
3. 它让开发阶段减少猜测，把不完整设计挡在 build 之前。
4. 它保留了渐进演进空间，不会一开始就拆成过多微 skill。
5. 它和现有 `figma-web-build` 方案自然衔接。

## 15. Phase 1 落地结果

本方案的 Phase 1 已按推荐目录落地到：

```txt
~/.codex/skills/
```

### 15.1 已创建的 MVP skills

```txt
web-design
web-design-handoff-review
```

每个 skill 都已包含：

```txt
SKILL.md
agents/openai.yaml
references/
```

### 15.2 已创建的 references

```txt
web-design/references/design-stage-gates.md
web-design/references/designer-submission-guide.md
web-design-handoff-review/references/handoff-checklist-template.md
web-design-handoff-review/references/developer-input-requirements.md
web-design-handoff-review/references/designer-fix-guide.md
web-design-handoff-review/references/designer-q-and-a.md
```

### 15.3 当前边界

Phase 1 没有创建以下微 skill：

```txt
web-design-breakpoint-review
web-design-state-review
web-design-asset-review
web-design-token-review
web-design-interaction-review
```

这些仍作为 Phase 3 候选。只有真实任务中反复出现、造成返工、输入输出稳定并可独立验证时，才升级为独立 skill。

### 15.4 完成判定

本方案现在满足 Phase 1 完成条件：

```txt
1. design 阶段入口 skill 已创建。
2. handoff review 审查 skill 已创建。
3. 设计师提交、设计阶段闸门、开发输入要求、审查输出、修改指引和 Q&A 已拆入 references。
4. 审查 skill 明确只输出 Design Handoff Checklist。
5. 可与 figma-web-build 的开发阶段入口衔接。
```
