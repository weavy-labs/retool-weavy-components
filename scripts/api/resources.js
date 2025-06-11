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
  removeResource,
  getResources,
  getResourceRootFolder,
  getResourcePayloadData,
  testWeavyResource,
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
      await testWeavyResource(credentials);
    } else {
      if (!options.weavyUrl) {
        console.warn('No WEAVY_URL configured in .env')
      } else if (!options.weavyApikey) {
        console.warn('No WEAVY_APIKEY configured in .env')
      } else {
        const rootFolder = getResourceRootFolder(resources)

        const resourceType = options.resource || (updateExisting && existingResource ? existingResource.type : undefined)

        const connectionPayload = {
          changeset: getResourcePayloadData(
            options.weavyUrl,
            options.weavyApikey,
            rootFolder.id,
            resourceType
          ),
          environment: 'production'
        }

        const connectionOk = await testConnection(
          connectionPayload,
          credentials
        )

        if (connectionOk) {
          if (updateExisting && existingResource.type === resourceType) {
            await updateResource(
              existingResource.name,
              options.weavyUrl,
              options.weavyApikey,
              rootFolder.id,
              credentials,
              resourceType
            )
          } else {
            if (updateExisting) {
              await removeResource(existingResource.name, existingResource.type, credentials);
            }
            await createResource(
              options.weavyUrl,
              options.weavyApikey,
              rootFolder.id,
              credentials,
              resourceType
            )
          }
        }
        // Test created connection
        await testWeavyResource(credentials);
      }
    }
  }
)
