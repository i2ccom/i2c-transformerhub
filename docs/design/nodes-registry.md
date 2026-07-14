# TransformerHub Nodes Registry

## Purpose

This document is the canonical node catalog for TransformerHub. It is written for both product readers and implementers and explains what each node type does, which payload shape it expects, and when it is the right choice.

Source of truth:

- [th-shared/src/nodes/dataSourceNodes.ts](../../th-shared/src/nodes/dataSourceNodes.ts)
- [th-shared/src/nodes/actionNodes.ts](../../th-shared/src/nodes/actionNodes.ts)
- [th-shared/src/nodes/sinkNodes.ts](../../th-shared/src/nodes/sinkNodes.ts)

## Type Model

TransformerHub node types fall into three runtime categories:

- Source nodes start a flow by reading from files, APIs, messages, or databases.
- Action nodes transform, validate, enrich, branch, or orchestrate data.
- Sink nodes end a branch by delivering, storing, or displaying output.

The web editor uses this metadata to generate node UI:

- `inputs` and `outputs` define connector handles.
- `properties` or `jsonSchema` define configuration fields.
- `category` controls where the node appears in the palette.
- `group` helps organize nodes by domain or capability.

## Configuration Conventions

- string: freeform text or identifier values.
- number / integer: numeric settings such as limits, counts, or thresholds.
- boolean: enable/disable switches.
- object: structured nested settings, often shown as JSON.
- array: repeatable lists such as headers, tags, or rules.
- enum: finite selection rendered as a dropdown.
- format: special handling for values like email, uri, date, or json.

## Data Source Nodes

These nodes ingest external or file-based data into a flow.

| Node | Runtime Role | Inputs | Outputs | Typical Config | Best Used For |
| --- | --- | --- | --- | --- | --- |
| JSONFileNode | Read JSON payloads from file or mounted content. | None | `output` | `filePath`, `schema`, parse options | Structured file ingestion, config import, content payloads. |
| XMLFileNode | Read XML documents. | None | `output` | `filePath`, parse mode, namespace options | Interchange formats, legacy system payloads. |
| CSVFileNode | Parse tabular CSV records. | None | `output` | `filePath`, `delimiter`, header handling | Spreadsheet data, ETL staging, exports. |
| VideoFileNode | Load video media as a source payload. | None | `output` | `filePath`, codec hints, metadata extraction | Media pipelines and video transformations. |
| AudioFileNode | Load audio media as a source payload. | None | `output` | `filePath`, sample rate, channel settings | Speech, music, and transcription flows. |
| ImageFileNode | Load image assets into the flow. | None | `output` | `filePath`, size metadata, image format | Image processing, tagging, and generation pipelines. |
| SQLDatabaseNode | Query relational data. | None | `output` | connection string, query text, paging options | Warehouse reads, reporting, operational extracts. |
| NoSQLDatabaseNode | Query document or key-value stores. | None | `output` | connection config, collection, query filter | Flexible document data and event snapshot reads. |
| RESTAPINode | Fetch data from REST endpoints. | None | `output` | URL, headers, auth, method, retries | SaaS/API integration and enrichment. |
| GraphQLAPINode | Query GraphQL services. | None | `output` | endpoint, query, variables, auth | Precise API reads with schema-aware selection. |
| WebSocketNode | Subscribe to real-time messages. | None | `output` | endpoint, reconnect rules, event filters | Streaming updates, event feeds, live control data. |
| FormDataNode | Accept form submissions as input. | None | `output` | field definitions, validation, file handling | Human input capture and lightweight workflow triggers. |
| RSSFeedNode | Poll and parse RSS/Atom feeds. | None | `output` | feed URL, polling interval, dedupe settings | Content aggregation and change monitoring. |
| EmailSourceNode | Ingest incoming email messages. | None | `output` | mailbox settings, filters, attachment handling | Support inboxes, ticket intake, operational triggers. |

### Source Node Selection Guidance

- Use file sources when the upstream system exports a stable artifact.
- Use API sources when freshness matters more than batch efficiency.
- Use database sources when you need reliable query semantics and paging.
- Use streaming sources when events must be processed with low latency.

## Action Nodes

These nodes perform transformation, validation, AI operations, control flow, or orchestration.

| Node | Runtime Role | Inputs | Outputs | Typical Config | Best Used For |
| --- | --- | --- | --- | --- | --- |
| JSONValidatorNode | Validate payload structure and required fields. | `data` | `output` or error | schema rules, required paths, strict mode | Early guardrails before expensive actions. |
| CustomScriptNode | Execute arbitrary custom logic. | `data` | `output` | script body, language, sandbox settings | One-off business rules and bridge logic. |
| AICommand | Execute prompt-driven AI commands. | `data` | `output` | prompt, model settings, temperature | AI-controlled routing and task execution. |
| AITextTransform | Rewrite, summarize, classify, or normalize text. | `data` | `output` | prompt, tone, language, output style | Content operations, support automation, enrichment. |
| AIImageGen | Generate images from text/context. | `data` | `output` | prompt, style, size, seed | Creative generation and AI media workflows. |
| AIVideoGen | Generate or synthesize video outputs. | `data` | `output` | prompt, duration, format, style | Storyboard-to-video and generative media. |
| AudioTranscribe | Convert audio to text. | `data` | `output` | language, diarization, timestamps | Speech notes, meeting capture, support analysis. |
| AudioNoiseReduction | Reduce noise on audio streams. | `data` | `output` | reduction level, profile, preserve speech | Prepare audio for transcription or publishing. |
| AudioMix | Merge and balance multiple audio tracks. | `data` | `output` | gain, normalization, track rules | Podcasts, voice plus music, multitrack edits. |
| VideoCompose | Assemble multiple video assets. | `data` | `output` | composition template, transitions, overlays | Marketing clips, batch video assembly. |
| YouTubeUploader | Publish finished video to YouTube. | `data` | `output` | credentials, title, privacy, category | Direct publishing after composition. |
| XMLTransformer | Convert XML to another structure or schema. | `data` | `output` | source schema, target schema, mapping rules | Legacy integration and format migration. |
| VideoTranscoder | Re-encode media formats. | `data` | `output` | codec, resolution, bitrate, preset | Delivery-ready media transformation. |
| TextAnalyzer | Analyze text for insight or metadata. | `data` | `output` | sentiment, entities, keyword extraction | Triage, classification, search enrichment. |
| TemplateRenderer | Render templates with data context. | `data` | `output` | template string, variables, escaping rules | Documents, emails, and notifications. |
| Scheduler | Trigger time-based work. | `data` or none | `output` | cron/rule config, timezone, recurrence | Delayed actions and periodic jobs. |
| NotificationSender | Send notifications to configured channels. | `data` | `output` | channel, recipients, priority | Cross-channel alerts and workflow completion notices. |
| MLPredictor | Run inference against a model. | `data` | `output` | model name, features, threshold | Classification and prediction pipelines. |
| ImageProcessor | Manipulate image content. | `data` | `output` | resize, crop, filter, format | Media conversion and visual preprocessing. |
| HTTPRequest | Call outbound HTTP services. | `data` | `output` | URL, method, headers, retries | Webhooks, service calls, enrichment steps. |
| FileWriter | Write data to a file target. | `data` | `output` | file path, encoding, overwrite mode | Export, archiving, and report generation. |
| EmailSender | Send outbound email. | `data` | `output` | SMTP/service config, subject, recipients | Notifications, alerts, generated reports. |
| DataValidator | Validate business rules and payload quality. | `data` | `output` | rules, thresholds, fail-fast | Quality gates before persistence. |
| DataMapper | Reshape objects from one contract into another. | `data` | `output` | field mapping, defaults, cast rules | Core ETL and integration mapping. |
| DataJoiner | Combine multiple upstream records. | multiple `data` | `output` | join key, strategy, dedupe | Aggregating branch outputs or reference data. |
| DataFilter | Include or exclude items by rule. | `data` | `output` | condition language, keep/drop semantics | Routing, trimming, and normalization. |
| DatabaseWriter | Persist results to a database. | `data` | `output` | connection, table/collection, upsert mode | Final write-back to operational systems. |
| DataAggregator | Group and summarize records. | `data` | `output` | group keys, metrics, windows | Rollups, reporting, and analytics prep. |
| ConditionalBranch | Route the flow by condition. | `data` | multiple outputs | expressions, branch labels, default path | Complex decision trees and routing logic. |

### Action Node Families

- Validation: JSONValidatorNode, DataValidator.
- Mapping and shaping: DataMapper, XMLTransformer, TemplateRenderer.
- AI: AICommand, AITextTransform, AIImageGen, AIVideoGen, MLPredictor.
- Media: AudioTranscribe, AudioNoiseReduction, AudioMix, VideoCompose, VideoTranscoder, ImageProcessor.
- Orchestration: Scheduler, ConditionalBranch, NotificationSender, HTTPRequest.
- Persistence/output: FileWriter, EmailSender, DatabaseWriter, YouTubeUploader.

## Sink Nodes

These nodes finish a branch by delivering or displaying output.

| Node | Runtime Role | Inputs | Outputs | Typical Config | Best Used For |
| --- | --- | --- | --- | --- | --- |
| OutputLogNode | Emit final output to logs or console. | `data` | None | log level, formatting, sampling | Debugging, observability, QA. |
| SendEmailNode | Terminal email delivery. | `data` | None | subject, recipients, template | Notifications and reports. |
| SendPushNotificationNode | Terminal push notification delivery. | `data` | None | channel, recipients, urgency | User alerts and mobile operations. |
| MediaViewerNode | Preview media at the end of a flow. | `data` | None | display mode, metadata, autoplay | Human review and approval. |
| UploadToYoutubeNode | Publish media to YouTube. | `data` | None | account, title, visibility | Media publishing and distribution. |
| UploadGGDriveNode | Upload artifacts to Google Drive. | `data` | None | folder, permissions, naming | Team handoff and storage. |
| UploadS3Node | Upload artifacts to S3. | `data` | None | bucket, prefix, access control | Durable object storage. |
| UploadFTPNode | Transfer files to an FTP endpoint. | `data` | None | host, path, credentials | Legacy delivery endpoints. |

### Sink Node Guidance

- Use a sink node only at the end of a branch.
- Prefer a sink that matches the delivery contract of the target system.
- Use log/view sinks during development and QA.

## Common Usage Patterns

### File ETL

1. CSVFileNode
2. DataMapper
3. DataValidator
4. DatabaseWriter or FileWriter

### API Enrichment

1. RESTAPINode
2. DataJoiner
3. DataFilter
4. NotificationSender or EmailSender

### Media Pipeline

1. VideoFileNode or AudioFileNode
2. VideoTranscoder or AudioNoiseReduction
3. VideoCompose or AudioMix
4. UploadS3Node or UploadToYoutubeNode

### AI Content Flow

1. JSONFileNode or FormDataNode
2. AITextTransform or AIImageGen
3. TemplateRenderer
4. SendEmailNode or OutputLogNode

## Dynamic Schema Usage

TransformerHub can turn node schemas into UI controls directly.

- Start with `jsonSchema` when available.
- Fall back to legacy `properties` metadata when schema is missing.
- Use enums for strict dropdowns.
- Use object/array fields for nested configuration.
- Favor schema-driven node definition updates when adding new nodes.

## Maintenance Rule

If a node is added, renamed, removed, or changes configuration shape in `th-shared`, update this registry in the same change set.
