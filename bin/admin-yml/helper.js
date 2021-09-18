const { SUPPORTED_LOCALES } = require('../../src/config')

/**
 * @typedef ConfigField
 * @property {string} widget
 * @property {string} name
 * @property {string} label
 * @property {object} opts
 */

/**
 * @param {string} widget
 * @param {string} name
 * @param {string} label
 * @param {object} opts
 * @returns {ConfigField}
 */
const createField = (widget, name, label, opts) => ({ label, name, widget, ...opts })

/**
 * @param  {...string} args
 * @returns {ConfigField}
 */
const textField = (...args) => createField('text', ...args)

/**
 * @param  {...string} args
 * @returns {ConfigField}
 */
const stringField = (...args) => createField('string', ...args)

/**
 * @param  {...string} args
 * @returns {ConfigField}
 */
const markdownField = (...args) => createField('markdown', ...args)

const listField = (name, label, { list, ...rest } = {}) =>
  createField('list', name, label, { ...rest, fields: list })

const objectField = (name, label, { list, ...rest } = {}) =>
  createField('object', name, label, { ...rest, fields: list })

const baseConfig = () => ({
  backend: {
    name: 'git-gateway',
    branch: 'master',
    squash_merges: true,
    accept_roles: ['admin', 'editor'],
  },
  publish_mode: 'editorial_workflow',
  media_folder: 'static/img/uploads',
  public_folder: '/img/uploads',
})

const languageConfig = () => ({
  label: '[Meta] Language',
  name: 'language',
  hint: 'Select the language for this page.',
  widget: 'select',
  options: SUPPORTED_LOCALES.map(([locale, name]) => ({
    label: name,
    value: locale,
  })),
})

const pageUrl = () => ({
  label: '[Meta] Page URL',
  name: 'url',
  widget: 'string',
  hint:
    'An optional, localised URL which will be used for this page (e.g. https://euromat.info/#/<PAGE_URL>)',
  optional: true,
})

const siteName = () => ({
  label: '[Meta] Site Name',
  name: 'title',
  widget: 'string',
  hint: 'The name for the page that will appear in the browser tab.',
})

const category = ({ meta, fields = [] }) => ({
  ...meta,
  format: 'json',
  create: true,
  slug: '{{fields.language}}',
  fields: [languageConfig(), ...fields],
})

module.exports = {
  category,
  baseConfig,
  languageConfig,
  pageUrl,
  siteName,
  textField,
  stringField,
  markdownField,
  listField,
  objectField,
}
