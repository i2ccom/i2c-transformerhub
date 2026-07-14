# TransformerHub Nodes Registry

## Scope

This document lists all currently available nodes from the shared runtime package and summarizes practical usage for each one.

Source of truth:

- th-shared/src/nodes/dataSourceNodes.ts
- th-shared/src/nodes/actionNodes.ts
- th-shared/src/nodes/sinkNodes.ts

Total nodes currently listed: 51

- Data Source nodes: 14
- Action nodes: 29
- Sink nodes: 8

## Data Source Nodes

These nodes ingest data into a flow.

| Node | Typical Usage |
| --- | --- |
| JSONFileNode | Load structured JSON payloads from file-based inputs. |
| XMLFileNode | Ingest XML documents for downstream conversion or mapping. |
| CSVFileNode | Read tabular CSV records for validation and transformation. |
| VideoFileNode | Start media pipelines from local or mounted video files. |
| AudioFileNode | Start audio pipelines from audio file content. |
| ImageFileNode | Ingest images for processing, tagging, or transformation steps. |
| SQLDatabaseNode | Read records from relational databases through SQL queries. |
| NoSQLDatabaseNode | Read documents from document or key-value data stores. |
| RESTAPINode | Pull remote data over HTTP REST endpoints. |
| GraphQLAPINode | Query remote GraphQL services for targeted data selection. |
| WebSocketNode | Stream real-time messages/events into the flow. |
| FormDataNode | Ingest user-submitted form fields and files. |
| RSSFeedNode | Poll RSS feeds and transform feed items. |
| EmailSourceNode | Ingest incoming email content and metadata. |

## Action Nodes

These nodes transform, enrich, branch, validate, or orchestrate work between input and output stages.

| Node | Typical Usage |
| --- | --- |
| JSONValidatorNode | Validate JSON payloads against structural constraints or schema-like rules. |
| CustomScriptNode | Execute custom transformation logic when built-in nodes are insufficient. |
| AICommand | Run command-style AI operations on prompt-driven tasks. |
| AITextTransform | Rewrite, summarize, classify, or normalize text content. |
| AIImageGen | Generate images from prompts or conditioning metadata. |
| AIVideoGen | Generate or synthesize short video outputs from prompt/context input. |
| AudioTranscribe | Convert speech/audio streams into text for downstream processing. |
| AudioNoiseReduction | Clean noisy audio before transcription or mixing. |
| AudioMix | Combine multiple audio tracks into a mixed output. |
| VideoCompose | Assemble multiple clips/assets into a composed timeline. |
| YouTubeUploader | Upload completed video assets to YouTube workflows. |
| XMLTransformer | Convert or reshape XML documents between schemas/formats. |
| VideoTranscoder | Convert video codecs, bitrates, or output formats. |
| TextAnalyzer | Extract sentiment, keywords, entities, or textual metadata. |
| TemplateRenderer | Render output text/documents from template + data context. |
| Scheduler | Trigger or gate actions based on scheduling/time rules. |
| NotificationSender | Send generic notifications to configured channels. |
| MLPredictor | Perform prediction/inference with configured ML model settings. |
| ImageProcessor | Resize/filter/transform image content in media pipelines. |
| HTTPRequest | Call external HTTP services for enrichment or side effects. |
| FileWriter | Persist transformed payloads to file destinations. |
| EmailSender | Send outbound email messages from flow results. |
| DataValidator | Validate non-JSON payload quality/business constraints. |
| DataMapper | Map fields from one schema/shape into another. |
| DataJoiner | Join data sets from multiple branches/sources. |
| DataFilter | Keep or remove records by rule expressions. |
| DatabaseWriter | Persist flow outputs into database targets. |
| DataAggregator | Group/roll up records into summary metrics. |
| ConditionalBranch | Route processing path based on condition evaluation. |

## Sink Nodes

These nodes represent terminal outputs or delivery endpoints.

| Node | Typical Usage |
| --- | --- |
| OutputLogNode | Write final output to logs/console sinks for inspection. |
| SendEmailNode | Deliver terminal results via email channel. |
| SendPushNotificationNode | Send push/mobile/app notifications as final actions. |
| MediaViewerNode | Present generated media for review or QA display. |
| UploadToYoutubeNode | Publish final video artifacts to YouTube. |
| UploadGGDriveNode | Upload files/media outputs to Google Drive. |
| UploadS3Node | Push artifacts to Amazon S3 buckets. |
| UploadFTPNode | Transfer output files to FTP servers. |

## Usage Patterns

### Pattern A: File ETL

1. CSVFileNode
2. DataMapper
3. DataValidator
4. DatabaseWriter or FileWriter

### Pattern B: API Enrichment

1. RESTAPINode
2. DataJoiner (with local source)
3. DataFilter
4. NotificationSender

### Pattern C: Media Pipeline

1. VideoFileNode or AudioFileNode
2. VideoTranscoder or AudioNoiseReduction
3. VideoCompose or AudioMix
4. UploadS3Node or UploadToYoutubeNode

### Pattern D: AI Content Flow

1. JSONFileNode or FormDataNode
2. AITextTransform or AIImageGen
3. TemplateRenderer
4. SendEmailNode or OutputLogNode

## Node Selection Guidance

- Prefer DataMapper + DataValidator before external writes.
- Use ConditionalBranch when one input can lead to multiple business paths.
- Use sink nodes only at the end of execution branches.
- Keep CustomScriptNode as a last-resort extension point when native nodes cannot represent the rule.

## Maintenance Note

When adding or removing nodes in th-shared/src/nodes, update this file in the same change set to keep product docs consistent with runtime capabilities.
