const WEAVY_CALLBACK_URL = "https://get.weavy.com/api/end-installation"

module.exports = async (options, installationUrl, status = 'success', statusMessage, debug = false) => {
    const weavyUrl = options.weavyUrl

    if (status === 'error') {
        console.error(`Error encountered.\n${statusMessage}`)
    }
    
    if (debug) {
        console.log('Posting weavy callback. ' + status + "|" + statusMessage + "|" + weavyUrl + "|" + installationUrl)
    }

    await fetch(WEAVY_CALLBACK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            platform: "retool",
            weavyUrl,
            installationUrl,
            status,
            statusMessage
        })
    })
}