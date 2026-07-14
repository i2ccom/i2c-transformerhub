export interface NodeData {
  id: string;
  alias: string;
  type: string;
  inputs: string[];
  outputs: string[];
  properties: Record<string, any>;
}

export interface FlowDefinition {
  id?: string;
  name: string;
  description?: string;
  nodes: NodeDefinition[];
  connections: ConnectionDefinition[];
  context?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface NodeDefinition {
  id: string;
  alias: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  properties: Record<string, any>;
}

export interface ConnectionDefinition {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  outputName: string;
  inputName: string;
}

export interface NodeTypeDefinition {
  type: string;
  category: 'source' | 'action' | 'sink';
  group: string;
  name: string;
  description: string;
  inputs: string[];
  outputs: string[];
  properties?: Record<string, PropertyDefinition>;
  jsonSchema?: JsonSchemaDefinition;
  icon?: string;
  isFavorite?: boolean;
}

export interface PropertyDefinition {
  type: string;
  default: any;
  required: boolean;
  options?: any[];
}

export interface JsonSchemaDefinition {
  type?: string | string[];
  title?: string;
  description?: string;
  default?: any;
  enum?: any[];
  format?: string;
  items?: JsonSchemaDefinition;
  properties?: Record<string, JsonSchemaDefinition>;
  required?: string[];
}

export interface ExecutionResult {
  status: 'running' | 'paused' | 'completed' | 'error' | 'stopped';
  error?: string;
  executedNodes: string[];
  pendingNodes?: string[];
  outputs?: Record<string, any>;
  context?: Record<string, any>;
}
