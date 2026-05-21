import { createContext } from 'react'
import type { PlaygroundContextType } from './types.ts'

export const PlaygroundContext = createContext<PlaygroundContextType | undefined>(undefined)