const yaml = require('js-yaml')
const ora = require('ora')

const { writeFile } = require('../helper')
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
} = require('./helper')

const PATH_DESTINATION = './public/admin/config.yml'

const configTree = {
  ...baseConfig(),
  collections: [
    category({
      meta: {
        name: 'euromat-theses',
        label: '[Euromat] Theses',
        description: 'The theses selection pages for the EUROMAT.',
        folder: 'src/app/euromat/content/theses'
      },
      fields: [
        pageUrl(),
        siteName(),
        stringField('backBtn', 'Label for back button'),
        stringField('positive', 'Label for positive'),
        stringField('neutral', 'Label for neutral'),
        stringField('negative', 'Label for negative'),
        stringField('skipped', 'Label for skipping thesis')
      ]
    }),
    category({
      meta: {
        name: 'euromat-emphasis',
        label: '[Euromat] Emphasis',
        description: 'The emphasis page which comes after the theses.',
        folder: 'src/app/euromat/content/emphasis'
      },
      fields: [
        pageUrl(),
        siteName(),
        stringField('headline', 'Headline'),
        stringField('content', 'Description under headline'),
        stringField('skip', 'Skip emphasis page'),
        stringField('button', '[Label] Button to continue')
      ]
    }),
    category({
      meta: {
        name: 'euromat-results',
        label: '[Euromat] Results',
        description: 'The EUROMAT result page.',
        folder: 'src/app/euromat/content/results'
      },
      fields: [
        pageUrl(),
        siteName(),
        stringField('headline', 'Headline for results'),
        stringField('entry', 'Description under headline'),
        stringField('hint', 'A short hint for users to know they can click the parties'),
        stringField('thanks', 'Final words'),
        stringField('startoverBtn', '[Label] Button to start over'),
        stringField('indexBtn', '[Label] Button to go back to index')
      ]
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
        objectField('polis180', 'Legal notice for Polis180', {
          list: [
            stringField('addressLabel', 'Headline for address'),
            markdownField('address', 'Address'),
            stringField('representedLabel', 'Headline for represented by'),
            markdownField('represented', 'Represented by'),
            stringField('emailLabel', 'Headline for email'),
            stringField('email', 'Email address'),
            stringField('phoneLabel', 'Headline for phone'),
            stringField('phone', 'Phone number'),
            stringField('registerLabel', 'Headline for register entry'),
            markdownField('register', 'Register entry')
          ]
        }),
        objectField('poe', 'Legal notice for Pulse of Europe', {
          list: [
            stringField('addressLabel', 'Headline for address'),
            markdownField('address', 'Address'),
            stringField('representedLabel', 'Headline for represented by'),
            markdownField('represented', 'Represented by'),
            stringField('emailLabel', 'Headline for email'),
            stringField('email', 'Email address'),
            stringField('phoneLabel', 'Headline for phone'),
            stringField('phone', 'Phone number'),
            stringField('registerLabel', 'Headline for register entry'),
            markdownField('register', 'Register entry')
          ]
        }),
        objectField('responsible', 'Responsible for website content', {
          hint: 'A short description who is responsible for the website content',
          list: [
            stringField('headline', 'Headline'),
            markdownField('text', 'Content'),
            stringField('mail', '[Label] Contact')
          ]
        }),
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
        siteName(),
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
