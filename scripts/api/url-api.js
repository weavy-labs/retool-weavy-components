const {
  getRequest,
  postRequest,
  deleteRequest
} = require('retool-cli/lib/utils/networking')
const chalk = require('chalk')
const ora = require('ora')
const axios = require('axios')

/// URLS

const jsWeavyUrlRegex = /window\.WEAVY_URL\s*=\s*(?<url>[^\n;]*);?/gm
exports.jsWeavyUrlRegex = jsWeavyUrlRegex

async function getOrgJS(credentials) {
  const spinner = ora('Getting preloaded organization JavaScripts').start()
  let js

  try {
    const getOrgResult = await getRequest(
      `${credentials.origin}/api/organization/admin`
    )

    js = getOrgResult.data?.org.preloadedJavaScript

    spinner.stop()
  } catch (e) {
    spinner.stop()
    console.error('Error getting organization:', e.errorMessage)
    throw e
  }

  return js
}
exports.getOrgJS = getOrgJS

async function saveOrgJS(js, credentials) {
  const spinner = ora('Saving preloaded organization JavaScripts').start()

  try {
    const saveJsResult = await axios.patch(
      `${credentials.origin}/api/organization/admin/libraries`,
      { preloadedJavaScript: js }
    )

    js = saveJsResult.data?.organization.preloadedJavaScript

    spinner.stop()
  } catch (e) {
    spinner.stop()
    console.error('Error saving organization JS:', e.errorMessage)
    throw e
  }

  console.log('Successfully saved organization JavaScript 🤩')

  console.log(
    `${chalk.bold('View in browser:')} ${credentials.origin}/settings/advanced`
  )

  return js
}
exports.saveOrgJS = saveOrgJS
