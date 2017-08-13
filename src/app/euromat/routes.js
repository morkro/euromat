import Index from './components/index'
import EuroMat from './components/euromat'
import Emphasis from './components/emphasis'
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
        name: 'emphasis',
        component: Emphasis
      },
      {
        path: 'ergebnis',
        name: 'results',
        component: Results
      }
    ]
  }
]
