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
import { Retool } from '@tryretool/custom-component-support'
import { useName } from '../properties/uid'
import { usePreviewEvent } from '../properties/preview'

export const WeavyMessenger: FC = () => {
  const { name } = useName()
  const [bot] = Retool.useStateString({
    name: 'bot',
    description: 'Optional bot mode'
  })

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
      name={name}
      bot={bot}
      className={modeClassName}
      style={themeStyles}
      onWyPreviewOpen={handlePreview}
      {...features}
    />
  )
}
