const {
  getRequest,
  postRequest,
  deleteRequest
} = require('retool-cli/lib/utils/networking')

const {
  getWorkflowsAndFolders,
  deleteWorkflow
} = require('retool-cli/lib/utils/workflows')

const chalk = require('chalk')
const ora = require('ora')
const axios = require('axios')

/// WORKFLOWS

const envUrlRegex = /(?<=^|\s|{|,)WEAVY_URL:[\s]*(?<url>[^,}]+)/gm
exports.envUrlRegex = envUrlRegex

const envApiKeyRegex = /(?<=^|\s|{|,)WEAVY_APIKEY:[\s]*(?<apiKey>[^,}]+)/gm
exports.envApiKeyRegex = envApiKeyRegex

async function getWorkflow(workflowData, credentials) {
  const { workflows } = await getWorkflowsAndFolders(credentials)

  let weavyWorkflow = workflows.find(
    (workflow) => workflow.name === workflowData.name
  )

  return weavyWorkflow
}
exports.getWorkflow = getWorkflow

async function createWorkflow(workflowData, credentials) {
  const newWorkflowName = workflowData.name

  let weavyWorkflow = await getWorkflow(workflowData, credentials)

  if (weavyWorkflow) {
    console.log('Using the existing workflow. 🎉')
  } else {
    let spinner = ora('Creating workflow').start()

    // Patch configuration

    /*if (WEAVY_URL) {
      // Defaulted value
      workflowData.templateData = workflowData.templateData.replace(
        envUrlRegex,
        `WEAVY_URL: retoolContext.configVars.WEAVY_URL || \\"${process.env.WEAVY_URL}\\"`
      )
    } else {
      workflowData.templateData = workflowData.templateData.replace(
        envUrlRegex,
        `WEAVY_URL: retoolContext.configVars.WEAVY_URL`
      )
    }*/

    /*if (WEAVY_APIKEY) {
      // Defaulted value
      workflowData.templateData = workflowData.templateData.replace(
        envApiKeyRegex,
        `WEAVY_APIKEY: retoolContext.configVars.WEAVY_APIKEY || \\"${process.env.WEAVY_APIKEY}\\"`
      )
    } else {
      workflowData.templateData = workflowData.templateData.replace(
        envApiKeyRegex,
        `WEAVY_APIKEY: retoolContext.configVars.WEAVY_APIKEY`
      )
    }*/

    // Create workflow.
    const workflow = await postRequest(
      `${credentials.origin}/api/workflow/import`,
      {
        newWorkflowName,
        workflowData
      }
    )
    spinner.stop()

    if (workflow.data.workflow.id) {
      weavyWorkflow = workflow.data.workflow
    } else {
      console.log('Error creating workflow: ')
      console.log(workflow)
      return
    }
    console.log('Successfully created a workflow. 🎉')
  }

  console.log(
    `${chalk.bold('View in browser:')} ${credentials.origin}/workflows/${
      weavyWorkflow.id
    }`
  )
}
exports.createWorkflow = createWorkflow