import Index from './components/index'
import EuroMat from './components/euromat'
import Weighting from './components/weighting'
import Results from './components/results'

export default [
  {
    path: '/thesen',
    component: Index,
    children: [
      {
        path: '',
        name: 'euromat',
        component: EuroMat
      },
      {
        path: 'gewichtung',
        name: 'weighting',
        component: Weighting
      },
      {
        path: 'ergebnis',
        name: 'results',
        component: Results
      }
    ]
  }
]
