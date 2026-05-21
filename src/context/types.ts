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

export interface PlaygroundContextType {
  state: PlaygroundState
  dispatch: React.Dispatch<PlaygroundAction>
}