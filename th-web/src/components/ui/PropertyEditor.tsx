import React, { useState, useEffect } from 'react';
import { Node } from 'reactflow';
import styled from 'styled-components';
import { JsonSchemaDefinition, NodeData, NodeTypeDefinition } from '../../types';
import { nodeTypesApi } from '../../services/api';

const PropertyEditorContainer = styled.div`
  padding: 16px;
`;

const PropertyEditorTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 16px;
  color: #495057;
`;

const PropertyGroup = styled.div`
  margin-bottom: 16px;
`;

const PropertyLabel = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
  color: #495057;
`;

const PropertyInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const PropertySelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const PropertyTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #0069d9;
  }
`;

const PropertyHelp = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #6c757d;
`;

interface EditorField {
  key: string;
  label: string;
  type: string;
  required: boolean;
  defaultValue: any;
  options?: any[];
  description?: string;
}

interface PropertyEditorProps {
  node: Node<NodeData>;
  onUpdate: (properties: Record<string, any>) => void;
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({ node, onUpdate }) => {
  const [nodeType, setNodeType] = useState<NodeTypeDefinition | null>(null);
  const [properties, setProperties] = useState<Record<string, any>>({});
  const [alias, setAlias] = useState<string>(node.data.alias || '');
  const [jsonDrafts, setJsonDrafts] = useState<Record<string, string>>({});

  const deriveFieldsFromJsonSchema = (schema?: JsonSchemaDefinition): EditorField[] => {
    if (!schema || !schema.properties) {
      return [];
    }

    const required = new Set(schema.required || []);

    return Object.entries(schema.properties).map(([key, definition]) => ({
      key,
      label: definition.title || key,
      type: Array.isArray(definition.type) ? definition.type[0] || 'string' : definition.type || 'string',
      required: required.has(key),
      defaultValue: definition.default,
      options: definition.enum,
      description: definition.description,
    }));
  };

  const deriveFieldsFromProperties = (type: NodeTypeDefinition | null): EditorField[] => {
    if (!type?.properties) {
      return [];
    }

    return Object.entries(type.properties).map(([key, property]) => ({
      key,
      label: key,
      type: property.type || 'string',
      required: !!property.required,
      defaultValue: property.default,
      options: property.options,
    }));
  };

  const getFields = (type: NodeTypeDefinition | null): EditorField[] => {
    const schemaFields = deriveFieldsFromJsonSchema(type?.jsonSchema);
    if (schemaFields.length > 0) {
      return schemaFields;
    }

    return deriveFieldsFromProperties(type);
  };
  
  // Fetch node type information
  useEffect(() => {
    const fetchNodeType = async () => {
      try {
        const type = await nodeTypesApi.getNodeType(node.data.type);
        setNodeType(type);

        // Initialize properties from schema/properties defaults.
        const fields = getFields(type);
        const initialProperties: Record<string, any> = {};
        fields.forEach((field) => {
          initialProperties[field.key] = node.data.properties[field.key] !== undefined
            ? node.data.properties[field.key]
            : field.defaultValue;
        });
        
        setProperties({ ...initialProperties, ...node.data.properties });
        setJsonDrafts({});
      } catch (error) {
        console.error('Failed to fetch node type:', error);
      }
    };
    
    fetchNodeType();
  }, [node.data.type, node.data.properties]);

  useEffect(() => {
    setAlias(node.data.alias || '');
  }, [node.id, node.data.alias]);
  
  // Handle property change
  const handlePropertyChange = (key: string, value: any) => {
    setProperties(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Apply changes
  const handleApply = () => {
    // Update node properties
    onUpdate({
      ...properties,
      alias
    });
  };
  
  // Render property input based on type
  const renderPropertyInput = (key: string, property: EditorField) => {
    const value = properties[key];
    const type = property.type;
    
    switch (type) {
      case 'string':
        if (property.options) {
          return (
            <PropertySelect
              value={value || ''}
              onChange={(e) => handlePropertyChange(key, e.target.value)}
            >
              {property.options.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </PropertySelect>
          );
        } else {
          return (
            <PropertyInput
              type="text"
              value={value || ''}
              onChange={(e) => handlePropertyChange(key, e.target.value)}
            />
          );
        }
      
      case 'number':
      case 'integer':
        return (
          <PropertyInput
            type="number"
            value={value || 0}
            onChange={(e) => {
              const parsed = type === 'integer'
                ? parseInt(e.target.value, 10)
                : parseFloat(e.target.value);

              handlePropertyChange(key, Number.isNaN(parsed) ? 0 : parsed);
            }}
          />
        );
      
      case 'boolean':
        return (
          <PropertySelect
            value={value ? 'true' : 'false'}
            onChange={(e) => handlePropertyChange(key, e.target.value === 'true')}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </PropertySelect>
        );
      
      case 'object':
      case 'array':
        return (
          <PropertyTextarea
            value={jsonDrafts[key] ?? JSON.stringify(value ?? (type === 'array' ? [] : {}), null, 2)}
            onChange={(e) => {
              setJsonDrafts((prev) => ({ ...prev, [key]: e.target.value }));
              try {
                const parsed = JSON.parse(e.target.value);
                handlePropertyChange(key, parsed);
              } catch (error) {
                // Keep draft text while invalid JSON is being edited.
              }
            }}
          />
        );
      
      default:
        return (
          <PropertyInput
            type="text"
            value={value || ''}
            onChange={(e) => handlePropertyChange(key, e.target.value)}
          />
        );
    }
  };
  
  if (!nodeType) {
    return <div>Loading...</div>;
  }

  const fields = getFields(nodeType);
  
  return (
    <PropertyEditorContainer>
      <PropertyEditorTitle>
        {nodeType.name} Properties
      </PropertyEditorTitle>
      
      <PropertyGroup>
        <PropertyLabel>Node Alias</PropertyLabel>
        <PropertyInput
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
      </PropertyGroup>
      
      {fields.map((field) => (
        <PropertyGroup key={field.key}>
          <PropertyLabel>
            {field.label.charAt(0).toUpperCase() + field.label.slice(1)}
            {field.required && <span style={{ color: 'red' }}> *</span>}
          </PropertyLabel>
          {renderPropertyInput(field.key, field)}
          {field.description && <PropertyHelp>{field.description}</PropertyHelp>}
        </PropertyGroup>
      ))}
      
      <Button onClick={handleApply}>Apply Changes</Button>
    </PropertyEditorContainer>
  );
};

export default PropertyEditor;
