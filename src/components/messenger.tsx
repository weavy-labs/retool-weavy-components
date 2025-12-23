import React from 'react'
import { type FC } from 'react'
import { useWeavy, WyMessenger } from '@weavy/uikit-react'
import {
  useTokenFactory,
  useWeavyOptions,
  useWeavyUrl
} from '../properties/weavy'

import '../styles.css'
import { useThemeMode, useThemeStyles } from '../properties/theme'
import { useMessengerFeatures } from '../properties/features'
import { usePreviewEvent } from '../properties/preview'
import { useOptionalAgent, useContextData } from '../properties/agent'

export const WeavyMessenger: FC = () => {
  const { agent } = useOptionalAgent()
  const { contextData } = useContextData()
  const features = useMessengerFeatures()
  const { modeClassName } = useThemeMode()
  const { themeStyles } = useThemeStyles()
  const { weavyUrl } = useWeavyUrl()
  const { tokenFactory, accessToken } = useTokenFactory()
  const { weavyOptions } = useWeavyOptions()
  const { handlePreview } = usePreviewEvent()

  const weavy = useWeavy({
    url: weavyUrl,
    tokenFactory,
    ...weavyOptions
  }, [accessToken])

  return (
    <WyMessenger
      agent={agent}
      contextualData={contextData || undefined}
      className={modeClassName}
      style={themeStyles as any}
      onWyPreviewOpen={handlePreview}
      {...features}
    />
  )
}
