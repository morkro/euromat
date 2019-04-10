const createField = (widget, name, label, opts) => ({ label, name, widget, ...opts })

const textField = (...args) =>
  createField('text', ...args)

const stringField = (...args) =>
  createField('string', ...args)

const markdownField = (...args) =>
  createField('markdown', ...args)

const listField = (name, label, { list, ...rest } = {}) =>
  createField('list', name, label, { ...rest, fields: list })

const objectField = (name, label, { list, ...rest } = {}) =>
  createField('object', name, label, { ...rest, fields: list })

const baseConfig = () => ({
  backend: {
    name: 'git-gateway',
    branch: 'next',
    squash_merges: true,
    accept_roles: ['admin', 'editor']
  },
  publish_mode: 'editorial_workflow',
  media_folder: 'static/img/uploads',
  public_folder: '/img/uploads'
})

const languageConfig = () => ({
  label: '[Meta] Language',
  name: 'language',
  hint: 'Select the language for this page.',
  widget: 'select',
  options: [
    { label: 'English', value: 'en' },
    { label: 'Deutsch', value: 'de' },
    { label: 'Français', value: 'fr' },
    { label: 'Polski', value: 'pl' }
  ]
})

const pageUrl = () => ({
  label: '[Meta] Page URL',
  name: 'url',
  widget: 'string',
  hint: 'An optional, localised URL which will be used for this page (e.g. https://euromat.info/#/<PAGE_URL>)',
  optional: true
})

const siteName = () => ({
  label: '[Meta] Site Name',
  name: 'title',
  widget: 'string',
  hint: 'The name for the page that will appear in the browser tab.'
})

const category = ({ meta, fields = [] }) => ({
  ...meta,
  format: 'json',
  create: true,
  slug: '{{fields.language}}',
  fields: [
    languageConfig(),
    ...fields
  ]
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
  objectField
}
