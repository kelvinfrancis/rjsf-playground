export interface PlaygroundState {
  schemaText: string
  schemaObject: object | null
  uiSchemaText: string
  uiSchemaObject: object
  error: string | null
}

export type PlaygroundAction =
  | { type: 'SCHEMA_CHANGED'; payload: string }
  | { type: 'UI_SCHEMA_CHANGED'; payload: string }
  | { type: 'FORM_DATA_CHANGED'; payload: object }

export interface PlaygroundContextType {
  state: PlaygroundState
  dispatch: React.Dispatch<PlaygroundAction>
}

export interface PlaygroundState {
  schemaText: string
  schemaObject: object | null
  uiSchemaText: string
  uiSchemaObject: object
  formData: object
  error: string | null
}

