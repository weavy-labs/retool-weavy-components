const { program, Option } = require('commander')

require('dotenv').config()

program
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
  await require('./api/url')(options)
  await require('./api/resources')(options)
  await require('./api/workflows')(options)
  await require('./api/components')(options)
  await require('./api/weavy-callback')(options)
})()
