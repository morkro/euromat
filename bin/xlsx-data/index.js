const XLSX = require('xlsx')
const ora = require('ora')
const { writeFile } = require('../helper')

function toJSON (data = {}) {
  return JSON.stringify(data, null, 2)
}

function createLocaleMap (section, data = {}) {
  return Object.keys(data)
    .filter(key => key.includes(section))
    .reduce((acc, keyLabel) => {
      const splitKeyLabel = keyLabel.split(' ')
      const locale = splitKeyLabel[splitKeyLabel.length - 1].toLowerCase()
      acc[locale] = data[keyLabel].trim()
      return acc
    }, {})
}

function createPartyPositionMap (sheetName) {
  if (!sheetName) return []
  const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
  return rawData.map(block => ({
    thesis: parseInt(block.Thesis, 10),
    position: block.Position,
    statement: createLocaleMap('Statement', block)
  }))
}

async function writeDataset (fileName, data = {}) {
  const path = `${OUTPUT_DIRECTORY}/${fileName}`
  try {
    await writeFile(path, toJSON(data))
    spinner.succeed(`Success! It's located at ${path}`)
  } catch (error) {
    spinner.fail(`Failure! Couldn't write '${fileName}'. Error: ${error.message}`)
  }
}

async function createOptionsDataset (sheetName) {
  if (!sheetName) {
    throw new Error(`createOptionsDataset() requires 'sheetName', got "${sheetName}"`)
  }
  await writeDataset(
    'options.json',
    XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
  )
}

async function createThesesDataset (sheetName) {
  if (!sheetName) {
    throw new Error(`createThesesDataset() requires 'sheetName', got "${sheetName}"`)
  }

  const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
  const data = rawData.map(block => ({
    id: parseInt(block.ID, 10),
    category: createLocaleMap('Category', block),
    thesis: createLocaleMap('Thesis', block),
    terminology: block.Terminology || []
  }))

  await writeDataset('theses.json', data)
}

async function createTerminologyDataset (sheetName) {
  if (!sheetName) {
    throw new Error(`createTerminologyDataset() requires 'sheetName', got "${sheetName}"`)
  }

  const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
  const data = rawData.map(block => {
    return {
      id: parseInt(block.ID, 10),
      explanation: createLocaleMap('Explanation', block),
      reference: createLocaleMap('Reference', block)
    }
  })
  await writeDataset('terminology.json', data)
}

async function createPartiesDataset (sheetName, partySheets) {
  if (!sheetName) {
    throw new Error(`createPartiesDataset() requires 'sheetName', got "${sheetName}"`)
  }

  const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
  const data = rawData.map(block => {
    const token = block.Token.toUpperCase()
    return {
      id: parseInt(block.ID, 10),
      token,
      name: createLocaleMap('European Party', block),
      european_profile: {
        party: createLocaleMap('European Party', block)
      },
      program: createLocaleMap('Program', block),
      positions: createPartyPositionMap(partySheets.find(sName => sName.toUpperCase() === token))
    }
  })

  await writeDataset('parties.json', data)
}

// const OUTPUT_DIRECTORY = './bin/xlsx-data/test'
const OUTPUT_DIRECTORY = './src/data'
const RESOURCE_FILE = 'euromat-dataset.xlsx'
const spinner = ora()
const workbook = XLSX.readFile(`./resources/${RESOURCE_FILE}`)
const [options, theses, terminology, parties, ...morePartySheets] = workbook.SheetNames

;(async () => {
  spinner.start()
  spinner.info(`Parsing '${RESOURCE_FILE}' to JSON files`)
  spinner.info(`XLSX SheetNames: ${workbook.SheetNames}`)

  spinner.info(`Writing '${options}.json' file`)
  await createOptionsDataset(options)

  spinner.info(`Writing '${theses}.json' file`)
  await createThesesDataset(theses)

  spinner.info(`Writing '${terminology}.json' file`)
  await createTerminologyDataset(terminology)

  spinner.info(`Writing '${parties}.json' file`)
  await createPartiesDataset(parties, morePartySheets)

  spinner.stopAndPersist()
})()
