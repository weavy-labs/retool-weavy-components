'use strict'

const {
  getAndVerifyCredentialsWithRetoolDB,
  persistCredentials,
  getCredentials
} = require('retool-cli/lib/utils/credentials')
const {
  getRequest,
  postRequest,
  deleteRequest
} = require('retool-cli/lib/utils/networking')
const {
  accessTokenFromCookies,
  xsrfTokenFromCookies
} = require('retool-cli/lib/utils/cookies')

const {
  testConnection
} = require('@tryretool/custom-component-support/commands/login/testConnection')
const {
  setTargetUrlAndAccessToken
} = require('@tryretool/custom-component-support/commands/login/accessTokens')

/// INIT-URL

const chalk = require('chalk')

// Ask the user to input their email and password.
// Fire off a request to Retool's login & auth endpoints.
// Persist the credentials.
async function loginViaEmail(localhost = false, email, password, masked = false) {
  /*if (!email) {
    email = await input({
      message: 'What is your email?'
    })
  }
  if (!password) {
    password = await input({
      message: 'What is your password?'
    })
  }*/

  const loginOrigin = localhost
    ? 'http://localhost:3000'
    : 'https://login.retool.com'

  // Step 1: Hit /api/login with email and password.
  const login = await postRequest(`${loginOrigin}/api/login`, {
    email,
    password
  })
  const { authUrl, authorizationToken } = login.data
  if (!authUrl || !authorizationToken) {
    console.log('Error logging in, please try again')
    return
  }

  // Step 2: Hit /auth/saveAuth with authorizationToken.
  const authResponse = await postRequest(
    localhost ? `${loginOrigin}${authUrl}` : authUrl,
    {
      authorizationToken
    },
    true,
    {
      origin: loginOrigin
    }
  )
  const { redirectUri } = authResponse.data
  const redirectUrl = localhost
    ? new URL(loginOrigin)
    : redirectUri
      ? new URL(redirectUri)
      : undefined
  const accessToken = accessTokenFromCookies(authResponse.headers['set-cookie'])
  const xsrfToken = xsrfTokenFromCookies(authResponse.headers['set-cookie'])

  // Step 3: Persist the credentials.
  if (redirectUrl?.origin && accessToken && xsrfToken) {
    persistCredentials({
      origin: redirectUrl.origin,
      accessToken,
      xsrf: xsrfToken,
      firstName: authResponse.data.user?.firstName,
      lastName: authResponse.data.user?.lastName,
      email: authResponse.data.user?.email,
      telemetryEnabled: true
    })
    logSuccess(masked)
    return { email: authResponse.data.user?.email, origin: redirectUrl.origin }
  } else {
    throw new Error(
      'Error parsing credentials from HTTP Response. Please try again.'
    )
  }
}
exports.loginViaEmail = loginViaEmail

function logSuccess(masked = false) {
  var credentials = getCredentials()
  if (
    (credentials === null || credentials === void 0
      ? void 0
      : credentials.firstName) &&
    credentials.lastName &&
    credentials.email
  ) {
    console.log(
      masked
        ? 'Logged into Retool CLI \u2705'
        : 'Logged into Retool CLI as '
            .concat(chalk.bold(credentials.firstName), ' ')
            .concat(chalk.bold(credentials.lastName), ' (')
            .concat(credentials.email, ') \u2705')
    )
  } else {
    console.log('Successfully saved credentials.')
  }
}
exports.logSuccess = logSuccess

async function loginCCL(url, accessToken, unixSocket, instance = 'default') {
  const errorMessage = await testConnection({
    url,
    accessToken,
    headers: [],
    unixSocket: undefined
  })
  if (errorMessage) {
    throw new Error(
      `An error happened while connecting to the Retool backend:\n - ${errorMessage}`
    )
  } else {
    await setTargetUrlAndAccessToken({
      url,
      accessToken,
      unixSocket,
      instance
    })
  }
  console.log('Logged into CCL', url, '✅')
}
exports.loginCCL = loginCCL
