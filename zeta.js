/**
 * An API Utility Library
 * @author Daniel Sont
 */

import koa from 'koa'
import cors from 'kcors'
import json from 'koa-json'
import jsonbody from 'koa-json-body'
import route from 'koa-route'

let app = koa()
app.use(cors())
app.on('error', f => console.error(f.stack))

app.use(function* errors(next) {
  try {
    yield next
  } catch (err) {
    this.status = err.status || 500
    this.body = { error: err.message }
    this.app.emit('error', err, this)
  }
})

app.use(json())
app.use(jsonbody())

// utility function allowing for async closures in koa
function asyncify(method) {
  return url => xfn => app.use(
    route[method](url, function* () {
      this.body = yield xfn.apply(this)
    })
  )
}

export default {
  get: asyncify('get'),
  post: asyncify('post'),
  listen: () => app.listen(8080)
}
