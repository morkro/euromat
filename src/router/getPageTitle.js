export default function getPageTitle (i18n = {}) {
  const locale = localStorage.getItem('euromat-locale') || 'de'
  const title = window.document.title.split('—')[0].trim()
  return `${title} — ${i18n[locale]}`
}
