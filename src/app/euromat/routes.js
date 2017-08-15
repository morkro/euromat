import Index from './components/index'
import EuroMat from './components/euromat'
import Emphasis from './components/emphasis'
import Results from './components/results'

export default [
  {
    path: '/thesen',
    alias: '/theses',
    component: Index,
    children: [
      {
        path: '',
        name: 'euromat',
        component: EuroMat
      },
      {
        path: 'gewichtung',
        alias: 'emphasis',
        name: 'emphasis',
        component: Emphasis
      },
      {
        path: 'ergebnis',
        alias: 'results',
        name: 'results',
        component: Results
      }
    ]
  }
]
