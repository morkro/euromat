export default function getPageTitle (i18n = {}) {
  const locale = window.localStorage.getItem('euromat-locale')
  const title = window.document.title.split('—')[0].trim()
  return `${title} — ${i18n[locale]}`
}
