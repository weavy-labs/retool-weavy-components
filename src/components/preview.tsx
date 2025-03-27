import React, { useEffect, useState } from 'react'
import { type FC } from 'react'
import { useWeavy, WyComponent, WeavyComponents } from '@weavy/uikit-react'
import { Retool } from '@tryretool/custom-component-support'
import {
  useTokenFactory,
  useWeavyOptions,
  useWeavyUrl
} from '../properties/weavy'
import { useThemeMode, useThemeStyles } from '../properties/theme'
import '../styles.css'

export const WeavyPreview: FC = () => {
  const { modeClassName } = useThemeMode()
  const { themeStyles } = useThemeStyles()
  const { weavyUrl } = useWeavyUrl()
  const { tokenFactory, accessToken } = useTokenFactory()
  const { weavyOptions } = useWeavyOptions()

  const [showPreview, setShowPreview] = useState(false);

  const [previewOpen, setPreviewOpen] = Retool.useStateBoolean({
    name: 'previewOpen',
    initialValue: true,
    inspector: 'checkbox',
    description: 'Whether the preview is shown'
  })

  const weavy = useWeavy(
    {
      url: weavyUrl,
      tokenFactory,
      ...weavyOptions
    },
    [accessToken]
  )

  const [previewDetail, setPreviewDetail] = useState(() => {
    const previewDetailJSON = localStorage.getItem('wy-preview-open')

    if (previewDetailJSON) {
      const parsedDetail = JSON.parse(previewDetailJSON)
      console.log('preview opened')
      setPreviewOpen(true);
      return parsedDetail
    } else {
      return {}
    }
  })

  const previewOpenHandler = (e: StorageEvent) => {
    if (
      e.storageArea === localStorage &&
      e.key === 'wy-preview-open' &&
      e.newValue
    ) {
      setPreviewDetail(e.newValue)
      setPreviewOpen(true);
      console.log('storage event, preview opened')
    }
  }

  const triggerClosePreview = Retool.useEventCallback({
    name: 'ClosePreview'
  })

  const handleClose = () => {
    triggerClosePreview()
    localStorage.removeItem('wy-preview-open');
  }

  useEffect(() => {
    console.log("preview init")
    window.addEventListener('storage', previewOpenHandler)
  }, [])

  useEffect(() => {
    setShowPreview(previewOpen)
  }, [previewOpen])

  return (
    <WyComponent
      className={modeClassName}
      style={themeStyles}
      features={previewDetail.features}
      app={previewDetail.app}
    >
      <WeavyComponents.WyPreview
        filled
        showOverlay={showPreview}
        isAttachment={previewDetail.isAttachment}
        files={previewDetail.files}
        currentId={previewDetail.fileId}
        onWyPreviewClose={handleClose}
      />
    </WyComponent>
  )
}
