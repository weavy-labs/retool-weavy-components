const { program, Option } = require('commander')
const { loginViaEmail, loginCCL } = require('./api/login-api')
const core = require('@actions/core');

program
  .addOption(
    new Option('-e, --retool-email <string>', 'Retool email')
      .makeOptionMandatory(true)
      .env('RETOOL_EMAIL')
  )
  .addOption(
    new Option('-p, --retool-password <string>', 'Retool password')
      .makeOptionMandatory(true)
      .env('RETOOL_PASSWORD')
  )
  .addOption(
    new Option('-s, --retool-subdomain <string>', 'Retool subdomain')
      .makeOptionMandatory(true)
      .env('RETOOL_SUBDOMAIN')
  )
  .addOption(
    new Option(
      '-t, --retool-apikey <string>',
      'Retool API token with custom components permissions'
    )
      .makeOptionMandatory(true)
      .env('RETOOL_APIKEY')
  )
  .addOption(
    new Option('-u, --weavy-url <string>', 'Weavy environment url')
      .makeOptionMandatory(true)
      .env('WEAVY_URL')
  )
  .addOption(
    new Option('-a, --weavy-apikey <string>', 'Weavy environment API key')
      .makeOptionMandatory(true)
      .env('WEAVY_APIKEY')
  )
  .addOption(
    new Option('--no-inquiry', 'No questions asked').env('WEAVY_NO_INQUIRY')
  )
  .addOption(
    new Option(
      '-r, --replace',
      'Whether to replace any existing configuration in Retool'
    )
      .implies({ inquiry: false })
      .env('WEAVY_REPLACE')
  )

program.parse()

const options = program.opts()

;(async () => {
  try {
    // Retool CLI login
    const loginInfo = await loginViaEmail(
      false,
      options.retoolEmail,
      options.retoolPassword,
      options.retoolSubdomain,
      true
    )
  
    // Retool CCL login
    await loginCCL(loginInfo.origin, options.retoolApikey)
  
    console.log('Login success 🎉')
  
    await require('./api/url')(options)
    await require('./api/resources')(options)
    await require('./api/workflows')(options)
    await require('./api/components')(options, 'default', true)
    const { appUrl } = await require('./api/demo-app')(options)
    await require('./api/weavy-callback')(options, appUrl)
    core.setOutput("installationUrl", appUrl);
  } catch(e) {
    await require('./api/weavy-callback')(options, undefined, "error", e.message)
    process.exit(-1)
  }
})()
