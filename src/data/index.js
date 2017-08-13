import options from './options'
import theses from './theses'
import parties from './parties'

export const getOption = position =>
  options.find(o => o.position === position)

export const getAllOptions = () =>
  options

export const getThesis = id =>
  theses.find(t => t.id === id)

export const getAllTheses = () =>
  theses

export const getThesesCount = () =>
  theses.length

export const getParty = token =>
  parties.find(p => p.token === token)

export const getPartyPositions = (thesis) =>
  parties.map(party => {
    const { position } = party.positions.find(p => p.thesis === thesis)
    return { type: 'party', party: party.id, position }
  })

export const getParties = () =>
  parties
