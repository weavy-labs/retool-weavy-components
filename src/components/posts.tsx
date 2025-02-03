import React from 'react'
import { type FC } from 'react'
import { useWeavy, WyPosts } from '@weavy/uikit-react'
import {
  useTokenFactory,
  useWeavyOptions,
  useWeavyUrl
} from '../properties/weavy'
import { useUid, useName } from '../properties/uid'
import { useThemeMode, useThemeStyles } from '../properties/theme'
import { usePostsFeatures } from '../properties/features'
import {
  useNavigationEventCallback,
  useNotificationProps
} from '../properties/notifications'
import { usePreviewEvent } from '../properties/preview'
import '../styles.css'

export const WeavyPosts: FC = () => {
  const { name } = useName()
  const { uid } = useUid()
  const features = usePostsFeatures()
  const notifications = useNotificationProps()
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
    <WyPosts
      uid={uid}
      name={name}
      className={modeClassName}
      style={themeStyles}
      ref={navigationRefCallBack}
      onWyPreviewOpen={handlePreview}
      {...notifications}
      {...features}
    />
  )
}
