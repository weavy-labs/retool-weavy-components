const WEAVY_CALLBACK_URL = "https://get.weavy.com/api/end-installation"

module.exports = async (options, installationUrl, status = 'success', statusMessage) => {
    const weavyUrl = options.weavyUrl

    if (status === 'error') {
        console.error(`Error encountered.\n${statusMessage}`)
    }
    console.log('Posting weavy callback.')

    await fetch(WEAVY_CALLBACK_URL, {
        method: "POST",
        body: JSON.stringify({
            platform: "retool",
            weavyUrl,
            installationUrl,
            status,
            statusMessage
        })
    })
}