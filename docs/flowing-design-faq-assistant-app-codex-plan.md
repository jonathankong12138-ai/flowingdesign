# Flowing Design FAQ Assistant App Codex 开发方案

## 1. 文档目的

本文档用于交付给负责开发 Shopify App 的 Codex。数据库方案已经完成，App Codex 的任务不是重新设计数据库，而是基于现有数据库方案开发 Shopify embedded app、Admin 后台、Storefront FAQ Widget、API、同步任务和后续 RAG 接入能力。

数据库方案目录：

```txt
/Users/kk/Documents/GitHub/flowingdesign/Flowing Design FAQ Assistant 数据库方案
```

App Codex 开始开发前必须读取：

```txt
schema.sql
seed.sql
knowledge-import-format.json
rag-retrieval-flow.md
database-readme.md
```

前台助手原型代码已经放在：

```txt
/Users/kk/Documents/GitHub/flowingdesign/faq助手
```

该目录目前包含：

```txt
index.html
creating_remix_scene.data.js
```

App Codex 必须把它作为 Storefront Widget 的既有前端视觉基准和迁移来源，而不是重新设计一套前台入口。

## 2. 项目背景

当前仓库是一个 Shopify theme 项目，不是现成 Shopify app。站点内容主要围绕 Flowing Design 的服务、作品、案例和跨境电商体验升级能力展开。

仓库中已有：

- Shopify theme 结构：`assets`、`sections`、`snippets`、`templates`、`config`、`locales`
- 首页与作品展示内容
- `page.works` 页面模板
- `page.e-commerce-upgrade` 案例页模板
- Shokz / 跨境电商体验升级相关项目内容
- Web Design / Figma / 开发流程文档
- FAQ 前端助手原型代码：`faq助手/index.html`
- FAQ 动态 orb 场景数据：`faq助手/creating_remix_scene.data.js`

因此，Flowing Design FAQ Assistant 不应被设计成普通客服机器人，而应该是一个“渐进式项目理解助手”。

它需要帮助访客逐步理解：

- Flowing Design 是做什么的
- 适合哪些 Shopify / DTC 品牌
- 有哪些服务类型
- 有哪些代表案例
- 每个案例解决了什么问题
- 项目流程和交付方式是什么
- 如何开始合作

同时，它也需要帮助站点运营者在 Shopify Admin 后台维护知识库、FAQ、推荐问题、未回答问题和 Widget 配置。

## 3. 产品定位

产品名称：

```txt
Flowing Design FAQ Assistant
```

产品定位：

```txt
面向 Shopify 网站的项目知识 FAQ 助手，用渐进式问答帮助访客理解服务、案例、流程和合作方式，并通过后台知识库持续优化回答质量。
```

核心价值：

- 把 Shopify 网站内容转化为可查询知识库
- 把服务和案例信息变成可对话的销售资产
- 让访客不用一次性阅读大量页面，也能逐步理解项目
- 收集未回答问题，反向推动内容和 FAQ 迭代
- 为后续 embedding / RAG 检索预留完整数据链路

## 4. 系统组成

App 由四个部分组成：

```txt
Shopify Admin App
  - Dashboard
  - Knowledge 管理
  - FAQ 管理
  - 推荐问题管理
  - Widget 设置
  - 未回答问题
  - 同步任务

Storefront Widget
  - 前台浮动 FAQ 助手
  - 页面上下文感知
  - 推荐问题
  - 聊天问答
  - 用户反馈

Backend API
  - Admin CRUD API
  - Widget API
  - Chat API
  - Feedback API
  - Shopify 内容同步 API
  - Import API

Database / RAG Layer
  - 使用已完成的 PostgreSQL / Supabase schema
  - 支持 pgvector
  - 支持后续 embedding 和 match_knowledge_chunks 检索
```

## 5. 技术建议

优先使用 Shopify 官方 App 技术栈：

- Shopify embedded app
- Remix / React
- App Bridge
- Polaris / Shopify Admin UI
- Theme app extension 或前台 script widget
- PostgreSQL / Supabase
- pgvector

建议 App 放在独立目录，避免污染当前 theme 根目录：

```txt
apps/faq-assistant/
```

推荐结构：

```txt
apps/faq-assistant/
  app/
    routes/
    components/
    services/
    repositories/
    lib/
    styles/
  extensions/
    faq-widget/
  prisma/ 或 db/
  public/
  package.json
  README.md
```

前台 Widget 迁移时，应从 `faq助手/index.html` 拆出可复用结构：

```txt
extensions/faq-widget/
  assets/
    faq-assistant-widget.css
    faq-assistant-widget.js
    creating_remix_scene.data.js
  blocks/
    faq-assistant-widget.liquid
```

或在 Remix app 中提供前台 script 资源：

```txt
app/routes/widget.js
app/routes/widget.css
public/creating_remix_scene.data.js
```

具体采用 Theme App Extension 还是远程 script 注入，由 App Codex 根据 Shopify App scaffold 决定。但必须保证 storefront 可以加载这套前台助手，而不是只停留在 Admin 后台。

如果 Shopify session storage 需要额外表，可以单独创建 session migration。但不要修改数据库方案里的核心知识库 schema，除非明确说明原因。

## 6. 环境变量

至少需要：

```txt
SHOPIFY_API_KEY
SHOPIFY_API_SECRET
SCOPES
SHOPIFY_APP_URL
DATABASE_URL
OPENAI_API_KEY
```

MVP 阶段 `OPENAI_API_KEY` 可以为空，但代码结构要允许后续接入 embedding。

## 7. 数据库对接要求

App 必须使用现有数据库方案中的表：

```txt
shops
knowledge_sources
knowledge_documents
knowledge_chunks
faq_items
question_suggestions
chat_sessions
chat_messages
answer_feedback
unanswered_questions
widget_settings
sync_jobs
```

必须兼容现有 enum：

```txt
app_plan
knowledge_source_type
sync_status
document_content_type
document_status
document_visibility
faq_status
faq_audience
page_type
chat_role
feedback_rating
unanswered_status
widget_display_mode
sync_job_type
sync_job_status
```

RAG 检索函数：

```sql
public.match_knowledge_chunks(...)
```

embedding 配置：

```txt
model: text-embedding-3-small
dimension: 1536
```

MVP 阶段可以先不生成真实 embedding，但必须保留：

- `knowledge_chunks.embedding`
- `metadata_json.embedding_status`
- `sync_jobs.job_type = generate_embeddings`
- 后续调用 `match_knowledge_chunks` 的 service 层接口

## 8. MVP 功能范围

### 8.1 App 初始化

需要完成：

- 初始化 Shopify embedded app
- 完成 Shopify OAuth / 安装流程
- 写入或更新 `shops`
- 建立数据库连接
- 支持读取 seed 数据
- Admin 页面可访问
- README 写清楚运行步骤

安装时写入：

```txt
shops.shop_domain
shops.access_token_encrypted
shops.plan
shops.locale_default
shops.installed_at
```

卸载时更新：

```txt
shops.uninstalled_at
```

### 8.2 Admin Dashboard

Dashboard 是商家进入 App 后的首页。

展示内容：

- Widget 是否启用
- 知识文档数量
- FAQ 数量
- 推荐问题数量
- 未回答问题数量
- 最近同步任务
- 最近用户问题
- 最近低置信回答

快捷操作：

- 同步 Shopify 内容
- 管理 FAQ
- 管理知识库
- 配置 Widget
- 查看未回答问题

建议卡片：

```txt
Knowledge health
Published FAQs
Open unanswered questions
Widget status
Recent sync jobs
```

### 8.3 Knowledge 管理页

对接：

```txt
knowledge_sources
knowledge_documents
knowledge_chunks
```

列表展示：

- title
- handle
- source_type
- status
- visibility
- locale
- updated_at

筛选：

- source_type
- status
- visibility
- locale

搜索：

- title
- handle
- content

详情页展示：

- 文档完整内容
- source 信息
- page_context_json
- metadata_json
- chunks 列表
- embedding 状态

操作：

- 新增知识文档
- 编辑知识文档
- 标记 `published`
- 标记 `needs_review`
- 标记 `archived`
- 新增 / 编辑 chunk

注意：

不要在列表页直接展开全部 chunks。chunks 只在详情页查看。

### 8.4 FAQ 管理页

对接：

```txt
faq_items
```

字段：

```txt
question
short_answer
long_answer
category
audience
page_type
page_handle
priority
status
source_document_ids
next_questions_json
```

功能：

- FAQ 列表
- 搜索问题
- 按 status 筛选
- 按 page_type / page_handle 筛选
- 新增 FAQ
- 编辑 FAQ
- 删除或归档 FAQ
- 发布 FAQ
- 标记 needs_review
- 配置后续推荐问题
- 从 unanswered_questions 转成 FAQ

编辑页建议包含：

```txt
基础信息
  - question
  - category
  - audience
  - page_type
  - page_handle

回答内容
  - short_answer
  - long_answer

推荐追问
  - next_questions_json

发布设置
  - priority
  - status
  - source_document_ids
```

### 8.5 推荐问题管理页

对接：

```txt
question_suggestions
```

字段：

```txt
page_type
page_handle
question
intent
locale
priority
enabled
```

功能：

- 按页面类型分组查看
- 支持首页推荐问题
- 支持案例页推荐问题
- 支持服务页推荐问题
- 支持产品页 / collection 页推荐问题
- 启用 / 停用
- 调整 priority
- 新增 / 编辑 / 删除

页面策略：

```txt
home:
  - Flowing Design 是做什么的？
  - 适合什么类型的品牌？
  - 能看一个代表案例吗？
  - 合作流程是什么？

case_study / e-commerce-upgrade:
  - 这个项目背景是什么？
  - 具体做了哪些工作？
  - 有哪些结果数据？
  - 类似项目怎么开始？

page / service:
  - 服务范围是什么？
  - 交付内容有哪些？
  - 项目周期多久？
  - 第一步需要准备什么？
```

### 8.6 Widget 设置页

对接：

```txt
widget_settings
```

字段：

```txt
enabled
display_mode
brand_color
welcome_message
contact_url
enabled_page_rules_json
default_suggestions_json
style_json
```

功能：

- 启用 / 停用 Widget
- 设置展示模式
- 设置品牌色
- 设置欢迎语
- 设置联系链接
- 设置默认推荐问题
- 设置页面启用规则
- 保存后显示 toast

展示模式：

```txt
bubble
inline
sidebar
hidden
```

默认建议：

```json
[
  "Flowing Design 是做什么的？",
  "我适合找你们做什么？",
  "可以看一个代表案例吗？",
  "合作流程是什么？"
]
```

### 8.7 未回答问题页面

对接：

```txt
unanswered_questions
```

字段：

```txt
question
normalized_question
page_url
page_handle
locale
frequency
status
suggested_answer
created_at
updated_at
```

功能：

- 查看 open / planned / answered / ignored / archived
- 按 frequency 排序
- 按 page_handle 筛选
- 修改状态
- 填写 suggested_answer
- 一键转 FAQ
- 转 FAQ 后更新 unanswered status 为 answered

这是内容迭代闭环的核心页面，优先级高。

### 8.8 Storefront FAQ Widget

Widget 是前台用户真正接触的助手。

已有前端原型：

```txt
/Users/kk/Documents/GitHub/flowingdesign/faq助手/index.html
/Users/kk/Documents/GitHub/flowingdesign/faq助手/creating_remix_scene.data.js
```

原型当前形态：

- 胶囊式超宽输入入口
- 左侧 orb / source orb 视觉
- 输入 placeholder 为 `Ask...`
- focus 时有发光和边缘波动动画
- 移动端降级为较小胶囊输入框
- 当 Unicorn / local scene runtime 不可用时，使用 CSS animated orb fallback

App Codex 要把该原型迁移为生产 Widget，而不是另做一个普通聊天按钮。迁移后的默认形态可以分为两个状态：

```txt
collapsed:
  使用现有胶囊式 Ask 输入入口

expanded:
  展开为聊天面板，保留顶部视觉语言和 orb 识别元素
```

交互要求：

- 默认可使用右下角 bubble 或页面内胶囊入口，具体由 `widget_settings.display_mode` 控制
- 点击胶囊输入框或 bubble 后打开聊天面板
- 顶部显示 `Flowing Design Assistant`
- 中部显示消息流
- 底部输入框
- 显示推荐问题 chips
- 回答后显示下一步推荐问题
- 支持 helpful / not_helpful 反馈

页面上下文必须采集：

```txt
page_url
page_type
page_handle
locale
visitor_id
customer_id
country
```

前台交互流程：

```txt
用户打开 Widget
  -> 读取 widget_settings
  -> 读取当前页面 question_suggestions
  -> 展示欢迎语和推荐问题
  -> 用户点击推荐问题或自由输入
  -> 调用 POST /api/chat
  -> 返回回答、confidence、next_questions
  -> 用户可继续追问或反馈
```

视觉要求：

- 与当前 theme 的黑白简洁风格一致
- 复用 `faq助手/index.html` 的胶囊式输入框、orb、柔和阴影、focus glow 和 `Ask...` 入口气质
- 不遮挡购物车、菜单和核心 CTA
- 移动端可用
- 不使用花哨渐变
- 不做强打扰弹窗
- 默认轻量、安静、工具型

前端原型迁移注意：

- `creating_remix_scene.data.js` 中包含 Unicorn Studio 场景数据和商业授权注释，迁移时保留来源和版权注释，不要改写为无来源代码。
- `index.html` 当前引用 `../json-demo-local/assets/vendor/local-scene-engine.umd.js`，但当前仓库没有该 vendor 文件。App Codex 必须检查 runtime 是否可用。
- 如果 runtime 不可用，生产 Widget 先启用 CSS animated orb fallback，不能让 Widget 因视觉 runtime 缺失而无法工作。
- 如果后续要启用动态 Unicorn 场景，需要补齐可授权、可打包、可缓存的 runtime，并在 README 中说明来源和加载方式。
- 前台脚本必须避免污染全局命名空间；必要的全局变量使用 `window.FlowingDesignFAQAssistant` 或明确命名前缀。
- CSS 需要加作用域前缀，例如 `.fd-faq-assistant`，避免影响 theme 里的其他 section、cart drawer 或 search input。

### 8.9 Chat MVP 逻辑

先实现简化版，不强依赖 LLM。

流程：

```txt
1. 创建或复用 chat_sessions
2. 写入 visitor 消息
3. 根据 page_type + page_handle 查询 published FAQ
4. 用关键词 / 简单文本相似度匹配 FAQ
5. FAQ 命中则返回 short_answer 或 long_answer
6. 同时返回 next_questions_json
7. FAQ 未命中则查询 question_suggestions 和 knowledge_documents
8. 仍无答案则写入 unanswered_questions
9. 写入 assistant 消息
10. 返回 answer、confidence、matched_document_ids、suggestions
```

置信度建议：

```txt
0.80 - 1.00: FAQ 明确命中
0.55 - 0.79: 知识文档或弱匹配回答
0.00 - 0.54: 无明确答案，进入 unanswered_questions
```

兜底回答示例：

```txt
我现在还没有找到足够确定的资料来回答这个问题。我已经记录下来，后续可以把它补充进 FAQ。你也可以先看看这些相关问题：
```

### 8.10 Feedback 逻辑

对接：

```txt
answer_feedback
```

用户可反馈：

```txt
helpful
not_helpful
neutral
```

当用户点 `not_helpful`：

- 写入 answer_feedback
- 如果 confidence 低或没有 matched_document_ids，写入 unanswered_questions
- 后台未回答问题页面可 review

## 9. API 设计

### 9.1 Widget API

```txt
GET  /api/widget-settings
GET  /api/suggestions
POST /api/chat
POST /api/feedback
```

`GET /api/widget-settings`

入参：

```txt
shop
page_type
page_handle
locale
```

返回：

```json
{
  "enabled": true,
  "display_mode": "bubble",
  "brand_color": "#111827",
  "welcome_message": "你好，我可以帮你快速了解服务、案例和项目流程。",
  "contact_url": "/pages/contact",
  "default_suggestions": []
}
```

`GET /api/suggestions`

入参：

```txt
shop
page_type
page_handle
locale
```

返回：

```json
{
  "suggestions": [
    {
      "question": "这个项目主要解决了什么问题？",
      "intent": "case_summary"
    }
  ]
}
```

`POST /api/chat`

请求：

```json
{
  "shop": "flowing-design-demo.myshopify.com",
  "session_id": null,
  "visitor_id": "visitor_123",
  "customer_id": null,
  "message": "这个项目主要解决了什么问题？",
  "page_url": "/pages/e-commerce-upgrade",
  "page_type": "case_study",
  "page_handle": "e-commerce-upgrade",
  "locale": "zh-CN",
  "country": "CN"
}
```

返回：

```json
{
  "session_id": "uuid",
  "message_id": "uuid",
  "answer": "它主要解决 Shopify 独立站页面表达、转化路径、FAQ 自助服务和知识沉淀分散的问题。",
  "confidence": 0.92,
  "matched_document_ids": [],
  "next_questions": [
    "具体做了哪些页面？",
    "有哪些结果数据？",
    "类似项目怎么开始？"
  ]
}
```

`POST /api/feedback`

请求：

```json
{
  "message_id": "uuid",
  "rating": "helpful",
  "comment": ""
}
```

### 9.2 Admin API

```txt
GET  /api/admin/dashboard

GET  /api/admin/knowledge
POST /api/admin/knowledge
GET  /api/admin/knowledge/:id
PUT  /api/admin/knowledge/:id

GET  /api/admin/faqs
POST /api/admin/faqs
PUT  /api/admin/faqs/:id
DELETE /api/admin/faqs/:id

GET  /api/admin/question-suggestions
POST /api/admin/question-suggestions
PUT  /api/admin/question-suggestions/:id
DELETE /api/admin/question-suggestions/:id

GET  /api/admin/widget-settings
PUT  /api/admin/widget-settings

GET  /api/admin/unanswered
PUT  /api/admin/unanswered/:id
POST /api/admin/unanswered/:id/convert-to-faq

POST /api/admin/sync/shopify-content
GET  /api/admin/sync-jobs
POST /api/admin/import/knowledge
```

## 10. Shopify 内容同步

MVP 同步对象：

- Pages
- Products
- Blogs
- Articles
- Policies

同步流程：

```txt
1. 创建 sync_jobs，status = running
2. 从 Shopify Admin API 拉取内容
3. 生成 source_key
4. upsert knowledge_sources
5. 清洗正文
6. upsert knowledge_documents
7. 生成 knowledge_chunks
8. embedding_status 标记为 pending
9. sync_jobs 标记 succeeded 或 failed
```

source_key 规则：

```txt
Page: page.e-commerce-upgrade
Product: product.openfit-2
Blog: blog.news
Article: article.news.help-center-strategy
Policy: policy.refund-policy
Theme template: template.product.default
Manual: manual.service-faq
Uploaded file: file.2026-service-playbook
Case study: case.shokz-help-center-rebuild
```

内容清洗规则：

- 移除页脚、导航、重复 CTA、社媒链接、cookie 文案
- 保留标题、正文、FAQ、表格关键指标、图片 alt、视频 caption
- 优先转 markdown
- 按标题和模块切 chunk
- 单个 chunk 建议 350-700 tokens
- FAQ 可一问一答一个 chunk

## 11. 知识导入

需要支持导入：

```txt
knowledge-import-format.json
```

导入能力：

- `import_mode = upsert_by_source_key`
- 导入 documents
- 导入 chunks
- 导入 faq_items
- 导入 question_suggestions
- 导入后创建 `generate_embeddings` sync_job

导入失败时必须返回：

- 哪个 document 失败
- 哪个字段不合法
- 是否部分导入成功
- sync_job 状态

## 12. 后续 RAG 增强方案

MVP 先用 FAQ 和关键词跑通。后续升级为完整 RAG：

```txt
1. 用户问题生成 embedding
2. 调用 match_knowledge_chunks
3. 同时做 full text search
4. 合并候选 chunk
5. 按页面上下文加权
6. rerank
7. 用 LLM 基于 chunk 生成回答
8. 写入 chat_messages
9. 低置信写入 unanswered_questions
```

调用示例：

```sql
select *
from public.match_knowledge_chunks(
  p_shop_id => '11111111-1111-4111-8111-111111111111',
  p_query_embedding => '[0.01,0.02,...]'::extensions.vector(1536),
  p_match_count => 8,
  p_match_threshold => 0.72,
  p_locale => 'zh-CN',
  p_page_type => 'case_study',
  p_page_handle => 'e-commerce-upgrade',
  p_filter_tags => array['case','shopify']
);
```

回答约束：

- 只基于召回内容回答
- 不确定时明确说明无法确认
- 服务咨询类问题要给下一步动作
- 案例类问题优先回答背景、动作、结果、适合谁
- 每次回答都记录 confidence

## 13. Admin UI 要求

Admin 使用 Shopify Admin 工具型界面。

风格：

- 克制
- 清晰
- 偏运营后台
- 不做营销落地页
- 不做大 hero
- 不堆装饰性卡片

组件建议：

- Dashboard：metrics card、resource list、status badge
- 列表页：table、filter、search、badge、pagination
- 编辑页：form、section、save bar、preview
- 设置页：settings layout、switch、select、text field、color field
- 状态：draft、published、needs_review、archived 用 badge 区分

如果使用 Polaris App Home web components，需要遵守：

- 使用 `s-page`、`s-section`、`s-table`、`s-button` 等 `s-` 标签
- 不要从不存在的 Polaris 包导入 web components
- string prop 使用字符串
- boolean prop 使用 shorthand 或表达式
- 写代码前先查 Shopify 文档，返回代码前执行验证脚本

## 14. Storefront UI 要求

Widget 风格要贴合当前 theme：

- 黑白为主
- 少量品牌强调色
- 字体和页面一致或接近
- 边框和阴影克制
- 不遮挡核心 CTA
- 移动端面板高度适中
- 输入框固定底部
- 推荐问题可横向滚动或自动换行

同时，前台视觉必须以 `/Users/kk/Documents/GitHub/flowingdesign/faq助手/index.html` 为第一版视觉基准：

```txt
入口形态:
  大胶囊输入框
  左侧 orb
  Ask... placeholder
  focus glow

展开形态:
  胶囊入口扩展为聊天面板
  保留 orb 作为头像 / 品牌识别
  推荐问题作为 chips
  回答消息保持轻量、留白充分

降级策略:
  动态场景 runtime 不可用时使用 CSS orb
  移动端使用紧凑胶囊或底部抽屉
```

Widget 状态：

```txt
closed
open
loading
answering
empty
error
offline / disabled
```

错误兜底：

```txt
现在暂时无法连接助手，你可以稍后再试，或直接通过联系入口提交需求。
```

## 15. 开发优先级

### 第一阶段：跑通骨架

- Shopify app scaffold
- 数据库连接
- shops 写入
- seed 数据读取
- Admin Dashboard
- Widget 设置读取
- 迁移 `faq助手/index.html` 为可加载的 Storefront Widget 静态入口
- 保留 CSS orb fallback

### 第二阶段：核心运营闭环

- FAQ CRUD
- Question suggestions CRUD
- Storefront Widget
- Chat MVP
- Feedback 写入
- Unanswered 写入

### 第三阶段：知识库能力

- Knowledge 列表和详情
- Knowledge 手动新增 / 编辑
- Chunks 展示和维护
- knowledge-import-format.json 导入

### 第四阶段：Shopify 同步

- Pages 同步
- Products 同步
- Blogs / Articles 同步
- Policies 同步
- sync_jobs 页面

### 第五阶段：RAG 增强

- Embedding job
- match_knowledge_chunks
- Hybrid retrieval
- LLM answer generation
- 低置信 review 闭环

## 16. 验收标准

完成后必须满足：

1. App 可以启动并进入 Shopify Admin。
2. 可以连接现有数据库 schema。
3. `seed.sql` 数据能在 Dashboard、Knowledge、FAQ、Suggestions 中显示。
4. FAQ 可以新增、编辑、发布、归档。
5. Widget 设置可以保存，并被前台读取。
6. 前台 Widget 可以打开、展示推荐问题、发送问题、返回答案。
7. FAQ 命中时返回可信答案和 next questions。
8. 未命中问题会写入 `unanswered_questions`。
9. 用户反馈会写入 `answer_feedback`。
10. 聊天会话会写入 `chat_sessions` 和 `chat_messages`。
11. Sync Jobs 页面能看到任务状态。
12. README 写清楚运行方式、环境变量、数据库初始化、MVP 限制和下一步。
13. `faq助手/index.html` 的胶囊式 Ask 入口已经迁移到前台 Widget。
14. `creating_remix_scene.data.js` 已被正确放入可加载资产，或在 runtime 缺失时明确启用 CSS fallback。
15. 前台 Widget CSS 已做作用域隔离，不影响当前 Shopify theme。

## 17. 明确不做

MVP 暂不做：

- 多语言完整翻译管理
- 完整 LLM RAG 回答生成
- 高级权限分级
- CRM 集成
- 邮件营销集成
- 复杂用户画像
- 自动 A/B 测试
- 复杂 analytics dashboard

但代码结构必须为这些能力预留扩展点。

## 18. 重要约束

- 不要重新设计数据库。
- 不要把它做成普通客服机器人。
- 不要把 Admin 做成营销页。
- 不要一开始就依赖真实 LLM 才能跑通。
- MVP 必须能用 seed 数据、FAQ 和简单匹配工作。
- 所有前台问题都要记录 session 和 message。
- 所有低置信问题都要进入 unanswered。
- 所有反馈都要进入 answer_feedback。
- 所有 API 都要带 shop 隔离。
- 所有知识内容都要区分 locale。
- 所有页面上下文都要传入 Chat API。

## 19. 推荐交付物

App Codex 最终应输出：

```txt
apps/faq-assistant/
  Shopify App 源码

README.md
  运行方式
  环境变量
  数据库初始化
  Shopify 配置
  Widget 安装方式
  MVP 限制
  下一步计划

Admin 页面
  Dashboard
  Knowledge
  FAQ
  Suggestions
  Widget Settings
  Unanswered
  Sync Jobs

Storefront Widget
  Theme app extension 或 script 注入
  从 faq助手/index.html 迁移的胶囊式 Ask 入口
  creating_remix_scene.data.js 或 CSS fallback
  作用域隔离后的 widget CSS

API
  Widget API
  Chat API
  Feedback API
  Admin CRUD API
  Sync API
  Import API

Service / Repository 层
  shop repository
  faq repository
  knowledge repository
  chat service
  suggestion service
  sync service
  import service
  retrieval service
```

## 20. 一句话执行策略

先用数据库 seed 数据跑通 Admin、FAQ、Widget、Chat 和未回答问题闭环，再接 Shopify 内容同步，最后接 embedding 和 RAG。
