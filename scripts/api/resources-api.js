const {
  getRequest,
  postRequest,
  deleteRequest
} = require('retool-cli/lib/utils/networking')
const chalk = require('chalk')
const ora = require('ora')
const axios = require('axios')

/// RESOURCES

const DEFAULT_RESOURCE_TYPE = 'restapi'
exports.DEFAULT_RESOURCE_TYPE = DEFAULT_RESOURCE_TYPE

const WEAVY_API_NAME = 'WeavyAPI'
exports.WEAVY_API_NAME = WEAVY_API_NAME

const WEAVY_API_DISPLAY_NAME = 'Weavy API'
exports.WEAVY_API_DISPLAY_NAME = WEAVY_API_DISPLAY_NAME

function getResourcePayloadData(environmentUrl, apiKey, folderId, type = DEFAULT_RESOURCE_TYPE) {
  switch (type) {
    case 'openapi':
      return {
        type: 'openapi',
        options: {
          spec: `${environmentUrl}/api/openapi.json`,
          authentication: 'bearer',
          customHeaders: [['Content-Type', 'application/json']],
          customQueryParameters: [['', '']],
          defaultServerVariables: [['', '']],
          bearer_token: apiKey
        },
        id: null,
        name: WEAVY_API_NAME,
        displayName: WEAVY_API_DISPLAY_NAME,
        resourceFolderId: folderId,
        description: 'Weavy Web API using weavy.io environment'
      };
    case 'restapi':
      return {
        type: 'restapi',
        options: {
          baseURL: environmentUrl,
          headers: [['Content-Type', 'application/json']],
          authentication: 'bearer',
          //urlparams: [['', '']],
          bearer_token: apiKey
        },
        id: null,
        name: WEAVY_API_NAME,
        displayName: WEAVY_API_DISPLAY_NAME,
        resourceFolderId: folderId,
        description: 'Weavy Web API using weavy.io environment'
      }
  }
}
exports.getResourcePayloadData = getResourcePayloadData

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
exports.testConnection = testConnection

async function createResource(url, apiKey, folderId, credentials, type = DEFAULT_RESOURCE_TYPE) {
  const spinner = ora(`Creating Weavy API resource (${type})`).start()

  const resourcePayload = getResourcePayloadData(url, apiKey, folderId, type)

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
exports.createResource = createResource

async function removeResource(name, type, credentials) {
  const spinner = ora(`Removing Weavy API resource (${type})`).start()

  try {
    await axios.delete(
      `${credentials.origin}/api/resources/names/${name}`,
    )
    spinner.succeed()
  } catch (e) {
    spinner.fail(`Error removing resource: ${e.errorMessage}`)
    throw e
  }
}
exports.removeResource = removeResource

async function updateResource(name, url, apiKey, folderId, credentials, type = DEFAULT_RESOURCE_TYPE) {
  const spinner = ora(`Updating Weavy API resource (${type})`).start()

  const resourcePayload = getResourcePayloadData(url, apiKey, folderId, type)

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
exports.updateResource = updateResource

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
exports.getResources = getResources

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
exports.getResourceByName = getResourceByName

function getResourceByDisplayName(displayName, resources) {
  const resource = resources?.resources?.find(
    (res) => res.displayName === displayName
  )

  return resource
}
exports.getResourceByDisplayName = getResourceByDisplayName

function getResourceRootFolder(resources) {
  const rootFolder = resources?.resourceFolders?.find(
    (folder) => folder.systemFolder && folder.name === 'root'
  )

  if (!rootFolder) {
    throw new Error('Error getting root folder')
  }

  return rootFolder
}
exports.getResourceRootFolder = getResourceRootFolder
