const getCCLClient = require('@tryretool/custom-component-support/getCCLClient')

const { createOrGetComponentLibrary, uploadComponents } = require('./components-api')

module.exports = async (options, instance = 'default', output = false) => {
  const client = await getCCLClient.getCCLClient(false, [], instance)

  const library = await createOrGetComponentLibrary(client)
  await uploadComponents(client, library, output)
}
