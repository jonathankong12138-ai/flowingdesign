# Figma 设计图网页开发 Skill 体系方案

状态：MVP 已落地  
适用范围：Codex Web Design 流程中的开发阶段  
目标读者：维护 `prototype`、`build`、`check`、`retro` 以及 Figma 到网页开发相关 skill 的设计者和执行者  
最后更新：2026-06-29

## 1. 背景

当前 Web Design 流程已经包含四个主阶段：

```txt
需求 / prototype
  -> 开发 / build
  -> 测试 / check
  -> 复盘 / retro
```

其中 `build` 是开发阶段的总 skill，负责把已确认的产品意图或原型实现为代码。现在希望补充一种更专门的开发路径：

```txt
根据 Figma / 设计图进行网页开发
```

这类任务和普通开发不同。它不仅要写代码，还要把设计稿中的结构、token、资产、响应式断点、交互状态、视觉细节转译为真实浏览器里的页面。因此，如果只把所有规则塞进一个巨大的 `build` skill，会带来三个问题：

1. 触发范围过宽，难以稳定复用。
2. 上下文膨胀，执行成本高。
3. 后续复盘时，很难定位到底是设计分析、代码映射、响应式、视觉还原还是验证环节出了问题。

本方案采用金字塔拆分：先拆开发流程的大环节，再在每个环节下定义子动作；第一版只落地少量环节 skill，把更细的子动作放在 checklist 或 references 中，等真实任务验证后再升级为独立子 skill。

## 2. 网络调研结论

本方案参考了公开资料中关于 skill 设计、技术方案文档、Figma 开发交接和浏览器验证的常见做法。

主要结论如下：

1. Skill 应该短小、结构清晰，并通过真实任务测试。Anthropic 的 skill authoring best practices 强调：好的 skill 要 concise、well-structured、tested with real usage，并使用 progressive disclosure 控制上下文成本。[Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
2. Skill 适合承载可复用的工作方式，但也要注意安全和维护成本。Anthropic 工程文章建议在真实任务中迭代 skill，并关注 skill 中脚本、依赖、网络访问等安全风险。[Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
3. Figma Dev Mode 的核心价值是 inspect、ready-for-dev、变量、资产导出和设计到代码信息。Figma 文档说明 Dev Mode 用于开发者检查和导航设计，并可查看 ready for development 内容。[Guide to Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)
4. Figma 变量和资产需要被明确纳入开发流程。Figma Dev Mode 支持查看变量详情、alias 链、模式和值，也支持从 Inspect 中导出资产。[Variables in Dev Mode](https://help.figma.com/hc/en-us/articles/27882809912471-Variables-in-Dev-Mode)、[Guide to inspecting](https://help.figma.com/hc/en-us/articles/22012921621015-Guide-to-inspecting)
5. 视觉还原不能只靠主观判断。Playwright 支持截图、视觉对比和 full-page screenshot，适合作为浏览器验证和视觉回归的技术基础。[Visual comparisons](https://playwright.dev/docs/test-snapshots)、[Screenshots](https://playwright.dev/docs/screenshots)
6. 方案文档应明确范围、非目标、风险和缓解计划。Atlassian 对软件设计文档和实施计划的说明都强调目标、组件、依赖、风险与缓解。[Software Design Document](https://www.atlassian.com/work-management/knowledge-sharing/documentation/software-design-document)、[Implementation Plan](https://www.atlassian.com/work-management/strategic-planning/implementation-plan)
7. 技术文档要先定义 scope 和 non-scope。Google 技术写作指南建议文档开头明确范围和非范围，避免读者误解。[Technical Writing: Documents](https://developers.google.com/tech-writing/one/documents)

## 3. 目标与非目标

### 3.1 目标

1. 为“根据 Figma / 设计图开发网页”建立可执行、可演进的 skill 体系。
2. 保持和现有 `prototype`、`build`、`check`、`retro` 四阶段流程兼容。
3. 用金字塔方式拆分流程，避免第一版拆成过多微 skill。
4. 明确每个环节 skill 的输入、输出、闸门、风险和验证方式。
5. 为后续真正创建或升级 skill 提供直接依据。

### 3.2 非目标

1. 不在本文中直接创建所有 skill 文件。
2. 不替代现有 `build` skill；本方案是 `build` 阶段下的 Figma 专用开发路径。
3. 不替代 `check` skill；开发阶段可以自检，但独立验收仍由 `check` 完成。
4. 不要求第一版覆盖所有 Figma 高级能力，如复杂 motion、变量模式矩阵、设计系统 Code Connect 全量同步。
5. 不把每个子动作都立即拆成独立 skill。

## 4. 设计原则

### 4.1 先环节，后子动作

先把流程拆为 8 个稳定环节 skill，再把每个环节下的子动作作为 checklist。只有当某个子动作高频、易错、可独立验证时，再升级为独立子 skill。

### 4.2 总控轻，环节实

`figma-web-build` 只负责调度流程、判断入口和管理闸门，不承载大量具体规则。具体工作由环节 skill 完成。

### 4.3 输出可被下一环节消费

每个环节的输出必须是结构化的、可用于下一步的。例如设计稿分析输出 frame 清单、结构树、token 草表、资产清单，而不是泛泛的设计感受。

### 4.4 先复用项目约定，再新增实现

从 Figma 读出的 token、组件和资产，必须先映射到现有代码库约定。只有现有系统确实缺失时，才新增 token、组件或样式规则。

### 4.5 视觉还原必须浏览器验证

视觉还原不以“代码看起来对”为准，而以真实浏览器截图、DOM 尺寸、computed style、console 状态和交互结果为准。

### 4.6 `check` 保持独立

开发阶段可以执行浏览器验证和自检，但不输出测试阶段的 adjustment checklist。`check` 仍然是独立验收环节。

## 5. 金字塔拆分

### 5.1 顶层能力

```txt
figma-web-build
根据 Figma / 设计图完成网页开发
```

### 5.2 一级环节

```txt
1. 设计稿分析
2. 代码库分析
3. 设计到代码映射
4. 基础与组件实现
5. 交互与状态实现
6. 响应式与视觉还原
7. 浏览器验证
8. 测试与质量收尾
```

### 5.3 第一版建议落地的 8 个环节 skill

```txt
figma-web-build
figma-web-design-analysis
figma-web-repo-analysis
figma-web-implementation-map
figma-web-code-implementation
figma-web-interaction-states
figma-web-visual-alignment
figma-web-browser-verification
figma-web-quality-finish
```

说明：`figma-web-build` 是总控，其余 8 个是环节 skill。第一版不建议继续拆成 30 个以上微 skill。

## 6. 总控 Skill：`figma-web-build`

### 6.1 职责

`figma-web-build` 是 Figma 到网页开发的入口 skill。它识别当前任务是否属于 Figma / 设计图开发，并按需调用或遵循下游环节 skill。

### 6.2 触发场景

当用户提出以下请求时触发：

```txt
根据 Figma 实现网页
根据设计稿开发页面
把这个 Figma frame 写成 React 页面
按截图还原页面
根据设计图修改现有页面
把 desktop/mobile 设计稿实现为响应式网页
```

### 6.3 执行顺序

```txt
figma-web-design-analysis
  -> figma-web-repo-analysis
  -> figma-web-implementation-map
  -> figma-web-code-implementation
  -> figma-web-interaction-states
  -> figma-web-visual-alignment
  -> figma-web-browser-verification
  -> figma-web-quality-finish
```

### 6.4 总控闸门

| 闸门 | 进入条件 | 阻塞处理 |
|---|---|---|
| 设计源闸门 | 已确认 Figma 链接、截图、图片或 frame 范围 | 无法访问 Figma 时使用用户提供截图；没有截图时请求设计源 |
| 代码入口闸门 | 已找到页面入口、路由或要新增的位置 | 无法判断落点时先扫描 repo；仍不明确则询问用户 |
| 映射闸门 | 已知道设计模块如何映射到代码组件 | 不明确时先做最小组件映射 |
| 视觉闸门 | 页面可在浏览器运行并截图 | dev server 启动失败时先修运行环境 |
| 收尾闸门 | 已运行可用的 lint、typecheck、build、test 或说明无法运行原因 | 失败时先定位是否属于本次改动 |

## 7. 环节 Skill 设计

### 7.1 `figma-web-design-analysis`

目标：把 Figma / 设计图读成可开发的结构。

输入：

```txt
Figma 链接
Figma frame / node
设计截图或图片
用户指定页面范围
prototype 中的行为说明
```

内部子动作：

| 子动作 | 说明 | 第一版形式 |
|---|---|---|
| 明确设计源 | 确认使用 Figma、截图还是图片作为基准 | checklist |
| frame 清点 | 识别页面、断点、状态、弹窗、组件变体 | checklist |
| 结构拆解 | 拆出页面层级、区块、导航、列表、卡片、表单 | checklist |
| 内容读取 | 提取标题、正文、按钮、表单字段、标签和示例数据 | checklist |
| token 读取 | 提取颜色、字体、字号、行高、间距、圆角、阴影、边框 | checklist，后续可独立 |
| 资产读取 | 识别图片、logo、icon、背景、字体资源 | checklist，后续可独立 |
| 交互读取 | 识别 hover、focus、tab、modal、loading、error、motion | checklist |

输出格式：

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

进入下一步的条件：

1. 至少有一个明确的设计源。
2. 已知道要实现哪个页面或页面区域。
3. 已识别主要结构和关键视觉约束。

适合未来独立拆分的子 skill：

```txt
figma-web-token-reading
figma-web-asset-reading
figma-web-interaction-reading
```

### 7.2 `figma-web-repo-analysis`

目标：理解现有项目如何组织，避免 Figma 实现破坏代码风格。

输入：

```txt
当前仓库
用户指定文件或页面
设计分析输出
```

内部子动作：

| 子动作 | 说明 | 第一版形式 |
|---|---|---|
| 技术栈扫描 | 识别框架、包管理器、构建工具、语言 | checklist |
| 路由扫描 | 找页面入口、layout、route、template | checklist |
| 组件扫描 | 找已有组件、UI 库、设计系统、复用模式 | checklist |
| 样式扫描 | 找 Tailwind、CSS modules、SCSS、theme、CSS variables | checklist |
| 资源扫描 | 找图片、字体、icon、静态资源管理方式 | checklist |
| 命令扫描 | 找 dev、build、lint、typecheck、test 命令 | checklist |

输出格式：

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

进入下一步的条件：

1. 已找到合理的实现位置。
2. 已知道样式和资源应该如何落地。
3. 已知道至少一个可运行或可验证命令。

适合未来独立拆分的子 skill：

```txt
figma-web-component-scout
figma-web-style-scout
figma-web-command-scout
```

### 7.3 `figma-web-implementation-map`

目标：把设计稿中的对象映射到代码实现策略。

输入：

```txt
设计分析输出
代码库分析输出
prototype 行为说明
```

内部子动作：

| 子动作 | 说明 | 第一版形式 |
|---|---|---|
| 页面映射 | Figma 页面映射到 route、page、layout、section | checklist |
| 组件映射 | 设计模块映射到已有组件或新组件 | checklist |
| token 映射 | Figma token 映射到 theme / variables / utility class | checklist |
| 资产映射 | 决定导出、复用、替代、压缩、路径 | checklist |
| 响应式映射 | 定义 desktop、tablet、mobile 的布局变化 | checklist |
| 切片映射 | 按可见用户路径决定实现顺序 | checklist |

输出格式：

```txt
Route Mapping:
Component Mapping:
Token Mapping:
Asset Mapping:
Responsive Strategy:
Implementation Slices:
Assumptions:
```

进入下一步的条件：

1. 已知道本轮实现的最小垂直切片。
2. 已知道哪些组件复用、哪些组件新增。
3. 已记录关键假设。

适合未来独立拆分的子 skill：

```txt
figma-web-component-map
figma-web-responsive-map
figma-web-slice-map
```

### 7.4 `figma-web-code-implementation`

目标：完成基础代码、布局和组件实现。

输入：

```txt
implementation map
现有代码库
设计源或截图
```

内部子动作：

| 子动作 | 说明 | 第一版形式 |
|---|---|---|
| token 实现 | 落地颜色、字体、spacing、radius、shadow | checklist |
| 资产实现 | 放置图片、icon、字体、背景资源并接入引用 | checklist |
| route 实现 | 创建或更新页面入口、路由和 layout | checklist |
| 布局基础 | 实现容器、grid、section、主视觉结构 | checklist |
| 组件实现 | 实现卡片、列表、表格、按钮、表单、导航 | checklist |
| 内容实现 | 填入文案、标签、按钮文字、mock 数据 | checklist |
| 数据绑定 | 接入已有数据、mock、API 状态或 store | checklist |

输出：

```txt
代码变更
资源变更
新增或更新的组件
已实现的页面路径
```

进入下一步的条件：

1. 页面能在本地渲染，或至少代码能通过静态检查。
2. 主结构和核心组件已经落地。
3. 未完成部分已经记录为显式 TODO 或下一阶段处理项。

第一版不建议继续拆细。它是实际写代码的主 skill。

### 7.5 `figma-web-interaction-states`

目标：补齐设计图中静态画面之外的真实网页状态和交互。

输入：

```txt
已实现页面
设计分析中的 interaction / states
prototype 行为说明
```

内部子动作：

| 子动作 | 说明 | 第一版形式 |
|---|---|---|
| 控件状态 | hover、focus、active、disabled | checklist |
| 加载与错误 | loading、empty、error、permission denied | checklist |
| 浮层交互 | modal、drawer、popover、toast | checklist |
| 切换组件 | tabs、carousel、stepper、segmented control | checklist |
| 表单行为 | 输入、校验、提交、成功、失败 | checklist |
| motion | 必要动效和 reduced-motion fallback | checklist |

输出：

```txt
交互代码
状态代码
可手动验证的交互路径
```

进入下一步的条件：

1. 所有核心交互路径可操作。
2. 关键控件具备基本 keyboard / focus 行为。
3. 静态设计中不可见但用户会遇到的状态有合理表现。

适合未来独立拆分的子 skill：

```txt
figma-web-form-interaction
figma-web-tabs-carousel
figma-web-motion
```

### 7.6 `figma-web-visual-alignment`

目标：根据 Figma / 截图修正真实浏览器中的视觉还原。

输入：

```txt
已运行页面 URL
Figma frame 或基准截图
设计 token 和结构分析
```

内部子动作：

| 子动作 | 说明 | 第一版形式 |
|---|---|---|
| desktop 对齐 | 修正桌面端布局、间距、字体、层级 | checklist |
| mobile 对齐 | 修正移动端布局、换行、触控尺寸、折叠规则 | checklist，后续可独立 |
| tablet 对齐 | 修正中间断点和布局过渡 | checklist |
| typography 对齐 | 修正字号、行高、字重、宽度、换行 | checklist，后续可独立 |
| spacing 对齐 | 修正 padding、gap、section 高度、卡片密度 | checklist，后续可独立 |
| media fit | 修正图片、视频、背景图比例、裁切、位置 | checklist，后续可独立 |
| overflow 修正 | 修正横向滚动、重叠、遮挡、按钮文本溢出 | checklist |

输出：

```txt
视觉修正代码
截图或测量证据
仍未完全还原的差异
```

进入下一步的条件：

1. 关键 viewport 已通过目视和测量验证。
2. 没有明显横向滚动、文字溢出或元素重叠。
3. 修 mobile 没有破坏 desktop，修 desktop 没有破坏 mobile。

适合未来优先独立拆分的子 skill：

```txt
figma-web-mobile-align
figma-web-media-fit
figma-web-typography-align
figma-web-spacing-align
```

### 7.7 `figma-web-browser-verification`

目标：用真实浏览器验证页面运行结果。

输入：

```txt
本地 dev server
页面 URL
设计基准
已实现代码
```

内部子动作：

| 子动作 | 说明 | 第一版形式 |
|---|---|---|
| dev server | 启动或复用本地服务，处理端口 | checklist |
| screenshot | 截取 desktop、mobile、tablet、wide desktop | checklist |
| DOM measure | 测量关键元素尺寸、间距、overflow、computed style | checklist |
| console check | 检查 console error、runtime crash、network error | checklist |
| interaction check | 点击、输入、滚动、切换、导航验证 | checklist |
| responsive check | 验证不同断点下内容完整性 | checklist |

输出：

```txt
本地 URL
截图路径
console / runtime 结果
交互验证结果
发现的问题与修复状态
```

进入下一步的条件：

1. 页面能在浏览器打开。
2. 核心 viewport 已截图或说明无法截图原因。
3. console 无阻断型错误。
4. 核心交互路径已经验证。

适合未来独立拆分的子 skill：

```txt
figma-web-dom-measure
figma-web-screenshot-check
figma-web-overflow-check
```

### 7.8 `figma-web-quality-finish`

目标：完成开发阶段收尾，使结果能交给 `check` 独立验收。

输入：

```txt
已实现页面
浏览器验证结果
代码库可用命令
```

内部子动作：

| 子动作 | 说明 | 第一版形式 |
|---|---|---|
| a11y pass | 检查语义、焦点、label、aria、对比度 | checklist |
| test pass | 运行或补充最小有用测试 | checklist |
| build pass | 运行 build、typecheck、lint | checklist |
| performance pass | 检查大图、长列表、动画、首屏风险 | checklist |
| cleanup | 清理临时代码、无用资源、重复样式 | checklist |
| final summary | 准备最终开发说明 | checklist |

输出：

```txt
验证命令结果
最终代码整理
剩余风险说明
给用户的简短交付摘要
```

进入 `check` 的条件：

1. 已运行可用验证命令，或清楚说明无法运行原因。
2. 代码中没有明显临时调试内容。
3. 重大视觉或运行问题已修复，剩余问题可由 `check` 进一步发现。

## 8. 第一版落地策略

### 8.1 不一次性创建所有微 skill

第一版只创建或升级以下 skill：

```txt
figma-web-build
figma-web-design-analysis
figma-web-repo-analysis
figma-web-implementation-map
figma-web-code-implementation
figma-web-interaction-states
figma-web-visual-alignment
figma-web-browser-verification
figma-web-quality-finish
```

子动作先写入对应 `SKILL.md` 的 checklist 或 references。真实任务跑过 3-5 轮后，再从高频失败点中拆出微 skill。

### 8.2 成熟度分级

| 等级 | 形态 | 适用条件 |
|---|---|---|
| L0 | 普通 checklist | 低频、简单、模型容易自然完成 |
| L1 | 环节 skill 内部规则 | 高频，但还不需要独立触发 |
| L2 | 独立子 skill | 高频、易错、可独立验证 |
| L3 | 独立子 skill + scripts | 需要稳定测量、导出、截图、diff、解析 |
| L4 | 独立子 skill + references + examples | 涉及复杂领域规则，如响应式、设计系统、motion |

### 8.3 子 skill 升级条件

某个子动作满足以下任意 3 条，就可以考虑升级为独立 skill：

```txt
1. 连续多次任务中出现。
2. 容易导致返工或用户纠正。
3. 有稳定输入和输出。
4. 可以独立验证。
5. 被多个环节复用。
6. 需要专门脚本或参考资料。
```

优先升级候选：

```txt
figma-web-mobile-align
figma-web-media-fit
figma-web-token-reading
figma-web-dom-measure
figma-web-overflow-check
```

## 9. 可用性保障

### 9.1 每个 skill 必须有输入输出契约

每个环节 skill 的 `SKILL.md` 必须包含：

```txt
Purpose
Inputs
Workflow
Output Contract
Stage Gates
Stop Conditions
Validation
```

这样可以避免 skill 只是一段宽泛建议。

### 9.2 总控只做调度

`figma-web-build` 只需要知道：

```txt
当前任务是否属于 Figma / 设计图开发
当前处在哪个环节
下一步应该进入哪个环节
是否满足进入下一环节的条件
最终是否交付代码和验证结果
```

它不应该包含大量 CSS、React、Figma token 或 Playwright 细节。

### 9.3 真实任务验证

每个环节 skill 至少用以下场景验证：

```txt
1. 只有 desktop 设计图，实现响应式网页。
2. desktop + mobile 两张图，实现同一页面。
3. 已有 React 页面，根据 Figma 修改 UI。
4. 根据视觉 QA 截图修复 spacing / typography / media fit。
5. Figma 不可访问，只能用截图作为基准。
```

### 9.4 失败回流到 `retro`

当 `check` 或用户反馈发现问题时，`retro` 不应泛泛升级整个 `build`。它应该定位失败环节：

```txt
token 误读 -> 升级 figma-web-design-analysis 或拆 figma-web-token-reading
mobile 破坏 desktop -> 升级 figma-web-visual-alignment 或拆 figma-web-mobile-align
图片裁切错误 -> 拆 figma-web-media-fit
没有真实浏览器验证 -> 升级 figma-web-browser-verification
```

### 9.5 用证据替代主观判断

视觉和运行质量要尽量使用：

```txt
截图路径
viewport 尺寸
DOM bounding box
computed style
console 输出
network 状态
验证命令结果
```

## 10. 风险登记表

| ID | 风险 | 表现 | 影响 | 缓解方案 | 验证方式 |
|---|---|---|---|---|---|
| R01 | 拆分过细导致不可用 | agent 不知道触发哪个 skill，流程变慢 | 高 | 第一版只保留 8 个环节 skill，子动作先 checklist 化 | 跑真实任务时观察触发是否稳定 |
| R02 | 职责重叠 | `visual-alignment` 和 `browser-verification` 都在检查截图 | 中 | 明确前者负责修视觉，后者负责验证证据 | 检查输出是否重复 |
| R03 | 上下文膨胀 | 每个 skill 加载大量细节 | 高 | SKILL.md 保持短，细节放 references，按需读取 | 统计 SKILL.md 行数和加载路径 |
| R04 | Figma 无法访问 | 权限不足、链接失效、无 Dev Mode | 高 | 使用截图或导出图片作为基准；缺失关键源时请求用户补充 | 设计源闸门 |
| R05 | 设计状态缺失 | 没有 hover、loading、error、empty | 中 | 从常见网页状态推导并记录假设 | interaction states 检查 |
| R06 | token 误读 | 颜色、字号、间距和项目系统冲突 | 高 | 先映射现有 token，再新增；记录 raw value 和 mapped token | token mapping 检查 |
| R07 | 资产处理失败 | 图片导不出、icon 不一致、字体缺失 | 中 | 定义导出、替代、复用、生成、压缩策略 | asset mapping 和浏览器截图 |
| R08 | 实现偏离项目风格 | 新代码和现有架构割裂 | 高 | `repo-analysis` 必须先于实现 | code review 或 repo pattern 对照 |
| R09 | 响应式回归 | 修 mobile 破坏 desktop | 高 | 每次视觉修正后至少验证受影响断点和一个相邻断点 | viewport 截图 |
| R10 | 视觉还原主观化 | “看起来差不多”但关键尺寸错误 | 中 | 使用 DOM 测量和 computed style 记录关键约束 | browser verification 输出 |
| R11 | 开发自检替代独立测试 | `build` 自己宣布完全通过 | 中 | `check` 保持独立，只由测试阶段输出 adjustment checklist | 流程检查 |
| R12 | skill 后期维护困难 | 每次 retro 都往大 skill 塞规则 | 高 | retro 只升级明确失败点；高频失败再拆微 skill | skill diff 审查 |
| R13 | 过度工程化 | 简单页面也跑完整重流程 | 中 | 总控按风险选择轻量路径、标准路径、严格路径 | 执行时长和步骤数量 |
| R14 | 安全风险 | skill 脚本或资源执行未知操作 | 高 | 只使用可信来源；脚本可读、可审计，不做意外网络或破坏性操作 | 脚本审查 |
| R15 | 验证环境不稳定 | 视觉 diff 因浏览器或系统差异波动 | 中 | 固定 viewport、浏览器、字体、测试数据；动态元素降噪 | Playwright 配置检查 |

## 11. 执行模式

### 11.1 轻量模式

适用：

```txt
小页面
单张截图
无复杂交互
无现有设计系统
```

执行：

```txt
design-analysis
repo-analysis
code-implementation
browser-verification
quality-finish
```

跳过：

```txt
implementation-map 可合并到 code-implementation
interaction-states 只做基础 hover/focus
visual-alignment 只做一次桌面和移动检查
```

### 11.2 标准模式

适用：

```txt
常规 Figma 页面开发
有 desktop/mobile
有多个组件和少量交互
```

执行完整 8 环节。

### 11.3 严格模式

适用：

```txt
核心商业页面
复杂响应式
高视觉还原要求
涉及设计系统
用户明确要求像素级对齐
```

额外要求：

```txt
保留基准截图
记录关键 DOM 测量
多断点截图
必要时建立 Playwright screenshot baseline
更严格 a11y / performance 检查
```

## 12. 与现有四阶段流程的关系

```txt
prototype
  负责把需求变成可开发的交互原型。

build
  负责开发阶段。figma-web-build 是 build 内部的一条专用路径。

check
  负责独立验收，输出 adjustment checklist。

retro
  负责把失败经验回写到 prototype / build / check / retro / figma-web-* skills。
```

关键边界：

```txt
figma-web-browser-verification 可以发现并修复问题，但不输出 check 阶段的 checklist。
figma-web-quality-finish 可以总结验证结果，但不宣布替代独立测试。
retro 升级 skill 时必须绑定具体失败证据。
```

## 13. 推荐目录结构

如果后续创建这些 skill，建议放在：

```txt
~/.codex/skills/
  figma-web-build/
    SKILL.md
    references/
      pipeline.md
      stage-gates.md

  figma-web-design-analysis/
    SKILL.md
    references/
      design-analysis-template.md

  figma-web-repo-analysis/
    SKILL.md
    references/
      repo-scan-patterns.md

  figma-web-implementation-map/
    SKILL.md
    references/
      mapping-template.md

  figma-web-code-implementation/
    SKILL.md

  figma-web-interaction-states/
    SKILL.md
    references/
      interaction-state-checklist.md

  figma-web-visual-alignment/
    SKILL.md
    references/
      visual-alignment-ledger.md

  figma-web-browser-verification/
    SKILL.md
    scripts/
      capture-viewports.mjs
    references/
      browser-verification-template.md

  figma-web-quality-finish/
    SKILL.md
    references/
      quality-finish-checklist.md
```

说明：

1. 第一版只有 `browser-verification` 可能需要脚本。
2. 其他 references 先保持短小，避免创建一堆无法维护的资料。
3. 如果某个 reference 超过 100 行，应该在开头加目录。

## 14. Skill 模板建议

每个环节 skill 的 `SKILL.md` 建议采用同一骨架：

```md
---
name: figma-web-design-analysis
description: Analyze Figma frames, screenshots, or design images for web implementation. Use when Codex needs to convert a design source into implementable page structure, states, tokens, assets, and interaction notes before coding.
---

# Figma Web Design Analysis

## Output Contract

Return only the working analysis needed by later build steps. Do not produce a separate design report unless the user asks for documentation.

## Inputs

- Figma URL, frame, screenshot, or image.
- User-selected page scope.
- Prototype behavior notes when available.

## Workflow

1. Identify the design source.
2. Inventory frames, breakpoints, and states.
3. Decompose page structure.
4. Extract content, tokens, assets, and interactions.
5. Record unknowns that affect implementation.

## Stage Gate

Do not proceed to implementation until the page scope and primary design source are clear.

## Stop Conditions

Stop and ask a concise question only when no design source or target page can be inferred.
```

## 15. 验收样例

### 15.1 样例 A：单张截图落地

输入：

```txt
这是一个 landing page 截图，请在当前 React 项目里实现。
```

期望流程：

```txt
design-analysis -> repo-analysis -> code-implementation -> visual-alignment -> browser-verification -> quality-finish
```

通过标准：

```txt
页面可运行
关键布局和视觉层级接近截图
无明显 overflow
已运行可用验证命令
```

### 15.2 样例 B：Figma desktop + mobile

输入：

```txt
根据这个 Figma frame 实现页面，包含 desktop 和 mobile。
```

期望流程：

```txt
完整 8 环节
```

通过标准：

```txt
desktop 和 mobile 都有截图验证
响应式规则和设计稿一致或假设明确
主要交互状态可操作
```

### 15.3 样例 C：视觉 QA 修复

输入：

```txt
这个页面和 Figma 不一致，修一下 mobile spacing 和图片裁切。
```

期望流程：

```txt
visual-alignment -> browser-verification -> quality-finish
```

通过标准：

```txt
修复点有前后截图或 DOM 测量
相邻断点未回归
没有用大范围 !important 覆盖
```

### 15.4 样例 D：Figma 不可访问

输入：

```txt
Figma 打不开，但我给你导出的图片，按图片实现。
```

期望流程：

```txt
design-analysis 使用图片作为基准
Unknowns 明确记录 Figma 不可访问
后续实现不假装读取了 Dev Mode token
```

通过标准：

```txt
不编造 Figma 变量或 hidden state
视觉实现基于截图可见信息
缺失状态由常见网页行为推导并标记
```

## 16. 成功指标

### 16.1 可用性指标

```txt
1. 常规任务中不需要用户手动指定每个子 skill。
2. agent 能在 1-2 次上下文读取内判断当前环节。
3. 简单任务不会被完整重流程拖慢。
4. 复杂任务能自然进入视觉验证和质量收尾。
```

### 16.2 质量指标

```txt
1. check 输出的视觉问题数量下降。
2. mobile / desktop 回归数量下降。
3. 资产、token、响应式相关返工减少。
4. final response 中能说明验证命令和剩余风险。
```

### 16.3 维护指标

```txt
1. 每次 retro 只升级明确失败点。
2. 单个 SKILL.md 不持续膨胀。
3. 高频失败点能升级为独立子 skill。
4. scripts 可审计、可运行、无不必要依赖。
```

## 17. 路线图

### Phase 0：方案确认

产物：

```txt
本方案文档
```

目标：

```txt
确认金字塔结构、8 个环节 skill、第一版不拆微 skill 的策略。
```

### Phase 1：创建 MVP skills

产物：

```txt
figma-web-build
figma-web-design-analysis
figma-web-repo-analysis
figma-web-implementation-map
figma-web-code-implementation
figma-web-interaction-states
figma-web-visual-alignment
figma-web-browser-verification
figma-web-quality-finish
```

目标：

```txt
能跑通标准 Figma 页面开发任务。
```

### Phase 2：真实任务试运行

产物：

```txt
3-5 个真实任务的执行记录
check 发现的问题
retro 产生的升级建议
```

目标：

```txt
识别真正高频失败点。
```

### Phase 3：拆出高价值微 skill

优先候选：

```txt
figma-web-mobile-align
figma-web-media-fit
figma-web-token-reading
figma-web-dom-measure
figma-web-overflow-check
```

目标：

```txt
只拆有证据支持的微 skill。
```

### Phase 4：工具化与脚本化

可能脚本：

```txt
capture-viewports.mjs
measure-dom.mjs
compare-screenshots.mjs
extract-css-vars.mjs
```

目标：

```txt
把易错的测量、截图、diff 工作从提示词转移到可执行脚本。
```

## 18. 推荐决策

推荐采用以下方案：

```txt
采用 1 个总控 skill + 8 个环节 skill 的 MVP。
不在第一版创建 30-40 个微 skill。
把子动作先写成 checklist / references。
用 3-5 个真实 Figma 开发任务验证。
由 retro 根据失败证据逐步拆出高频微 skill。
```

这样做的好处：

1. 保留完整金字塔逻辑。
2. 第一版规模可控。
3. 每个环节都有清晰输入输出。
4. 后续可以按真实失败点演进，而不是凭想象过度拆分。
5. 和现有 `prototype -> build -> check -> retro` 流程兼容。

## 19. Phase 1 落地结果

本方案的 Phase 1 已按推荐目录落地到：

```txt
~/.codex/skills/
```

### 19.1 已创建的 MVP skills

```txt
figma-web-build
figma-web-design-analysis
figma-web-repo-analysis
figma-web-implementation-map
figma-web-code-implementation
figma-web-interaction-states
figma-web-visual-alignment
figma-web-browser-verification
figma-web-quality-finish
```

每个 skill 都已包含：

```txt
SKILL.md
agents/openai.yaml
```

其中 `SKILL.md` 已按以下契约编写：

```txt
Purpose / Output Contract
Inputs
Workflow
Stage Gate
Stop Conditions
Validation
```

说明：不是每个 skill 都需要完整使用这些标题；但每个 skill 都已覆盖对应含义，保证下一阶段可执行。

### 19.2 已创建的 references

```txt
figma-web-build/references/pipeline.md
figma-web-build/references/stage-gates.md
figma-web-design-analysis/references/design-analysis-template.md
figma-web-repo-analysis/references/repo-scan-patterns.md
figma-web-implementation-map/references/mapping-template.md
figma-web-interaction-states/references/interaction-state-checklist.md
figma-web-visual-alignment/references/visual-alignment-ledger.md
figma-web-browser-verification/references/browser-verification-template.md
figma-web-quality-finish/references/quality-finish-checklist.md
```

references 的定位是短模板和检查清单，而不是长篇说明。第一版避免把细节散成大量文档，只保留真实执行时会复用的材料。

### 19.3 已创建的脚本

```txt
figma-web-browser-verification/scripts/capture-viewports.mjs
```

用途：

```txt
在 Playwright 可用时，对同一 URL 批量捕获 mobile / tablet / desktop / wide desktop 截图，
同时输出 summary.json，记录 viewport、截图路径、console warning/error、page error 和横向 overflow 指标。
```

示例：

```bash
node ~/.codex/skills/figma-web-browser-verification/scripts/capture-viewports.mjs http://localhost:5173 ./tmp/figma-web-shots
```

该脚本是辅助验证工具，不强制替代项目已有 Playwright 测试、浏览器插件或人工交互检查。

### 19.4 当前边界

Phase 1 没有创建以下微 skill：

```txt
figma-web-mobile-align
figma-web-media-fit
figma-web-token-reading
figma-web-dom-measure
figma-web-overflow-check
```

这些仍按原方案保留为 Phase 3 候选。只有真实任务中反复出现、可独立验证、且造成返工时，才升级为独立 skill。

### 19.5 Phase 2 试运行建议

下一阶段应用 3-5 个真实任务验证：

```txt
1. 单张 screenshot -> 当前项目页面实现。
2. Figma desktop + mobile -> 响应式页面实现。
3. 已有页面 -> 按 Figma 修改 UI。
4. 视觉 QA 截图 -> 修复 spacing / typography / media fit。
5. Figma 不可访问 -> 使用导出图片作为基准实现。
```

每次试运行记录：

```txt
使用了哪些 figma-web-* skills
哪些 references 被读取
是否需要 capture-viewports.mjs
check 或用户反馈的问题
问题归属到哪个环节
是否满足子 skill 升级条件
```

### 19.6 完成判定

本方案现在满足 Phase 1 完成条件：

```txt
1. MVP skill 目录已创建。
2. 总控 skill 和 8 个环节 skill 已有可执行工作流。
3. 每个环节都有输入、输出、闸门、停止条件和验证规则。
4. 子动作以 checklist / references 形式保留，没有过早拆成微 skill。
5. 浏览器验证阶段已有可选脚本支撑。
```
