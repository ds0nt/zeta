import fs from 'fs'
import path from 'path'
import zeta from './zeta'

let apps = fs.readdirSync(path.join(__dirname, 'apps'))
  .map(  name => ({ name })  )

zeta.get('/apps')( async() => apps )
zeta.listen()
