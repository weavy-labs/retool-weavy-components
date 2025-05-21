const { postRequest } = require('retool-cli/lib/utils/networking')
const { getWorkflowsAndFolders } = require('retool-cli/lib/utils/workflows')
const { getAppsAndFolders, deleteApp } = require('retool-cli/lib/utils/apps')

const chalk = require('chalk')
const ora = require('ora')
const axios = require('axios')

/// DEMO APP

const weavyComponents = require('../../weavy-components.json')
const demoApp = require('../../demo/weavy-components-multipage-layout.json')
const authenticationWorkflowData = require('../../workflows/WeavyAuthentication.restapi.json')
const pageNavigationWorkflowData = require('../../workflows/WeavyPageNavigation.restapi.json')

const uuidRegex = /"collectionUuid","(?<uuid>[0-9a-f\-]+)"/gm
const revUuidRegex = /"collectionRevisionUuid","(?<revUuid>[0-9a-f\-]+)"/gm
const workflowRegex = /"workflowId","(?<workflowId>[0-9a-f\-]+)"/gm
const envRegex = /{{ window\.WEAVY_URL[^\}]*}}/gm

const replaceAuthenticationUuid = '195adaf4-6b91-49b6-9c5c-b6daf3f7df83'
const replacePageNavigationUuid = '50719db4-1333-4d29-918f-5980eec113ef'

const DEMO_APP_NAME = 'Weavy Components - Multipage Layout'
exports.DEMO_APP_NAME = DEMO_APP_NAME

async function getExistingApp(credentials, appName = DEMO_APP_NAME) {
  const appsAndFolders = await getAppsAndFolders(credentials)

  let existingApp = appsAndFolders.apps.find((app) => app.name === appName)

  return existingApp
}
exports.getExistingApp = getExistingApp

async function createWeavyApp(credentials, appName = DEMO_APP_NAME, WEAVY_URL) {
  const { workflows } = await getWorkflowsAndFolders(credentials)

  const weavyAuthenticationWorkflow = workflows.find(
    (workflow) => workflow.name === authenticationWorkflowData.name
  )
  console.log(authenticationWorkflowData.name, weavyAuthenticationWorkflow?.id)

  const weavyPageNavigationWorkflow = workflows.find(
    (workflow) => workflow.name === pageNavigationWorkflowData.name
  )
  console.log(pageNavigationWorkflowData.name, weavyPageNavigationWorkflow?.id)

  let appState = demoApp.page.data.appState

  // Relink Weavy component library uuid

  appState = appState.replace(
    uuidRegex,
    `"collectionUuid","${weavyComponents.customComponentLibraryId}"`
  )
  appState = appState.replace(
    revUuidRegex,
    `"collectionRevisionUuid","${weavyComponents.id}"`
  )

  // Relink workflow uuid:s
  appState = appState.replace(workflowRegex, (match, workflowId) => {
    if (
      weavyAuthenticationWorkflow &&
      workflowId === replaceAuthenticationUuid
    ) {
      return `"workflowId","${weavyAuthenticationWorkflow.id}"`
    }

    if (
      weavyPageNavigationWorkflow &&
      workflowId === replacePageNavigationUuid
    ) {
      return `"workflowId","${weavyPageNavigationWorkflow.id}"`
    }

    // no match
    return `"workflowId","${workflowId}"`
  })

  // Patch environment variable
  if (WEAVY_URL) {
    // Defaulted value
    appState = appState.replace(
      envRegex,
      `{{ window.WEAVY_URL || retoolContext.configVars?.WEAVY_URL || \\"${WEAVY_URL}\\" }}`
    )
  } else {
    appState = appState.replace(
      envRegex,
      `{{ window.WEAVY_URL || retoolContext.configVars?.WEAVY_URL }}`
    )
  }

  let app = await getExistingApp(credentials, appName)

  if (!app) {
    const spinner = ora('Creating App').start()

    const createAppResult = await postRequest(
      `${credentials.origin}/api/pages/createPage`,
      {
        pageName: appName,
        isGlobalWidget: false,
        isMobileApp: false,
        multiScreenMobileApp: false,
        appState
      }
    )
    spinner.stop()

    const { page } = createAppResult.data
    if (!page?.uuid) {
      console.log('Error creating app.')
      console.log(createAppResult.data)
      process.exit(1)
    } else {
      app = page
    }
  }
  const appUrl = `${credentials.origin}/editor/${
    app.uuid
  }`
  console.log('Successfully created a Weavy demo app. 🎉')
  console.log(
    `${chalk.bold('View in browser:')} ${appUrl}`
  )
  return { app, appUrl }
} 
exports.createWeavyApp = createWeavyApp