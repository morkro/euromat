import {
  evalPointsPerThesisPerParty,
  getPartiesWithScores,
  getTotalMaxPoints,
} from '@/app/euromat/scoring'

const positionDef = ['positive', 'neutral', 'negative', 'skipped']
// See offficial Rechenmodell of bpb from 2019
const rechenmodellGrid = [
  [0, 0, 0, 0, 0, false],
  [0, 0, 2, 0, 1, false],
  [0, 2, 2, 0, 0, false],
  [0, 0, 0, 0, 2, false],
  [1, 1, 0, 2, 2, true],
  [0, 0, 2, 0, 0, false],
  [0, 2, 2, 1, 0, false],
  [0, 0, 0, 2, 2, false],
  [2, 0, 2, 2, 1, false],
  [1, 2, 2, 2, 1, false],
  [2, 2, 0, 0, 2, false],
  [0, 2, 2, 2, 2, false],
  [0, 2, 0, 0, 3, false],
  [0, 2, 1, 2, 2, false],
  [2, 0, 0, 1, 2, false],
  [2, 0, 0, 0, 2, true],
  [2, 0, 0, 2, 3, false],
  [0, 0, 0, 0, 2, false],
  [2, 0, 0, 0, 1, false],
  [2, 0, 0, 0, 1, false],
  [0, 0, 2, 2, 2, true],
  [2, 2, 1, 2, 2, false],
  [2, 2, 0, 2, 2, false],
  [2, 2, 2, 0, 2, false],
  [0, 2, 0, 2, 1, false],
  [1, 2, 2, 0, 0, false],
  [2, 0, 2, 0, 0, false],
  [2, 0, 0, 2, 2, false],
  [0, 2, 0, 2, 1, false],
  [1, 2, 0, 2, 2, false],
  [0, 1, 2, 0, 0, false],
  [1, 2, 2, 0, 1, false],
  [2, 0, 2, 2, 1, false],
  [0, 2, 2, 2, 2, false],
  [0, 2, 0, 0, 0, false],
  [0, 2, 0, 0, 1, false],
  [2, 2, 2, 2, 0, false],
  [2, 0, 0, 2, 0, false],
]

const rechenmodellExpectedTotalScorePerParty = [44, 37, 28, 50]
const rechenmodellExpectedMaxScore = 78

const testParties = [1, 2, 3, 4].map(partyId => ({
  id: partyId,
  token: 'idontcare',
  positions: rechenmodellGrid.map((thesis, index) => ({
    thesis: index,
    position: positionDef[thesis[partyId - 1]],
  })),
}))

const testAnswers = rechenmodellGrid.map((thesis, index) => ({
  position: positionDef[thesis[4]],
  thesis: index,
}))

const testEmphasis = rechenmodellGrid
  .map((thesis, index) => ({
    ...thesis,
    thesis: index,
  }))
  .filter((thesis, index) => thesis[5])
  .map(thesis => ({ thesis: thesis.thesis }))

describe('The getPartiesWithScores function', () => {
  it('returns the correct total scores according to the Rechenmodell example of bpb', () => {
    const resultPartiesWithScores = getPartiesWithScores(testAnswers, testEmphasis, testParties)

    expect(resultPartiesWithScores.map(party => party.score)).toEqual(
      rechenmodellExpectedTotalScorePerParty
    )
  })
})

describe('The getTotalMaxPoints function', () => {
  it('returns the correct maximum score points according to the Rechenmodell example of bpb', () => {
    const resultTotalMaxPoints = getTotalMaxPoints(testAnswers, testEmphasis)

    expect(resultTotalMaxPoints).toEqual(rechenmodellExpectedMaxScore)
  })
})

describe('The evalPointsPerThesisPerParty fucntion', () => {
  test.each`
    partyPosition | userPosition  | expectedScore | expectedScoreWithEmphasis
    ${'negative'} | ${'negative'} | ${2}          | ${4}
    ${'negative'} | ${'neutral'}  | ${1}          | ${2}
    ${'negative'} | ${'positive'} | ${0}          | ${0}
    ${'neutral'}  | ${'negative'} | ${1}          | ${2}
    ${'neutral'}  | ${'neutral'}  | ${2}          | ${4}
    ${'neutral'}  | ${'positive'} | ${1}          | ${2}
    ${'positive'} | ${'negative'} | ${0}          | ${0}
    ${'positive'} | ${'neutral'}  | ${1}          | ${2}
    ${'positive'} | ${'positive'} | ${2}          | ${4}
    ${'positive'} | ${'skipped'}  | ${0}          | ${0}
  `(
    'returns the correct score (according to the Rechenmodell of the bpb' +
      " if the party position is $partyPosition and the user's position is $userPosition",
    ({ partyPosition, userPosition, expectedScore, expectedScoreWithEmphasis }) => {
      const resultScore = evalPointsPerThesisPerParty(partyPosition, userPosition, false)
      const resultScoreWithEmphasis = evalPointsPerThesisPerParty(partyPosition, userPosition, true)

      expect(resultScore).toEqual(expectedScore)
      expect(resultScoreWithEmphasis).toEqual(expectedScoreWithEmphasis)
    }
  )
})
