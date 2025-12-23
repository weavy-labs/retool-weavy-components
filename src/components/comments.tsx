import React from 'react'
import { type FC } from 'react'
import { useWeavy, WyComments } from '@weavy/uikit-react'
import {
  useTokenFactory,
  useWeavyOptions,
  useWeavyUrl
} from '../properties/weavy'
import { useUid, useName } from '../properties/uid'
import { useThemeMode, useThemeStyles } from '../properties/theme'
import { useCommentsFeatures } from '../properties/features'
import { useNavigationEventCallback } from '../properties/notifications'
import { usePreviewEvent } from '../properties/preview'
import '../styles.css'
import { useContextData } from '../properties/agent'

export const WeavyComments: FC = () => {
  const { name } = useName()
  const { uid } = useUid()
  const { contextData } = useContextData()
  const features = useCommentsFeatures()
  const { modeClassName } = useThemeMode()
  const { themeStyles } = useThemeStyles()
  const { weavyUrl } = useWeavyUrl()
  const { tokenFactory, accessToken } = useTokenFactory()
  const { weavyOptions } = useWeavyOptions()
  const { navigationRefCallBack } = useNavigationEventCallback([uid])
  const { handlePreview } = usePreviewEvent()

  const weavy = useWeavy(
    {
      url: weavyUrl,
      tokenFactory,
      ...weavyOptions
    },
    [accessToken]
  )

  return (
    <WyComments
      uid={uid}
      name={name}
      contextualData={contextData || undefined}
      className={modeClassName}
      style={themeStyles as any}
      ref={navigationRefCallBack}
      onWyPreviewOpen={handlePreview}
      {...features}
    />
  )
}
