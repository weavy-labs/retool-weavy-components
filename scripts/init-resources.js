require('dotenv').config()

const {
  getAndVerifyCredentialsWithRetoolDB
} = require('retool-cli/lib/utils/credentials')
const {
  getRequest,
  postRequest,
  deleteRequest
} = require('retool-cli/lib/utils/networking')
const package = require('../package.json')
const fs = require('node:fs')
const chalk = require('chalk')
const ora = require('ora')
const inquirer = require('inquirer')
const axios = require('axios')

const WEAVY_API_NAME = 'WeavyAPI'
const WEAVY_API_DISPLAY_NAME = 'Weavy API'

function getResourcePayloadData(environmentUrl, apiKey, folderId) {
  return {
    type: 'openapi',
    options: {
      spec: `${environmentUrl}/api/openapi.json`,
      authentication: 'bearer',
      customHeaders: [['', '']],
      customQueryParameters: [['', '']],
      defaultServerVariables: [['', '']],
      bearer_token: apiKey
    },
    id: null,
    name: WEAVY_API_NAME,
    displayName: WEAVY_API_DISPLAY_NAME,
    resourceFolderId: folderId,
    description: 'Weavy Web API using weavy.io environment'
  }
}

async function testConnection(connectionPayload, credentials) {
  const spinner = ora('Testing resource connection').start()

  let connectionOk = false

  try {
    const testResult = await postRequest(
      `${credentials.origin}/api/resources/testConnection`,
      connectionPayload
    )

    connectionOk = testResult.data.success
    if (connectionOk) {
      spinner.succeed()
    } else {
      spinner.fail()
    }
  } catch (e) {
    spinner.fail(`Error testing connection: ${e.errorMessage}`)
    throw e
  }

  return connectionOk
}

async function createResource(url, apiKey, folderId, credentials) {
  const spinner = ora('Creating Weavy API resource').start()

  const resourcePayload = getResourcePayloadData(url, apiKey, folderId)

  let resource

  try {
    const resourceResult = await postRequest(
      `${credentials.origin}/api/resources/`,
      resourcePayload
    )

    resource = resourceResult.data
    spinner.succeed()
  } catch (e) {
    spinner.fail(`Error creating resource: ${e.errorMessage}`)
    throw e
  }

  return resource
}

async function updateResource(name, url, apiKey, folderId, credentials) {
  const spinner = ora('Updating Weavy API resource').start()

  const resourcePayload = getResourcePayloadData(url, apiKey, folderId)

  let resource

  try {
    const resourceResult = await axios.patch(
      `${credentials.origin}/api/resources/names/${name}`,
      {
        environment: 'production',
        changeset: resourcePayload,
        allowNameOverwriting: false
      }
    )

    resource = resourceResult.data
    spinner.succeed()
  } catch (e) {
    spinner.fail(`Error updating resource: ${e.errorMessage}`)
    throw e
  }

  return resource
}

async function getResources(credentials) {
  const spinner = ora('Getting resources').start()
  let resources

  try {
    const getResourcesResult = await getRequest(
      `${credentials.origin}/api/resources`
    )

    resources = getResourcesResult.data

    spinner.stop()
  } catch (e) {
    spinner.stop()
    console.error('Error getting resources:', e.errorMessage)
    throw e
  }

  return resources
}

async function getResourceByName(name, credentials) {
  const spinner = ora(`Getting resource ${name}`).start()
  let resource

  try {
    const getResourceResult = await axios.get(
      `${credentials.origin}/api/resources/names/${name}`
    )

    resource = getResourceResult.response.data

    spinner.stop()
  } catch (e) {
    spinner.stop()
    if (e.status !== 404) {
      throw e.response.data
    }
  }

  return resource
}

function getResourceByDisplayName(displayName, resources) {
  const resource = resources?.resources?.find(
    (res) => res.displayName === displayName
  )

  return resource
}

function getResourceRootFolder(resources) {
  const rootFolder = resources?.resourceFolders?.find(
    (folder) => folder.systemFolder && folder.name === 'root'
  )

  if (!rootFolder) {
    throw new Error('Error getting root folder')
  }

  return rootFolder
}

getAndVerifyCredentialsWithRetoolDB().then(async (credentials) => {
  const resources = await getResources(credentials)

  let existingResource,
    updateExisting = false

  existingResource = getResourceByDisplayName(WEAVY_API_DISPLAY_NAME, resources)

  if (!existingResource) {
    existingResource = await getResourceByName(WEAVY_API_NAME, credentials)
  }

  if (existingResource) {
    console.log(`Found existing resource API: ${chalk.blue(existingResource.displayName)}`)
    const replace = await inquirer.prompt([
      {
        name: 'confirm',
        message: 'Do you want to update the existing resource '.concat(
          existingResource.displayName,
          '?'
        ),
        type: 'confirm',
        default: false
      }
    ])

    if (replace.confirm) {
      //await deleteConfigVariable(existingConfigVar, credentials)
      updateExisting = true
    }
  }

  if (existingResource && !updateExisting) {
    const connectionPayload = {
      changeset: {},
      environment: 'production',
      resourceName: WEAVY_API_NAME
    }

    await testConnection(connectionPayload, credentials)
  } else {
    if (!process.env.WEAVY_URL) {
      console.warn('No WEAVY_URL configured in .env')
    } else if (!process.env.WEAVY_APIKEY) {
      console.warn('No WEAVY_APIKEY configured in .env')
    } else {
      const rootFolder = getResourceRootFolder(resources)

      const connectionPayload = {
        changeset: getResourcePayloadData(process.env.WEAVY_URL, process.env.WEAVY_APIKEY, rootFolder.id),
        environment: 'production'
      }

      const connectionOk = await testConnection(connectionPayload, credentials)

      if (connectionOk) {
        if (updateExisting) {
          await updateResource(
            existingResource.name,
            process.env.WEAVY_URL,
            process.env.WEAVY_APIKEY,
            rootFolder.id,
            credentials
          )
        } else {
          await createResource(
            process.env.WEAVY_URL,
            process.env.WEAVY_APIKEY,
            rootFolder.id,
            credentials
          )
        }
      }
    }
  }
})
