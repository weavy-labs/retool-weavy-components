import { Retool } from '@tryretool/custom-component-support'

export const useAgent = () => {
  const [agent] = Retool.useStateString({
    name: 'agent',
    label: 'Agent',
    description: 'Agent mode',
    initialValue: 'assistant'
  })
  return { agent }
}

export const useOptionalAgent = () => {
  const [agent] = Retool.useStateString({
    name: 'agent',
    label: 'Agent (optional)',
    description: 'Optional agent mode'
  })
  return { agent: agent || undefined }
}

export const useInstructions = () => {
  const [instructions] = Retool.useStateString({
    name: 'instructions',
    label: 'Agent instructions',
    description: 'Instructions for the AI Agent.'
  })

  return { instructions: instructions || undefined }
}

export const useContextData = () => {
  const [contextData] = Retool.useStateString({
    name: 'contextData',
    label: 'Context data',
    description: 'Any content or context data for the copilot to work with.'
  })

  return { contextData }
}

export const useNewButton = () => {
  const [enableNewButton] = Retool.useStateBoolean({
    name: 'enableNewButton',
    label: "New button",
    initialValue: true,
    inspector: 'checkbox',
    description: 'Enable a button to make a new conversation.'
  })

  return { enableNewButton }
}

export const useSuggestions = () => {
  const [suggestions] = Retool.useStateArray({
    name: 'suggestions',
    label: 'Suggestions',
    initialValue: ['Summarize this page'],
    description: 'Array of text message suggestions to be displayed as buttons.'
  })

  return { suggestions }
}

export const useMessageEvent = () => {
  const [_lastMessage, setLastMessage] = Retool.useStateObject({
    name: 'lastMessage',
    inspector: 'hidden',
    description: 'The last message received.'
  })

  const triggerMessage = Retool.useEventCallback({ name: 'Message' })

  return { setLastMessage, triggerMessage }
}