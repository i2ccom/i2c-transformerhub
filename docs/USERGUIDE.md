# TransformerHub User Guide

## Overview

TransformerHub lets you build flow-based pipelines by connecting data source, action, and sink nodes in a visual graph.

This guide focuses on end-user workflow: create flow, configure nodes, run, inspect results, and iterate.

## Core Concepts

- Flow: A directed graph of connected nodes.
- Node: A unit that reads, transforms, or outputs data.
- Edge: A connection from one node output to another node input.
- Runtime: The shared execution engine that runs flows.

## Typical Workflow

1. Open the editor UI in the web app.
2. Create a new flow.
3. Add one or more data source nodes.
4. Add action nodes to transform data.
5. Add sink nodes to persist or emit output.
6. Configure each node's properties.
7. Connect nodes in execution order.
8. Save the flow.
9. Execute and review output or logs.
10. Refine node settings and rerun.

## Create Your First Flow

Example: Read JSON, transform fields, write to file.

1. Add `JSONFileNode` as source.
2. Add `DataMapper` to map incoming fields.
3. Add `DataValidator` for validation rules.
4. Add `FileWriter` as sink.
5. Configure each node:
   - `JSONFileNode`: input path or payload source.
   - `DataMapper`: source-to-target field mapping.
   - `DataValidator`: required fields and constraints.
   - `FileWriter`: output destination and format.
6. Connect source -> mapper -> validator -> writer.
7. Save and execute.

## Node Configuration Tips

- Start with defaults, then customize only required fields.
- Validate schema early using validator nodes.
- Keep transformations in small steps instead of one large mapping.
- Use clear node names so run traces are easier to read.

## Execution Lifecycle

- Execute: starts a flow run.
- Pause: temporarily halts processing when supported.
- Resume: continues from paused state.
- Stop: cancels current run.

Use stop and rerun when changing flow topology (adding/removing nodes or edges).

## Troubleshooting

### Flow does not execute

- Confirm source node has valid input configuration.
- Confirm every required input port is connected.
- Check backend availability and API URL config in web env.

### Output is empty

- Verify mapper rules and field names.
- Verify filters are not removing all records.
- Add intermediate nodes to inspect data shape after each stage.

### Validation errors

- Compare payload fields with expected schema.
- Ensure required fields are produced before validator node.

## Best Practices

- Keep flows focused: one pipeline per clear business goal.
- Reuse known-good node templates when possible.
- Save frequently and version meaningful milestones.
- Document assumptions in flow descriptions.

## Suggested Learning Path

1. Build a simple file-to-file pipeline.
2. Add branching and conditional logic.
3. Add external APIs and retries.
4. Add notifications and scheduling.
