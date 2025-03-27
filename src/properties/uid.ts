import { Retool } from '@tryretool/custom-component-support'

export const useName = () => {
  const [name] = Retool.useStateString({
    name: 'name',
    label: 'Display name',
    description: 'The display name of the component. Used in notifications etc.'
  })

  return { name: name || undefined }
}

export const useUid = () => {
  const [uid] = Retool.useStateString({
    name: 'uid',
    initialValue: '{{ retoolContext.appUuid }}:{{ self.id }}',
    description: 'The uid of the component.'
  })

  return { uid }
}

export const useOptionalUid = () => {
  const [uid] = Retool.useStateString({
    name: 'uid',
    label: 'UID (optional)',
    description: 'Optional uid for filtering.'
  })

  return { uid: uid || undefined }
}

export const useAutoUid = () => {
  const [enableAutoUid] = Retool.useStateBoolean({
    name: 'enableAutoUid',
    label: "Append bot and user to UID",
    initialValue: true,
    inspector: 'checkbox',
    description: 'Automatically append user and bot to the uid.'
  })

  return { enableAutoUid }
}

export const useAppIdEvent = () => {
  const [_appId, setAppId] = Retool.useStateNumber({
    name: 'appId',
    inspector: 'hidden',
    description: 'The app id of the current app.'
  })

  const triggerAppId = Retool.useEventCallback({ name: 'App' })

  return { setAppId, triggerAppId }
}