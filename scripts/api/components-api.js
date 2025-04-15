const chalk = require('chalk')
const ora = require('ora')
const axios = require('axios')

const _exec = require('child_process').exec
const spawn = require("child_process").spawn;
const util = require('util')
const exec = util.promisify(_exec)
const execWithOutput = async (command, options) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, {
      stdio: "inherit",
      shell: true,
      ...options,
    });
    childProcess.on("error", (error) => {
      reject(error);
    });
    childProcess.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command exited with code ${code}.`));
      }
    });
  });
};

const package = require('../../package.json')
const fs = require('node:fs/promises')

/// COMPONENTS

async function createOrGetComponentLibrary(client) {
  let spinner = ora('Creating Custom Component Library').start()
  let library

  try {
    try {
      const response = await client.customComponentLibrariesPost({
        customComponentLibrariesPostRequest:
          package.retoolCustomComponentLibraryConfig
      })

      if (response.success) {
        library = response.data
      }
    } catch (e) {
      if (e.statusCode === 409) {
        spinner.stop()
        spinner = ora('Fetching Custom Component Library').start()
        const response = await client.customComponentLibrariesGet()

        if (response.success) {
          library = response.data.find(
            (lib) =>
              lib.name === package.retoolCustomComponentLibraryConfig.name
          )
        }
      } else {
        throw e
      }
    }
    spinner.stop()
  } catch (e) {
    spinner.stop()
    console.error('Error initializing components:', e.errorMessage)
  }
  return library
}
exports.createOrGetComponentLibrary = createOrGetComponentLibrary

async function uploadComponents(client, library, output = false) {
  if (library) {
    if (output) {
      console.log(`Uploading components...`);
      try {
        await execWithOutput(`npx retool-ccl deploy --skip-updates-check`);
      } catch (e) {
        console.error(e);
        process.exit(-1);
      }
    } else {
      spinner = ora('Uploading components').start()
      try {
        await exec('npx retool-ccl deploy')
      } catch (e) {
        console.error(e);
        process.exit(-1);
      }
      spinner.stop()
    }

    const revisionResponse =
      await client.customComponentLibrariesLibraryIdRevisionsGet({
        libraryId: library.id
      })

    if (revisionResponse.success) {
      const json = JSON.stringify(revisionResponse.data.pop())

      await fs.writeFile('./weavy-components.json', json, { encoding: 'utf8' })
      console.log('Saved component library revision 🥳')
    }
  }
}
exports.uploadComponents = uploadComponents
