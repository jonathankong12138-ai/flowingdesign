# 设计开发流程 Skill 制作方案

状态：方案稿  
适用范围：Codex / Agent 工作流中的设计、开发、测试、复盘类流程型 skill  
关联文档：[Figma 设计图网页开发 Skill 体系方案](./figma-web-build-skill-scheme.md)  
最后更新：2026-06-29

## 1. 是什么

“设计开发流程 skill”不是单个提示词，也不是一份开发规范。它是一套把复杂交付流程拆成可触发、可执行、可验证、可复盘的 skill 体系。

在当前 Web Design 工作流中，它对应这条主线：

```txt
需求 / prototype
  -> 开发 / build
  -> 测试 / check
  -> 复盘 / retro
```

当开发阶段进一步细化为“根据 Figma / 设计图开发网页”时，它又可以拆成：

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

因此，本文说的“设计开发流程 skill 制作方案”，本质上是一套方法：

```txt
把一个复杂流程
拆成阶段
再拆成子动作
再决定哪些子动作值得做成 skill
最后用真实任务验证和迭代
```

## 2. 为什么要做

### 2.1 解决复杂流程不可控

设计开发任务通常不是单步任务。比如“按 Figma 实现页面”实际包含：

```txt
读设计源
拆页面结构
识别 token
识别资产
扫描代码库
映射组件
实现页面
处理交互状态
做响应式
浏览器验证
跑测试
复盘问题
```

如果只靠一个巨大的 `build` skill，容易出现：

1. 触发太宽，什么开发任务都往里塞。
2. 上下文太重，每次都加载大量不相关规则。
3. 问题定位困难，不知道是分析、映射、实现、验证还是复盘出了问题。
4. 后续升级混乱，每次都往大 skill 里补一句规则。

### 2.2 让流程可复用

好的流程型 skill 可以把一次成功经验沉淀为可复用能力。比如：

```txt
Figma 视觉还原方法
移动端响应式修复方法
浏览器截图验证方法
测试 checklist 输出方法
复盘升级 skill 的方法
```

这些能力不应该只留在一次对话里，而应该变成下次可触发的工作方式。

### 2.3 让失败能精准回流

`retro` 的价值不是写总结，而是把失败回写到对应 skill。

例如：

```txt
设计 token 误读
  -> 升级 design-analysis 或拆 token-reading

mobile 修复破坏 desktop
  -> 升级 visual-alignment 或拆 mobile-align

没有真实浏览器验证
  -> 升级 browser-verification

check 输出不够可执行
  -> 升级 check 的 checklist 模板
```

### 2.4 让不同流程可以复制同一套方法

设计开发流程的拆法，也可以迁移到其他流程：

```txt
Shopify 店铺搭建流程
文档生成流程
数据分析流程
投放素材制作流程
客服自动化流程
产品需求到原型流程
```

共同模式是：

```txt
输入识别
上下文分析
方案映射
执行生产
验证质量
交付总结
复盘升级
```

## 3. 网络调研结论

本方案结合了当前本地 skill 约束和公开资料中的通用做法。

### 3.1 Skill 结构

OpenAI Codex 的 skill 文档说明，skill 是可打包的能力目录，通常包含 `SKILL.md`，以及可选的 `scripts`、`references`、`assets` 等资源，用来让 Codex 在特定任务中获得专门能力。[OpenAI Codex Skills](https://developers.openai.com/codex/skills)

本地 `skill-creator` 也采用同样结构：

```txt
skill-name/
  SKILL.md
  agents/openai.yaml
  scripts/
  references/
  assets/
```

### 3.2 渐进披露

Anthropic 的 skill 最佳实践强调 skill 应该 concise、well-structured、tested with real usage，并通过 progressive disclosure 控制上下文加载成本。[Claude Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

这支持本文的核心原则：

```txt
总控 skill 保持轻量
环节 skill 承载核心流程
细节放 references
稳定重复动作再脚本化
```

### 3.3 设计到开发

Figma Dev Mode 的文档说明，开发者可以检查设计、查看 ready for dev 内容、理解变量、查看属性并导出资产。[Figma Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)、[Figma Variables in Dev Mode](https://help.figma.com/hc/en-us/articles/27882809912471-Variables-in-Dev-Mode)、[Figma Inspect](https://help.figma.com/hc/en-us/articles/22012921621015-Guide-to-inspecting)

这支持把设计稿分析拆成：

```txt
设计源确认
frame / state 清点
结构拆解
token 读取
资产读取
交互读取
```

### 3.4 浏览器验证

Playwright 文档支持截图、全页截图和视觉对比。[Playwright Screenshots](https://playwright.dev/docs/screenshots)、[Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

这支持把视觉还原和开发验证拆成：

```txt
真实浏览器截图
DOM 尺寸测量
computed style 检查
console / network 检查
多断点验证
```

### 3.5 方案文档写法

Atlassian 的实施计划和软件设计文档资料强调目标、范围、依赖、风险、缓解方案和执行步骤。[Implementation Plan](https://www.atlassian.com/work-management/strategic-planning/implementation-plan)、[Software Design Document](https://www.atlassian.com/work-management/knowledge-sharing/documentation/software-design-document)

Google 技术写作指南也建议文档先明确 scope 和 non-scope。[Technical Writing: Documents](https://developers.google.com/tech-writing/one/documents)

因此，流程 skill 制作方案必须包含：

```txt
是什么
为什么
怎么做
怎么用
风险
如何复制到其他流程
```

## 4. 核心原则

### 4.1 按流程拆，不按技术点拆

不要先拆成：

```txt
React skill
CSS skill
Tailwind skill
Playwright skill
```

应该先拆成：

```txt
设计稿分析
代码库分析
设计到代码映射
代码实现
视觉还原
浏览器验证
质量收尾
复盘升级
```

因为用户的目标是完成交付，不是使用某个技术点。

### 4.2 先大环节，后子动作

第一版不要创建几十个微 skill。推荐顺序：

```txt
L0 总控 skill
L1 环节 skill
L2 高频子 skill
L3 子 skill + scripts
L4 子 skill + references + examples
```

### 4.3 一个 skill 只负责一个稳定职责

判断一个 skill 是否过大，可以看它是否同时做了太多事情。

坏例子：

```txt
figma-web-everything
负责读 Figma、分析设计、写代码、截图、测试、复盘。
```

好例子：

```txt
figma-web-design-analysis
只负责把设计源转成可开发信息。

figma-web-browser-verification
只负责真实浏览器验证和证据收集。
```

### 4.4 每个 skill 必须有输入输出契约

每个 skill 至少写清楚：

```txt
Purpose
Inputs
Workflow
Output Contract
Stage Gates
Stop Conditions
Validation
```

如果不能写清楚输入输出，这个 skill 还不成熟，应该先作为 checklist 留在上一级 skill 里。

### 4.5 Skill 是能力，不是文档仓库

不要把所有说明都塞进 `SKILL.md`。推荐：

```txt
SKILL.md
  放触发、原则、核心流程、输出契约

references/
  放详细模板、检查表、领域规则

scripts/
  放稳定、重复、需要确定性的操作

assets/
  放模板、样例、可复用素材
```

### 4.6 真实任务优先于想象拆分

只有真实任务反复暴露的问题，才值得升级成独立子 skill。

升级条件：

```txt
高频出现
容易返工
输入输出稳定
可以独立验证
需要脚本或详细参考资料
被多个流程复用
```

## 5. 怎么做：制作流程

### 5.1 第一步：定义流程边界

先用一句话定义这个流程 skill 解决什么问题。

模板：

```txt
这个 skill 体系用于把 [输入] 转换为 [交付物]，并通过 [验证方式] 保证结果可用。
```

设计开发流程示例：

```txt
这个 skill 体系用于把 Figma / 设计图转换为可运行网页代码，并通过真实浏览器截图、交互验证和构建命令保证结果可用。
```

同时写清楚非目标：

```txt
不替代 check 的独立验收
不一次性创建所有微 skill
不把通用开发规则重复写进每个子 skill
不绕过项目现有组件和样式系统
```

### 5.2 第二步：建立金字塔

按三层拆：

```txt
顶层：这个流程最终完成什么
一级：流程有哪些大环节
二级：每个环节有哪些子动作
```

设计开发流程示例：

```txt
顶层：
  figma-web-build

一级：
  设计稿分析
  代码库分析
  设计到代码映射
  基础与组件实现
  交互与状态实现
  响应式与视觉还原
  浏览器验证
  测试与质量收尾

二级：
  设计稿分析下面包括：
    明确设计源
    frame 清点
    结构拆解
    token 读取
    资产读取
    交互读取
```

### 5.3 第三步：决定第一版 skill 数量

第一版的目标是可用，不是完整。

推荐：

```txt
1 个总控 skill
6-8 个环节 skill
若干 checklist
0-2 个脚本
```

不推荐：

```txt
一开始创建 30-40 个微 skill
```

设计开发流程第一版：

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

### 5.4 第四步：为每个 skill 写触发描述

`description` 是 skill 的触发入口，必须写清楚何时使用。

模板：

```yaml
---
name: figma-web-design-analysis
description: Analyze Figma frames, screenshots, or design images for web implementation. Use when Codex needs to convert a design source into implementable page structure, states, tokens, assets, and interaction notes before coding.
---
```

写 description 的规则：

```txt
同时写 what 和 when
包含用户可能说出的触发词
不要把触发条件藏在正文里
不要过宽到覆盖所有开发任务
不要过窄到真实任务触发不了
```

### 5.5 第五步：写 SKILL.md 主体

每个环节 skill 建议统一结构：

```md
# Skill Name

## Output Contract

这个 skill 产出什么，不产出什么。

## Inputs

需要读取哪些输入。

## Workflow

按顺序执行哪些动作。

## Stage Gates

什么时候可以进入下一阶段。

## Stop Conditions

什么时候应该停下来问用户或报告阻塞。

## Validation

怎么确认这个 skill 做完了。
```

### 5.6 第六步：设计 references、scripts、assets

只在需要时增加资源。

| 资源 | 适合放什么 | 不适合放什么 |
|---|---|---|
| `references/` | 模板、检查表、领域规则、较长说明 | 已经写在 SKILL.md 里的重复内容 |
| `scripts/` | 截图、测量、解析、转换、稳定重复操作 | 只运行一次的临时代码 |
| `assets/` | 模板项目、图片、字体、样例文件 | 不会被输出使用的说明文档 |

设计开发流程中，优先脚本化：

```txt
多 viewport 截图
DOM 几何测量
视觉 diff
CSS variable 提取
图片尺寸和体积检查
```

### 5.7 第七步：验证 skill

验证分三层：

```txt
结构验证：
  YAML frontmatter 是否正确
  name / description 是否存在
  文件目录是否符合规范

任务验证：
  用真实任务跑一次
  看是否触发正确
  看输出是否能进入下一环节

回归验证：
  对曾经失败的任务再跑一次
  看是否避免同类错误
```

如果使用本地 `skill-creator` 脚本，创建后应运行：

```bash
scripts/quick_validate.py <path/to/skill-folder>
```

### 5.8 第八步：通过 retro 迭代

每次项目结束后，`retro` 应回答：

```txt
哪个环节失败了
证据是什么
当前 skill 文本哪里缺失
应该升级哪个 skill
是否值得拆新子 skill
验收样例是什么
```

不要泛泛写：

```txt
以后要更注意响应式。
```

应该写：

```txt
升级 figma-web-visual-alignment：
在 mobile spacing 修复后，必须验证 desktop 和 tablet 相邻断点，避免局部 CSS 影响全局布局。
```

## 6. 设计开发流程 Skill 体系方案

### 6.1 总体结构

```txt
prototype
  -> build
      -> figma-web-build
          -> design-analysis
          -> repo-analysis
          -> implementation-map
          -> code-implementation
          -> interaction-states
          -> visual-alignment
          -> browser-verification
          -> quality-finish
  -> check
  -> retro
```

### 6.2 角色边界

| Skill | 角色 | 产物 |
|---|---|---|
| `prototype` | 把需求变成可开发原型 | 交互原型 |
| `build` | 开发阶段总入口 | 工作代码 |
| `figma-web-build` | Figma / 设计图开发总控 | 调度和阶段闸门 |
| `figma-web-*` | 各开发环节执行 | 代码、验证证据、阶段输出 |
| `check` | 独立验收 | Adjustment Checklist |
| `retro` | 经验回流 | Skill Upgrade Guide |

### 6.3 环节 skill 清单

| 环节 | Skill | 主要职责 | 第一版形态 |
|---|---|---|---|
| 总控 | `figma-web-build` | 判断任务、选择路径、管理闸门 | 独立 skill |
| 设计稿分析 | `figma-web-design-analysis` | 明确设计源、结构、token、资产、状态 | 独立 skill |
| 代码库分析 | `figma-web-repo-analysis` | 扫描技术栈、路由、组件、样式、命令 | 独立 skill |
| 映射 | `figma-web-implementation-map` | 设计到代码的实现策略 | 独立 skill |
| 实现 | `figma-web-code-implementation` | 写路由、布局、组件、内容、资源 | 独立 skill |
| 交互状态 | `figma-web-interaction-states` | hover、focus、loading、error、modal、tabs | 独立 skill |
| 视觉还原 | `figma-web-visual-alignment` | 多断点视觉修正 | 独立 skill |
| 浏览器验证 | `figma-web-browser-verification` | 截图、测量、console、交互验证 | 独立 skill，后续可加 scripts |
| 质量收尾 | `figma-web-quality-finish` | lint、typecheck、build、test、a11y、清理 | 独立 skill |

### 6.4 执行模式

轻量模式：

```txt
小页面 / 单张截图 / 低风险

design-analysis
repo-analysis
code-implementation
browser-verification
quality-finish
```

标准模式：

```txt
常规 Figma 页面 / 有 desktop + mobile / 有多个组件

完整执行 8 个环节
```

严格模式：

```txt
核心页面 / 高视觉还原 / 复杂响应式 / 设计系统

完整执行 8 个环节
额外保留截图、DOM 测量、视觉 diff、更多断点验证
```

## 7. 如何使用

### 7.1 用户如何触发

用户不需要说出每个子 skill 名称。自然语言即可：

```txt
根据这个 Figma 页面实现网页。
按这张设计图还原当前页面。
把这个 desktop 和 mobile 设计稿做成响应式页面。
这个页面和 Figma 不一致，帮我修视觉还原。
```

总控 skill 应该自动判断：

```txt
是完整开发
还是局部修复
是轻量模式
还是标准 / 严格模式
```

### 7.2 Agent 如何执行

执行顺序：

```txt
1. 识别设计源和目标页面。
2. 判断是否需要完整流程。
3. 读取对应环节 skill。
4. 产出当前环节所需结果。
5. 检查阶段闸门。
6. 进入下一环节。
7. 最终交付代码、验证命令和剩余风险。
```

执行时必须避免：

```txt
还没看代码库就重写组件
还没确认设计源就实现
还没浏览器验证就宣布视觉完成
把 check 的 adjustment checklist 混进 build 阶段
把 retro 写成泛泛总结
```

### 7.3 开发完成后如何进入 check

`figma-web-quality-finish` 结束后，应把结果交给 `check` 独立验收。

交接信息包括：

```txt
实现页面 / 路由
主要改动文件
已运行命令
浏览器验证情况
已知剩余风险
```

`check` 再输出：

```txt
Adjustment Checklist
```

### 7.4 如何通过 retro 升级

如果 `check` 或用户反馈发现问题，`retro` 应定位到具体 skill。

示例：

| 问题 | 目标 skill | 升级方式 |
|---|---|---|
| 忘记 mobile 状态 | `figma-web-design-analysis` | 增加 frame / breakpoint 清点规则 |
| 图片裁切错误 | `figma-web-visual-alignment` | 加 media fit 检查，必要时拆 `figma-web-media-fit` |
| 没有真实截图 | `figma-web-browser-verification` | 强化截图和 viewport 要求 |
| 测试命令漏跑 | `figma-web-quality-finish` | 增加命令发现和执行顺序 |
| check 反馈不可执行 | `check` | 强化 evidence / expected / actual / developer instruction |

## 8. 如何在其他流程里制作 Skill

### 8.1 通用制作公式

任何流程都可以套用这个公式：

```txt
流程 skill = 目标交付物 + 输入源 + 阶段拆分 + 阶段闸门 + 验证方式 + 复盘回流
```

拆分步骤：

```txt
1. 写清楚这个流程把什么输入变成什么输出。
2. 按时间顺序拆一级环节。
3. 在每个环节下列子动作。
4. 找出高频、易错、可验证的子动作。
5. 第一版只做总控 + 环节 skill。
6. 子动作先 checklist 化。
7. 用真实任务验证。
8. 从失败点升级或拆新 skill。
```

### 8.2 判断某个子动作是否值得做成 skill

评分表：

| 问题 | 是 | 否 |
|---|---|---|
| 是否一周内会反复出现？ | +1 | 0 |
| 是否经常导致返工？ | +1 | 0 |
| 是否有明确输入和输出？ | +1 | 0 |
| 是否能独立验证？ | +1 | 0 |
| 是否需要脚本、模板或参考资料？ | +1 | 0 |
| 是否能被多个流程复用？ | +1 | 0 |

建议：

```txt
0-2 分：留在 checklist
3-4 分：做成环节 skill 内部规则
5-6 分：拆成独立 skill
```

### 8.3 其他流程示例

#### 示例 A：产品需求到原型

顶层：

```txt
prd-to-prototype
```

环节：

```txt
需求澄清
用户与目标识别
页面清单
核心流程设计
状态与边界条件
原型实现
原型验证
```

可能 skill：

```txt
prototype-requirement-analysis
prototype-flow-map
prototype-state-coverage
prototype-build
prototype-review-readiness
```

#### 示例 B：测试流程

顶层：

```txt
web-app-check
```

环节：

```txt
基准识别
浏览器运行
响应式检查
交互检查
a11y 检查
性能风险检查
代码证据定位
Adjustment Checklist 输出
```

可能 skill：

```txt
check-baseline-analysis
check-responsive-scan
check-interaction-scan
check-a11y-scan
check-adjustment-checklist
```

#### 示例 C：Shopify 店铺搭建

顶层：

```txt
shopify-store-build
```

环节：

```txt
商家目标分析
商品与集合建模
主题结构分析
页面与导航配置
支付配送税务检查
上线前验证
```

可能 skill：

```txt
shopify-merchant-intake
shopify-catalog-modeling
shopify-theme-implementation
shopify-launch-readiness
```

#### 示例 D：数据分析报告

顶层：

```txt
data-report-build
```

环节：

```txt
问题定义
数据源识别
指标口径确认
数据清洗
分析计算
图表生成
报告输出
复核验证
```

可能 skill：

```txt
data-question-framing
data-source-scout
metric-definition
analysis-notebook-build
report-chart-build
report-quality-check
```

### 8.4 迁移模板

制作其他流程 skill 时，可以复制这个模板：

```md
# [流程名称] Skill 制作方案

## 是什么

这个流程 skill 用于把 [输入] 转换成 [输出]。

## 为什么

- 这个流程高频出现。
- 当前执行中容易在 [环节] 出错。
- 需要把经验沉淀成可复用能力。

## 金字塔拆分

顶层：
  [总控 skill]

一级环节：
  1. [环节 A]
  2. [环节 B]
  3. [环节 C]

二级子动作：
  [环节 A]
    - [子动作 A1]
    - [子动作 A2]

## 第一版 Skill 清单

| Skill | 职责 | 输入 | 输出 | 闸门 |
|---|---|---|---|---|

## 如何使用

用户触发：

Agent 执行：

交付标准：

## 如何验证

结构验证：
任务验证：
回归验证：

## 风险与缓解

| 风险 | 表现 | 缓解 | 验证 |
|---|---|---|---|

## 迭代策略

哪些子动作先 checklist 化：
哪些子动作未来可能拆 skill：
retro 如何判断升级：
```

## 9. 推荐落地计划

### Phase 1：确认制作方案

产物：

```txt
本文件
```

判断标准：

```txt
能解释是什么、为什么、怎么做、怎么用、如何迁移到其他流程
```

### Phase 2：创建设计开发流程 MVP skills

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

判断标准：

```txt
每个 skill 都有清晰 description
每个 skill 都有 Output Contract
每个 skill 都有 Stage Gates
能跑通一个真实 Figma 页面开发任务
```

### Phase 3：真实任务试运行

至少跑 3 类任务：

```txt
1. 单张设计图实现页面
2. Figma desktop + mobile 实现响应式页面
3. 已有页面根据 Figma 做视觉修复
```

记录：

```txt
触发是否准确
上下文是否过重
阶段输出是否可被下一阶段使用
check 发现了哪些问题
retro 应升级哪个 skill
```

### Phase 4：拆高价值微 skill

优先候选：

```txt
figma-web-mobile-align
figma-web-media-fit
figma-web-token-reading
figma-web-dom-measure
figma-web-overflow-check
```

拆分条件：

```txt
必须有真实失败证据
必须能写清输入输出
必须有独立验收样例
```

### Phase 5：脚本化

优先脚本：

```txt
capture-viewports.mjs
measure-dom.mjs
compare-screenshots.mjs
extract-css-vars.mjs
```

脚本化条件：

```txt
动作重复
人类语言不够稳定
需要精确测量
输出可被后续 skill 使用
```

## 10. 风险与解决方案

| 风险 | 表现 | 解决方案 |
|---|---|---|
| 过度拆分 | 一开始创建几十个 skill，执行者不知道用哪个 | 先做总控 + 8 个环节 skill，子动作 checklist 化 |
| 触发混乱 | 多个 skill description 重叠 | 每个 description 写清 what + when，避免过宽 |
| 上下文过重 | 每次加载大量细节 | SKILL.md 保持短，细节进 references |
| 流程僵化 | 简单任务也跑完整流程 | 设置轻量 / 标准 / 严格模式 |
| 输出不可接力 | 上一环节产物无法用于下一环节 | 每个 skill 定义 Output Contract |
| 自检替代测试 | 开发阶段自己宣布通过 | `check` 保持独立，只由测试阶段输出 checklist |
| retro 泛化 | 复盘只写“以后注意” | retro 必须输出可粘贴到 SKILL.md 的指令 |
| 脚本不可维护 | scripts 越写越多但无人验证 | 只脚本化稳定重复动作，新增脚本必须运行验证 |
| 设计源不完整 | Figma 无权限或状态缺失 | 设置 fallback：截图基准、合理假设、显式 unknowns |
| 迁移到其他流程失败 | 照搬 Figma skill 名称和规则 | 迁移时只复用方法，不复用领域细节 |

## 11. 最终建议

推荐把“设计开发流程 skill 制作”定义为一套可迁移的方法，而不是只服务 Figma 的一次性方案。

落地策略：

```txt
1. 用本文作为制作方法总纲。
2. 用 figma-web-build-skill-scheme.md 作为设计图开发的领域方案。
3. 第一版只创建总控 + 环节 skill。
4. 子动作先 checklist 化。
5. 真实任务跑 3-5 轮。
6. 通过 retro 把失败点升级为独立子 skill。
7. 把高重复、高精度动作脚本化。
8. 将同一套方法复制到 prototype、check、retro 或其他业务流程。
```

这套方式的关键不是“拆得越细越好”，而是：

```txt
该轻的地方轻
该稳的地方稳
该验证的地方有证据
该复盘的地方能回写
```

