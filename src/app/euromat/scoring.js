import { parties } from '@/data'

export const MAX_POINTS = 2
export const BASE_POINTS = 1
export const MIN_POINTS = 0
export const EMPHASIS_POINTS = 2

export function getPartyPositions (thesis) {
  return parties.map(party => {
    const position = party.positions.find(p => p.thesis === thesis)
    return {
      type: 'party',
      party: party.id,
      position: (position && position.position) || {}
    }
  })
}

// Grid example:
// [
//   {
//     thesis: 0,
//     emphasis: true,
//     positions: [
//       {type: 'party', party: 0, position: 'neutral'},
//       {type: 'party', party: 1, position: 'positive'},
//       {type: 'party', party: 2, position: 'negative'},
//       {type: 'party', party: 3, position: 'positive'},
//       {type: 'party', party: 4, position: 'positive'},
//       {type: 'party', party: 5, position: 'positive'},
//       {type: 'user', position: 'positive'}
//     ]
//   },
//   ...
// ]
export function getScoringGrid (userAnswers, emphasizedTheses) {
  return userAnswers.map(answer => (
    {
      thesis: answer.thesis,
      emphasis: emphasizedTheses.filter(e => e.thesis === answer.thesis).length >= 1,
      positions: [
        ...getPartyPositions(answer.thesis),
        ...[{ type: 'user', position: answer.position }]
      ]
    }
  ))
}
