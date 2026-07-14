import express, { Router } from 'express';
import type { Request, Response } from 'express';
import {dataSourceNodes, actionNodes, sinkNodes } from 'th-shared';


const router: Router = Router();

interface NodeType {
  type: string;
  category: string;
  name: string;
  description: string;
  inputs: string[];
  outputs: string[];
  properties?: Record<string, any>;
  jsonSchema?: JsonSchema;
  icon?: string;
}

interface JsonSchema {
  type: 'object';
  properties: Record<string, {
    type: string;
    default?: any;
    enum?: any[];
  }>;
  required?: string[];
}

interface NodeTypeInfo extends NodeType {
  instance?: any;
  nodeClass?: any;
}

router.get('/', (req: Request, res: Response) => {
  // console.log('Fetching node types...', dataSourceNodes, actionNodes);
  const allNodeTypes = getAllNodeTypes();
  res.json(allNodeTypes);
});

router.get('/:type', (req: Request, res: Response) => {
  const { type } = req.params;
  let nodeInfo: NodeTypeInfo | null = null;

  const allNodeTypes = getAllNodeTypes();
  for (const nodeType of allNodeTypes) {
    if (nodeType.type === type) {
      const properties = getPropertiesForNodeType(nodeType.instance);
      nodeInfo = {
        ...nodeType,
        properties,
        jsonSchema: buildJsonSchemaFromProperties(properties),
        // icon: instance.icon || null,
      };
      break;
    }
  }

  if (!nodeInfo) {
    return res.status(404).json({ error: 'Node type not found' });
  }

  res.json(nodeInfo);
});

function createNodeTypeInstanceInfo(NodeClass: any, key: string): NodeTypeInfo {
  const instance = new NodeClass('temp', 'temp');
  return {
    type: instance.type,
    category: 'source',
    name: key.replace('Node', ''),
    description: `${key.replace('Node', '')} data source`,
    nodeClass: NodeClass,
    instance,
    inputs: [],
    outputs: [],
  };
}

function getAllNodeTypes(): NodeType[] {
  const dataSourceNodeTypes: NodeType[] = Object.keys(dataSourceNodes)
    .filter(key => key !== 'BaseDataNode')
    .map(key => {
      const NodeClass = dataSourceNodes[key];
      const instanceInfo = createNodeTypeInstanceInfo(NodeClass, key);

      return {
        ...instanceInfo,
        inputs: [],
        outputs: ['output'],
      };
    });

  const actionNodeTypes: NodeType[] = Object.keys(actionNodes)
    .filter(key => key !== 'BaseActionNode')
    .map(key => {
      const NodeClass = actionNodes[key];
      const instanceInfo = createNodeTypeInstanceInfo(NodeClass, key);

      return {
        ...instanceInfo,
        category: 'action',
        inputs: ['data'],
        outputs: ['output'],
      };
    });

  const sinkNodeTypes: NodeType[] = Object.keys(sinkNodes)
    .filter(key => key !== 'BaseSinkNode')
    .map(key => {
      const NodeClass = sinkNodes[key];
      const instanceInfo = createNodeTypeInstanceInfo(NodeClass, key);

      return {
        ...instanceInfo,
        category: 'sink',
        inputs: ['data'],
        outputs: [],
      };
    });
  const allNodeTypes = [...dataSourceNodeTypes, ...actionNodeTypes, ...sinkNodeTypes];
  return allNodeTypes;
}

function getPropertiesForNodeType(instance: any): Record<string, any> {
  const properties: Record<string, any> = {};

  for (const [key, value] of Object.entries(instance)) {
    if (['id', 'alias', 'type', 'status', 'error', 'output', 'inputs', 'data'].includes(key)) {
      continue;
    }

    let type : any = typeof value;
    if (Array.isArray(value)) {
      type = 'array';
    } else if (value === null) {
      type = 'null';
    }

    properties[key] = {
      type,
      default: value,
      required: false
    };
  }

  return properties;
}

function buildJsonSchemaFromProperties(properties: Record<string, any>): JsonSchema {
  const schema: JsonSchema = {
    type: 'object',
    properties: {},
    required: [],
  };

  for (const [key, definition] of Object.entries(properties)) {
    const propertySchema: {
      type: string;
      default?: any;
      enum?: any[];
    } = {
      type: definition.type || 'string',
    };

    if (definition.default !== undefined) {
      propertySchema.default = definition.default;
    }

    if (Array.isArray(definition.options) && definition.options.length > 0) {
      propertySchema.enum = definition.options;
    }

    schema.properties[key] = propertySchema;

    if (definition.required) {
      schema.required?.push(key);
    }
  }

  if (schema.required && schema.required.length === 0) {
    delete schema.required;
  }

  return schema;
}

export default router;
