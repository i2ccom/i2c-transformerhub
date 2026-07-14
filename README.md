<p align="center">
	<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TransformerHub hub logo">
		<defs>
			<radialGradient id="thCore" cx="50%" cy="50%" r="50%">
				<stop offset="0%" stop-color="#E8FBFF"/>
				<stop offset="45%" stop-color="#5DD8FF"/>
				<stop offset="100%" stop-color="#007DFF"/>
			</radialGradient>
			<linearGradient id="thOrbit" x1="18" y1="26" x2="162" y2="154" gradientUnits="userSpaceOnUse">
				<stop stop-color="#00D4FF"/>
				<stop offset="1" stop-color="#7C4DFF"/>
			</linearGradient>
			<filter id="thGlow" x="0" y="0" width="180" height="180" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
				<feGaussianBlur stdDeviation="3.5" result="blur"/>
				<feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0.05  0 0 1 0 0.25  0 0 0 0.9 0" result="colored"/>
				<feMerge>
					<feMergeNode in="colored"/>
					<feMergeNode in="SourceGraphic"/>
				</feMerge>
			</filter>
		</defs>
		<rect x="14" y="14" width="152" height="152" rx="34" fill="#07111F"/>
		<circle cx="90" cy="90" r="54" stroke="url(#thOrbit)" stroke-width="6" stroke-dasharray="10 10" opacity="0.3"/>
		<circle cx="90" cy="90" r="34" stroke="url(#thOrbit)" stroke-width="4" opacity="0.35"/>
		<g filter="url(#thGlow)">
			<path d="M90 28V56" stroke="url(#thOrbit)" stroke-width="5" stroke-linecap="round"/>
			<path d="M90 124V152" stroke="url(#thOrbit)" stroke-width="5" stroke-linecap="round"/>
			<path d="M28 90H56" stroke="url(#thOrbit)" stroke-width="5" stroke-linecap="round"/>
			<path d="M124 90H152" stroke="url(#thOrbit)" stroke-width="5" stroke-linecap="round"/>
			<path d="M46 46L66 66" stroke="url(#thOrbit)" stroke-width="5" stroke-linecap="round"/>
			<path d="M114 114L134 134" stroke="url(#thOrbit)" stroke-width="5" stroke-linecap="round"/>
			<path d="M134 46L114 66" stroke="url(#thOrbit)" stroke-width="5" stroke-linecap="round"/>
			<path d="M66 114L46 134" stroke="url(#thOrbit)" stroke-width="5" stroke-linecap="round"/>
			<circle cx="90" cy="90" r="19" fill="url(#thCore)"/>
			<circle cx="90" cy="90" r="26" stroke="#E6FBFF" stroke-width="2" opacity="0.7"/>
			<circle cx="90" cy="28" r="8" fill="#00D4FF"/>
			<circle cx="152" cy="90" r="8" fill="#7C4DFF"/>
			<circle cx="90" cy="152" r="8" fill="#00D4FF"/>
			<circle cx="28" cy="90" r="8" fill="#7C4DFF"/>
			<circle cx="46" cy="46" r="7" fill="#00D4FF"/>
			<circle cx="134" cy="46" r="7" fill="#7C4DFF"/>
			<circle cx="46" cy="134" r="7" fill="#7C4DFF"/>
			<circle cx="134" cy="134" r="7" fill="#00D4FF"/>
		</g>
	</svg>
</p>

<h1 align="center">TransformerHub</h1>

<p align="center">
	<strong>AI-first, HyperGraph-native, HyperAI-native middleware and integration layer</strong>
</p>

<p align="center">
	<img src="https://img.shields.io/badge/workspace-pnpm-4A4A4A?logo=pnpm&logoColor=white" alt="pnpm workspace badge" />
	<img src="https://img.shields.io/badge/language-TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript badge" />
	<img src="https://img.shields.io/badge/architecture-AI--first-00C2FF" alt="AI-first badge" />
	<img src="https://img.shields.io/badge/runtime-HyperGraph--native-7C4DFF" alt="HyperGraph-native badge" />
	<img src="https://img.shields.io/badge/runtime-HyperAI--native-00B894" alt="HyperAI-native badge" />
</p>

TransformerHub is a TypeScript monorepo for building and running visual, node-based data transformation flows.

It is organized as a pnpm workspace with a backend API, a web editor, and a shared runtime package.

TransformerHub is designed as an AI-first platform and is HyperGraph-native and HyperAI-native by architecture.
In the broader ecosystem, it plays the middleware and integration-layer role beside Kitchen and Quang.

## Ecosystem Positioning

- AI-first orchestration: flows are designed to include AI reasoning, transformation, and automation as a core capability.
- HyperGraph-native integration: flow contracts and runtime boundaries are aligned for interoperability with HyperGraph-driven systems.
- HyperAI-native execution: node-level actions are designed to support AI-centric workloads across text, image, audio, and video pipelines.
- Middleware role: TransformerHub mediates data movement, transformation, and control-plane handoff between ecosystem services.
- Beside Kitchen and Quang: TransformerHub focuses on integration and runtime orchestration while adjacent platforms handle their domain responsibilities.

## Declarative Node UI

TransformerHub supports dynamic node configuration UI generated from declarative metadata.

- Node type payloads can expose JSON Schema for node properties.
- The web Property Editor renders form controls from schema definitions.
- Legacy property definitions are still supported as a compatibility fallback.

## Available Nodes

Full node reference: [docs/design/nodes-registry.md](docs/design/nodes-registry.md)

<details>
<summary>Data source nodes</summary>

- JSONFileNode - load structured JSON from files or mounted content.
- XMLFileNode - ingest XML documents for conversion and mapping.
- CSVFileNode - read tabular CSV data for ETL-style pipelines.
- VideoFileNode - start media workflows from local or mounted video files.
- AudioFileNode - start audio workflows from source media files.
- ImageFileNode - ingest images for tagging, processing, or transformation.
- SQLDatabaseNode - query relational databases.
- NoSQLDatabaseNode - read from document or key-value stores.
- RESTAPINode - pull data from REST endpoints.
- GraphQLAPINode - query GraphQL services.
- WebSocketNode - stream real-time events/messages into a flow.
- FormDataNode - ingest form submissions and file uploads.
- RSSFeedNode - poll and process RSS feed items.
- EmailSourceNode - ingest incoming email content and metadata.

</details>

<details>
<summary>Action nodes</summary>

- JSONValidatorNode - validate JSON payload structure and required fields.
- CustomScriptNode - run custom transformation logic when native nodes are not enough.
- AICommand - run command-style AI operations from prompts.
- AITextTransform - summarize, rewrite, classify, or normalize text.
- AIImageGen - generate images from prompt-driven inputs.
- AIVideoGen - synthesize or generate video outputs from context.
- AudioTranscribe - convert audio speech to text.
- AudioNoiseReduction - remove noise before downstream audio work.
- AudioMix - mix multiple audio tracks into one output.
- VideoCompose - assemble clips and media assets into a composed timeline.
- YouTubeUploader - publish video artifacts to YouTube workflows.
- XMLTransformer - transform XML documents between schemas.
- VideoTranscoder - change video codec, bitrate, or output format.
- TextAnalyzer - extract keywords, sentiment, and text metadata.
- TemplateRenderer - render documents from templates and data.
- Scheduler - trigger work on time-based rules.
- NotificationSender - send channel-agnostic notifications.
- MLPredictor - run model inference and predictions.
- ImageProcessor - resize, filter, or transform images.
- HTTPRequest - call external HTTP services for enrichment or side effects.
- FileWriter - write transformed payloads to files.
- EmailSender - send email messages from flow results.
- DataValidator - validate non-JSON business rules and constraints.
- DataMapper - map one data shape into another.
- DataJoiner - combine records from multiple branches or sources.
- DataFilter - keep or discard records by rule.
- DatabaseWriter - persist flow outputs into databases.
- DataAggregator - group and summarize records.
- ConditionalBranch - route execution based on rule evaluation.

</details>

<details>
<summary>Sink nodes</summary>

- OutputLogNode - emit final results to logs or console sinks.
- SendEmailNode - deliver final outputs by email.
- SendPushNotificationNode - publish notifications to apps/devices.
- MediaViewerNode - preview generated media in a terminal endpoint.
- UploadToYoutubeNode - publish final media to YouTube.
- UploadGGDriveNode - upload artifacts to Google Drive.
- UploadS3Node - upload artifacts to Amazon S3.
- UploadFTPNode - transfer files to FTP targets.

</details>

## Packages

- [th-backend](th-backend): Express API service for flows and node metadata.
- [th-web](th-web): React + Vite frontend for visual flow editing.
- [th-shared](th-shared): Shared flow runtime, node registry, and simulation utilities.

## Monorepo Layout

```text
TransformerHub/
├─ package.json
├─ pnpm-workspace.yaml
├─ docs/
│  ├─ PLAN.md
│  ├─ TODO.md
│  ├─ HOWTO.md
│  ├─ AI_GUIDELINE.md
│  └─ progress/
│     └─ v0.1.md
├─ th-backend/
├─ th-web/
└─ th-shared/
```

## Prerequisites

- Node.js 20+
- pnpm 10+

## Quick Start

1. Install all workspace dependencies from repo root:

```bash
pnpm install
```

2. Run backend and frontend in parallel:

```bash
pnpm dev
```

3. Build all packages:

```bash
pnpm build
```

## Useful Commands

- Start all package dev servers: `pnpm dev`
- Build all packages: `pnpm build`
- Run all tests: `pnpm test`
- Run a single package script:

```bash
pnpm --filter th-web dev
pnpm --filter th-backend dev
pnpm --filter th-shared build
```

## Environment Notes

- `th-backend/.env` controls API port, storage mode, and database connection.
- `th-web/.env` controls frontend runtime env values such as API base URL.

## Documentation Index

| Document | Purpose |
| --- | --- |
| [Plan](docs/PLAN.md) | Roadmap and delivery phases. |
| [Todo](docs/TODO.md) | Working backlog and follow-up items. |
| [HowTo](docs/HOWTO.md) | Setup and common contributor workflows. |
| [AI Guideline](docs/AI_GUIDELINE.md) | AI-assisted contribution guardrails. |
| [Architecture](docs/design/Architecture.md) | System boundaries and design principles. |
| [Node Registry](docs/design/nodes-registry.md) | Node catalog, types, and usage. |
| [Compare Frameworks](docs/reports/compare_frameworks.md) | Competitive positioning analysis. |
| [Progress Journal](docs/progress/v0.1.md) | Milestone log and current status. |

## Current Status

The repository now uses a root pnpm workspace with standardized root scripts for day-to-day development.

## Contributing

1. Create a branch from main.
2. Make focused changes in one package at a time.
3. Update relevant docs in `docs/`.
4. Run build and tests before opening a PR.

