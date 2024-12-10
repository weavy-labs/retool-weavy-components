import React from 'react'
import { type FC } from 'react'
import { useWeavy, WyFiles } from '@weavy/uikit-react'
import {
  useTokenFactory,
  useWeavyOptions,
  useWeavyUrl
} from '../properties/weavy'

import '../styles.css'
import { useUid, useName } from '../properties/uid'
import { useThemeMode, useThemeStyles } from '../properties/theme'
import { useFilesFeatures } from '../properties/features'
import { useNavigationEventCallback, useNotificationProps } from '../properties/notifications'

export const WeavyFiles: FC = () => {
  const { name } = useName()
  const { uid } = useUid()
  const features = useFilesFeatures()
  const notifications = useNotificationProps()
  const { modeClassName } = useThemeMode()
  const { themeStyles } = useThemeStyles()
  const { weavyUrl } = useWeavyUrl()
  const { tokenFactory, accessToken } = useTokenFactory()
  const { weavyOptions } = useWeavyOptions()
  const { navigationRefCallBack } = useNavigationEventCallback([uid])

  const weavy = useWeavy({
    url: weavyUrl,
    tokenFactory,
    ...weavyOptions
  }, [accessToken])

  return (
    <WyFiles
      uid={uid}
      name={name}
      className={modeClassName}
      style={themeStyles}
      ref={navigationRefCallBack}
      {...notifications}
      {...features}
    />
  )
}