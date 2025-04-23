import { Retool } from '@tryretool/custom-component-support'
import { Feature } from '@weavy/uikit-react'

export const useAttachmentsFeature = () => {
  const [enableAttachments] = Retool.useStateBoolean({
    name: 'enableAttachments',
    label: 'Attachments',
    inspector: "checkbox",
    initialValue: true
  })
  return enableAttachments ? Feature.Attachments : undefined
}

export const useCloudFilesFeature = () => {
  const [enableCloudFiles] = Retool.useStateBoolean({
    name: 'enableCloudFiles',
    label: 'Cloud Files',
    inspector: "checkbox",
    initialValue: true
  })
  return enableCloudFiles ? Feature.CloudFiles : undefined
}

export const useGoogleMeetFeature = () => {
  const [enableGoogleMeet] = Retool.useStateBoolean({
    name: 'enableGoogleMeet',
    label: 'Google Meet',
    inspector: "checkbox",
    initialValue: true,
  })
  return enableGoogleMeet ? Feature.GoogleMeet : undefined
}

export const useOptionalGoogleMeetFeature = () => {
  const [enableGoogleMeet] = Retool.useStateBoolean({
    name: 'enableGoogleMeet',
    label: 'Google Meet',
    inspector: "checkbox",
    initialValue: false,
  })
  return enableGoogleMeet ? Feature.GoogleMeet : undefined
}

export const useMicrosoftTeamsFeature = () => {
  const [enableMicrosoftTeams] = Retool.useStateBoolean({
    name: 'enableMicrosoftTeams',
    label: 'Microsoft Teams',
    inspector: "checkbox",
    initialValue: true,
  })
  return enableMicrosoftTeams ? Feature.MicrosoftTeams : undefined
}

export const useOptionalMicrosoftTeamsFeature = () => {
  const [enableMicrosoftTeams] = Retool.useStateBoolean({
    name: 'enableMicrosoftTeams',
    label: 'Microsoft Teams',
    inspector: "checkbox",
    initialValue: false,
  })
  return enableMicrosoftTeams ? Feature.MicrosoftTeams : undefined
}

export const useZoomMeetingsFeature = () => {
  const [enableZoomMeetings] = Retool.useStateBoolean({
    name: 'enableZoomMeetings',
    label: 'Zoom Meetings',
    inspector: "checkbox",
    initialValue: true,
  })
  return enableZoomMeetings ? Feature.ZoomMeetings : undefined
}

export const useOptionalZoomMeetingsFeature = () => {
  const [enableZoomMeetings] = Retool.useStateBoolean({
    name: 'enableZoomMeetings',
    label: 'Zoom Meetings',
    inspector: "checkbox",
    initialValue: false,
  })
  return enableZoomMeetings ? Feature.ZoomMeetings : undefined
}

export const useMentionsFeature = () => {
  const [enableMentions] = Retool.useStateBoolean({
    name: 'enableMentions',
    label: 'Mentions',
    inspector: "checkbox",
    initialValue: true
  })
  return enableMentions ? Feature.Mentions : undefined
}

export const useOptionalMentionsFeature = () => {
  const [enableMentions] = Retool.useStateBoolean({
    name: 'enableMentions',
    label: 'Mentions',
    inspector: "checkbox",
    initialValue: false
  })
  return enableMentions ? Feature.Mentions : undefined
}

export const usePollsFeature = () => {
  const [enablePolls] = Retool.useStateBoolean({
    name: 'enablePolls',
    label: 'Polls',
    inspector: "checkbox",
    initialValue: true
  })
  return enablePolls ? Feature.Polls : undefined
}

export const usePreviewsFeature = () => {
   const [enablePreviews] = Retool.useStateBoolean({
    name: 'enablePreviews',
    label: 'Previews',
    inspector: "checkbox",
    initialValue: true
  })
  return enablePreviews ? Feature.Previews : undefined
}

export const useReactionsFeature = () => {
  const [enableReactions] = Retool.useStateBoolean({
    name: 'enableReactions',
    label: 'Reactions',
    inspector: "checkbox",
    initialValue: true
  })
  return enableReactions ? Feature.Reactions : undefined
}

export const useCommentsFeature = () => {
  const [enableComments] = Retool.useStateBoolean({
    name: 'enableComments',
    label: 'Comments',
    inspector: "checkbox",
    initialValue: true
  })
  return enableComments ? Feature.Comments : undefined
}

export const useVersionsFeature = () => {
  const [enableVersions] = Retool.useStateBoolean({
    name: 'enableVersions',
    label: 'Versions',
    inspector: "checkbox",
    initialValue: true
  })
  return enableVersions ? Feature.Versions : undefined
}

export const useWebDAVFeature = () => {
  const [enableWebDAV] = Retool.useStateBoolean({
    name: 'enableWebDAV',
    label: 'WebDav',
    inspector: "checkbox",
    initialValue: true
  })
  return enableWebDAV ? Feature.WebDAV : undefined
}

export const useEmbedsFeature = () => {
  const [enableEmbeds] = Retool.useStateBoolean({
    name: 'enableEmbeds',
    label: 'Embeds',
    inspector: "checkbox",
    initialValue: true
  })
  return enableEmbeds ? Feature.Embeds : undefined 
}

export const useReceiptsFeature = () => {
  const [enableReceipts] = Retool.useStateBoolean({
    name: 'enableReceipts',
    label: 'Receipts',
    inspector: "checkbox",
    initialValue: true
  })
  return enableReceipts ? Feature.Receipts : undefined
}

export const useOptionalReceiptsFeature = () => {
  const [enableReceipts] = Retool.useStateBoolean({
    name: 'enableReceipts',
    label: 'Receipts',
    inspector: "checkbox",
    initialValue: false
  })
  return enableReceipts ? Feature.Receipts : undefined
}

export const useTypingFeature = () => {
  const [enableTyping] = Retool.useStateBoolean({
    name: 'enableTyping',
    label: 'Typing',
    inspector: "checkbox",
    initialValue: true
  })
  return enableTyping ? Feature.Typing : undefined
}

export const useOptionalTypingFeature = () => {
  const [enableTyping] = Retool.useStateBoolean({
    name: 'enableTyping',
    label: 'Typing',
    inspector: "checkbox",
    initialValue: false
  })
  return enableTyping ? Feature.Typing : undefined
}

export const useContextDataFeature = () => {
  const [enableContextData] = Retool.useStateBoolean({
    name: 'enableContextData',
    label: 'Context data',
    inspector: "checkbox",
    initialValue: true
  })
  return enableContextData ? Feature.ContextData : undefined
}

export const useChatFeatures = () => {
  const features = [
    useAttachmentsFeature(),
    useCloudFilesFeature(),
    useEmbedsFeature(),
    useGoogleMeetFeature(),
    useMicrosoftTeamsFeature(),
    useZoomMeetingsFeature(),
    useMentionsFeature(),
    usePollsFeature(),
    usePreviewsFeature(),
    useReactionsFeature(),
    useOptionalReceiptsFeature(),
    useOptionalTypingFeature()
  ].filter((f) => f).join(" ")

  return { features }
}

export const useCommentsFeatures = () => {
  const features = [
    useAttachmentsFeature(),
    useCloudFilesFeature(),
    useEmbedsFeature(),
    useGoogleMeetFeature(),
    useMentionsFeature(),
    useMicrosoftTeamsFeature(),
    usePollsFeature(),
    usePreviewsFeature(),
    useReactionsFeature(),
    useZoomMeetingsFeature(),
  ].filter((f) => f).join(" ")

  return { features }
}

export const useCopilotFeatures = () => {
  const features = [
    //useAttachmentsFeature(false),
    //useContextDataFeature(),
    Feature.ContextData,
    useEmbedsFeature(),
    useOptionalMentionsFeature(),
    usePreviewsFeature(),
    useReactionsFeature(),
    useTypingFeature()
  ].filter((f) => f).join(" ")

  return { features }
}

export const useFilesFeatures = () => {
  const features = [
    useAttachmentsFeature(),
    useCloudFilesFeature(),
    useEmbedsFeature(),
    useOptionalGoogleMeetFeature(),
    useMentionsFeature(),
    useOptionalMicrosoftTeamsFeature(),
    usePollsFeature(),
    usePreviewsFeature(),
    useReactionsFeature(),
    useCommentsFeature(),
    useVersionsFeature(),
    useWebDAVFeature(),
    useOptionalZoomMeetingsFeature(),
  ].filter((f) => f).join(" ")

  return { features }
}

export const usePostsFeatures = () => {
  const features = [
    useAttachmentsFeature(),
    useCloudFilesFeature(),
    useEmbedsFeature(),
    useOptionalGoogleMeetFeature(),
    useMentionsFeature(),
    useOptionalMicrosoftTeamsFeature(),
    usePreviewsFeature(),
    useReactionsFeature(),
    usePollsFeature(),
    useCommentsFeature(),
    useOptionalZoomMeetingsFeature(),
  ].filter((f) => f).join(" ")

  return { features }
}

export const useMessengerFeatures = () => {
  const features = [
    useAttachmentsFeature(),
    useCloudFilesFeature(),
    useGoogleMeetFeature(),
    useEmbedsFeature(),
    useMentionsFeature(),
    useMicrosoftTeamsFeature(),
    usePollsFeature(),
    usePreviewsFeature(),
    useReactionsFeature(),
    useReceiptsFeature(),
    useTypingFeature(),
    useZoomMeetingsFeature(),
  ].filter((f) => f).join(" ")

  return { features }
}
