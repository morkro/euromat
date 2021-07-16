const fs = require('fs')

/**
 * @param {string} path
 * @param {*} data
 * @param {string} [opts=utf8]
 * @returns {Promise<void>}
 */
const writeFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, err => {
      if (err) reject(err)
      else resolve()
    })
  })

/**
 * @param {string} path
 * @param {string} [opts=utf8]
 * @returns {Promise<any>}
 */
const readFile = (path, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })

module.exports = {
  writeFile,
  readFile,
}
