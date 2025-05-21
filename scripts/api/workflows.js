require('dotenv').config()

const {
  getAndVerifyCredentialsWithRetoolDB
} = require('retool-cli/lib/utils//credentials')

const inquirer = require('inquirer')

const { createWorkflow, getWorkflow } = require('./workflows-api')
const {
  deleteWorkflow
} = require('retool-cli/lib/utils/workflows')
const { DEFAULT_RESOURCE_TYPE } = require('./resources-api')

module.exports = async (options) => getAndVerifyCredentialsWithRetoolDB().then(async (credentials) => {
  const resourceType = options.resource || DEFAULT_RESOURCE_TYPE;
  const authenticationWorkflowData = require(`../../workflows/WeavyAuthentication.${resourceType}.json`)
  const pageNavigationWorkflowData = require(`../../workflows/WeavyPageNavigation.${resourceType}.json`)

  // Authentication
  const existingAuthenticationWorkflow = await getWorkflow(
    authenticationWorkflowData,
    credentials
  )

  if (existingAuthenticationWorkflow) {
    const replace = options.inquiry === false
      ? { confirm: options.replace }
      : await inquirer.prompt([
          {
            name: 'confirm',
            message: 'Do you want to replace the existing '.concat(
              authenticationWorkflowData.name,
              '?'
            ),
            type: 'confirm',
            default: false
          }
        ])

    if (replace.confirm) {
      await deleteWorkflow(authenticationWorkflowData.name, credentials, false)
    }
  }

  await createWorkflow(authenticationWorkflowData, credentials)

  // Page navigation
  const existingPageNavigationWorkflow = await getWorkflow(
    pageNavigationWorkflowData,
    credentials
  )

  if (existingPageNavigationWorkflow) {
    const replace = options.inquiry === false
      ? { confirm: options.replace }
      : await inquirer.prompt([
          {
            name: 'confirm',
            message: 'Do you want to replace the existing '.concat(
              pageNavigationWorkflowData.name,
              '?'
            ),
            type: 'confirm',
            default: false
          }
        ])

    if (replace.confirm) {
      await deleteWorkflow(pageNavigationWorkflowData.name, credentials, false)
    }
  }

  await createWorkflow(pageNavigationWorkflowData, credentials)
})
