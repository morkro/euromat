export function setCookie (name, value = '') {
  if (!name) {
    throw new Error(`Cookie needs a valid name, you passed "${name}".`)
  }
  document.cookie = `${name}=${value}`
}

export function getCookie (name) {
  const nameEQ = name + '='
  const cookies = document.cookie.split(';')

  for (var i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length)
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length)
    }
  }

  return null
}

export function deleteCookie (name) {
  if (!name) {
    throw new Error(`Cookie needs a valid name, you passed "${name}".`)
  }
  document.cookie = `${name}=; Max-Age=-99999999;`
}
