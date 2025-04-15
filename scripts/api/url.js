// https://mindroutedev.retool.com/api/organization/admin/libraries

const {
  getAndVerifyCredentialsWithRetoolDB
} = require('retool-cli/lib/utils/credentials')

const { jsWeavyUrlRegex, getOrgJS, saveOrgJS } = require('./url-api')

const inquirer = require('inquirer')

module.exports = async (options) => getAndVerifyCredentialsWithRetoolDB().then(
  async (credentials) => {
    let js = await getOrgJS(credentials)

    let changedJS

    if (js && js.match(jsWeavyUrlRegex)) {
      const replace =
        options.inquiry === false
          ? { confirm: options.replace }
          : await inquirer.prompt([
              {
                name: 'confirm',
                message:
                  'Do you want to replace the existing javascript variable window.WEAVY_URL?',
                type: 'confirm',
                default: false
              }
            ])
      if (replace.confirm) {
        changedJS = js.replace(
          jsWeavyUrlRegex,
          options.weavyUrl ? `window.WEAVY_URL = { value: "${options.weavyUrl}" };` : ''
        )
      }
    } else {
      changedJS = `${js || ''}${js ? '\n' : ''}window.WEAVY_URL = { value: "${options.weavyUrl}" };`
    }

    if (changedJS !== undefined) {
      await saveOrgJS(changedJS, credentials)
    }
  }
)
