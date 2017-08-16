import Index from './components/index'
import EuroMat from './components/euromat'
import Emphasis from './components/emphasis'
import Results from './components/results'

function hasAnswers (to, from, next) {
  if (!sessionStorage.getItem('euromat-answers')) {
    next({ path: '/' })
  }
  next()
}

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
        component: Emphasis,
        beforeEnter: hasAnswers
      },
      {
        path: 'ergebnis',
        alias: 'results',
        name: 'results',
        component: Results,
        beforeEnter: hasAnswers
      }
    ]
  }
]
