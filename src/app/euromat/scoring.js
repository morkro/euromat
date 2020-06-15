export const MAX_POINTS = 2
export const BASE_POINTS = 1
export const MIN_POINTS = 0
export const EMPHASIS_POINTS = 2

export function getPartiesWithScores (answers, emphasized, partiesPositions) {
  const scorePointsGrid = getScorePointsGrid(answers, emphasized, partiesPositions)

  return partiesPositions.map(party => ({
    ...party,
    score: getTotalScorePerParty(party, scorePointsGrid)
  }))
}

export function getTotalMaxPoints (userAnswers, userEmphasized) {
  return userAnswers.map(answer => {
    const emphasis = userEmphasized.filter(e => e.thesis === answer.thesis).length >= 1
    return getMaxScorePerThesis(answer.position, emphasis)
  }).reduce((total, maxScorePerRow) => total + maxScorePerRow)
}

function getScorePointsGrid (userAnswers, userEmphasized, partiesPositions) {
  // 1. Iterate over scoringGrid
  // 2. Get user and party positions of each thesis
  // 3. Evaluate points based on calculation model for each party
  // 4. Get the maximum score per thesis
  // 5. Return a new object for each thesis row with results
  const scoringGrid = getScoringGrid(userAnswers, userEmphasized, partiesPositions)

  return scoringGrid.map(row => {
    const partiesFromRow = row.positions.filter(p => p.type === 'party')
    const userPosition = getUserPosition(row)
    const scores = partiesFromRow.map(party => ({
      party: party.party,
      score: evalPointsPerThesisPerParty(party.position, userPosition, row.emphasis)
    }))
    return {
      thesis: row.thesis,
      scores
    }
  })
}

function getTotalScorePerParty (party, scorePointsGrid) {
  return scorePointsGrid
    .map(thesis => thesis.scores.find(scores => scores.party === party.id).score)
    .reduce((total, score) => total + score, 0)
}

function getMaxScorePerThesis (userPosition, emphasis) {
  return userPosition === 'skipped' ? MIN_POINTS : emphasis ? MAX_POINTS * EMPHASIS_POINTS : MAX_POINTS
}

function getUserPosition (row) {
  return row.positions.find(p => p.type === 'user').position
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
function getScoringGrid (userAnswers, emphasizedTheses, parties) {
  return userAnswers.map(answer => (
    {
      thesis: answer.thesis,
      emphasis: emphasizedTheses.filter(e => e.thesis === answer.thesis).length >= 1,
      positions: [
        ...getPartyPositions(answer.thesis, parties),
        ...[{ type: 'user', position: answer.position }]
      ]
    }
  ))
}

function getPartyPositions (thesis, parties) {
  return parties.map(party => {
    const position = party.positions.find(p => p.thesis === thesis)
    return {
      type: 'party',
      party: party.id,
      position: (position && position.position) || {}
    }
  })
}

export function evalPointsPerThesisPerParty (partyPosition, userPosition, emphasis) {
  let score = 0

  if (userPosition === partyPosition) {
    score = MAX_POINTS
  } else if (
    (userPosition === 'positive' && partyPosition === 'neutral') ||
    (userPosition === 'neutral' && partyPosition === 'positive') ||
    (userPosition === 'neutral' && partyPosition === 'negative') ||
    (userPosition === 'negative' && partyPosition === 'neutral')
  ) {
    score = BASE_POINTS
  } else if (
    (userPosition === 'positive' && partyPosition === 'negative') ||
    (userPosition === 'negative' && partyPosition === 'positive')
  ) {
    score = MIN_POINTS
  }

  return emphasis ? score * EMPHASIS_POINTS : score
}
