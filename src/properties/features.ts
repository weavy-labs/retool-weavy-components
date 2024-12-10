import { Retool } from '@tryretool/custom-component-support'

export const useAttachmentsFeature = () => {
  const [enableAttachments] = Retool.useStateBoolean({
    name: 'enableAttachments',
    label: 'Attachments',
    inspector: "checkbox",
    initialValue: true
  })
  return { noAttachments: enableAttachments === false }
}

export const useCloudFilesFeature = () => {
  const [enableCloudFiles] = Retool.useStateBoolean({
    name: 'enableCloudFiles',
    label: 'Cloud Files',
    inspector: "checkbox",
    initialValue: true
  })
  return { noCloudFiles: enableCloudFiles === false }
}

export const useGoogleMeetFeature = () => {
  const [enableGoogleMeet] = Retool.useStateBoolean({
    name: 'enableGoogleMeet',
    label: 'Google Meet',
    inspector: "checkbox",
    initialValue: true,
  })
  return { noGoogleMeet: enableGoogleMeet === false }
}

export const useMicrosoftTeamsFeature = () => {
  const [enableMicrosoftTeams] = Retool.useStateBoolean({
    name: 'enableMicrosoftTeams',
    label: 'Microsoft Teams',
    inspector: "checkbox",
    initialValue: true,
  })
  return { noMicrosoftTeams: enableMicrosoftTeams === false }
}

export const useZoomMeetingsFeature = () => {
  const [enableZoomMeetings] = Retool.useStateBoolean({
    name: 'enableZoomMeetings',
    label: 'Zoom Meetings',
    inspector: "checkbox",
    initialValue: true,
  })
  return { noZoomMeetings: enableZoomMeetings === false }
}


export const useMentionsFeature = () => {
  const [enableMentions] = Retool.useStateBoolean({
    name: 'enableMentions',
    label: 'Mentions',
    inspector: "checkbox",
    initialValue: true
  })
  return { noMentions: enableMentions === false }
}

export const usePollsFeature = () => {
  const [enablePolls] = Retool.useStateBoolean({
    name: 'enablePolls',
    label: 'Polls',
    inspector: "checkbox",
    initialValue: true
  })
  return { noPolls: enablePolls === false }
}

export const usePreviewsFeature = () => {
  const [enablePreviews] = Retool.useStateBoolean({
    name: 'enablePreviews',
    label: 'Previews',
    inspector: "checkbox",
    initialValue: true
  })
  return { noPreviews: enablePreviews === false }
}

export const useReactionsFeature = () => {
  const [enableReactions] = Retool.useStateBoolean({
    name: 'enableReactions',
    label: 'Reactions',
    inspector: "checkbox",
    initialValue: true
  })
  return { noReactions: enableReactions === false }
}

export const useCommentsFeature = () => {
  const [enableComments] = Retool.useStateBoolean({
    name: 'enableComments',
    label: 'Comments',
    inspector: "checkbox",
    initialValue: true
  })
  return { noComments: enableComments === false }
}

export const useVersionsFeature = () => {
  const [enableVersions] = Retool.useStateBoolean({
    name: 'enableVersions',
    label: 'Versions',
    inspector: "checkbox",
    initialValue: true
  })
  return { noVersions: enableVersions === false }
}

export const useWebDAVFeature = () => {
  const [enableWebDAV] = Retool.useStateBoolean({
    name: 'enableWebDAV',
    label: 'WebDav',
    inspector: "checkbox",
    initialValue: true
  })
  return { noWebDAV: enableWebDAV === false }
}

export const useEmbedsFeature = () => {
  const [enableEmbeds] = Retool.useStateBoolean({
    name: 'enableEmbeds',
    label: 'Embeds',
    inspector: "checkbox",
    initialValue: true
  })
  return { noEmbeds: enableEmbeds === false }
}

export const useReceiptsFeature = () => {
  const [enableReceipts] = Retool.useStateBoolean({
    name: 'enableReceipts',
    label: 'Receipts',
    inspector: "checkbox",
    initialValue: true
  })
  return { noReceipts: enableReceipts === false }
}

export const useTypingFeature = () => {
  const [enableTyping] = Retool.useStateBoolean({
    name: 'enableTyping',
    label: 'Typing',
    inspector: "checkbox",
    initialValue: true
  })
  return { noTyping: enableTyping === false }
}

export const useChatFeatures = () => {
  const features = {
    ...useAttachmentsFeature(),
    ...useCloudFilesFeature(),
    ...useGoogleMeetFeature(),
    ...useMicrosoftTeamsFeature(),
    ...useZoomMeetingsFeature(),
    ...useMentionsFeature(),
    ...usePollsFeature(),
    ...usePreviewsFeature(),
    ...useReactionsFeature()
  }
  return features
}

export const useCommentsFeatures = () => {
  const features = {
    ...useAttachmentsFeature(),
    ...useCloudFilesFeature(),
    ...useGoogleMeetFeature(),
    ...useMentionsFeature(),
    ...useMicrosoftTeamsFeature(),
    ...usePreviewsFeature(),
    ...useReactionsFeature(),
    ...useZoomMeetingsFeature(),
  }
  return features
}

export const useFilesFeatures = () => {
  const features = {
    ...useAttachmentsFeature(),
    ...useCloudFilesFeature(),
    ...useMentionsFeature(),
    ...usePreviewsFeature(),
    ...useReactionsFeature(),
    ...useCommentsFeature(),
    ...useVersionsFeature(),
    ...useWebDAVFeature(),
  }
  return features
}

export const usePostsFeatures = () => {
  const features = {
    ...useAttachmentsFeature(),
    ...useCloudFilesFeature(),
    ...useEmbedsFeature(),
    ...useGoogleMeetFeature(),
    ...useMentionsFeature(),
    ...useMicrosoftTeamsFeature(),
    ...usePreviewsFeature(),
    ...useReactionsFeature(),
    ...usePollsFeature(),
    ...useCommentsFeature(),
    ...useZoomMeetingsFeature(),
  }
  return features
}

export const useMessengerFeatures = () => {
  const features = {
    ...useAttachmentsFeature(),
    ...useCloudFilesFeature(),
    ...useGoogleMeetFeature(),
    ...useMentionsFeature(),
    ...useMicrosoftTeamsFeature(),
    ...usePollsFeature(),
    ...usePreviewsFeature(),
    ...useReactionsFeature(),
    ...useReceiptsFeature(),
    ...useTypingFeature(),
    ...useZoomMeetingsFeature(),
  }
  return features
}
