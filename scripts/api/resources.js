require('dotenv').config()

const {
  getAndVerifyCredentialsWithRetoolDB
} = require('retool-cli/lib/utils/credentials')

const {
  getResourceByDisplayName,
  getResourceByName,
  testConnection,
  updateResource,
  createResource,
  getResources,
  getResourceRootFolder,
  getResourcePayloadData,
  WEAVY_API_DISPLAY_NAME,
  WEAVY_API_NAME
} = require('./resources-api')
//const package = require('../package.json')
//const fs = require('node:fs')
const chalk = require('chalk')
const inquirer = require('inquirer')

module.exports = (options) => getAndVerifyCredentialsWithRetoolDB().then(
  async (credentials) => {
    const resources = await getResources(credentials)

    let existingResource,
      updateExisting = false

    existingResource = getResourceByDisplayName(
      WEAVY_API_DISPLAY_NAME,
      resources
    )

    if (!existingResource) {
      existingResource = await getResourceByName(WEAVY_API_NAME, credentials)
    }

    if (existingResource) {
      console.log(
        `Found existing resource API: ${chalk.blue(existingResource.displayName)}`
      )
      const replace =
        options.inquiry === false
          ? { confirm: options.replace }
          : await inquirer.prompt([
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
      if (!options.weavyUrl) {
        console.warn('No WEAVY_URL configured in .env')
      } else if (!options.weavyApikey) {
        console.warn('No WEAVY_APIKEY configured in .env')
      } else {
        const rootFolder = getResourceRootFolder(resources)

        const connectionPayload = {
          changeset: getResourcePayloadData(
            options.weavyUrl,
            options.weavyApikey,
            rootFolder.id
          ),
          environment: 'production'
        }

        const connectionOk = await testConnection(
          connectionPayload,
          credentials
        )

        if (connectionOk) {
          if (updateExisting) {
            await updateResource(
              existingResource.name,
              options.weavyUrl,
              options.weavyApikey,
              rootFolder.id,
              credentials
            )
          } else {
            await createResource(
              options.weavyUrl,
              options.weavyApikey,
              rootFolder.id,
              credentials
            )
          }
        }
      }
    }
  }
)
