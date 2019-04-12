export function loadContent (prefix, requireContent) {
  if (!prefix || !requireContent) {
    throw new Error('loadContent: prefix and requireContent are both required!')
  }

  return requireContent
    .keys()
    .map(requireContent)
    .reduce((accumulator, current) => {
      accumulator[current.language] = { [prefix]: current }
      return accumulator
    }, {})
}
