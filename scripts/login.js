'use strict'

/* NOT USED */

const { program } = require('commander')
const { loginViaEmail, loginCCL } = require('./api/login-api')

let email, password, cclToken, environment

program
  .requiredOption('-e, --email <string>', 'Retool email')
  .requiredOption('-p, --password <string>', 'Retool password')
  .requiredOption('-t, --token <string>', 'Retool API token with custom components permissions')

program.parse()

const options = program.opts()

try {
  email = options.email
  password = options.password
  cclToken = options.token
  environment = options.url
} catch (e) {
  console.log(e)
}

if (!email || !password || !cclToken) {
  console.error('Missing required login parameters.')
  process.exit(-1)
}

;(async () => {
  // Retool CLI login
  const loginInfo = await loginViaEmail(false, email, password)

  // Retool CCL login
  await loginCCL(loginInfo.origin, cclToken)

  console.log("Login success 🎉")
})()
