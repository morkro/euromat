import options from '@/data/options'
import theses from '@/data/theses'
import parties from '@/data/parties'

export const getOption = position =>
  options.find(o => o.position === position)

export const getAllOptions = () =>
  options

export const getThesis = id =>
  theses.find(t => t.id === id)

export const getThesesCount = () =>
  theses.length

export const getParty = token =>
  parties.find(p => p.token === token)

export const getParties = () =>
  parties
