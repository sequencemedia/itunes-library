import {
  homedir
} from 'os'

import path from 'path'

const normalise = (p) => path.resolve(p.trim().replace(/^~/, homedir()))

export default normalise
