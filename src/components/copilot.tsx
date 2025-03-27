import React, { useRef } from 'react'
import { type FC } from 'react'
import { useWeavy, WeavyComponents, WyCopilot } from '@weavy/uikit-react'
import {
  useTokenFactory,
  useWeavyOptions,
  useWeavyUrl
} from '../properties/weavy'
import {
  useName,
  useOptionalUid,
  useAutoUid,
  useAppIdEvent
} from '../properties/uid'
import { useThemeMode, useThemeStyles } from '../properties/theme'
import { useCopilotFeatures } from '../properties/features'
import {
  useNavigationEventCallback,
  useNotificationProps
} from '../properties/notifications'
import { usePreviewEvent } from '../properties/preview'
import '../styles.css'
import {
  useBot,
  useContextData,
  useInstructions,
  useMessageEvent,
  useNewButton,
  useSuggestions
} from '../properties/bot'

const { WyButton, WyIcon } = WeavyComponents

export const WeavyCopilot: FC = () => {
  const { bot } = useBot()
  const { instructions } = useInstructions()
  const { contextData } = useContextData()
  const { suggestions } = useSuggestions()
  const { enableNewButton } = useNewButton()
  const { name } = useName()
  const { uid } = useOptionalUid()
  const { enableAutoUid } = useAutoUid()
  const features = useCopilotFeatures()
  const notifications = useNotificationProps()
  const { modeClassName } = useThemeMode()
  const { themeStyles } = useThemeStyles()
  const { weavyUrl } = useWeavyUrl()
  const { tokenFactory, accessToken } = useTokenFactory()
  const { weavyOptions } = useWeavyOptions()
  const { navigationRefCallBack } = useNavigationEventCallback([uid])
  const { handlePreview } = usePreviewEvent()
  const { setAppId, triggerAppId } = useAppIdEvent()
  const { setLastMessage, triggerMessage } = useMessageEvent()

  const copilotRef = useRef<any>()

  const weavy = useWeavy({ url: weavyUrl, tokenFactory, ...weavyOptions }, [
    accessToken
  ])

  return (
    <WyCopilot
      ref={(refObj) => {
        if (refObj) {
          copilotRef.current = refObj
          uid && navigationRefCallBack(refObj)
        }
      }}
      uid={!enableAutoUid ? uid : undefined}
      autoUid={enableAutoUid && uid ? uid : undefined}
      bot={bot}
      instructions={instructions}
      data={contextData ? [contextData] : undefined}
      name={name}
      className={modeClassName}
      style={themeStyles}
      onWyPreviewOpen={handlePreview}
      onWyApp={(e) => {
        setAppId(e.detail.app.id)
        triggerAppId()
      }}
      onWyMessage={(e) => {
        setLastMessage(e.detail)
        triggerMessage()
      }}
      {...notifications}
      {...features}
    >
      {enableNewButton ? (
        <div slot="actions">
          <WyButton kind="icon" onClick={() => copilotRef.current?.reset()}>
            <WyIcon name="stars" />
          </WyButton>
        </div>
      ) : undefined}
      {suggestions instanceof Array ? (
        <div slot="suggestion-list" style={{ display: 'contents' }}>
          {suggestions.map((suggestion) =>
            typeof suggestion === 'string' ? (
              <WyButton key={suggestion} className="suggestion">
                {suggestion}
              </WyButton>
            ) : undefined
          )}
        </div>
      ) : undefined}
    </WyCopilot>
  )
}
