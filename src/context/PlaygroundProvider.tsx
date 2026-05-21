import { useReducer } from 'react'
import type { ReactNode } from 'react'
import { PlaygroundContext } from './PlaygroundContext'
import type { PlaygroundState, PlaygroundAction } from './types'

const DEFAULT_SCHEMA = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Ejemplo",
  "type": "object",
  "properties": {
    "nombre": {
      "type": "string",
      "title": "Nombre"
    },
    "edad": {
      "type": "integer",
      "title": "Edad",
      "minimum": 0
    }
  },
  "required": ["nombre"]
}`

const DEFAULT_UI_SCHEMA = `{}`

const initialState: PlaygroundState = {
  schemaText: DEFAULT_SCHEMA,
  schemaObject: JSON.parse(DEFAULT_SCHEMA),
  uiSchemaText: DEFAULT_UI_SCHEMA,
  uiSchemaObject: {},
  error: null,
}

function playgroundReducer(
  state: PlaygroundState,
  action: PlaygroundAction
): PlaygroundState {
  switch (action.type) {
    case 'SCHEMA_CHANGED': {
      try {
        const parsed = JSON.parse(action.payload)
        return { ...state, schemaText: action.payload, schemaObject: parsed, error: null }
      } catch {
        return { ...state, schemaText: action.payload, error: 'JSON inválido: revisa la sintaxis del esquema.' }
      }
    }
    case 'UI_SCHEMA_CHANGED': {
      try {
        const parsed = JSON.parse(action.payload)
        return { ...state, uiSchemaText: action.payload, uiSchemaObject: parsed, error: null }
      } catch {
        return { ...state, uiSchemaText: action.payload, error: 'JSON inválido: revisa la sintaxis del UI Schema.' }
      }
    }
    default:
      return state
  }
}

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playgroundReducer, initialState)

  return (
    <PlaygroundContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaygroundContext.Provider>
  )
}