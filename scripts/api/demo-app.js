require('dotenv').config()

const {
  getAndVerifyCredentialsWithRetoolDB
} = require('retool-cli/lib/utils/credentials')

const chalk = require('chalk')
const ora = require('ora')
const inquirer = require('inquirer')

const {
  getExistingApp,
  createWeavyApp,
  DEMO_APP_NAME
} = require('./demo-app-api')
const { deleteApp } = require('retool-cli/lib/utils/apps')

module.exports = async (options) => {
  const credentials  = await getAndVerifyCredentialsWithRetoolDB()
  const existingApp = await getExistingApp(credentials)

  if (existingApp) {
    const replace = options.inquiry === false
      ? { confirm: options.replace }
      : await inquirer.prompt([
          {
            name: 'confirm',
            message: 'Do you want to replace the existing '.concat(
              DEMO_APP_NAME,
              '?'
            ),
            type: 'confirm',
            default: false
          }
        ])

    if (replace.confirm) {
      await deleteApp(DEMO_APP_NAME, credentials, false)
    }
  }

  return await createWeavyApp(credentials, DEMO_APP_NAME)
}
