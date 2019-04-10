const fs = require('fs')
const yaml = require('js-yaml')
const ora = require('ora')

const {
  category,
  baseConfig,
  pageUrl,
  siteName,
  textField,
  stringField,
  markdownField,
  listField,
  objectField
} = require('./config')

const writeFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })

const PATH_DESTINATION = './public/admin/config.yml'

const configTree = {
  ...baseConfig(),
  collections: [
    category({
      meta: {
        name: 'euromat',
        label: 'Euromat',
        description: 'Theses, parties, ..., everything for the actual app.',
        folder: 'src/app/euromat/content'
      },
      fields: []
    }),
    category({
      meta: {
        name: 'introduction',
        label: '[Page] Introduction',
        description: 'The introduction page of Euromat.',
        folder: 'src/app/intro/content'
      },
      fields: [
        siteName(),
        stringField('headline', 'Headline'),
        markdownField('content', 'Content'),
        stringField('button', '[Label] Button')
      ]
    }),
    category({
      meta: {
        name: 'party',
        label: '[Page] Party',
        description: 'This is an informational page comparing the voters results with a political parties position.',
        folder: 'src/app/party/content'
      },
      fields: [
        pageUrl(),
        siteName(),
        stringField('subtitle', 'Subtitle'),
        stringField('backButtonLabel', '[Label] Back button'),
        stringField('legendLabel', '[Label] Legend'),
        stringField('partyAnswer', 'Answer'),
        stringField('tableHeading', 'Table Heading'),
        stringField('tableUser', 'Table User Description')
      ]
    }),
    category({
      meta: {
        name: 'about',
        label: '[Page] About us',
        description: 'The about us page.',
        folder: 'src/app/about/content'
      },
      fields: [
        pageUrl(),
        siteName(),
        stringField('headline', 'Headline'),
        stringField('content', 'Content'),
        stringField('devDesign', 'Headline for development and design')
      ]
    }),
    category({
      meta: {
        name: 'faq',
        label: '[Page] FAQ',
        description: 'The FAQ page.',
        folder: 'src/app/faq/content'
      },
      fields: [
        pageUrl(),
        siteName(),
        stringField('headline', 'Headline'),
        listField('questions', 'Questions', {
          list: [
            stringField('title', 'Title'),
            markdownField('answer', 'Answer')
          ]
        })
      ]
    }),
    category({
      meta: {
        name: 'press',
        label: '[Page] Press',
        description: 'Press page.',
        folder: 'src/app/press/content'
      },
      fields: [
        pageUrl(),
        siteName(),
        stringField('headline', 'Headline'),
        markdownField('content', 'Content')
      ]
    }),
    category({
      meta: {
        name: 'privacy',
        label: '[Page] Data Privacy',
        description: 'The data privacy page.',
        folder: 'src/app/privacy/content'
      },
      fields: [
        pageUrl(),
        siteName(),
        stringField('headline', 'Headline'),
        listField('topics', 'Topics', {
          list: [
            stringField('title', 'Title'),
            markdownField('content', 'Content')
          ]
        })
      ]
    }),
    category({
      meta: {
        name: 'imprint',
        label: '[Page] Imprint',
        description: 'Subpage for legal notice.',
        folder: 'src/app/imprint/content'
      },
      fields: [
        pageUrl(),
        siteName(),
        stringField('headline', 'Headline'),
        listField('content', 'Content', {
          list: [
            stringField('title', 'Title'),
            markdownField('content', 'Content')
          ]
        })
      ]
    }),
    category({
      meta: {
        name: 'fourzerofour',
        label: '[Page] 404',
        description: 'Error page when the user (accidentally) reaches a nonexistent page.',
        folder: 'src/app/404/content'
      },
      fields: [
        siteName(),
        stringField('headline', 'Headline'),
        markdownField('content', 'Content'),
        stringField('button', '[Label] Button')
      ]
    }),
    category({
      meta: {
        name: 'settings',
        label: 'Settings',
        description: 'Overall settings for all pages (e.g. menu labels, social media, ...)',
        folder: 'src/data/meta'
      },
      fields: [
        objectField('topMenu', 'Top Navigation', {
          hint: 'The main navigation for the website.',
          list: [
            stringField('index', '[Label] Introduction'),
            stringField('faq', '[Label] FAQ'),
            stringField('about', '[Label] About us'),
            stringField('press', '[Label] Press')
          ]
        }),
        objectField('footerMenu', 'Footer Navigation', {
          hint: 'The footer navigation for the website.',
          list: [
            stringField('imprint', '[Label] Imprint'),
            stringField('privacy', '[Label] Data privacy')
          ]
        }),
        objectField('socialMedia', 'Social Media Share Text', {
          hint: 'These are the default texts which get used to share.',
          list: [
            stringField('twitter', 'Twitter'),
            stringField('facebook', 'Facebook'),
            stringField('clipboard', 'Clipboard')
          ]
        }),
        objectField('cookieConsent', 'Cookie Consent Layer', {
          hint: 'The text which is shown in the cookie consent layer.',
          list: [
            textField('text', 'Text'),
            stringField('btnDecline', '[Button] Decline'),
            stringField('btnAccept', '[Button] Accept')
          ]
        })
      ]
    })
  ]
}

;(async () => {
  const spinner = ora(`Building 'config.yml' for Netlify CMS admin.`).start()
  try {
    await writeFile(PATH_DESTINATION, yaml.safeDump(configTree))
    spinner.succeed(`'config.yml' has been successfully created!`)
  } catch (error) {
    spinner.fail(`There was an error creating 'config.yml': ${error.message}`)
    throw new Error(error)
  }
})()
