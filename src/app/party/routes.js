import Party from './components/index'

export default [
  {
    path: '/partei/:token',
    alias: '/party/:token',
    name: 'party',
    component: Party
  }
]
