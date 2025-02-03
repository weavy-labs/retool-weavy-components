import { Retool } from '@tryretool/custom-component-support'
import { WyPreviewOpenEventType } from '@weavy/uikit-react/dist/types/components'

export const usePreviewEvent = () => {
  const triggerPreview = Retool.useEventCallback({
    name: 'OpenPreview'
  })

  const handlePreview = (e: WyPreviewOpenEventType) => {
    e.preventDefault()
    //console.log('setting localStorage', e.detail)
    localStorage.setItem('wy-preview-open', JSON.stringify(e.detail))
    triggerPreview()
  }

  return { handlePreview, triggerPreview }
}