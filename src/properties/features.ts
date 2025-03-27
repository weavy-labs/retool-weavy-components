import { Retool } from '@tryretool/custom-component-support'
import { Feature } from '@weavy/uikit-react'

export const useAttachmentsFeature = (initialValue = true) => {
  const [enableAttachments] = Retool.useStateBoolean({
    name: 'enableAttachments',
    label: 'Attachments',
    inspector: "checkbox",
    initialValue
  })
  return enableAttachments ? Feature.Attachments : undefined
}

export const useCloudFilesFeature = (initialValue = true) => {
  const [enableCloudFiles] = Retool.useStateBoolean({
    name: 'enableCloudFiles',
    label: 'Cloud Files',
    inspector: "checkbox",
    initialValue
  })
  return enableCloudFiles ? Feature.CloudFiles : undefined
}

export const useGoogleMeetFeature = (initialValue = true) => {
  const [enableGoogleMeet] = Retool.useStateBoolean({
    name: 'enableGoogleMeet',
    label: 'Google Meet',
    inspector: "checkbox",
    initialValue,
  })
  return enableGoogleMeet ? Feature.GoogleMeet : undefined
}

export const useMicrosoftTeamsFeature = (initialValue = true) => {
  const [enableMicrosoftTeams] = Retool.useStateBoolean({
    name: 'enableMicrosoftTeams',
    label: 'Microsoft Teams',
    inspector: "checkbox",
    initialValue,
  })
  return enableMicrosoftTeams ? Feature.MicrosoftTeams : undefined
}

export const useZoomMeetingsFeature = (initialValue = true) => {
  const [enableZoomMeetings] = Retool.useStateBoolean({
    name: 'enableZoomMeetings',
    label: 'Zoom Meetings',
    inspector: "checkbox",
    initialValue,
  })
  return enableZoomMeetings ? Feature.ZoomMeetings : undefined
}


export const useMentionsFeature = (initialValue = true) => {
  const [enableMentions] = Retool.useStateBoolean({
    name: 'enableMentions',
    label: 'Mentions',
    inspector: "checkbox",
    initialValue
  })
  return enableMentions ? Feature.Mentions : undefined
}

export const usePollsFeature = (initialValue = true) => {
  const [enablePolls] = Retool.useStateBoolean({
    name: 'enablePolls',
    label: 'Polls',
    inspector: "checkbox",
    initialValue
  })
  return enablePolls ? Feature.Polls : undefined
}

export const usePreviewsFeature = (initialValue = true) => {
  const [enablePreviews] = Retool.useStateBoolean({
    name: 'enablePreviews',
    label: 'Previews',
    inspector: "checkbox",
    initialValue
  })
  return enablePreviews ? Feature.Previews : undefined
}

export const useReactionsFeature = (initialValue = true) => {
  const [enableReactions] = Retool.useStateBoolean({
    name: 'enableReactions',
    label: 'Reactions',
    inspector: "checkbox",
    initialValue
  })
  return enableReactions ? Feature.Reactions : undefined
}

export const useCommentsFeature = (initialValue = true) => {
  const [enableComments] = Retool.useStateBoolean({
    name: 'enableComments',
    label: 'Comments',
    inspector: "checkbox",
    initialValue
  })
  return enableComments ? Feature.Comments : undefined
}

export const useVersionsFeature = (initialValue = true) => {
  const [enableVersions] = Retool.useStateBoolean({
    name: 'enableVersions',
    label: 'Versions',
    inspector: "checkbox",
    initialValue
  })
  return enableVersions ? Feature.Versions : undefined
}

export const useWebDAVFeature = (initialValue = true) => {
  const [enableWebDAV] = Retool.useStateBoolean({
    name: 'enableWebDAV',
    label: 'WebDav',
    inspector: "checkbox",
    initialValue
  })
  return enableWebDAV ? Feature.WebDAV : undefined
}

export const useEmbedsFeature = (initialValue = true) => {
  const [enableEmbeds] = Retool.useStateBoolean({
    name: 'enableEmbeds',
    label: 'Embeds',
    inspector: "checkbox",
    initialValue
  })
  return enableEmbeds ? Feature.Embeds : undefined 
}

export const useReceiptsFeature = (initialValue = true) => {
  const [enableReceipts] = Retool.useStateBoolean({
    name: 'enableReceipts',
    label: 'Receipts',
    inspector: "checkbox",
    initialValue
  })
  return enableReceipts ? Feature.Receipts : undefined
}

export const useTypingFeature = (initialValue = true) => {
  const [enableTyping] = Retool.useStateBoolean({
    name: 'enableTyping',
    label: 'Typing',
    inspector: "checkbox",
    initialValue
  })
  return enableTyping ? Feature.Typing : undefined
}

export const useContextDataFeature = (initialValue = true) => {
  const [enableContextData] = Retool.useStateBoolean({
    name: 'enableContextData',
    label: 'Context data',
    inspector: "checkbox",
    initialValue
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
    useReceiptsFeature(false),
    useTypingFeature(false)
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
    useMentionsFeature(false),
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
    useGoogleMeetFeature(false),
    useMentionsFeature(),
    useMicrosoftTeamsFeature(false),
    usePollsFeature(),
    usePreviewsFeature(),
    useReactionsFeature(),
    useCommentsFeature(),
    useVersionsFeature(),
    useWebDAVFeature(),
    useZoomMeetingsFeature(false),
  ].filter((f) => f).join(" ")

  return { features }
}

export const usePostsFeatures = () => {
  const features = [
    useAttachmentsFeature(),
    useCloudFilesFeature(),
    useEmbedsFeature(),
    useGoogleMeetFeature(false),
    useMentionsFeature(),
    useMicrosoftTeamsFeature(false),
    usePreviewsFeature(),
    useReactionsFeature(),
    usePollsFeature(),
    useCommentsFeature(),
    useZoomMeetingsFeature(false),
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
