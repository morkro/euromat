import isInteger from '@/utils/isInteger'
import { options, parties, theses } from './data'

export const getOption = position =>
  options.find(o => o.position === position)

export const getThesis = id =>
  theses.find(t => t.id === id).thesis

export const getParty = token => {
  const property = isInteger(token) ? 'id' : 'token'
  return parties.find(p => p[property] === token)
}

export const createThesisGroup = (thesis, parties = []) => (
  {
    thesis,
    parties: parties.map(({ token, position }) =>
      Object.assign({}, getParty(token), { position }))
  }
)

export const getThesesTree = () =>
  [
    createThesisGroup(getThesis(0), [
      { token: 'CDU', position: 'positive' },
      { token: 'SPD', position: 'neutral' },
      { token: 'GRÜNE', position: 'neutral' },
      { token: 'LINKE', position: 'negative' },
      { token: 'FDP', position: 'neutral' },
      { token: 'AfD', position: 'neutral' }
    ])
  ]
