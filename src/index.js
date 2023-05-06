import template from './index.html'
class Test {
  constructor() {
    document.getElementById('app').innerHTML = template
  }
}

new Test()